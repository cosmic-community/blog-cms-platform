# Blog CMS Platform

![App Preview](https://imgix.cosmicjs.com/9bdb2d40-6a91-11f0-a051-23c10f41277a-photo-1677442136019-21780ecad995-1753583405258.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, full-featured blog platform built with Next.js 15 and powered by Cosmic. This application showcases your blog posts, authors, and categories in a clean, professional design that's perfect for content creators, businesses, or personal blogs.

## Features

- 📝 **Dynamic Blog Posts** - Display all your blog content with rich formatting
- 👥 **Author Profiles** - Dedicated pages for each author with bio and social links
- 🏷️ **Category Organization** - Color-coded categories for easy content navigation
- ⭐ **Featured Posts** - Highlight important content with featured post sections
- 📱 **Responsive Design** - Perfect experience across all devices
- 🚀 **SEO Optimized** - Built-in meta tags and structured data
- 🎨 **Modern UI** - Clean, professional design with Tailwind CSS
- 🔗 **Social Integration** - Author social media links and sharing capabilities

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68858e9bee2d058c7a57c0ab&clone_repository=68859048ee2d058c7a57c0c5)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a blog with posts, authors, and categories

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: staging in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **Inter Font** - Modern typography

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Blog Posts
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with author and category relationships
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Single Post
```typescript
// Get specific post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'post-slug' })
  .depth(1)
```

### Querying by Category
```typescript
// Get posts in specific category
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId 
  })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket using the following object types:

- **Posts** (`posts`) - Blog articles with content, excerpts, featured images, authors, and categories
- **Authors** (`authors`) - Author profiles with bios, avatars, and social media links  
- **Categories** (`categories`) - Content categories with descriptions and color theming

The app uses Cosmic's object relationship features to connect posts with their authors and categories, providing a rich, interconnected content experience.

## Deployment Options

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Connect repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables

### Environment Variables

Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key  
- `COSMIC_WRITE_KEY` - Your Cosmic write key

<!-- README_END -->