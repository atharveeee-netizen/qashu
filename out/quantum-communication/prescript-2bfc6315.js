// Quartz Prescript & Event Listener Handler
(function() {
  // Ensure window.addCleanup safely exists
  if (typeof window.addCleanup !== "function") {
    window.addCleanup = function(fn) {};
  }

  // Theme Initializer & Toggle
  function initTheme() {
    var savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("saved-theme", savedTheme);
    if (document.body) {
      document.body.classList.remove("theme-dark", "theme-light");
      document.body.classList.add("theme-" + savedTheme);
    }
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute("saved-theme") || "dark";
    var next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("saved-theme", next);
    localStorage.setItem("theme", next);
    if (document.body) {
      document.body.classList.remove("theme-dark", "theme-light");
      document.body.classList.add("theme-" + next);
    }
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: next } }));
  }

  // Reader Mode Toggle
  function toggleReaderMode() {
    var current = document.documentElement.getAttribute("reader-mode") === "on";
    var next = !current;
    document.documentElement.setAttribute("reader-mode", next ? "on" : "off");
    document.dispatchEvent(new CustomEvent("readermodechange", { detail: { mode: next ? "on" : "off" } }));
  }

  // Global Event Listener for Dark Mode, Reader Mode & Explorer Toggles
  document.addEventListener("click", function(e) {
    // Dark mode toggle button
    var darkBtn = e.target.closest(".darkmode");
    if (darkBtn) {
      e.preventDefault();
      toggleTheme();
      return;
    }

    // Reader mode toggle button
    var readerBtn = e.target.closest(".readermode");
    if (readerBtn) {
      e.preventDefault();
      toggleReaderMode();
      return;
    }

    // Explorer Title Header Toggle (Collapse / Expand Explorer)
    var explorerTitle = e.target.closest(".explorer-title");
    if (explorerTitle) {
      e.preventDefault();
      var explorerBlock = e.target.closest(".explorer");
      if (explorerBlock) {
        explorerBlock.classList.toggle("collapsed");
        var content = explorerBlock.querySelector(".explorer-content") || explorerBlock.querySelector(".content");
        if (content) {
          content.classList.toggle("collapsed");
          if (content.style.display === "none") {
            content.style.display = "";
          } else {
            content.style.display = content.classList.contains("collapsed") ? "none" : "";
          }
        }
      }
      return;
    }

    // Folder Items inside Explorer (Expand / Collapse Folders)
    var folderBtn = e.target.closest(".folder-button") || e.target.closest(".folder-title") || e.target.closest(".folder-icon");
    if (folderBtn) {
      var folderOuter = folderBtn.closest(".folder-outer");
      var folderContainer = folderOuter ? folderOuter.querySelector(".folder-container") : folderBtn.nextElementSibling;
      if (folderContainer) {
        folderContainer.classList.toggle("open");
        folderContainer.classList.toggle("collapsed");
      }
    }
  });

  // Run initializations
  initTheme();
  document.addEventListener("DOMContentLoaded", function() {
    initTheme();
    document.dispatchEvent(new CustomEvent("nav"));
    document.dispatchEvent(new CustomEvent("render"));
  });
  document.addEventListener("nav", initTheme);
  document.addEventListener("render", initTheme);
})();
