const { GoogleGenerativeAI } = require("@google/generative-ai");
const cron = require('node-cron');
const Blog = require('../models/blog');
require('dotenv').config();

// Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const AUTO_BLOG_ENABLED = process.env.AUTO_BLOG_ENABLED === 'true';
const INTERVAL_HOURS = process.env.AUTO_BLOG_INTERVAL_HOURS || 2;
const USER_ID = process.env.AUTO_BLOG_USER_ID;

if (!GEMINI_API_KEY) {
    console.error("ERROR: GEMINI_API_KEY is missing in environment variables!");
} else {
    console.log(`AutoBlog Service: Debug - API Key loaded (Length: ${GEMINI_API_KEY.length})`);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function generateTrendAndBlog() {
    // UPDATED: Enable googleSearch tool for real-time data
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        tools: [{ googleSearch: {} }]
    });

    // UPDATED: Get current date to anchor the AI's search
    const today = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: '2-digit', month: 'long', year: 'numeric' });

    const prompt = `
    TODAY'S DATE: ${today}
    LOCATION: India

    Act as a professional trend analyst and content writer for Global. 
    1. USE GOOGLE SEARCH to identify the TOP trending topic in WORLD RIGHT NOW (from the last 24 hours only) on google trends or news sites. 
    2. Focus on News, Technology, Entertainment, or Sports happening specifically around ${today}.
    3. Write a comprehensive, engaging blog post about this topic.
    4. You are a news teller. Always include this exact warning in the HTML description: "<p><i>This is AI generated content and may contain errors. Please verify the information before making any decisions.</i></p>"
    5. DO NOT use old topics (like NEET 2024). Verify the topic is from today or yesterday.

    You MUST output the result as a STRICT JSON object in the following format:
    {
        "title": "A catchy, SEO-friendly title",
        "introduction": "A compelling introduction (approx 100 words)",
        "description": "A detailed body of the blog post (minimum 400 words). Use HTML tags like <p>, <h2>, <ul>, <li> for formatting.",
        "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
        "category": "One of: Technology, Health, Education, Entertainment, Sports , News" ,
        "author": "AIZENX AI",
        "image_keyword": "A single English keyword to search for a relevant image"
    }
    Output ONLY the raw JSON string. Do not include markdown formatting like \`\`\`json.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Cleanup JSON markdown if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Error generating content with Gemini:", error);
        return null;
    }
}

async function runAutoBlogWorkflow() {
    if (!AUTO_BLOG_ENABLED) {
        console.log("AutoBlog Service: Disabled via ENV.");
        return;
    }

    console.log("AutoBlog Service: Starting workflow (Gemini-only mode)...");

    const blogContent = await generateTrendAndBlog();

    if (!blogContent) {
        console.log("AutoBlog Service: Failed to generate content.");
        return;
    }

    console.log(`AutoBlog Service: generated topic: "${blogContent.title}"`);

    const imageKeyword = blogContent.image_keyword || 'news';
    // UPDATED: source.unsplash.com is legacy; used a more modern dynamic link
    const blogImage = `https://i.ibb.co/sdQhpxx6/compressed-85kb.png`;

    try {
        const newBlog = new Blog({
            userId: USER_ID,
            title: blogContent.title,
            image: blogImage,
            introduction: blogContent.introduction,
            description: blogContent.description,
            tags: blogContent.tags,
            author: blogContent.author,
            category: blogContent.category,
        });

        await newBlog.save();
        console.log(`AutoBlog Service: Successfully created blog "${newBlog.title}"`);

    } catch (error) {
        console.error("AutoBlog Service: Database save failed:", error);
    }
}

function startScheduler() {
    if (!AUTO_BLOG_ENABLED) {
        console.log("AutoBlog Service: Disabled. Scheduler will not start.");
        return;
    }

    console.log(`AutoBlog Service: Scheduler started. Running every ${INTERVAL_HOURS} hours.`);

    cron.schedule(`0 */${INTERVAL_HOURS} * * *`, () => {
        runAutoBlogWorkflow();
    });
}

module.exports = { startScheduler, runAutoBlogWorkflow };
