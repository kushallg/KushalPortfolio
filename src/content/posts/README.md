# How to Add a New Blog Post

## Simple 3-Step Process

### 1. Create a new `.md` file in this directory

```bash
src/content/posts/your-post-slug.md
```

### 2. Add frontmatter at the top

```markdown
---
title: Your Post Title
date: 2026-02-09
slug: your-post-slug
---
```

### 3. Write your content in Markdown

```markdown
Your introduction paragraph goes here.

## Main Heading

Your content with **bold**, *italic*, `code`, and more!

- List item 1
- List item 2

> A blockquote

[A link](https://example.com)
```

## Example Post

```markdown
---
title: My Awesome Blog Post
date: 2026-02-09
slug: my-awesome-blog-post
---

This is the introduction to my blog post.

## First Section

Here's some content with **bold text** and *italic text*.

- Point one
- Point two
- Point three

> "A great quote goes here"

## Second Section

You can add `inline code` or even code blocks.

More content here...
```

## Markdown Cheatsheet

- `**bold**` → **bold**
- `*italic*` → *italic*
- `` `code` `` → `code`
- `> quote` → blockquote
- `- item` → bullet list
- `## Heading` → heading
- `[text](url)` → link
- `---` → horizontal divider

## That's It!

The post will automatically:
- Show up on the `/writing` page
- Be sorted by date
- Have its own page at `/writing/your-post-slug`
- Render with the brutalist design

No need to update any other files!
