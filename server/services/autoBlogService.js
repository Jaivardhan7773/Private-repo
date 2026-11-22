/**
 * autoBlogService.js
 * ─────────────────────────────────────────────────────────────────────
 * Autonomous blog generation engine.
 *
 * Pipeline per run:
 *   1. Scrape Google Trends → ranked list of live trending topics
 *   2. Pick top topic not already in DB (deduplication)
 *   3. Fetch relevant cover image (Trends thumbnail → Pollinations.ai → fallback)
 *   4. Upload image to Cloudinary CDN
 *   5. Generate full blog post via Gemini 2.5 Flash (grounded with live search)
 *   6. Save to MongoDB (auto-slug, auto-indexed)
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const cron = require('node-cron');
const Blog = require('../models/blog');
const { getTopTrends, getTopicCoverImage } = require('./trendsScraper');
require('dotenv').config();

// ─── Config ──────────────────────────────────────────────────────────

const GEMINI_API_KEY    = process.env.GEMINI_API_KEY;
const AUTO_BLOG_ENABLED = process.env.AUTO_BLOG_ENABLED === 'true';
const INTERVAL_HOURS    = parseInt(process.env.AUTO_BLOG_INTERVAL_HOURS) || 2;
const USER_ID           = process.env.AUTO_BLOG_USER_ID;

if (!GEMINI_API_KEY) {
    console.error('AutoBlog: GEMINI_API_KEY is missing!');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// ─── Step 1: Get live trend, deduplicated ─────────────────────────────

async function pickTrendingTopic() {
    // Fetch recent blog titles from DB (last 100) for deduplication
    const recent = await Blog.find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .select('title')
        .lean();
    const skipTitles = recent.map(b => b.title.toLowerCase());

    const trends = await getTopTrends({ top: 10, minVolume: 20000, skipTitles });
    if (!trends.length) {
        console.log('AutoBlog: No fresh trends found above minimum volume threshold.');
        // Fall back to lower volume threshold
        const fallback = await getTopTrends({ top: 5, minVolume: 1000, skipTitles });
        return fallback[0] || null;
    }
    return trends[0]; // Highest search-volume topic
}

// ─── Step 2: Generate full blog post via Gemini ───────────────────────

async function generateBlogContent(trend) {
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        tools: [{ googleSearch: {} }],
    });

    const today = new Date().toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit', month: 'long', year: 'numeric',
    });

    const relatedContext = trend.relatedQueries?.length
        ? `\nRelated searches: ${trend.relatedQueries.slice(0, 8).join(', ')}`
        : '';

    const prompt = `
TODAY'S DATE: ${today}
TRENDING TOPIC: "${trend.title}" (${trend.searchVolume?.toLocaleString()}+ searches today, +${trend.growthPct}% growth)${relatedContext}

You are an expert journalist writing for a global audience. The topic above is LIVE and TRENDING RIGHT NOW.

TASK: Write a comprehensive, well-researched blog post about this topic using Google Search to gather REAL, CURRENT facts, quotes, and details. This should read like a professional editorial — factual, engaging, and human in tone. NOT generic AI content.

RULES:
- Write in a natural, editorial journalist style (avoid AI clichés like "In the rapidly evolving...", "It's worth noting...", "In conclusion..." etc.)
- Use specific names, numbers, dates, and quotes from real sources
- Structure the HTML with clear <h2> sections, <p> paragraphs, and <ul>/<li> lists where appropriate
- Minimum 500 words in the description
- The title must be specific and journalistic, NOT clickbait

OUTPUT FORMAT — strict JSON only, no markdown fences:
{
    "title": "Specific, factual, SEO-optimized title",
    "introduction": "2-3 sentence punchy intro that hooks the reader (60-80 words). Mention the core fact immediately.",
    "description": "Full HTML blog body — min 500 words. Use <h2>, <p>, <ul>, <li> tags. Rich in facts and context.",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "category": "One of: Technology | Health | Education | Entertainment | Sports | News",
    "author": "TrendPulse AI"
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
}

// ─── Main Workflow ────────────────────────────────────────────────────

async function runAutoBlogWorkflow() {
    if (!AUTO_BLOG_ENABLED) {
        console.log('AutoBlog: Disabled via ENV.');
        return;
    }

    console.log('AutoBlog: Starting workflow...');

    // 1. Pick topic
    let trend;
    try {
        trend = await pickTrendingTopic();
    } catch (err) {
        console.error('AutoBlog: Trend scraping failed:', err.message);
        return;
    }

    if (!trend) {
        console.log('AutoBlog: No suitable trend found — skipping this run.');
        return;
    }

    console.log(`AutoBlog: Selected topic → "${trend.title}" (${trend.searchVolume?.toLocaleString()} searches)`);

    // 2. Get cover image (Tier 1 → Tier 2 → fallback, then upload to Cloudinary)
    let coverImage;
    try {
        coverImage = await getTopicCoverImage(trend);
    } catch (err) {
        console.error('AutoBlog: Image pipeline failed:', err.message);
        coverImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop';
    }

    // 3. Generate blog content
    let blogContent;
    try {
        blogContent = await generateBlogContent(trend);
    } catch (err) {
        console.error('AutoBlog: Gemini generation failed:', err.message);
        return;
    }

    if (!blogContent || !blogContent.title || !blogContent.description) {
        console.log('AutoBlog: Gemini returned incomplete content — skipping.');
        return;
    }

    console.log(`AutoBlog: Generated → "${blogContent.title}"`);

    // 4. Save to MongoDB
    try {
        const newBlog = new Blog({
            userId:       USER_ID,
            title:        blogContent.title,
            image:        coverImage,
            introduction: blogContent.introduction,
            description:  blogContent.description,
            tags:         blogContent.tags,
            author:       blogContent.author || 'TrendPulse AI',
            category:     blogContent.category,
        });
        await newBlog.save();
        console.log(`AutoBlog: ✅ Published "${newBlog.title}" (slug: ${newBlog.slug})`);
    } catch (err) {
        console.error('AutoBlog: DB save failed:', err.message);
    }
}

// ─── Scheduler ────────────────────────────────────────────────────────

function startScheduler() {
    if (!AUTO_BLOG_ENABLED) {
        console.log('AutoBlog: Disabled. Scheduler will not start.');
        return;
    }
    console.log(`AutoBlog: Scheduler active — posting every ${INTERVAL_HOURS}h.`);
    cron.schedule(`0 */${INTERVAL_HOURS} * * *`, runAutoBlogWorkflow);
}

module.exports = { startScheduler, runAutoBlogWorkflow };
