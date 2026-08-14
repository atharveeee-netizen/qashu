import { CURRICULUM_DATA, SUGGESTED_STUDY_ORDER, OPEN_THREADS } from './data.js';
import { CircuitVisualizer, simulateCircuit } from './circuit_simulator.js';
import { BlochSphereVisualizer } from './bloch_sphere.js';
import { ConceptGraph } from './graph_view.js';

class QashuApp {
  constructor() {
    this.completedSteps = new Set(JSON.parse(localStorage.getItem('qashu_completed_steps') || '[]'));
    this.blochVisualizer = null;
    this.init();
  }

  init() {
    this.initAmbientCanvas();
    this.renderHeaderNav();
    this.renderCurriculumSections();
    this.renderStudyOrderPath();
    this.renderOpenThreads();
    this.setupSearch();
    this.setupEventListeners();
    this.initGraphView();
    this.initBlochSimulator();
    this.updateProgress();
    this.renderKaTeX();
  }

  initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2
    }));

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(drawParticles);
    };
    drawParticles();
  }

  renderHeaderNav() {
    const navList = document.getElementById('nav-sections-list');
    if (!navList) return;

    navList.innerHTML = CURRICULUM_DATA.map(sec => `
      <li>
        <a href="#${sec.id}" class="nav-link">
          <span class="nav-num">${sec.title.split('.')[0]}</span>
          <span class="nav-text">${sec.title.split('. ')[1]}</span>
        </a>
      </li>
    `).join('');
  }

  renderCurriculumSections(filterText = '') {
    const container = document.getElementById('sections-container');
    if (!container) return;

    const query = filterText.toLowerCase().trim();

    const filtered = CURRICULUM_DATA.map(sec => {
      const secMatch = sec.title.toLowerCase().includes(query) || sec.description.toLowerCase().includes(query);
      const matchingTopics = sec.topics.filter(top => 
        top.title.toLowerCase().includes(query) || 
        top.subtitle.toLowerCase().includes(query) ||
        top.content.toLowerCase().includes(query) ||
        top.qiskitCode.toLowerCase().includes(query)
      );

      if (secMatch || matchingTopics.length > 0) {
        return {
          ...sec,
          topics: query ? (secMatch ? sec.topics : matchingTopics) : sec.topics
        };
      }
      return null;
    }).filter(Boolean);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <h3>No matching quantum topics found for "${filterText}"</h3>
          <p>Try searching for "Bell", "Grover", "Qiskit", "Depth", "VQE", or "H2".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(sec => `
      <section id="${sec.id}" class="curriculum-section card">
        <div class="section-header">
          <h2>${sec.title}</h2>
          <p class="section-desc">${sec.description}</p>
        </div>
        
        <div class="topics-grid">
          ${sec.topics.map(topic => `
            <article id="${topic.id}" class="topic-card">
              <div class="topic-header">
                <h3>${topic.title}</h3>
                <span class="topic-subtitle">${topic.subtitle}</span>
              </div>

              <div class="topic-body">
                <div class="topic-text">${this.formatMarkdown(topic.content)}</div>

                <div class="qiskit-code-block">
                  <div class="code-header">
                    <span class="code-lang">Qiskit Python (Syntactically Correct API)</span>
                    <button class="btn-copy" data-code="${encodeURIComponent(topic.qiskitCode)}">Copy Code</button>
                  </div>
                  <pre><code class="language-python">${this.escapeHtml(topic.qiskitCode)}</code></pre>
                </div>

                <div class="circuit-container-wrapper">
                  <div class="circuit-header">
                    <span class="circuit-title">Quantum Circuit Diagram & Execution</span>
                    <button class="btn-run-circuit" data-topic="${topic.id}">Run Circuit Simulation</button>
                  </div>
                  <div class="circuit-diagram" id="circuit-${topic.id}"></div>
                  <div class="circuit-simulation-output" id="output-${topic.id}" style="display:none;"></div>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `).join('');

    // Render Circuit SVG Diagrams
    filtered.forEach(sec => {
      sec.topics.forEach(topic => {
        const vis = new CircuitVisualizer(`circuit-${topic.id}`);
        vis.render(topic.circuit);
      });
    });

    this.attachCardEventListeners();
    this.renderKaTeX();
  }

  renderStudyOrderPath() {
    const container = document.getElementById('study-order-container');
    if (!container) return;

    container.innerHTML = SUGGESTED_STUDY_ORDER.map(item => {
      const isDone = this.completedSteps.has(item.step);
      return `
        <div class="study-step-card ${isDone ? 'completed' : ''}" data-step="${item.step}">
          <div class="step-badge">${item.step}</div>
          <div class="step-details">
            <span class="step-title">${item.title}</span>
            <span class="step-cat">${item.category}</span>
          </div>
          <input type="checkbox" class="step-checkbox" ${isDone ? 'checked' : ''} aria-label="Mark completed">
        </div>
      `;
    }).join('');
  }

  renderOpenThreads() {
    const container = document.getElementById('open-threads-container');
    if (!container) return;

    container.innerHTML = OPEN_THREADS.map(th => `
      <div class="thread-card">
        <div class="thread-meta">
          <span class="thread-status badge-${th.status.toLowerCase().replace(/\s+/g, '-')}">${th.status}</span>
          <span class="thread-date">${th.date}</span>
        </div>
        <h4 class="thread-title">${th.title}</h4>
        <p class="thread-desc">${th.description}</p>
      </div>
    `).join('');
  }

  setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      this.renderCurriculumSections(e.target.value);
    });
  }

  setupEventListeners() {
    // View Switcher (Grid vs 3D Bloch vs Graph)
    const btnGrid = document.getElementById('btn-view-grid');
    const btnBloch = document.getElementById('btn-view-bloch');
    const btnGraph = document.getElementById('btn-view-graph');

    const gridViewEl = document.getElementById('grid-view-content');
    const blochViewEl = document.getElementById('bloch-view-content');
    const graphViewEl = document.getElementById('graph-view-content');

    if (btnGrid && btnBloch && btnGraph) {
      btnGrid.addEventListener('click', () => {
        btnGrid.classList.add('active');
        btnBloch.classList.remove('active');
        btnGraph.classList.remove('active');
        gridViewEl.style.display = 'block';
        blochViewEl.style.display = 'none';
        graphViewEl.style.display = 'none';
      });

      btnBloch.addEventListener('click', () => {
        btnBloch.classList.add('active');
        btnGrid.classList.remove('active');
        btnGraph.classList.remove('active');
        gridViewEl.style.display = 'none';
        blochViewEl.style.display = 'block';
        graphViewEl.style.display = 'none';
        if (this.blochVisualizer) this.blochVisualizer.draw();
      });

      btnGraph.addEventListener('click', () => {
        btnGraph.classList.add('active');
        btnGrid.classList.remove('active');
        btnBloch.classList.remove('active');
        gridViewEl.style.display = 'none';
        blochViewEl.style.display = 'none';
        graphViewEl.style.display = 'block';
      });
    }

    // Study Order completion toggle
    const studyContainer = document.getElementById('study-order-container');
    if (studyContainer) {
      studyContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('step-checkbox')) {
          const card = e.target.closest('.study-step-card');
          const stepNum = parseInt(card.dataset.step, 10);
          if (e.target.checked) {
            this.completedSteps.add(stepNum);
            card.classList.add('completed');
          } else {
            this.completedSteps.delete(stepNum);
            card.classList.remove('completed');
          }
          localStorage.setItem('qashu_completed_steps', JSON.stringify([...this.completedSteps]));
          this.updateProgress();
        }
      });
    }

    // Bloch Sphere gate buttons
    document.querySelectorAll('.btn-bloch-gate').forEach(btn => {
      btn.addEventListener('click', () => {
        const gate = btn.dataset.gate;
        if (this.blochVisualizer) {
          this.blochVisualizer.applyGate(gate);
          this.updateBlochSliders();
        }
      });
    });

    // Bloch Sphere angle sliders
    const sliderTheta = document.getElementById('slider-theta');
    const sliderPhi = document.getElementById('slider-phi');

    if (sliderTheta && sliderPhi) {
      sliderTheta.addEventListener('input', () => {
        const th = parseFloat(sliderTheta.value);
        const ph = parseFloat(sliderPhi.value);
        document.getElementById('val-theta').innerText = `${th.toFixed(2)} rad`;
        if (this.blochVisualizer) this.blochVisualizer.setState(th, ph);
      });

      sliderPhi.addEventListener('input', () => {
        const th = parseFloat(sliderTheta.value);
        const ph = parseFloat(sliderPhi.value);
        document.getElementById('val-phi').innerText = `${ph.toFixed(2)} rad`;
        if (this.blochVisualizer) this.blochVisualizer.setState(th, ph);
      });
    }
  }

  initBlochSimulator() {
    this.blochVisualizer = new BlochSphereVisualizer('bloch-canvas');
  }

  updateBlochSliders() {
    if (!this.blochVisualizer) return;
    const thEl = document.getElementById('slider-theta');
    const phEl = document.getElementById('slider-phi');
    if (thEl && phEl) {
      thEl.value = this.blochVisualizer.theta;
      phEl.value = this.blochVisualizer.phi;
      document.getElementById('val-theta').innerText = `${this.blochVisualizer.theta.toFixed(2)} rad`;
      document.getElementById('val-phi').innerText = `${this.blochVisualizer.phi.toFixed(2)} rad`;
    }
  }

  attachCardEventListeners() {
    // Copy code button handler
    document.querySelectorAll('.btn-copy').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = decodeURIComponent(btn.dataset.code);
        navigator.clipboard.writeText(code).then(() => {
          const orig = btn.innerText;
          btn.innerText = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.innerText = orig;
            btn.classList.remove('copied');
          }, 1800);
        });
      });
    });

    // Run circuit simulation button handler
    document.querySelectorAll('.btn-run-circuit').forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.dataset.topic;
        const topicObj = this.findTopicById(topicId);
        if (!topicObj) return;

        const outputEl = document.getElementById(`output-${topicId}`);
        if (!outputEl) return;

        const simResult = simulateCircuit(topicObj.circuit, 1024);

        let countsHtml = '<div class="sim-counts-histogram"><h4>Simulated Outcome Counts (1024 Shots)</h4><div class="histogram-bars">';
        const maxCount = Math.max(...Object.values(simResult.counts));

        Object.entries(simResult.counts).forEach(([bitstring, count]) => {
          const pct = ((count / 1024) * 100).toFixed(1);
          const barHeight = Math.max(12, (count / maxCount) * 100);
          countsHtml += `
            <div class="histogram-col">
              <span class="hist-count">${count} (${pct}%)</span>
              <div class="hist-bar" style="height:${barHeight}%"></div>
              <span class="hist-label">|${bitstring}⟩</span>
            </div>
          `;
        });
        countsHtml += '</div></div>';

        outputEl.innerHTML = countsHtml;
        outputEl.style.display = 'block';
      });
    });
  }

  initGraphView() {
    new ConceptGraph('concept-graph-canvas', CURRICULUM_DATA, (sectionId) => {
      document.getElementById('btn-view-grid').click();
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  updateProgress() {
    const total = SUGGESTED_STUDY_ORDER.length;
    const done = this.completedSteps.size;
    const pct = Math.round((done / total) * 100);

    const bar = document.getElementById('study-progress-fill');
    const text = document.getElementById('study-progress-text');

    if (bar) bar.style.width = `${pct}%`;
    if (text) text.innerText = `${done} of ${total} Steps Completed (${pct}%)`;
  }

  renderKaTeX() {
    if (window.katex) {
      document.querySelectorAll('.topic-text').forEach(el => {
        // Render inline $$ and $
        let html = el.innerHTML;
        html = html.replace(/\$\$(.*?)\$\$/g, (match, eq) => {
          try {
            return katex.renderToString(eq, { displayMode: true });
          } catch (e) { return match; }
        });
        html = html.replace(/\$(.*?)\$/g, (match, eq) => {
          try {
            return katex.renderToString(eq, { displayMode: false });
          } catch (e) { return match; }
        });
        el.innerHTML = html;
      });
    }
  }

  findTopicById(id) {
    for (const sec of CURRICULUM_DATA) {
      for (const top of sec.topics) {
        if (top.id === id) return top;
      }
    }
    return null;
  }

  formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<br><br>');
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.qashuApp = new QashuApp();
});
