import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../services/storage';
import { Difficulty } from '../types';
import { Search, BarChart, Book, ArrowRight, Sparkles, Filter, ChevronDown, Check } from 'lucide-react';

export const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("ALL");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.description.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = filterDifficulty === "ALL" || c.difficulty === filterDifficulty;
    return matchesSearch && matchesDiff;
  });

  const formatDifficulty = (diff) => {
    return diff.charAt(0) + diff.slice(1).toLowerCase();
  };

  return (
    <div className="relative min-h-screen">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-20">
        
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-28 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md text-zinc-300 text-[11px] font-bold tracking-widest uppercase mb-8 shadow-2xl">
            <Sparkles size={12} className="text-sky-400" aria-hidden="true" />
            <span>Next Gen Learning</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9] text-glow select-none">
            Evolve Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
              Tech Stack.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light px-4">
            Premium courses designed for clarity. No fluff, just 
            <span className="text-zinc-200 font-medium"> deep technical dives</span> in a distraction-free environment.
          </p>
        </div>

        {/* Controls */}
        <div className="sticky top-24 z-30 mb-10 md:mb-16 max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-panel p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl backdrop-blur-xl">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-sky-400 transition-colors" size={18} aria-hidden="true" />
              <input 
                type="text"
                aria-label="Search courses"
                placeholder="Search for courses, skills, or topics..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-black/40 border border-transparent focus:border-white/10 rounded-xl pl-12 pr-4 py-3 text-zinc-200 focus:outline-none transition-all placeholder:text-zinc-600 font-medium"
              />
            </div>
            
            <div className="relative min-w-[220px]">
               {/* Trigger Button */}
               <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  aria-label="Filter by difficulty"
                  className={`w-full h-full flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.05] border border-transparent hover:border-white/10 rounded-xl px-4 py-3 text-zinc-300 transition-all font-medium group ${isDropdownOpen ? 'bg-black/40 border-white/10' : ''}`}
               >
                   <div className="flex items-center gap-3">
                      <Filter size={16} className={`text-zinc-500 group-hover:text-sky-400 transition-colors ${isDropdownOpen ? 'text-sky-400' : ''}`} aria-hidden="true" />
                      <span className="text-sm">{filterDifficulty === "ALL" ? "All Levels" : formatDifficulty(filterDifficulty)}</span>
                   </div>
                   <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-white' : 'group-hover:text-zinc-300'}`} aria-hidden="true" />
               </button>
               
               {/* Backdrop for click-outside */}
               {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} aria-hidden="true" />}
               
               {/* Custom Dropdown Menu */}
               <div 
                 role="listbox"
                 className={`absolute top-full right-0 left-0 mt-2 p-1.5 bg-[#0c0c0e]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] z-50 transform transition-all duration-200 origin-top ${isDropdownOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
               >
                   <button
                       role="option"
                       aria-selected={filterDifficulty === "ALL"}
                       onClick={() => { setFilterDifficulty("ALL"); setIsDropdownOpen(false); }}
                       className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${filterDifficulty === "ALL" ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
                   >
                       <span>All Levels</span>
                       {filterDifficulty === "ALL" && <Check size={14} className="text-sky-400" aria-hidden="true" />}
                   </button>
                   {Object.values(Difficulty).map(d => (
                       <button
                           key={d}
                           role="option"
                           aria-selected={filterDifficulty === d}
                           onClick={() => { setFilterDifficulty(d); setIsDropdownOpen(false); }}
                           className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${filterDifficulty === d ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
                       >
                           <span>{formatDifficulty(d)}</span>
                           {filterDifficulty === d && <Check size={14} className="text-sky-400" aria-hidden="true" />}
                       </button>
                   ))}
               </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {filteredCourses.map(course => (
            <Link 
              key={course.id} 
              to={`/course/${course.id}`}
              className="group relative flex flex-col bg-[#0c0c0e] border border-white/[0.05] rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] hover:border-white/[0.1]"
              aria-label={`View course: ${course.title}`}
            >
              {/* Image */}
              <div className="relative h-32 md:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent z-10" />
                <img 
                  src={course.coverImageUrl} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                />
                
                {/* Floating Badges */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 flex gap-2">
                   <div className="glass-panel px-2 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        course.difficulty === 'BEGINNER' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' :
                        course.difficulty === 'INTERMEDIATE' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' :
                        'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.5)]'
                      }`} />
                      <span className="text-[8px] md:text-[10px] font-bold tracking-wider text-zinc-200">
                        {formatDifficulty(course.difficulty).toUpperCase()}
                      </span>
                   </div>
                </div>
              </div>
              
              <div className="p-4 md:p-7 flex-1 flex flex-col relative z-20">
                <h3 className="text-sm md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-sky-100 transition-colors leading-tight line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-zinc-500 text-[10px] md:text-sm mb-4 md:mb-8 line-clamp-2 leading-relaxed flex-1 font-light">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-white/[0.05]">
                  <div className="flex gap-2 md:gap-5">
                    <div className="flex flex-col">
                       <span className="text-[8px] md:text-[10px] uppercase text-zinc-600 font-bold tracking-wider mb-0.5">Modules</span>
                       <span className="text-xs md:text-sm font-medium text-zinc-300 flex items-center gap-1">
                         <Book size={12} className="text-zinc-500 md:w-[14px] md:h-[14px]" aria-hidden="true" /> {course.topics.length}
                       </span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] md:text-[10px] uppercase text-zinc-600 font-bold tracking-wider mb-0.5">Lessons</span>
                       <span className="text-xs md:text-sm font-medium text-zinc-300 flex items-center gap-1">
                         <BarChart size={12} className="text-zinc-500 md:w-[14px] md:h-[14px]" aria-hidden="true" /> {course.topics.reduce((acc, t) => acc + t.subtopics.length, 0)}
                       </span>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300 shadow-lg">
                    <ArrowRight size={14} className="md:w-4 md:h-4" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
           <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
              <Sparkles className="text-zinc-500 mb-4" size={48} aria-hidden="true" />
              <h3 className="text-xl text-zinc-300 font-medium tracking-tight">No courses found</h3>
              <p className="text-zinc-600 mt-2">Try adjusting your filters.</p>
           </div>
        )}
      </div>
    </div>
  );
};

