import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Search, ArrowLeft, X } from 'lucide-react';

export const Sidebar = ({
  course,
  selectedTopicId,
  selectedSubtopicId,
  completedSubtopics,
  onSelectSubtopic,
  onBack,
  isOpen,
  onClose,
}) => {
  const [expandedTopics, setExpandedTopics] = useState(new Set(selectedTopicId ? [selectedTopicId] : []));
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (selectedTopicId) {
      setExpandedTopics(prev => {
        const next = new Set(prev);
        next.add(selectedTopicId);
        return next;
      });
    }
  }, [selectedTopicId]);

  const toggleTopic = (topicId) => {
    const next = new Set(expandedTopics);
    if (next.has(topicId)) {
      next.delete(topicId);
    } else {
      next.add(topicId);
    }
    setExpandedTopics(next);
  };

  const filteredTopics = course.topics.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.subtopics.some(s => s.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`} 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-[100vh] w-[85vw] max-w-[320px] md:w-[360px] bg-[#050507] border-r border-white/[0.03] flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        aria-label="Course Navigation"
      >
        
        {/* Header Area */}
        <div className="p-6 pt-8 pb-4 bg-[#050507] z-10 shrink-0">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={onBack}
              className="group flex items-center text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
              aria-label="Back to Library"
            >
              <ArrowLeft size={12} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Library
            </button>
            
            {/* Mobile Close Button */}
            <button 
              onClick={onClose}
              className="md:hidden p-2 -mr-2 text-zinc-500 hover:text-white"
              aria-label="Close Sidebar"
            >
              <X size={18} />
            </button>
          </div>
          
          <h2 className="text-xl font-bold text-white leading-tight mb-6 pr-4">{course.title}</h2>
          
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Filter modules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.05] text-zinc-300 text-xs rounded-lg pl-9 pr-3 py-3 focus:outline-none focus:bg-white/[0.06] focus:border-white/10 transition-all placeholder:text-zinc-600 font-medium"
              aria-label="Filter modules"
            />
            <Search className="absolute left-3 top-3 text-zinc-600" size={14} aria-hidden="true" />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800/50 p-4 pt-0 space-y-1 hover:scrollbar-thumb-zinc-700/50">
          {filteredTopics.length === 0 ? (
            <div className="text-center py-12 text-zinc-600 text-xs" role="status">
              No matching content found.
            </div>
          ) : (
            filteredTopics.map((topic) => (
              <div key={topic.id} className="mb-2">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  aria-expanded={expandedTopics.has(topic.id)}
                  aria-controls={`topic-content-${topic.id}`}
                  className={`w-full flex items-center justify-between py-3 px-3 text-left transition-all rounded-xl group ${
                    expandedTopics.has(topic.id) ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span className="font-bold text-xs tracking-wide uppercase">{topic.title}</span>
                  {expandedTopics.has(topic.id) 
                    ? <ChevronDown size={14} className="text-zinc-500" aria-hidden="true" /> 
                    : <ChevronRight size={14} className="text-zinc-700 group-hover:text-zinc-500" aria-hidden="true" />
                  }
                </button>

                <div 
                  id={`topic-content-${topic.id}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedTopics.has(topic.id) ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-1 pb-4 pt-1 pl-2">
                    {topic.subtopics.map((sub) => {
                      const isCompleted = completedSubtopics[sub.id];
                      const isSelected = selectedSubtopicId === sub.id;

                      return (
                        <button
                          key={sub.id}
                          onClick={() => onSelectSubtopic(topic.id, sub.id)}
                          aria-current={isSelected ? 'page' : undefined}
                          className={`group w-full flex items-center justify-between py-2.5 px-4 rounded-lg text-[13px] text-left transition-all duration-300 relative overflow-hidden ${
                            isSelected 
                              ? 'text-white' 
                              : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
                          }`}
                        >
                           {/* Active background gradient */}
                           {isSelected && (
                             <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/10 rounded-lg" />
                           )}

                           <div className="flex items-center gap-3 truncate pr-4 relative z-10">
                             <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isSelected ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] scale-110' : 'bg-zinc-800 group-hover:bg-zinc-700'}`} />
                             <span className={`truncate font-medium ${isSelected ? 'text-zinc-100' : ''}`}>{sub.title}</span>
                          </div>
                          {isCompleted && (
                            <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 opacity-80 relative z-10" aria-label="Completed" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
};

