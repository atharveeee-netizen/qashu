"use client";

import React, { useState, useEffect } from "react";
import { VAULT_NOTES, VaultNote } from "@/lib/data";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { NoteViewer } from "@/components/NoteViewer";
import { SearchModal } from "@/components/SearchModal";

export default function Home() {
  const [currentSlug, setCurrentSlug] = useState("qashu-index");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [leftPinned, setLeftPinned] = useState(true);
  const [rightPinned, setRightPinned] = useState(true);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#note\//, "").replace(/^#/, "");
      if (hash) setCurrentSlug(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectNote = (slug: string) => {
    setCurrentSlug(slug);
    window.location.hash = `#note/${slug}`;
  };

  const currentNote =
    VAULT_NOTES.find((n) => n.slug === currentSlug) || VAULT_NOTES[0];

  return (
    <div className="flex min-h-screen relative w-full">
      {/* Left Trigger Zone */}
      <div className="hover-trigger-left fixed top-0 left-0 bottom-0 w-6 z-30" />

      {/* Left Sidebar */}
      <LeftSidebar
        currentSlug={currentSlug}
        onSelectNote={handleSelectNote}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        isPinned={leftPinned}
        onTogglePin={() => setLeftPinned(!leftPinned)}
      />

      {/* Center Note Viewer Content */}
      <div
        className={`center-content ${!leftPinned ? "left-unpinned" : ""} ${
          !rightPinned ? "right-unpinned" : ""
        }`}
      >
        <NoteViewer note={currentNote} onSelectNote={handleSelectNote} />
      </div>

      {/* Right Trigger Zone */}
      <div className="hover-trigger-right fixed top-0 right-0 bottom-0 w-6 z-30" />

      {/* Right Sidebar */}
      <RightSidebar
        currentNote={currentNote}
        onSelectNote={handleSelectNote}
        isPinned={rightPinned}
        onTogglePin={() => setRightPinned(!rightPinned)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectNote={handleSelectNote}
      />
    </div>
  );
}
