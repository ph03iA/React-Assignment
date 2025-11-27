import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { Shield, Search, BookOpen, PenTool, Activity, MoreHorizontal } from 'lucide-react';

export const AdminDashboard = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-black relative pb-20">
      {/* Vercel Grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-4">
               <Shield size={10} /> Admin Console
             </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              User Management
            </h1>
          </div>
        </div>

        {/* Dashboard "Floating List" Widget */}
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between px-2 gap-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity size={18} className="text-purple-400" /> All Users
                </h2>
                
                {/* Search Pill */}
                <div className="relative group w-full md:w-64">
                    <Search className="absolute left-3 top-2.5 text-zinc-600 group-focus-within:text-purple-400 transition-colors" size={14} />
                    <input 
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] focus:bg-black/40 rounded-full pl-9 pr-4 py-2 text-xs text-zinc-300 focus:outline-none focus:border-purple-500/30 w-full transition-all placeholder:text-zinc-600" 
                        placeholder="Search users..." 
                    />
                </div>
            </div>

            <div className="grid gap-3">
                {/* Header Row - Hidden on mobile */}
                <div className="hidden md:grid grid-cols-10 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                    <div className="col-span-4">User</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-3">Progress</div>
                    <div className="col-span-1 text-right">Actions</div>
                </div>

                {filteredUsers.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500 text-sm">
                        No users found matching "{search}"
                    </div>
                ) : (
                    filteredUsers.map((user) => (
                    <div key={user.id} className="group relative flex flex-col md:grid md:grid-cols-10 md:items-center bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.03] hover:border-white/10 rounded-2xl p-6 md:px-6 md:py-4 transition-all duration-300 gap-4 md:gap-0">
                        
                        {/* User */}
                        <div className="md:col-span-4 flex items-center gap-4">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-sky-500/20 flex items-center justify-center text-sm font-bold text-zinc-300 ring-2 ring-white/5 group-hover:ring-white/10 transition-all">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0c0c0e] rounded-full"></div>
                            </div>
                            <div>
                            <div className="font-bold text-zinc-200 text-sm group-hover:text-white transition-colors">{user.name}</div>
                            <div className="text-[11px] text-zinc-600 font-medium">{user.email}</div>
                            </div>
                        </div>

                        {/* Role */}
                        <div className="md:col-span-2">
                        {user.role === 'INSTRUCTOR' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                                INSTRUCTOR
                            </span>
                        ) : user.role === 'ADMIN' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                                ADMIN
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/5 text-zinc-400 border border-white/5 group-hover:bg-white/10 transition-colors">
                                STUDENT
                            </span>
                        )}
                        </div>

                        {/* Progress */}
                        <div className="md:col-span-3 w-full">
                            {user.role === 'STUDENT' && user.enrolledCourses && (
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-500">
                                <BookOpen size={10} /> {user.enrolledCourses.length} Courses
                                </div>
                                {user.courseProgress && Object.keys(user.courseProgress).length > 0 ? (
                                <div className="flex gap-1 h-1.5 w-full md:w-32 bg-white/5 rounded-full overflow-hidden">
                                    {Object.values(user.courseProgress).map((p, i) => (
                                    <div key={i} className="bg-emerald-500 rounded-full h-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ width: `${p * 100}%` }} />
                                    ))}
                                </div>
                                ) : (
                                    <div className="h-1.5 w-full md:w-32 bg-white/5 rounded-full" />
                                )}
                            </div>
                            )}
                            {user.role === 'INSTRUCTOR' && (
                                <div className="flex items-center gap-2 text-[10px] font-medium text-amber-500/80">
                                <PenTool size={10} /> {user.authoredCourses?.length || 0} Published
                                </div>
                            )}
                        </div>

                        {/* Action - Absolute on mobile */}
                        <div className="absolute top-4 right-4 md:static md:col-span-1 md:text-right">
                            <button className="p-2 text-zinc-600 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>

                    </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
