import React from 'react';
import ReactMarkdown from 'react-markdown';

export const MarkdownRenderer = ({ content }) => {
  const components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !match && !String(children).includes('\n');

      if (isInline) {
        return (
          <code className="bg-white/10 text-amber-300 rounded px-1.5 py-0.5 font-mono text-xs md:text-sm border border-white/5" {...props}>
            {children}
          </code>
        );
      }

      return (
        <div className="my-4 md:my-6 rounded-lg md:rounded-xl overflow-hidden border border-white/10 bg-[#0c0c0e] shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-2.5 md:px-4 md:py-3 bg-white/[0.03] border-b border-white/5">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500/80" />
            <div className="ml-auto text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-zinc-600">
              {match ? match[1] : 'Terminal'}
            </div>
          </div>
          <div className="p-3 md:p-4 overflow-x-auto">
            <code className={`font-mono text-xs md:text-sm leading-relaxed text-zinc-300 ${className}`} {...props}>
              {children}
            </code>
          </div>
        </div>
      );
    },
    h1: ({ children }) => <h1 className="text-2xl md:text-3xl font-bold text-white mb-5 md:mb-6 mt-10 md:mt-12 first:mt-0 tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-3 md:mb-4 mt-8 md:mt-10 tracking-tight border-b border-white/5 pb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg md:text-xl font-semibold text-zinc-200 mb-2 md:mb-3 mt-6 md:mt-8">{children}</h3>,
    p: ({ children }) => <p className="text-zinc-400 leading-6 md:leading-7 mb-4 font-light text-sm md:text-[17px]">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-outside ml-4 mb-4 text-zinc-400 space-y-2 text-sm md:text-[17px]">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-outside ml-4 mb-4 text-zinc-400 space-y-2 text-sm md:text-[17px]">{children}</ol>,
    li: ({ children }) => <li className="pl-2">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-amber-500/50 bg-amber-500/5 px-4 md:px-6 py-3 md:py-4 rounded-r-lg my-4 md:my-6 text-zinc-300 italic text-sm md:text-base">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-sky-400 hover:text-sky-300 underline decoration-sky-400/30 hover:decoration-sky-400 transition-colors">
        {children}
      </a>
    ),
  };

  return (
    <div className="w-full">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};

