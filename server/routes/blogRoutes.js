const express = require("express");
const Blog = require("../models/blog");
const editorMiddleware = require("../middleware/EditorMiddleware")
const router = express.Router();
const upload = require("../multerConfig");
const { authMiddleware, eeditorMiddleware } = require("../middleware/useAuthStore");




router.post("/addBlog", authMiddleware, eeditorMiddleware, async (req, res) => {
  try {
    let { userId, title, image, introduction, description, tags, author, category } = req.body;

    if (!userId || !title || !image || !introduction || !description || !tags.length || !author || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }
    tags = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim());

    const allowedCategories = ["Technology", "Health", "Education", "Entertainment", "Sports"];


    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: `Invalid category. Choose from: ${allowedCategories.join(", ")}` });
    }

    const newBlog = new Blog({ userId, title, image, introduction, description, tags, author, category });
    await newBlog.save();
    res.status(201).json({ message: "Blog posted successfully", blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/upload/blogImage", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    res.status(200).json({ message: "Image uploaded successfully", imageUrl: req.file.path });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
});

router.get("/userBlogs/:userId", authMiddleware, eeditorMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error what the hell" });
  }
});

router.get("/allBlogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});


router.get("/totalblogs", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", category = "" } = req.query;
    const filter = {};
    if (search) {
      const words = search.trim().split(/\s+/); // split on spaces
      filter.$and = words.map((word) => ({
        $or: [
          { title: { $regex: word, $options: "i" } },
          { description: { $regex: word, $options: "i" } },
          { tags: { $regex: word, $options: "i" } },
          { author: { $regex: word, $options: "i" } }
        ]
      }));
    }


    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});




router.get("/gethomeblogs", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8; // default limit 8
    const page = parseInt(req.query.page) || 1;   // default page 1
    const skip = (page - 1) * limit;
    const blogs = await Blog.find({}).skip(skip).limit(limit).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});



router.get("/blog/:slug", async (req, res) => {
  try {
    // console.log("Fetching blog with slug:", req.params.slug);
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      // console.log("Blog not found for slug:", req.params.slug);
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    res.status(500).json({ message: "Server error" });
  }
});





router.put("/updateBlog/:blogId", authMiddleware, eeditorMiddleware, async (req, res) => {
  try {
    const { title, image, description, tags, author, introduction, category } = req.body;

    const allowedCategories = ["Technology", "Health", "Finance", "Education", "Entertainment"];
    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category selected." });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      { title, image, description, tags, introduction, author, category },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });

  } catch (error) {
    res.status(500).json({ message: "Failed to update blog", error });
  }
});


router.delete("/deleteBlog/:blogId", authMiddleware, eeditorMiddleware, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog", error });
  }
});

module.exports = router;
