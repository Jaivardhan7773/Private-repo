const Blog = require("./models/blog");
const slugify = require("slugify");

async function addSlugsToExistingBlogs() {
    const blogs = await Blog.find({ slug: { $exists: false }});
    for (const blog of blogs) {
        blog.slug = slugify(blog.title, { lower: true, strict: true });
        await blog.save();
    }
    console.log("Slugs added to existing blogs");
}

addSlugsToExistingBlogs().catch(console.error);