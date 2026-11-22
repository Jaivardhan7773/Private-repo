/**
 * trendsScraper.js
 * ─────────────────────────────────────────────────────────────────────
 * Fetches real-time trending topics from Google Trends (no API key).
 *
 * Two sources, both free, used together:
 *   1. Google Trends RSS  → up to 10 topics with pre-fetched news thumbnails
 *   2. Google Trends HTML → full ranked list sorted by search volume
 *
 * Exported:
 *   getTopTrends(options) → Array<TrendItem>
 *   getTopicCoverImage(trendItem) → imageUrl string (Cloudinary-hosted)
 */

const cloudinary = require('../cloudinaryConfig');

// RSS supports a count param — fetch 50 to maximise thumbnail coverage
const RSS_URL   = 'https://trends.google.com/trending/rss?geo=IN&cnt=50';
const HTML_URL  = 'https://trends.google.com/trending?geo=IN';
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

// ─── Helpers ─────────────────────────────────────────────────────────

function xmlText(xml, tag) {
    const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
    return m ? m[1].replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim() : null;
}

async function fetchText(url) {
    const res = await fetch(url, {
        headers: {
            'User-Agent': BROWSER_UA,
            'Accept-Language': 'en-US,en;q=0.9',
        }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.text();
}

// ─── Source 1: RSS (gives thumbnails, top ~10 results) ───────────────

async function fetchTrendsRSS() {
    const xml = await fetchText(RSS_URL);
    const rawItems = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
    return rawItems.map(item => ({
        title:         xmlText(item, 'title'),
        traffic:       xmlText(item, 'ht:approx_traffic'),          // "500K+" | "10K+"
        picture:       xmlText(item, 'ht:picture'),                  // Google-cached image URL
        pictureSource: xmlText(item, 'ht:picture_source'),
        newsTitle:     xmlText(item, 'ht:news_item_title'),
        newsUrl:       xmlText(item, 'ht:news_item_url'),
    })).filter(t => t.title);
}

// ─── Source 2: HTML (ranked list, full volume numbers) ────────────────

async function fetchTrendsHTML() {
    const html = await fetchText(HTML_URL);
    const regex = /AF_initDataCallback\s*\(\s*\{[\s\S]*?data:([\s\S]*?),\s*sideChannel/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
        try {
            const data = JSON.parse(match[1].trim());
            if (Array.isArray(data) && Array.isArray(data[1])) {
                return data[1].map(t => ({
                    title:          t[0],
                    searchVolume:   t[6] || 0,     // raw number e.g. 500000
                    growthPct:      t[8] || 0,     // e.g. 1000
                    relatedQueries: (t[9] || []).slice(0, 10),
                }));
            }
        } catch (_) {}
    }
    return [];
}

// ─── Merge & Rank ─────────────────────────────────────────────────────

/**
 * @param {object} opts
 * @param {number} opts.top          - How many top trends to return (default 10)
 * @param {number} opts.minVolume    - Minimum search volume to include (default 10000)
 * @param {string[]} opts.skipTitles - Already-written blog titles (lowercase) to deduplicate
 * @returns {Promise<Array>}
 */
async function getTopTrends({ top = 10, minVolume = 10000, skipTitles = [] } = {}) {
    const [rssItems, htmlItems] = await Promise.all([fetchTrendsRSS(), fetchTrendsHTML()]);

    // Build lookup map from HTML (has real volume numbers)
    const volumeMap = {};
    for (const h of htmlItems) {
        volumeMap[h.title.toLowerCase()] = h;
    }

    // Build lookup map from RSS (has thumbnail images)
    const rssMap = {};
    for (const r of rssItems) {
        if (r.title) rssMap[r.title.toLowerCase()] = r;
    }

    // Merge: start from HTML list (sorted by volume descending already)
    const merged = [];
    for (const h of htmlItems) {
        if (h.searchVolume < minVolume) continue;

        const key = h.title.toLowerCase();
        const isAlreadyWritten = skipTitles.some(s => s.includes(key) || key.includes(s));
        if (isAlreadyWritten) continue;

        // Skip non-English titles (Hindi/Kannada scripts)
        if (/[^\x00-\x7F\s-]/.test(h.title) && /[^\u0000-\u007F]/.test(h.title)) continue;

        const rss = rssMap[key] || {};
        merged.push({
            title:          h.title,
            searchVolume:   h.searchVolume,
            growthPct:      h.growthPct,
            relatedQueries: h.relatedQueries,
            picture:        rss.picture        || null,
            pictureSource:  rss.pictureSource  || null,
            newsTitle:      rss.newsTitle       || null,
            newsUrl:        rss.newsUrl         || null,
        });

        if (merged.length >= top) break;
    }

    console.log(`TrendsScraper: Got ${merged.length} trends (top ${top}, minVolume ${minVolume})`);
    return merged;
}

// ─── Cover Image Pipeline ─────────────────────────────────────────────

/**
 * Fetch a news thumbnail for a topic from Google News RSS.
 * Returns null if none found.
 */
async function fetchNewsImage(topicTitle) {
    try {
        const q = encodeURIComponent(topicTitle);
        const url = `https://news.google.com/rss/search?q=${q}&hl=en-IN&gl=IN&ceid=IN:en`;
        const xml = await fetchText(url);
        // Google News RSS doesn't always embed images, but sometimes has media:content
        const mediaUrl = xml.match(/<media:content[^>]+url="([^"]+)"/)?.[1];
        if (mediaUrl) return mediaUrl;
        // Also try og: or enclosure
        const enclosure = xml.match(/<enclosure[^>]+url="([^"]+)"/)?.[1];
        return enclosure || null;
    } catch (_) {
        return null;
    }
}

/**
 * Multi-tier image strategy:
 *   Tier 1  → Google Trends RSS thumbnail (real news photo, 100% relevant)
 *   Tier 2  → Google News RSS media thumbnail (also real news photo)
 *   Tier 3  → Pollinations.ai Flux (free AI image generation, no key)
 *   Fallback → Unsplash editorial photo
 *
 * Always uploads to Cloudinary so the URL never rots.
 */
async function getTopicCoverImage(trend) {
    let imageUrl = null;

    // ── Tier 1: Real news thumbnail from Google Trends RSS ──────────
    if (trend.picture) {
        try {
            // Verify the image is reachable
            const probe = await fetch(trend.picture, { method: 'HEAD' });
            if (probe.ok && probe.headers.get('content-type')?.startsWith('image/')) {
                imageUrl = trend.picture;
                console.log(`TrendsScraper: Tier-1 image from ${trend.pictureSource || 'Google Trends'}`);
            }
        } catch (_) {
            console.log('TrendsScraper: Tier-1 failed, trying Tier-2');
        }
    }

    // ── Tier 2: Google News RSS media thumbnail ──────────────────────
    if (!imageUrl) {
        console.log('TrendsScraper: Tier-1 miss, trying Google News RSS thumbnail...');
        const newsImage = await fetchNewsImage(trend.title);
        if (newsImage) {
            try {
                const probe = await fetch(newsImage, { method: 'HEAD' });
                if (probe.ok && probe.headers.get('content-type')?.startsWith('image/')) {
                    imageUrl = newsImage;
                    console.log('TrendsScraper: Tier-2 image from Google News RSS');
                }
            } catch (_) {}
        }
    }

    // ── Tier 3: Pollinations.ai (free Flux/SDXL model, no API key) ──
    if (!imageUrl) {
        console.log('TrendsScraper: Tier-2 miss, trying Pollinations.ai...');
        try {
            const prompt = encodeURIComponent(
                `${trend.title}, professional news photography, editorial style, sharp focus, high quality`
            );
            const pollinationsUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1200&height=630&nologo=true&model=flux`;
            // Probe first to avoid uploading a timeout/error page
            const probe = await fetch(pollinationsUrl, { signal: AbortSignal.timeout(20000) });
            if (probe.ok && probe.headers.get('content-type')?.startsWith('image/')) {
                imageUrl = pollinationsUrl;
                console.log('TrendsScraper: Tier-3 image from Pollinations.ai (Flux)');
            }
        } catch (_) {
            console.log('TrendsScraper: Tier-3 failed, using fallback');
        }
    }

    if (!imageUrl) {
        console.log('TrendsScraper: All tiers failed, using static placeholder');
        return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop';
    }

    // ── Upload to Cloudinary (permanent CDN, no link rot) ───────────
    try {
        const topicSlug = trend.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 50);
        const uploaded = await cloudinary.uploader.upload(imageUrl, {
            folder:          'blog_covers',
            public_id:       `trend_${topicSlug}_${Date.now()}`,
            resource_type:   'image',
            overwrite:       false,
            transformation:  [{ width: 1200, height: 630, crop: 'fill', gravity: 'auto', quality: 'auto:good', fetch_format: 'auto' }],
        });
        console.log(`TrendsScraper: Uploaded to Cloudinary → ${uploaded.secure_url}`);
        return uploaded.secure_url;
    } catch (err) {
        console.error('TrendsScraper: Cloudinary upload failed, using raw URL:', err.message);
        return imageUrl;  // Return raw URL as last resort
    }
}

module.exports = { getTopTrends, getTopicCoverImage };
