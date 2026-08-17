// Qashu Core Client Controller: Explorer Toggle, Search, Dark Mode, Reader Mode
(function() {
  function initTheme() {
    var savedTheme = localStorage.getItem("theme");
    var theme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("saved-theme", theme);
  }
  initTheme();

  document.addEventListener("DOMContentLoaded", function() {
    // 1. Dark Mode Toggle
    var darkBtns = document.querySelectorAll(".darkmode");
    darkBtns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        var current = document.documentElement.getAttribute("saved-theme");
        var next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("saved-theme", next);
        localStorage.setItem("theme", next);
      });
    });

    // 2. Reader Mode Toggle
    var readerBtns = document.querySelectorAll(".readermode");
    readerBtns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        document.body.classList.toggle("reader-mode");
      });
    });

    // 3. Explorer Sidebar Toggle (Desktop & Mobile)
    function setupExplorer() {
      var explorerContainers = document.querySelectorAll(".explorer.nav-files-container");
      var toggleButtons = document.querySelectorAll(".explorer-toggle, .title-button, button.desktop-explorer, button.mobile-explorer");
      
      toggleButtons.forEach(function(btn) {
        btn.addEventListener("click", function(e) {
          e.preventDefault();
          explorerContainers.forEach(function(c) {
            c.classList.toggle("collapsed");
            var isCollapsed = c.classList.contains("collapsed");
            btn.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
            var content = c.querySelector(".explorer-content");
            if (content) {
              content.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
              content.style.display = isCollapsed ? "none" : "block";
            }
          });
        });
      });

      // Folder Collapse / Expand
      document.addEventListener("click", function(e) {
        var folderBtn = e.target.closest(".folder-button, .folder-container");
        if (folderBtn) {
          var folderOuter = folderBtn.closest("li").querySelector(".folder-outer");
          var icon = folderBtn.querySelector(".folder-icon");
          if (folderOuter) {
            folderOuter.classList.toggle("open");
            if (icon) icon.classList.toggle("open");
          }
        }
      });
    }
    setupExplorer();

    // 4. Search Modal Toggle
    var searchBtns = document.querySelectorAll(".search-button");
    var searchContainer = document.querySelector(".search-container");
    var searchBar = document.querySelector(".search-bar");

    if (searchBtns.length && searchContainer) {
      searchBtns.forEach(function(btn) {
        btn.addEventListener("click", function(e) {
          e.preventDefault();
          searchContainer.classList.toggle("active");
          if (searchContainer.classList.contains("active") && searchBar) {
            searchBar.focus();
          }
        });
      });

      document.addEventListener("keydown", function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          searchContainer.classList.toggle("active");
          if (searchContainer.classList.contains("active") && searchBar) {
            searchBar.focus();
          }
        }
        if (e.key === "Escape" && searchContainer.classList.contains("active")) {
          searchContainer.classList.remove("active");
        }
      });
    }
  });
})();