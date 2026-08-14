"use client";

import React, { useEffect, useRef } from 'react';
import { VAULT_NOTES, VaultNote } from '@/lib/data';
import { Pin } from 'lucide-react';

interface RightSidebarProps {
  currentNote: VaultNote;
  onSelectNote: (slug: string) => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  currentNote,
  onSelectNote,
  isPinned,
  onTogglePin,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Render mini orbital graph widget
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = 240);
    const height = (canvas.height = 150);

    const nodes = VAULT_NOTES.slice(0, 12).map((_, i) => ({
      x: 30 + Math.random() * (width - 60),
      y: 20 + Math.random() * (height - 40),
      radius: i === 0 ? 5 : 3,
      isMain: i === 0,
    }));

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(138, 180, 248, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < 65) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.isMain ? '#60a5fa' : '#9ca3af';
      ctx.fill();
    });
  }, [currentNote]);

  // Backlinks calculations
  const backlinks = VAULT_NOTES.filter(
    n =>
      n.slug !== currentNote.slug &&
      (n.content.includes(currentNote.slug) || n.content.includes(currentNote.title))
  );

  return (
    <aside className={`right-sidebar ${isPinned ? 'pinned' : 'unpinned'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Graph View
        </h2>
        <button
          onClick={onTogglePin}
          title="Pin / Unpin Right Sidebar"
          className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <Pin className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 mb-6">
        <canvas ref={canvasRef} className="w-full rounded" />
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Table of Contents
        </h3>
        <ul className="space-y-1 text-sm text-zinc-400">
          <li className="hover:text-blue-400 cursor-pointer">{currentNote.title}</li>
          <li className="pl-3 hover:text-blue-400 cursor-pointer">Concept Overview</li>
          <li className="pl-3 hover:text-blue-400 cursor-pointer">Code Implementation</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Backlinks
        </h3>
        {backlinks.length === 0 ? (
          <p className="text-xs text-zinc-500">No backlinks found</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {backlinks.slice(0, 5).map(b => (
              <li key={b.slug}>
                <button
                  onClick={() => onSelectNote(b.slug)}
                  className="text-zinc-400 hover:text-blue-400 text-left line-clamp-1 transition-colors"
                >
                  {b.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};
