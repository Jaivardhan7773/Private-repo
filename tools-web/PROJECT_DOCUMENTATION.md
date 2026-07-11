# TrendingTopics Tools (tools-web) - Developer Documentation

**This document serves as the master guide and context handoff for any AI assistant or developer modifying this project.**

## 1. Project Overview
- **Name:** TrendingTopics Tools
- **Domain:** `tools.trendingtopics.space` (or equivalent subdomains like `photo.trendingtopics.space`)
- **Purpose:** A privacy-first, 100% free suite of browser-native online tools (image conversion, PDF manipulation, etc.).
- **Theme & UI:** The project exclusively uses a **Liquid Glass** aesthetic (glassmorphism). No dark mode, no flat generic colors. It utilizes heavy blurring, translucent white/purple/blue gradients (`var(--glass-white)`, `var(--glass-border)`), and `lucide-react` icons (NO emojis). 
- **Tech Stack:** Next.js 16 (App Router), React 18, Turbopack, standard Vanilla CSS (NO Tailwind).

## 2. Git & Repository Context
- **Repository:** `Jaivardhan7773/Private-repo`
- **Branch:** `feature/tools-web-release`
- **Project Directory:** `tools-web/` (resides alongside the main frontend/backend folders of the repository).

## 3. Architecture & Routing
- **Layouts (`app/layout.tsx`):** Contains the root global layout, SEO metadata (Title, OpenGraph, Keywords, Robots, JSON-LD schema), and wrapping `<Header />` & `<Footer />`.
- **Homepage (`app/page.tsx`):** Renders the hero section and the grid of all 22 tools. Uses **client-side hash routing** (e.g. `/#image`, `/#pdf`) to filter tools instantly. 
- **Tool Pages (`app/tools/[tool-name]/page.tsx`):** Each tool has its own dedicated directory and route to ensure perfect SEO indexing. 
- **Components (`components/layout/`):** Contains the global `Header.tsx` and `Footer.tsx`.

## 4. How the Tools Work
**CRITICAL RULE:** Almost all tools operate entirely **Client-Side in the Browser**. Files are NEVER uploaded to a server for privacy reasons, except for one specific exception.
- **Image Tools:** Use Canvas API and browser-native capabilities to compress and convert images.
- **PDF Tools (Merger/Splitter/Images):** Use `pdf-lib` and `pdfjs-dist` to process PDFs locally. `@dnd-kit` is used for drag-and-drop ordering (e.g. in PDF Merger).
- **Zip Maker:** Uses `jszip` locally.
- **API Exceptions:** `PDF to DOCX` uses a backend API route (`app/api/convert/pdf-to-docx/route.ts`) because client-side PDF-to-Word generation is practically impossible to do cleanly. This API has a strict `50MB` limit configuration.
- **Contact Form:** The contact form POSTs to `app/api/contact/route.ts`. 

## 5. UI Guidelines for Agents
If you are an AI tasked with adding a new tool or modifying this project, adhere strictly to these rules:
1. **Never use Tailwind.** All CSS goes into `app/globals.css`. 
2. **Always use `.tool-page` and `.glass-card`.** The global CSS provides classes like `.tool-page__header`, `.tool-page__icon`, and `.tool-layout-grid`. Reuse these structures perfectly. Do not invent new layout schemas unless necessary.
3. **Use Lucide-React.** Do not use Emojis for icons. Always import from `lucide-react` and match the stroke/color aesthetics.
4. **No Server Side Rendering for tool logic:** Since tools require browser APIs like `FileReader` or `Canvas`, ensure tool components start with `"use client";`.
5. **SEO First:** Every new tool MUST be added to `app/sitemap.ts` and MUST have a rich exported `metadata` object in its respective `page.tsx` file.

## 6. Favicon & Branding
The logo is located at `app/icon.png` (which overrides Next.js defaults) and `public/logo.png`. The Header specifically loads `public/logo.png` via a native `<img>` tag to guarantee correct rendering.
