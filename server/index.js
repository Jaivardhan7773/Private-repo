const express = require('express');
const app = express();
const mongoose = require('mongoose');
const slugify = require('slugify')
require("dotenv").config();
const Blog = require('./models/blog')
const cors = require("cors");
const auth = require("./routes/auth");
const login = require("./routes/login");
const getUserroutes = require("./routes/userData");
const blogRoutes = require("./routes/blogRoutes");
const carouselRoute = require("./routes/carousel")
const queryRoute = require('./routes/query');
const Request = require('./routes/requests');
const songlyrics = require('./routes/songlyrics');
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const PRERENDER_TOK = process.env.PRERENDER_TOKEN
const prerender = require('prerender-node');
const { startScheduler, runAutoBlogWorkflow } = require('./services/autoBlogService');


// Initialize Auto Blog Scheduler
startScheduler();

// Uncomment to manual run on start: runAutoBlogWorkflow();


const allowedOrigins = [
  "https://aizenx.netlify.app",
  "http://localhost:3000",
  "https://blogsgram.netlify.app",
  "http://localhost:8888",
  "https://x21fq02c-3000.inc1.devtunnels.ms",
];

app.get('/loaderio-52f6f0ddfe133259514acdfe601cf60c', (req, res) => {
  res.send('loaderio-52f6f0ddfe133259514acdfe601cf60c');
});

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
prerender.set('prerenderToken', PRERENDER_TOK);
app.use(prerender);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/", auth);
app.use("/", login);
app.use("/", getUserroutes);
app.use("/", blogRoutes);
app.use("/", carouselRoute);
app.use("/", queryRoute);
app.use("/", Request);
app.use("/", songlyrics)



app.get("/sitemap.xml", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 });

    let urls = `
      <url>
        <loc>http://localhost:5000/</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>http://localhost:5000/totalblogs</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1</priority>
      </url>
      <url>
        <loc>http://localhost:5000/vedio</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>
            <url>
        <loc>http://localhost:5000/aboutus</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1</priority>
      </url>
    `;

    blogs.forEach(blog => {
      const updatedAt = blog.updatedAt ? new Date(blog.updatedAt) : new Date();
      const lastmod = isNaN(updatedAt) ? new Date() : updatedAt;

      urls += `
    <url>
      <loc>http://localhost:5000/blog/${blog.slug}</loc>
      <lastmod>${lastmod.toISOString().split("T")[0]}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1</priority>
    </url>
  `;
    });


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
      </urlset>
    `;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Internal Server Error");
  }
});




app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow:\nSitemap: http://localhost:5000/sitemap.xml");
});

app.get("/", (req, res) => {
  res.json({ message: "For uptime robot " });
});

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((e) => console.log(e));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

