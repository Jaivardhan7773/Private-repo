const mongoose = require("mongoose");
const slugify = require("slugify");


const BlogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    introduction: { type: String, required: true, },
    description: { type: String, required: true, minlength: 300 },
    tags: { type: [String], required: true },
    author: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ["Technology", "Health", "Education", "Entertainment", "Sports", "News"]
    },
    slug: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },

});

BlogSchema.pre("validate", function (next) {
    if (this.isModified("title")) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

// Performance Indexes for 100k+ Concurrency
// 1. Text Index for ultra-fast full-text search on /totalblogs
BlogSchema.index({ title: 'text', description: 'text', tags: 'text', author: 'text' });

// 2. Compound Index for fast retrieval of user-specific blogs sorted by date
BlogSchema.index({ userId: 1, createdAt: -1 });

// 3. Index for latest blogs retrieval
BlogSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Blog", BlogSchema);
