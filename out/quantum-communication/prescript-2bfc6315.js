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

  // Toggle Explorer Collapse / Expand
  function toggleExplorer(targetEl) {
    var explorerBlock = targetEl.closest(".explorer");
    if (!explorerBlock) return;

    var isCollapsed = explorerBlock.classList.contains("collapsed");
    explorerBlock.classList.toggle("collapsed", !isCollapsed);

    var content = explorerBlock.querySelector(".explorer-content") || explorerBlock.querySelector("#explorer-3") || explorerBlock.querySelector(".content");
    if (content) {
      content.classList.toggle("collapsed", !isCollapsed);
      content.setAttribute("aria-expanded", isCollapsed ? "true" : "false");
      content.style.display = isCollapsed ? "block" : "none";
    }

    var toggleBtn = explorerBlock.querySelector(".explorer-toggle") || explorerBlock.querySelector(".title-button");
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", isCollapsed ? "true" : "false");
    }
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

    // Explorer Toggle Header Button ("Explorer v" button or title)
    var explorerToggleBtn = e.target.closest(".explorer-toggle") || e.target.closest(".title-button") || e.target.closest(".explorer-title") || e.target.closest("h2");
    if (explorerToggleBtn && explorerToggleBtn.closest(".explorer")) {
      e.preventDefault();
      toggleExplorer(explorerToggleBtn);
      return;
    }

    // Folder Items inside Explorer (Expand / Collapse Folders)
    var folderBtn = e.target.closest(".folder-button") || e.target.closest(".folder-title") || e.target.closest(".folder-icon") || e.target.closest(".folder-container");
    if (folderBtn) {
      var folderLi = folderBtn.closest("li");
      if (folderLi) {
        var folderOuter = folderLi.querySelector(".folder-outer");
        var folderContainer = folderLi.querySelector(".folder-container");
        if (folderContainer) {
          folderContainer.classList.toggle("open");
        }
        if (folderOuter) {
          var isHidden = folderOuter.style.display === "none" || folderOuter.classList.contains("collapsed");
          folderOuter.style.display = isHidden ? "block" : "none";
          folderOuter.classList.toggle("collapsed", !isHidden);
        }
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
