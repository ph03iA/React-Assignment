import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveCourse } from '../services/storage';
import { Difficulty } from '../types';
import { ArrowLeft, Layers, Eye } from 'lucide-react';

export const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: `course-${Date.now()}`,
    title: '',
    subtitle: '',
    description: '',
    difficulty: Difficulty.BEGINNER,
    learningObjectives: [],
    coverImageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
    topics: [],
    authorId: 1
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Please fill in required fields");
      return;
    }
    saveCourse(formData);
    navigate('/');
  };

  return (
    <div className="relative min-h-screen pb-20">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[5%] left-[10%] w-[60vw] h-[60vw] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute bottom-[5%] right-[10%] w-[50vw] h-[50vw] bg-fuchsia-900/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-12 pb-20">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
            <button 
            onClick={() => navigate('/')} 
            className="group flex items-center text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Cancel & Exit
            </button>
            
            <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                 <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Draft Mode</span>
            </div>
        </div>

        <div className="space-y-6">
            
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight leading-tight mb-2">
                Create Course
                </h1>
                <p className="text-zinc-400 font-light text-sm">
                Build a comprehensive learning path. Content is autosaved to draft.
                </p>
            </div>

            <form id="create-course-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Glass Panel: Basic Info */}
                <div className="glass-panel p-6 rounded-3xl space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-sky-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-center gap-3 text-sky-400 mb-2">
                            <Layers size={18} />
                            <h3 className="text-base font-bold">Core Details</h3>
                    </div>

                    <div className="space-y-5">
                        <div className="group/input">
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2 group-focus-within/input:text-sky-400 transition-colors">Course Title</label>
                            <input
                            required
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-lg font-medium text-white focus:border-sky-500/50 focus:bg-white/[0.03] focus:outline-none transition-all placeholder:text-zinc-700"
                            placeholder="e.g. Advanced System Design"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Subtitle</label>
                                <input
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:border-sky-500/50 focus:outline-none transition-all"
                                placeholder="Brief tagline..."
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Difficulty</label>
                                <div className="relative">
                                    <select
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleChange}
                                        className="w-full appearance-none bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:border-sky-500/50 focus:outline-none cursor-pointer"
                                    >
                                        {Object.values(Difficulty).map(d => <option key={d} value={d} className="bg-zinc-900">{d}</option>)}
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-[10px]">▼</div>
                                </div>
                            </div>
                        </div>

                            <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Cover Image URL</label>
                            <div className="flex gap-2">
                                <input
                                    name="coverImageUrl"
                                    value={formData.coverImageUrl}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-300 focus:border-sky-500/50 focus:outline-none font-mono text-xs text-ellipsis"
                                    placeholder="https://..."
                                />
                                <button type="button" className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <Eye size={16} className="text-zinc-400" />
                                </button>
                            </div>
                        </div>

                            <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Description</label>
                            <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:border-sky-500/50 focus:outline-none resize-none"
                            placeholder="What will students learn?"
                            />
                        </div>
                    </div>
                </div>

                {/* Publish Action */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                        Publish Course <ArrowLeft size={16} className="rotate-180" />
                    </button>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
};

