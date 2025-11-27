# Lumina Learning Platform

A premium, client-side course learning platform built with React, Vite, and Tailwind CSS. This project focuses on a "Cinematic Glass" aesthetic, robust progress tracking, and accessible navigation.

## 🧭 Overview

Lumina Learning is designed to be a distraction-free environment for technical education. It reads course data from a JSON structure, renders complex Markdown content, and allows users to track their learning progress locally. It includes a responsive player, a course discovery feed, and an admin dashboard.

## 🏗 Architecture Summary

The application follows a **Client-Side SPA** architecture:

*   **State Management**: 
    *   **Application State**: Managed via React Context and local component state (`useState`, `useMemo`).
    *   **Persistence**: The `storage.ts` service acts as a lightweight ORM, reading/writing to `localStorage` to persist course progress and draft courses.
*   **Routing**: `react-router-dom` handles client-side routing, supporting deep links to specific subtopics (`/course/:id/topic/:id/sub/:id`).
*   **Rendering**: A custom `MarkdownRenderer` component parses text content, applying specific Tailwind classes to map HTML elements to the app's design system (e.g., custom "Terminal" style code blocks).

## 🏃‍♂️ Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🚀 Features Implemented

### Core Requirements
- [x] **Course Explorer**: Grid layout with search, difficulty filtering, and aesthetic hover effects.
- [x] **Course Player**: Sidebar navigation (Course → Topic → Subtopic) with mobile drawer support.
- [x] **Markdown Engine**: Renders rich text, lists, and code blocks with syntax highlighting.
- [x] **Admin Dashboard**: Read-only view of users with search functionality and mobile-responsive layout.
- [x] **Breadcrumbs**: Full hierarchical navigation (Library → Course → Topic → Subtopic).
- [x] **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support.

### 🌟 Nice-to-Haves (Implemented)
- [x] **Progress Tracking**: 
    - Persists completion state to `localStorage`.
    - Visual progress bars on cards and sticky headers.
    - "Course Mastered" badges upon 100% completion.
- [x] **Smart Navigation**: 
    - "Next Lesson" / "Previous Lesson" logic that traverses across topics.
    - Auto-expands sidebar accordions based on current route.
- [x] **Markdown Extras**: 
    - Custom "Mac-style" terminal windows for code blocks.
    - Styled blockquotes and callouts.
- [x] **Create Course (Bonus)**: 
    - Client-side form to draft new courses.
    - Dynamic inputs for course metadata.

## ⚠️ Known Issues & Improvements

1.  **Data Persistence**: Since this is a client-only app using `localStorage`, clearing browser cache will lose user progress and created courses. A real backend (Supabase/Firebase) would be the next step.
2.  **Search Performance**: The current search filters in-memory arrays. For large datasets, this should be moved to a web worker or server-side search.
3.  **Image Optimization**: Course images are currently direct URLs. Implementing an image optimization pipeline (or using Next.js Image) would improve LCP scores.
