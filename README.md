# Lumina Learning Platform

A premium, client-side course learning platform built with React, Vite, and Tailwind CSS. This project focuses on a modern dark aesthetic, robust progress tracking, and accessible navigation.

## 🧭 Overview

Lumina Learning is designed to be a distraction-free environment for technical education. It reads course data from a JSON structure, renders complex Markdown content, and allows users to track their learning progress locally. It includes a responsive course viewer, a course discovery feed, and an admin dashboard.

**Key Highlights:**
- 📚 Browse and filter courses by difficulty
- 📖 Read lessons with beautiful Markdown rendering
- ✅ Track progress with localStorage persistence
- 📱 Fully responsive (mobile + desktop)
- ♿ Accessible with ARIA labels and keyboard navigation

## 🏗 Architecture Summary

The application follows a **Client-Side SPA** architecture:

```
📂 lumina-learning/
├── 📂 components/        # Reusable UI components
│   ├── Sidebar.jsx       # Course navigation sidebar
│   └── MarkdownRenderer.jsx  # Custom markdown styling
├── 📂 pages/             # Page-level components
│   ├── CourseList.jsx    # Homepage with course grid
│   ├── CourseViewer.jsx  # Lesson reader with sidebar
│   ├── AdminDashboard.jsx # User management view
│   └── CreateCourse.jsx  # Course creation form
├── 📂 services/          # Business logic
│   └── storage.js        # localStorage read/write
├── 📂 data/              # JSON data files
│   ├── courses.json      # Course content
│   └── users.json        # User data
├── App.jsx               # Main app with routing
├── index.jsx             # React entry point
└── index.css             # Global styles + Tailwind
```

### Key Components & State

| Component | Purpose | State Managed |
|-----------|---------|---------------|
| `CourseList` | Displays all courses | `courses`, `search`, `filterDifficulty` |
| `CourseViewer` | Renders lessons | `course`, `completedSubtopics`, `isSidebarOpen` |
| `Sidebar` | Course navigation | `expandedTopics`, `search` |
| `AdminDashboard` | Shows users | `search` |
| `storage.js` | Data persistence | Reads/writes to `localStorage` |

### State Management
- **Local State**: `useState` for component-specific data (search, filters, UI toggles)
- **Derived State**: `useMemo` for expensive calculations (progress percentage, next/prev lesson)
- **Persistence**: `localStorage` via `services/storage.js` for courses and progress

### Routing
`react-router-dom` with `HashRouter` handles navigation:
- `/` → Course list
- `/course/:courseId` → Course viewer (auto-redirects to first lesson)
- `/course/:courseId/topic/:topicId/sub/:subtopicId` → Specific lesson
- `/admin` → Admin dashboard
- `/create` → Create course form

## 🏃‍♂️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/lumina-learning.git
   cd lumina-learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Deployment (Vercel)
```bash
npm install -g vercel
vercel
```

## 🚀 Features Implemented

### ✅ Core Requirements

| Feature | Description | Status |
|---------|-------------|--------|
| **Course Explorer** | Grid layout with search and difficulty filtering | ✅ Done |
| **Course Viewer** | Sidebar navigation (Course → Topic → Subtopic) | ✅ Done |
| **Markdown Renderer** | Rich text, lists, code blocks with styling | ✅ Done |
| **Admin Dashboard** | Read-only user list with search | ✅ Done |
| **Breadcrumbs** | Library → Course → Topic → Subtopic navigation | ✅ Done |
| **Accessibility** | ARIA labels, semantic HTML, keyboard nav | ✅ Done |
| **Responsive Design** | Mobile-first with Tailwind CSS | ✅ Done |
| **Empty States** | Graceful "No results" messages | ✅ Done |

### 🌟 Nice-to-Haves (Implemented)

| Feature | Description | Status |
|---------|-------------|--------|
| **Progress Tracking** | Mark lessons complete, persists to localStorage | ✅ Done |
| **Progress Bar** | Visual percentage in sticky header | ✅ Done |
| **Course Mastered** | Trophy badge at 100% completion | ✅ Done |
| **Next/Prev Navigation** | Smart traversal across topics | ✅ Done |
| **Sidebar Auto-Expand** | Opens current topic automatically | ✅ Done |
| **Mac-Style Code Blocks** | Terminal-like code display | ✅ Done |
| **Create Course Form** | Client-side course drafting | ✅ Done |
| **Mobile Sidebar Drawer** | Slide-in navigation on mobile | ✅ Done |
| **Animations** | Fade-up, transitions, hover effects | ✅ Done |

## ⚠️ Known Issues & Improvements

### Current Limitations

1. **Data Persistence**
   - Uses `localStorage` (client-side only)
   - Clearing browser cache loses all progress
   - **Improvement**: Add Supabase/Firebase backend

2. **Search Performance**
   - Filters in-memory arrays
   - Fine for small datasets, not scalable
   - **Improvement**: Server-side search or Web Worker

3. **Image Optimization**
   - Course images are direct URLs
   - No lazy loading or optimization
   - **Improvement**: Use Next.js Image or similar

4. **No Authentication**
   - All users see same data
   - No personalized progress
   - **Improvement**: Add user auth system

5. **No Syntax Highlighting**
   - Code blocks are styled but not highlighted
   - **Improvement**: Add Prism.js or highlight.js

### Future Enhancements
- [ ] Video lesson support
- [ ] Quiz/assessment system
- [ ] User authentication
- [ ] Real database integration
- [ ] Course bookmarking
- [ ] Dark/light theme toggle

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| React Router | Navigation |
| react-markdown | Markdown rendering |
| Lucide React | Icons |
| localStorage | Data persistence |


