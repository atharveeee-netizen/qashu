import { VAULT_NOTES } from './data.js';

class QashuVaultApp {
  constructor() {
    this.currentTheme = localStorage.getItem('qashu_theme') || 'dark';
    this.currentNoteSlug = 'qashu-index';
    this.leftPinned = true;
    this.rightPinned = true;
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.renderCategoryExplorer();
    this.setupRouter();
    this.setupEventListeners();
    this.setupSidebars();
    this.initMiniGraph();
    this.loadNoteFromHash();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('qashu_theme', theme);
  }

  setupRouter() {
    window.addEventListener('hashchange', () => {
      this.loadNoteFromHash();
    });
  }

  loadNoteFromHash() {
    const hash = window.location.hash.replace(/^#note\//, '').replace(/^#/, '');
    const slug = hash || 'qashu-index';
    const note = VAULT_NOTES.find(n => n.slug === slug) || VAULT_NOTES[0];
    this.renderNote(note);
  }

  renderCategoryExplorer() {
    const treeEl = document.getElementById('explorer-tree');
    if (!treeEl) return;

    // Group notes by category folder
    const categories = {};
    VAULT_NOTES.forEach(note => {
      let cat = note.category || 'Map of Content';
      if (note.slug === 'qashu-index') cat = 'Map of Content';
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(note);
    });

    const catKeys = Object.keys(categories).sort((a, b) => {
      if (a === 'Map of Content') return -1;
      if (b === 'Map of Content') return 1;
      return a.localeCompare(b);
    });

    treeEl.innerHTML = catKeys.map((cat, idx) => {
      const notes = categories[cat];
      const isOpen = idx === 0 || cat === 'Absolute Basics'; // First category open by default

      return `
        <li class="folder-item ${isOpen ? 'open' : ''}">
          <div class="folder-header" data-cat="${cat}">
            <svg class="folder-chevron" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <span>${cat}</span>
          </div>
          <ul class="folder-children">
            ${notes.map(n => `
              <li>
                <a href="#note/${n.slug}" class="explorer-link ${n.slug === this.currentNoteSlug ? 'active' : ''}" data-slug="${n.slug}">
                  ${n.title}
                </a>
              </li>
            `).join('')}
          </ul>
        </li>
      `;
    }).join('');

    // Add folder click expand/collapse listener
    document.querySelectorAll('.folder-header').forEach(hdr => {
      hdr.addEventListener('click', () => {
        const item = hdr.closest('.folder-item');
        item.classList.toggle('open');
      });
    });
  }

  renderNote(note) {
    this.currentNoteSlug = note.slug;

    // Update Breadcrumbs & Header
    const crumbTitle = document.getElementById('crumb-title');
    const mainTitle = document.getElementById('main-article-title');
    const mainDate = document.getElementById('main-article-date');
    const markdownContent = document.getElementById('markdown-content');

    if (crumbTitle) crumbTitle.innerText = note.title;
    if (mainTitle) mainTitle.innerText = note.title;
    if (mainDate) mainDate.innerText = note.date || 'Jul 27, 2026';

    if (markdownContent) {
      markdownContent.innerHTML = this.parseMarkdown(note.content);
    }

    // Update active link in explorer
    document.querySelectorAll('.explorer-link').forEach(el => {
      if (el.dataset.slug === note.slug) {
        el.classList.add('active');
        // Ensure parent folder is expanded
        const parentFolder = el.closest('.folder-item');
        if (parentFolder) parentFolder.classList.add('open');
      } else {
        el.classList.remove('active');
      }
    });

    this.renderTableOfContents();
    this.renderBacklinks(note);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.renderKaTeX();
  }

  renderTableOfContents() {
    const tocEl = document.getElementById('toc-list');
    const content = document.getElementById('markdown-content');
    if (!tocEl || !content) return;

    const headings = content.querySelectorAll('h1, h2, h3');
    if (headings.length === 0) {
      tocEl.innerHTML = '<li class="toc-item"><span class="toc-link">Overview</span></li>';
      return;
    }

    tocEl.innerHTML = Array.from(headings).map((h, i) => {
      const id = `heading-${i}`;
      h.id = id;
      return `
        <li class="toc-item" style="padding-left: ${h.tagName === 'H3' ? '0.75rem' : '0'};">
          <a href="#${id}" class="toc-link">${h.innerText}</a>
        </li>
      `;
    }).join('');
  }

  renderBacklinks(currentNote) {
    const backlinksEl = document.getElementById('backlinks-list');
    if (!backlinksEl) return;

    // Find notes that link to current Note slug or title
    const references = VAULT_NOTES.filter(n => 
      n.slug !== currentNote.slug && 
      (n.content.includes(currentNote.slug) || n.content.includes(currentNote.title))
    );

    if (references.length === 0) {
      backlinksEl.innerHTML = '<li class="backlink-item"><span class="toc-link">No backlinks found</span></li>';
      return;
    }

    backlinksEl.innerHTML = references.slice(0, 5).map(r => `
      <li class="backlink-item">
        <a href="#note/${r.slug}" class="backlink-link">${r.title}</a>
      </li>
    `).join('');
  }

  setupSidebars() {
    const leftSb = document.getElementById('left-sidebar');
    const rightSb = document.getElementById('right-sidebar');
    const pinLeftBtn = document.getElementById('pin-left-sidebar');
    const pinRightBtn = document.getElementById('pin-right-sidebar');

    if (pinLeftBtn && leftSb) {
      pinLeftBtn.addEventListener('click', () => {
        this.leftPinned = !this.leftPinned;
        leftSb.classList.toggle('collapsed', !this.leftPinned);
        document.body.classList.toggle('left-collapsed', !this.leftPinned);
      });
    }

    if (pinRightBtn && rightSb) {
      pinRightBtn.addEventListener('click', () => {
        this.rightPinned = !this.rightPinned;
        rightSb.classList.toggle('collapsed', !this.rightPinned);
        document.body.classList.toggle('right-collapsed', !this.rightPinned);
      });
    }
  }

  initMiniGraph() {
    const canvas = document.getElementById('mini-graph-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = 260;
    let height = canvas.height = 160;

    // Simple node graph visualization
    const nodes = VAULT_NOTES.slice(0, 15).map((n, i) => ({
      x: 30 + Math.random() * (width - 60),
      y: 20 + Math.random() * (height - 40),
      radius: i === 0 ? 6 : 3,
      isMain: i === 0
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw edges
      ctx.strokeStyle = 'rgba(138, 180, 248, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y) < 70) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.isMain ? '#8ab4f8' : '#a1a1aa';
        ctx.fill();
      });
    };

    draw();
  }

  setupEventListeners() {
    // Theme toggle
    const darkBtn = document.getElementById('btn-darkmode');
    if (darkBtn) {
      darkBtn.addEventListener('click', () => {
        const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
      });
    }

    // Home logo click
    const logoLink = document.getElementById('home-logo-link');
    const crumbHome = document.getElementById('crumb-home');
    const goHome = (e) => {
      e.preventDefault();
      window.location.hash = '#note/qashu-index';
    };
    if (logoLink) logoLink.addEventListener('click', goHome);
    if (crumbHome) crumbHome.addEventListener('click', goHome);

    // Search modal
    const searchBtn = document.getElementById('btn-search');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('modal-search-input');
    const searchResults = document.getElementById('search-results-list');
    const backdrop = document.querySelector('.search-backdrop');

    if (searchBtn && searchModal) {
      searchBtn.addEventListener('click', () => {
        searchModal.style.display = 'flex';
        if (searchInput) searchInput.focus();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        searchModal.style.display = 'none';
      });
    }

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (!q) {
          searchResults.innerHTML = '';
          return;
        }

        const matches = VAULT_NOTES.filter(n => 
          n.title.toLowerCase().includes(q) || 
          n.content.toLowerCase().includes(q)
        );

        searchResults.innerHTML = matches.map(m => `
          <div class="search-result-item" data-slug="${m.slug}">
            <div class="search-result-title">${m.title}</div>
            <div class="search-result-cat">${m.category || 'Vault Note'}</div>
          </div>
        `).join('');

        document.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            window.location.hash = `#note/${item.dataset.slug}`;
            searchModal.style.display = 'none';
          });
        });
      });
    }
  }

  renderKaTeX() {
    if (window.katex) {
      const container = document.getElementById('markdown-content');
      if (!container) return;

      let html = container.innerHTML;
      html = html.replace(/\$\$(.*?)\$\$/g, (m, eq) => {
        try { return katex.renderToString(eq, { displayMode: true }); } catch(e) { return m; }
      });
      html = html.replace(/\$(.*?)\$/g, (m, eq) => {
        try { return katex.renderToString(eq, { displayMode: false }); } catch(e) { return m; }
      });
      container.innerHTML = html;
    }
  }

  parseMarkdown(text) {
    if (!text) return '';

    // Handle code blocks first to preserve formatted code
    const codeBlocks = [];
    let parsed = text.replace(/```([\s\S]*?)```/g, (match, p1) => {
      codeBlocks.push(p1);
      return `___CODE_BLOCK_${codeBlocks.length - 1}___`;
    });

    // Handle inline links [Text](url) -> <a href="#note/url">Text</a>
    parsed = parsed.replace(/\[([^\]]+)\]\(\.\/([^)]+)\)/g, '<a href="#note/$2">$1</a>');
    parsed = parsed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="#note/$2">$1</a>');

    // Split paragraphs by double newlines
    const paragraphs = parsed.split(/\n\n+/);

    const renderedParagraphs = paragraphs.map(p => {
      let line = p.trim();

      if (line.startsWith('# ')) {
        return `<h1>${line.substring(2)}</h1>`;
      }
      if (line.startsWith('## ')) {
        return `<h2>${line.substring(3)}</h2>`;
      }
      if (line.startsWith('### ')) {
        return `<h3>${line.substring(4)}</h3>`;
      }

      if (line.startsWith('<pre class="ascii-art">')) {
        return line;
      }

      // Convert inline formatting
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
      line = line.replace(/`([^`]+)`/g, '<code>$1</code>');

      // Convert bullet lists
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

    // Restore code blocks
    finalHtml = finalHtml.replace(/___CODE_BLOCK_(\d+)___/g, (match, p1) => {
      const idx = parseInt(p1, 10);
      const rawCode = codeBlocks[idx] || '';
      return `<pre><code>${rawCode.trim()}</code></pre>`;
    });

    return finalHtml;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.qashuApp = new QashuVaultApp();
});
