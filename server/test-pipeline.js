/**
 * test-pipeline.js
 * Run with: node server/test-pipeline.js
 * Tests: Trend scraping → Image fetch → Cloudinary upload → Gemini generation
 * Does NOT write to MongoDB (dry run).
 */

require('dotenv').config();
const { getTopTrends, getTopicCoverImage } = require('./services/trendsScraper');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function dryRun() {
    console.log('\n════════════════════════════════════════════');
    console.log('  AutoBlog Pipeline Dry Run');
    console.log('════════════════════════════════════════════\n');

    // ── Step 1: Trends ────────────────────────────────────────────
    console.log('STEP 1: Fetching trending topics from Google Trends...');
    const trends = await getTopTrends({ top: 5, minVolume: 10000 });
    if (!trends.length) { console.error('❌ No trends returned!'); return; }

    console.log(`✅ Got ${trends.length} trends:`);
    trends.forEach((t, i) => {
        console.log(`  ${i + 1}. "${t.title}" — ${t.searchVolume?.toLocaleString()} searches, hasImage: ${!!t.picture}`);
    });

    const trend = trends[0];
    console.log('\nSelected:', JSON.stringify({ title: trend.title, volume: trend.searchVolume, queries: trend.relatedQueries?.slice(0,5) }, null, 2));

    // ── Step 2: Image ─────────────────────────────────────────────
    console.log('\nSTEP 2: Fetching & uploading cover image...');
    const imageUrl = await getTopicCoverImage(trend);
    console.log(`✅ Final cover image URL:\n  ${imageUrl}`);

    // ── Step 3: Gemini (abbreviated, 100 word limit for dry run) ──
    console.log('\nSTEP 3: Testing Gemini generation (short dry run)...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash', tools: [{ googleSearch: {} }] });
    const result = await model.generateContent(
        `Give me a 1-sentence factual summary of what "${trend.title}" is about right now. Use Google Search.`
    );
    console.log(`✅ Gemini says:\n  "${result.response.text().trim().slice(0, 300)}"`);

    console.log('\n════════════════════════════════════════════');
    console.log('  ✅ All pipeline checks passed. Ready for production.');
    console.log('════════════════════════════════════════════\n');
}

dryRun().catch(err => {
    console.error('\n❌ Pipeline test failed:', err.message);
    process.exit(1);
});
