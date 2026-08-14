import { VAULT_NOTES } from './data.js';

class QashuVaultApp {
  constructor() {
    this.currentTheme = localStorage.getItem('qashu_theme') || 'dark';
    this.currentNoteSlug = 'qashu-index';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.renderExplorer();
    this.setupRouter();
    this.setupEventListeners();
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

  renderExplorer() {
    const listEl = document.getElementById('explorer-list');
    if (!listEl) return;

    listEl.innerHTML = VAULT_NOTES.map(note => `
      <li class="explorer-item">
        <a href="#note/${note.slug}" class="explorer-link ${note.slug === this.currentNoteSlug ? 'active' : ''}" data-slug="${note.slug}">
          ${note.title}
        </a>
      </li>
    `).join('');
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
      } else {
        el.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.renderKaTeX();
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
    return text
      .replace(/### (.*?)\n/g, '<h3>$1</h3>')
      .replace(/## (.*?)\n/g, '<h2>$1</h2>')
      .replace(/# (.*?)\n/g, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```python([\s\S]*?)```/g, '<pre><code class="language-python">$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/- \*\*(.*?)\*\* \((.*?)\)/g, '<li><strong>$1</strong> ($2)</li>')
      .replace(/- (.*?)\n/g, '<li>$1</li>')
      .replace(/\n\n/g, '<br>');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.qashuApp = new QashuVaultApp();
});
