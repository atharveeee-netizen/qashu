"use client";

import React, { useState } from 'react';
import { VAULT_NOTES, VaultNote } from '@/lib/data';
import { ChevronRight, Search, Moon, Sun, Pin } from 'lucide-react';

interface LeftSidebarProps {
  currentSlug: string;
  onSelectNote: (slug: string) => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentSlug,
  onSelectNote,
  onOpenSearch,
  isDarkMode,
  onToggleTheme,
  isPinned,
  onTogglePin,
}) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'Map of Content': true,
    'Absolute Basics': true,
  });

  // Group notes by category
  const categories: Record<string, VaultNote[]> = {};
  VAULT_NOTES.forEach(note => {
    const cat = note.category || 'Map of Content';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(note);
  });

  const catKeys = Object.keys(categories).sort((a, b) => {
    if (a === 'Map of Content') return -1;
    if (b === 'Map of Content') return 1;
    return a.localeCompare(b);
  });

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <aside className={`left-sidebar ${isPinned ? 'pinned' : 'unpinned'}`}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100 cursor-pointer" onClick={() => onSelectNote('qashu-index')}>
          Qashu
        </h1>
        <button
          onClick={onTogglePin}
          title="Pin / Unpin Sidebar"
          className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <Pin className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={onOpenSearch}
          className="flex-1 flex items-center gap-2 px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
        <button
          onClick={onToggleTheme}
          className="p-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div className="explorer-tree overflow-y-auto pr-1">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          Explorer
        </h2>

        <div className="space-y-1">
          {catKeys.map(cat => {
            const notes = categories[cat];
            const isOpen = !!openCategories[cat];

            return (
              <div key={cat} className="category-folder">
                <div
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/60 rounded-md cursor-pointer select-none transition-colors"
                >
                  <ChevronRight className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  <span>{cat}</span>
                </div>

                {isOpen && (
                  <div className="pl-4 mt-0.5 space-y-0.5">
                    {notes.map(note => {
                      const isActive = note.slug === currentSlug;

                      return (
                        <button
                          key={note.slug}
                          onClick={() => onSelectNote(note.slug)}
                          className={`w-full text-left px-2 py-1 text-sm rounded-md transition-colors ${
                            isActive
                              ? 'bg-zinc-800 text-blue-400 font-medium'
                              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                          }`}
                        >
                          {note.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
