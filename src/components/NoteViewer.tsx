"use client";

import React, { useState, useEffect } from 'react';
import { VaultNote } from '@/lib/data';

interface NoteViewerProps {
  note: VaultNote;
  onSelectNote: (slug: string) => void;
}

export const NoteViewer: React.FC<NoteViewerProps> = ({ note, onSelectNote }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderMarkdown = (text: string) => {
    if (!text) return '';

    const codeBlocks: string[] = [];
    let parsed = text.replace(/```([\s\S]*?)```/g, (_, p1) => {
      codeBlocks.push(p1);
      return `___CODE_BLOCK_${codeBlocks.length - 1}___`;
    });

    parsed = parsed.replace(/\[([^\]]+)\]\(\.\/([^)]+)\)/g, '<a href="#note/$2">$1</a>');
    parsed = parsed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="#note/$2">$1</a>');

    const paragraphs = parsed.split(/\n\n+/);

    const renderedParagraphs = paragraphs.map(p => {
      let line = p.trim();

      if (line.startsWith('# ')) return `<h1>${line.substring(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.substring(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3>${line.substring(4)}</h3>`;

      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
      line = line.replace(/`([^`]+)`/g, '<code>$1</code>');

      if (line.includes('- ')) {
        const items = line.split('\n').filter(l => l.trim().startsWith('- '));
        if (items.length > 0) {
          const listHtml = items.map(it => `<li>${it.trim().substring(2)}</li>`).join('');
          return `<ul>${listHtml}</ul>`;
        }
      }

      return `<p>${line.replace(/\n/g, '<br>')}</p>`;
    });

    let finalHtml = renderedParagraphs.join('\n');

    finalHtml = finalHtml.replace(/___CODE_BLOCK_(\d+)___/g, (_, p1) => {
      const idx = parseInt(p1, 10);
      const rawCode = codeBlocks[idx] || '';
      return `<pre><code>${rawCode.trim()}</code></pre>`;
    });

    return finalHtml;
  };

  if (!mounted) {
    return <div className="p-8 text-zinc-400">Loading Qashu note...</div>;
  }

  return (
    <main className="center-content">
      <div className="mb-6 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
          <button onClick={() => onSelectNote('qashu-index')} className="hover:text-blue-400 transition-colors">
            Home
          </button>
          <span>❯</span>
          <span className="text-zinc-200 font-medium">{note.title}</span>
        </div>
        <h1 className="text-4xl font-extrabold text-zinc-100 tracking-tight mb-2">
          {note.title}
        </h1>
        <div className="text-xs text-zinc-400">
          <span>{note.date || 'Jul 27, 2026'}</span>
          <span className="mx-2">•</span>
          <span>{note.readTime || '16 min read'}</span>
        </div>
      </div>

      <div
        className="markdown-content text-zinc-200 text-lg leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(note.content) }}
      />
    </main>
  );
};
