// Qashu Quantum Interactive Widgets (Scroll-Driven & Tabbed Bloch Sphere + Qiskit Circuit + Graph View)
(function() {
  function initQuantumWidgets() {
    const graphElem = document.querySelector('.graph');
    if (!graphElem || graphElem.dataset.widgetsInitialized) return;
    graphElem.dataset.widgetsInitialized = 'true';

    // 1. Create Tab Headers
    const h3 = graphElem.querySelector('h3');
    if (h3) h3.style.display = 'none';

    const tabContainer = document.createElement('div');
    tabContainer.className = 'qashu-tab-container';
    tabContainer.innerHTML = `
      <style>
        .qashu-tab-container {
          display: flex;
          gap: 4px;
          margin-bottom: 8px;
          border-bottom: 1px solid var(--lightgray);
          padding-bottom: 6px;
        }
        .qashu-tab-btn {
          background: none;
          border: 1px solid transparent;
          color: var(--gray);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 3px 6px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .qashu-tab-btn:hover {
          color: var(--dark);
          background: var(--lightgray);
        }
        .qashu-tab-btn.active {
          color: #3b82f6;
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.12);
        }
        .qashu-widget-panel {
          display: none;
          width: 100%;
          border: 1px solid var(--lightgray);
          border-radius: 6px;
          background: var(--light);
          padding: 8px;
          box-sizing: border-box;
          margin-bottom: 12px;
        }
        .qashu-widget-panel.active {
          display: block;
        }
        .bloch-controls, .circuit-controls {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 6px;
          font-size: 0.72rem;
          justify-content: center;
        }
        .qashu-btn {
          background: var(--lightgray);
          color: var(--dark);
          border: none;
          padding: 2px 6px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 0.72rem;
          font-weight: 600;
        }
        .qashu-btn:hover {
          background: #3b82f6;
          color: #fff;
        }
      </style>
      <button class="qashu-tab-btn active" data-target="panel-graph">🕸️ Graph</button>
      <button class="qashu-tab-btn" data-target="panel-bloch">🌐 Bloch Sphere</button>
      <button class="qashu-tab-btn" data-target="panel-circuit">⚛️ Circuit</button>
    `;

    graphElem.insertBefore(tabContainer, graphElem.firstChild);

    // Wrap graph-outer inside panel-graph
    const graphOuter = graphElem.querySelector('.graph-outer');
    if (graphOuter) {
      const panelGraph = document.createElement('div');
      panelGraph.id = 'panel-graph';
      panelGraph.className = 'qashu-widget-panel active';
      graphOuter.parentNode.insertBefore(panelGraph, graphOuter);
      panelGraph.appendChild(graphOuter);
    }

    // 2. Create Bloch Sphere Panel
    const panelBloch = document.createElement('div');
    panelBloch.id = 'panel-bloch';
    panelBloch.className = 'qashu-widget-panel';
    panelBloch.innerHTML = `
      <div style="font-size:0.75rem; font-weight:700; color:var(--dark); margin-bottom:4px; text-align:center;">🌐 Bloch Sphere State</div>
      <canvas id="bloch-canvas" width="220" height="170" style="width:100%; height:170px; display:block; margin:0 auto;"></canvas>
      <div style="font-size:0.72rem; color:var(--gray); text-align:center; margin-top:4px;" id="bloch-readout">
        |ψ⟩ = 1.00|0⟩ + 0.00|1⟩
      </div>
      <div class="bloch-controls">
        <button class="qashu-btn" onclick="window.setBlochPreset(0, 0)">|0⟩</button>
        <button class="qashu-btn" onclick="window.setBlochPreset(Math.PI, 0)">|1⟩</button>
        <button class="qashu-btn" onclick="window.setBlochPreset(Math.PI/2, 0)">|+⟩</button>
        <button class="qashu-btn" onclick="window.setBlochPreset(Math.PI/2, Math.PI)">|-⟩</button>
        <button class="qashu-btn" onclick="window.setBlochPreset(Math.PI/2, Math.PI/2)">|i⟩</button>
      </div>
    `;
    graphElem.appendChild(panelBloch);

    // 3. Create Qiskit Circuit Simulator Panel
    const panelCircuit = document.createElement('div');
    panelCircuit.id = 'panel-circuit';
    panelCircuit.className = 'qashu-widget-panel';
    panelCircuit.innerHTML = `
      <div style="font-size:0.75rem; font-weight:700; color:var(--dark); margin-bottom:4px; text-align:center;">⚛️ Qiskit Circuit Builder</div>
      <canvas id="circuit-canvas" width="220" height="140" style="width:100%; height:140px; display:block; margin:0 auto;"></canvas>
      <div class="circuit-controls">
        <button class="qashu-btn" onclick="window.addCircuitGate('H')">+ H</button>
        <button class="qashu-btn" onclick="window.addCircuitGate('X')">+ X</button>
        <button class="qashu-btn" onclick="window.addCircuitGate('Z')">+ Z</button>
        <button class="qashu-btn" onclick="window.addCircuitGate('CX')">+ CX</button>
        <button class="qashu-btn" onclick="window.addCircuitGate('M')">+ M</button>
        <button class="qashu-btn" style="background:#ef4444; color:#fff;" onclick="window.resetCircuit()">Reset</button>
      </div>
    `;
    graphElem.appendChild(panelCircuit);

    // Function to activate a specific tab
    function activateTab(tabId) {
      tabContainer.querySelectorAll('.qashu-tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.target === tabId);
      });
      graphElem.querySelectorAll('.qashu-widget-panel').forEach(p => {
        p.classList.toggle('active', p.id === tabId);
      });
      if (tabId === 'panel-bloch') drawBlochSphere();
      if (tabId === 'panel-circuit') drawCircuit();
    }

    // 4. Tab Switching Event Listeners
    tabContainer.querySelectorAll('.qashu-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => activateTab(btn.dataset.target));
    });

    // 5. Scroll-Driven Intersection Observer for Section-Based Priority
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const text = entry.target.textContent.toLowerCase();
          if (text.includes('qubit') || text.includes('bloch') || text.includes('superposition') || text.includes('state')) {
            activateTab('panel-bloch');
          } else if (text.includes('circuit') || text.includes('gate') || text.includes('qiskit') || text.includes('cnot') || text.includes('algorithm')) {
            activateTab('panel-circuit');
          }
        }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('article h2, article h3').forEach(h => observer.observe(h));

    // Bloch Sphere Renderer
    let theta = 0;
    let phi = 0;

    window.setBlochPreset = function(t, p) {
      theta = t;
      phi = p;
      drawBlochSphere();
    };

    function drawBlochSphere() {
      const canvas = document.getElementById('bloch-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2 - 5;
      const r = 55;

      ctx.clearRect(0, 0, w, h);

      // Sphere outline
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Equator ellipse
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.3, 0, 0, 2 * Math.PI);
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = 'rgba(120, 120, 120, 0.3)';
      ctx.stroke();
      ctx.setLineDash([]);

      // Z Axis
      ctx.beginPath();
      ctx.moveTo(cx, cy - r - 8);
      ctx.lineTo(cx, cy + r + 8);
      ctx.strokeStyle = 'rgba(180, 180, 180, 0.5)';
      ctx.stroke();

      // Labels |0> and |1>
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('|0⟩', cx - 8, cy - r - 10);
      ctx.fillText('|1⟩', cx - 8, cy + r + 18);

      // State vector tip coordinates
      const vx = r * Math.sin(theta) * Math.cos(phi);
      const vy = -r * Math.cos(theta);
      const vz = r * Math.sin(theta) * Math.sin(phi) * 0.3;

      const px = cx + vx + vz * 0.5;
      const py = cy + vy;

      // Draw State Vector Arrow
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Arrow head dot
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // Update readout
      const alpha = Math.cos(theta / 2).toFixed(2);
      const beta = Math.sin(theta / 2).toFixed(2);
      const readout = document.getElementById('bloch-readout');
      if (readout) {
        readout.innerHTML = `|ψ⟩ = ${alpha}|0⟩ + ${beta}|1⟩`;
      }
    }

    // Qiskit Circuit Renderer
    let gates = ['H', 'CX', 'M'];

    window.addCircuitGate = function(g) {
      if (gates.length < 5) gates.push(g);
      drawCircuit();
    };

    window.resetCircuit = function() {
      gates = [];
      drawCircuit();
    };

    function drawCircuit() {
      const canvas = document.getElementById('circuit-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Wires
      ctx.strokeStyle = 'rgba(180, 180, 180, 0.6)';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(35, 40);
      ctx.lineTo(w - 10, 40);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(35, 90);
      ctx.lineTo(w - 10, 90);
      ctx.stroke();

      // Wire Labels
      ctx.fillStyle = '#a1a1aa';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('q[0]', 5, 44);
      ctx.fillText('q[1]', 5, 94);

      // Draw Gates
      let startX = 45;
      gates.forEach(g => {
        if (g === 'H' || g === 'X' || g === 'Z') {
          ctx.fillStyle = '#3b82f6';
          ctx.fillRect(startX, 28, 24, 24);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText(g, startX + 7, 44);
          startX += 30;
        } else if (g === 'CX') {
          ctx.beginPath();
          ctx.arc(startX + 12, 40, 4, 0, 2 * Math.PI);
          ctx.fillStyle = '#ef4444';
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(startX + 12, 40);
          ctx.lineTo(startX + 12, 90);
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(startX + 12, 90, 7, 0, 2 * Math.PI);
          ctx.strokeStyle = '#ef4444';
          ctx.stroke();

          startX += 30;
        } else if (g === 'M') {
          ctx.fillStyle = '#10b981';
          ctx.fillRect(startX, 28, 24, 24);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText('M', startX + 7, 44);
          startX += 30;
        }
      });
    }

    drawBlochSphere();
    drawCircuit();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuantumWidgets);
  } else {
    initQuantumWidgets();
  }
  document.addEventListener('nav', initQuantumWidgets);
  document.addEventListener('render', initQuantumWidgets);
})();
