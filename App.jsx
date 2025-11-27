import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CourseList } from './pages/CourseList';
import { CourseViewer } from './pages/CourseViewer';
import { AdminDashboard } from './pages/AdminDashboard';
import { CreateCourse } from './pages/CreateCourse';
import { PlusCircle, Shield, Compass } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isCourseView = location.pathname.startsWith('/course/');
  const isCreateView = location.pathname === '/create';

  if (isCourseView || isCreateView) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav className="glass-panel pointer-events-auto px-2 py-2 rounded-full flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        
        <Link to="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.05] transition-colors mr-2 group">
           <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-sky-500 group-hover:rotate-90 transition-transform duration-500" />
        </Link>

        <NavLink to="/" active={isActive('/')} icon={<Compass size={16} />}>Explore</NavLink>
        <NavLink to="/create" active={isActive('/create')} icon={<PlusCircle size={16} />}>Create</NavLink>
        <NavLink to="/admin" active={isActive('/admin')} icon={<Shield size={16} />}>Admin</NavLink>
      </nav>
    </div>
  );
};

const NavLink = ({ to, active, icon, children }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
      active 
        ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
        : 'text-zinc-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen text-zinc-200 font-sans selection:bg-sky-500/30 selection:text-sky-200">
        <Navbar />
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/course/:courseId" element={<CourseViewer />} />
          <Route path="/course/:courseId/topic/:topicId/sub/:subtopicId" element={<CourseViewer />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/create" element={<CreateCourse />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;

