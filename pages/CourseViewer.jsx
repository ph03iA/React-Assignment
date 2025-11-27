import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourses, getProgress, toggleProgress } from '../services/storage';
import { Sidebar } from '../components/Sidebar';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { Check, Loader2, Trophy, Menu, ArrowRight, ChevronRight, Home, ArrowLeft } from 'lucide-react';

export const CourseViewer = () => {
  const { courseId, topicId, subtopicId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [completedSubtopics, setCompletedSubtopics] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Load courses
    const courses = getCourses();
    const found = courses.find(c => c.id === courseId);
    if (found) {
      setCourse(found);
    }
    // Load progress
    setCompletedSubtopics(getProgress());
  }, [courseId]);

  useEffect(() => {
    if (course && !topicId && !subtopicId) {
      const firstTopic = course.topics[0];
      const firstSub = firstTopic?.subtopics[0];
      if (firstTopic && firstSub) {
        navigate(`/course/${course.id}/topic/${firstTopic.id}/sub/${firstSub.id}`, { replace: true });
      }
    }
  }, [course, topicId, subtopicId, navigate]);

  const handleSubtopicSelect = (tId, sId) => {
    navigate(`/course/${courseId}/topic/${tId}/sub/${sId}`);
    setIsSidebarOpen(false); // Close sidebar on mobile selection
  };

  const handleToggleProgress = (sId) => {
    const newState = toggleProgress(sId);
    setCompletedSubtopics(newState);
  };

  const progressPercentage = useMemo(() => {
    if (!course) return 0;
    const totalSubtopics = course.topics.reduce((acc, t) => acc + t.subtopics.length, 0);
    
    // Filter keys that are both true (completed) AND belong to this course
    const completedCount = Object.keys(completedSubtopics).filter(k => {
      // Must be explicitly true
      if (!completedSubtopics[k]) return false;
      
      // Ensure the key actually belongs to this course
      return course.topics.some(t => t.subtopics.some(s => s.id === k));
    }).length;
    
    return totalSubtopics === 0 ? 0 : Math.round((completedCount / totalSubtopics) * 100);
  }, [course, completedSubtopics]);

  // Calculate next lesson
  const nextLesson = useMemo(() => {
    if (!course || !topicId || !subtopicId) return null;
    
    const currentTopicIndex = course.topics.findIndex(t => t.id === topicId);
    if (currentTopicIndex === -1) return null;
    
    const currentTopic = course.topics[currentTopicIndex];
    const currentSubtopicIndex = currentTopic.subtopics.findIndex(s => s.id === subtopicId);
    if (currentSubtopicIndex === -1) return null;

    // 1. Check for next subtopic in current topic
    if (currentSubtopicIndex < currentTopic.subtopics.length - 1) {
      return {
        topicId: currentTopic.id,
        subtopic: currentTopic.subtopics[currentSubtopicIndex + 1]
      };
    }

    // 2. Check for first subtopic in next topic
    if (currentTopicIndex < course.topics.length - 1) {
      const nextTopic = course.topics[currentTopicIndex + 1];
      if (nextTopic.subtopics.length > 0) {
        return {
          topicId: nextTopic.id,
          subtopic: nextTopic.subtopics[0]
        };
      }
    }

    return null;
  }, [course, topicId, subtopicId]);

  // Calculate previous lesson
  const previousLesson = useMemo(() => {
    if (!course || !topicId || !subtopicId) return null;

    const currentTopicIndex = course.topics.findIndex(t => t.id === topicId);
    if (currentTopicIndex === -1) return null;

    const currentTopic = course.topics[currentTopicIndex];
    const currentSubtopicIndex = currentTopic.subtopics.findIndex(s => s.id === subtopicId);
    if (currentSubtopicIndex === -1) return null;

    // 1. Check for prev subtopic in current topic
    if (currentSubtopicIndex > 0) {
        return {
            topicId: currentTopic.id,
            subtopic: currentTopic.subtopics[currentSubtopicIndex - 1]
        };
    }

    // 2. Check for last subtopic in prev topic
    if (currentTopicIndex > 0) {
        const prevTopic = course.topics[currentTopicIndex - 1];
        if (prevTopic.subtopics.length > 0) {
            return {
                topicId: prevTopic.id,
                subtopic: prevTopic.subtopics[prevTopic.subtopics.length - 1]
            };
        }
    }

    return null;
  }, [course, topicId, subtopicId]);

  if (!course) return (
    <div className="flex h-screen items-center justify-center text-zinc-500 bg-black">
      <Loader2 className="animate-spin text-zinc-400" size={24} />
    </div>
  );

  const currentTopic = course.topics.find(t => t.id === topicId);
  const currentSubtopic = currentTopic?.subtopics.find(s => s.id === subtopicId);

  return (
    <div className="flex min-h-screen bg-black relative">
      {/* Vercel Grid */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <Sidebar 
        course={course}
        selectedTopicId={topicId}
        selectedSubtopicId={subtopicId}
        completedSubtopics={completedSubtopics}
        onSelectSubtopic={handleSubtopicSelect}
        onBack={() => navigate('/')}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 w-full md:ml-[360px] relative">
        
        {/* Sticky Progress Header */}
        <div className="sticky top-0 z-30 bg-[#020204]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-24 py-4 flex items-center justify-between gap-4">
           
           <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden text-zinc-400 hover:text-white transition-colors p-1"
              >
                <Menu size={20} />
              </button>
              
              <div className="flex items-center gap-3 text-xs font-medium text-zinc-400">
                <div className="w-24 md:w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 transition-all duration-1000" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="hidden sm:inline">{progressPercentage}% Complete</span>
                <span className="sm:hidden">{progressPercentage}%</span>
              </div>
           </div>
           
           {progressPercentage === 100 && (
             <div className="flex items-center gap-2 text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-wider animate-in fade-in zoom-in duration-500">
               <Trophy size={14} /> <span className="hidden sm:inline">Course Mastered</span>
             </div>
           )}
        </div>

        <div className="p-6 md:p-24 overflow-y-auto min-h-[calc(100vh-60px)] relative">
          {currentSubtopic ? (
            <div className="max-w-3xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Breadcrumbs */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-6">
                <button 
                    onClick={() => navigate('/')} 
                    className="flex items-center gap-1 hover:text-white transition-colors"
                >
                    <Home size={10} />
                    <span>Library</span>
                </button>
                <span className="text-zinc-700">/</span>
                <span className="text-zinc-400">{course.title}</span>
                <span className="text-zinc-700">/</span>
                <span className="text-zinc-400">{currentTopic?.title}</span>
                <span className="text-zinc-700">/</span>
                <span className="text-sky-400">{currentSubtopic.title}</span>
              </div>

              {/* Title */}
              <div className="mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                  {currentSubtopic.title}
                </h1>
                <div className="h-px w-20 bg-gradient-to-r from-sky-500 to-transparent mb-8"></div>
              </div>

              {/* Content */}
              <div className="mb-12 md:mb-20">
                  <MarkdownRenderer content={currentSubtopic.content} />
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col gap-6 border-t border-white/[0.05] pt-12 pb-20">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                    {/* Complete Button */}
                    <button
                    onClick={() => handleToggleProgress(currentSubtopic.id)}
                    className={`group relative flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 w-full md:w-auto justify-center ${
                        completedSubtopics[currentSubtopic.id]
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
                    }`}
                    >
                    <div className={`rounded-full p-0.5 transition-all duration-300 ${completedSubtopics[currentSubtopic.id] ? 'bg-emerald-500 text-black scale-110' : 'bg-white/10 group-hover:bg-white group-hover:text-black'}`}>
                        <Check size={14} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">
                        {completedSubtopics[currentSubtopic.id] ? 'Completed' : 'Mark Complete'}
                    </span>
                    </button>

                    {/* Navigation Buttons Container */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {previousLesson && (
                            <button
                                onClick={() => handleSubtopicSelect(previousLesson.topicId, previousLesson.subtopic.id)}
                                className="group flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-widest border border-white/5 transition-all"
                            >
                                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                                <span>Prev</span>
                            </button>
                        )}

                        {nextLesson ? (
                            <button
                                onClick={() => handleSubtopicSelect(nextLesson.topicId, nextLesson.subtopic.id)}
                                className="group flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            >
                                <span>Next Lesson</span>
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </button>
                        ) : (
                             <div className="flex-1 md:flex-none text-zinc-500 text-xs font-medium italic text-center px-4">
                                End of course
                             </div>
                        )}
                    </div>
                  </div>
              </div>
              
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

