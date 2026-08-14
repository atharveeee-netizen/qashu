// Qashu Quantum Circuit Visualizer and Simulation Engine

export class CircuitVisualizer {
  constructor(containerId) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
  }

  render(circuitConfig) {
    if (!this.container || !circuitConfig) return;
    
    const numQubits = Math.max(1, circuitConfig.qubits || 1);
    const gates = circuitConfig.gates || [];
    
    const railHeight = 50;
    const paddingLeft = 60;
    const gateWidth = 60;
    const startX = 80;
    const width = Math.max(500, startX + (gates.length + 1) * gateWidth + 60);
    const height = numQubits * railHeight + 40;

    let svgHtml = `
      <svg class="qiskit-circuit-svg" width="100%" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
    `;

    // Draw Qubit lines & labels
    for (let i = 0; i < numQubits; i++) {
      const y = 30 + i * railHeight;
      svgHtml += `
        <text x="15" y="${y + 5}" class="qubit-label">q[${i}]</text>
        <text x="45" y="${y + 5}" class="qubit-ket">|0⟩</text>
        <line x1="${paddingLeft}" y1="${y}" x2="${width - 30}" y2="${y}" class="qubit-wire" />
      `;
    }

    // Draw Gates
    gates.forEach((gate, index) => {
      const x = startX + index * gateWidth;
      const targetY = 30 + gate.target * railHeight;

      if (gate.name === 'CX' || gate.name === 'CZ') {
        const controlY = 30 + gate.control * railHeight;
        // Connecting line between control and target
        svgHtml += `
          <line x1="${x}" y1="${controlY}" x2="${x}" y2="${targetY}" class="gate-connector" />
          <circle cx="${x}" cy="${controlY}" r="6" class="gate-control-dot" />
        `;
        if (gate.name === 'CX') {
          svgHtml += `
            <circle cx="${x}" cy="${targetY}" r="12" class="gate-cx-target" />
            <line x1="${x - 7}" y1="${targetY}" x2="${x + 7}" y2="${targetY}" stroke="#00f2fe" stroke-width="2" />
            <line x1="${x}" y1="${targetY - 7}" x2="${x}" y2="${targetY + 7}" stroke="#00f2fe" stroke-width="2" />
          `;
        } else { // CZ
          svgHtml += `<circle cx="${x}" cy="${targetY}" r="6" class="gate-control-dot" />`;
        }
      } else if (gate.name === 'SWAP') {
        const controlY = 30 + gate.control * railHeight;
        svgHtml += `
          <line x1="${x}" y1="${controlY}" x2="${x}" y2="${targetY}" class="gate-connector" />
          <path d="M${x-6},${controlY-6} L${x+6},${controlY+6} M${x+6},${controlY-6} L${x-6},${controlY+6}" stroke="#00f2fe" stroke-width="2.5" />
          <path d="M${x-6},${targetY-6} L${x+6},${targetY+6} M${x+6},${targetY-6} L${x-6},${targetY+6}" stroke="#00f2fe" stroke-width="2.5" />
        `;
      } else if (gate.name === 'M') {
        svgHtml += `
          <rect x="${x - 18}" y="${targetY - 18}" width="36" height="36" rx="6" class="gate-box gate-measure" />
          <path d="M ${x - 10} ${targetY + 6} A 10 10 0 0 1 ${x + 10} ${targetY + 6}" fill="none" stroke="#ff007a" stroke-width="2" />
          <line x1="${x}" y1="${targetY + 4}" x2="${x + 8}" y2="${targetY - 8}" stroke="#ff007a" stroke-width="2" />
        `;
      } else {
        // Single qubit gate (H, X, Z, S, T, RX, RY, RZ)
        svgHtml += `
          <rect x="${x - 18}" y="${targetY - 18}" width="36" height="36" rx="6" class="gate-box" />
          <text x="${x}" y="${targetY + 5}" class="gate-text">${gate.name}</text>
        `;
      }
    });

    svgHtml += `</svg>`;
    this.container.innerHTML = svgHtml;
  }
}

// Mini JS Quantum State Simulator for live interactive output demonstration
export function simulateCircuit(circuitConfig, shots = 1024) {
  const numQubits = Math.min(3, circuitConfig.qubits || 1);
  const numStates = 1 << numQubits;
  
  // Statevector initialized to |00...0>
  let stateReal = new Float64Array(numStates);
  let stateImag = new Float64Array(numStates);
  stateReal[0] = 1.0;

  const gates = circuitConfig.gates || [];

  for (const gate of gates) {
    const target = gate.target;
    const name = gate.name;

    if (name === 'H') {
      const invSqrt2 = 1.0 / Math.SQRT2;
      for (let i = 0; i < numStates; i++) {
        if ((i & (1 << target)) === 0) {
          const pair = i | (1 << target);
          const r0 = stateReal[i], i0 = stateImag[i];
          const r1 = stateReal[pair], i1 = stateImag[pair];
          stateReal[i] = invSqrt2 * (r0 + r1);
          stateImag[i] = invSqrt2 * (i0 + i1);
          stateReal[pair] = invSqrt2 * (r0 - r1);
          stateImag[pair] = invSqrt2 * (i0 - i1);
        }
      }
    } else if (name === 'X') {
      for (let i = 0; i < numStates; i++) {
        if ((i & (1 << target)) === 0) {
          const pair = i | (1 << target);
          let tr = stateReal[i], ti = stateImag[i];
          stateReal[i] = stateReal[pair];
          stateImag[i] = stateImag[pair];
          stateReal[pair] = tr;
          stateImag[pair] = ti;
        }
      }
    } else if (name === 'Z') {
      for (let i = 0; i < numStates; i++) {
        if ((i & (1 << target)) !== 0) {
          stateReal[i] = -stateReal[i];
          stateImag[i] = -stateImag[i];
        }
      }
    } else if (name === 'CX') {
      const control = gate.control;
      for (let i = 0; i < numStates; i++) {
        if ((i & (1 << control)) !== 0 && (i & (1 << target)) === 0) {
          const pair = i | (1 << target);
          let tr = stateReal[i], ti = stateImag[i];
          stateReal[i] = stateReal[pair];
          stateImag[i] = stateImag[pair];
          stateReal[pair] = tr;
          stateImag[pair] = ti;
        }
      }
    }
  }

  // Calculate probabilities
  const probs = new Float64Array(numStates);
  for (let i = 0; i < numStates; i++) {
    probs[i] = stateReal[i] * stateReal[i] + stateImag[i] * stateImag[i];
  }

  // Simulate shots
  const counts = {};
  for (let s = 0; s < shots; s++) {
    const r = Math.random();
    let acc = 0;
    let chosen = 0;
    for (let i = 0; i < numStates; i++) {
      acc += probs[i];
      if (r <= acc) {
        chosen = i;
        break;
      }
    }
    const bitstring = chosen.toString(2).padStart(numQubits, '0');
    counts[bitstring] = (counts[bitstring] || 0) + 1;
  }

  return { probs, counts, numQubits };
}
