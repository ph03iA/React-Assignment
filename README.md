# Lumina Learning Platform

A client-side course learning platform built with React, Vite, and Tailwind CSS.

## Overview

Lumina Learning is a distraction-free environment for technical education. It reads course data from JSON files, renders Markdown content, and allows users to track their learning progress using browser storage.

**What it does:**
- Browse and filter courses by difficulty
- Read lessons with clean Markdown rendering
- Track progress (saved in browser)
- Works on mobile and desktop

## Architecture Summary

This is a single-page application (SPA) that runs entirely in the browser.

### Folder Structure

```
lumina-learning/
├── components/           # Reusable UI components
│   ├── Sidebar.jsx       # Course navigation sidebar
│   └── MarkdownRenderer.jsx  # Custom markdown styling
├── pages/                # Page-level components
│   ├── CourseList.jsx    # Homepage with course grid
│   ├── CourseViewer.jsx  # Lesson reader with sidebar
│   ├── AdminDashboard.jsx # User management view
│   └── CreateCourse.jsx  # Course creation form
├── services/             # Business logic
│   └── storage.js        # localStorage read/write
├── data/                 # JSON data files
│   ├── courses.json      # Course content
│   └── users.json        # User data
├── App.jsx               # Main app with routing
├── index.jsx             # React entry point
└── index.css             # Global styles
```

### Key Components

| Component | Purpose | State |
|-----------|---------|-------|
| CourseList | Displays all courses | courses, search, filterDifficulty |
| CourseViewer | Renders lessons | course, completedSubtopics, isSidebarOpen |
| Sidebar | Course navigation | expandedTopics, search |
| AdminDashboard | Shows users | search |
| storage.js | Data persistence | Reads/writes to localStorage |

### State Management

- **Local State**: useState for component-specific data (search, filters, UI toggles)
- **Derived State**: useMemo for calculations (progress percentage, next/prev lesson)
- **Persistence**: localStorage via services/storage.js

### Routes

| Path | Page |
|------|------|
| / | Course list |
| /course/:courseId | Course viewer |
| /course/:courseId/topic/:topicId/sub/:subtopicId | Specific lesson |
| /admin | Admin dashboard |
| /create | Create course form |

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/lumina-learning.git
   cd lumina-learning
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

4. Build for production
   ```bash
   npm run build
   ```

5. Preview production build
   ```bash
   npm run preview
   ```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## Features Implemented

### Core Requirements

| Feature | Status |
|---------|--------|
| Course Explorer - Grid layout with search and difficulty filtering | Done |
| Course Viewer - Sidebar navigation (Course > Topic > Subtopic) | Done |
| Markdown Renderer - Rich text, lists, code blocks | Done |
| Admin Dashboard - Read-only user list with search | Done |
| Breadcrumbs - Library > Course > Topic > Subtopic | Done |
| Accessibility - ARIA labels, semantic HTML, keyboard nav | Done |
| Responsive Design - Works on mobile and desktop | Done |
| Empty States - Shows message when no results | Done |

### Nice-to-Haves (Bonus Features)

| Feature | Status |
|---------|--------|
| Progress Tracking - Mark lessons complete, saved to browser | Done |
| Progress Bar - Shows percentage in header | Done |
| Course Mastered - Badge at 100% completion | Done |
| Next/Prev Navigation - Move between lessons easily | Done |
| Sidebar Auto-Expand - Opens current topic automatically | Done |
| Mac-Style Code Blocks - Terminal-like code display | Done |
| Create Course Form - Add new courses (client-side) | Done |
| Mobile Sidebar - Slide-in drawer on small screens | Done |
| Animations - Smooth transitions and hover effects | Done |

## Known Issues and Improvements

### Current Limitations

1. **Data Persistence**
   - Uses localStorage (browser only)
   - Clearing browser data loses progress
   - Fix: Add a real database like Supabase or Firebase

2. **Search Performance**
   - Filters arrays in memory
   - Works fine for small datasets
   - Fix: Server-side search for large data

3. **Image Optimization**
   - Images are loaded directly from URLs
   - No lazy loading
   - Fix: Use image optimization tools

4. **No Authentication**
   - Everyone sees the same data
   - No personal accounts
   - Fix: Add user login system

5. **No Syntax Highlighting**
   - Code blocks are styled but not color-coded
   - Fix: Add Prism.js or highlight.js

### Future Improvements

- Video lesson support
- Quiz system
- User authentication
- Real database
- Bookmarking courses
- Dark/light theme toggle

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| React Router | Navigation |
| react-markdown | Markdown rendering |
| Lucide React | Icons |
| localStorage | Data persistence |
