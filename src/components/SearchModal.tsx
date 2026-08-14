"use client";

import React, { useState } from 'react';
import { VAULT_NOTES, VaultNote } from '@/lib/data';
import { Search, X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNote: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectNote,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matches = query.trim()
    ? VAULT_NOTES.filter(
        n =>
          n.title.toLowerCase().includes(query.toLowerCase()) ||
          n.content.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-10">
        <div className="flex items-center px-4 py-3 border-b border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search 16 curriculum sections, Qiskit code, or concepts..."
            className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 outline-none text-base"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {!query.trim() ? (
            <div className="p-6 text-center text-zinc-500 text-sm">
              Type to search Qashu vault notes...
            </div>
          ) : matches.length === 0 ? (
            <div className="p-6 text-center text-zinc-500 text-sm">
              No matching notes found for "{query}"
            </div>
          ) : (
            <div className="space-y-1">
              {matches.map(m => (
                <div
                  key={m.slug}
                  onClick={() => {
                    onSelectNote(m.slug);
                    onClose();
                  }}
                  className="p-3 rounded-lg hover:bg-zinc-800/70 cursor-pointer transition-colors"
                >
                  <div className="font-semibold text-blue-400 text-base">{m.title}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{m.category || 'Vault Note'}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
