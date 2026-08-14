export interface VaultNote {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  date?: string;
  readTime?: string;
  content: string;
  filePath?: string;
  order?: number;
}

export const VAULT_NOTES: VaultNote[] = [
  {
    slug: "qashu-index",
    title: "Qashu",
    category: "Map of Content",
    tags: ["qc/moc"],
    date: "Jul 27, 2026",
    readTime: "16 min read",
    content: `
Map of Content for a self-directed quantum computing curriculum, built up from lecture material, hands-on labs, and other resources along the way. Central hub — everything links back here.

## Concept Map

### Absolute Basics
- **What is a Quantum Computer** (the physical device and why it's not "a faster classical computer")
- **What is a Qubit** (state vector, ket notation, normalization)
- **Superposition** (interference, not classical probability)
- **Bloch Sphere** (the geometric picture — and where it stops applying)
- **Measurement and Collapse** (the Born rule, why quantum programs are inherently probabilistic)

### Programming a Quantum Computer
- **QuantumCircuit Basics** (registers, adding gates, .compose(), drawing)
- **The Primitives Family** (Sampler vs Estimator vs Executor, PUBs, local vs Runtime)
- **Parameterized Circuits** (Parameter/ParameterVector, why transpile-once-bind-many matters)
- **Simulators — Statevector vs Shot-Based** (exact amplitudes vs sampled counts, fake backends)

### Foundations
- **Pauli Operators** (X, Y, Z, identity, matrix representations)
- **SparsePauliOp** (constructing observable operators efficiently in Qiskit)
- **Gates (X, H, CX, Z, S, T)** (single and multi-qubit gate operations)
- **Tensor Products** (combining qubit statevectors and operator matrices)
- **Why Gates Are Unitary** (reversibility, norm preservation, U^\dagger U = I)

### Why Quantum Computing Matters
- **Quantum Speedup** (Ingredients and Myths)
- **Deutsch's Algorithm** (first quantum algorithm showing speedup)
- **Deutsch-Jozsa Algorithm** (constant vs balanced function evaluation in 1 query)
- **Computational Complexity** (P / NP / BQP relations)

### Entangled States
- **Bell States** (the 4 maximally entangled 2-qubit basis states)
- **GHZ States** (N-qubit maximal entanglement)
- **Dynamic GHZ via Qubit Reuse** (PRX Quantum 2024 construction)
- **CHSH Inequality and Bell Tests** (S <= 2 classical vs S = 2\sqrt{2} quantum violation)
- **Quantum Teleportation** (state transfer via pre-shared Bell pair + 2 classical bits)
- **No-Cloning Theorem** (copy -> know -> measure -> disturb)

### Quantum Communication
- **E91 QKD** (Entanglement-Based QKD using CHSH Bell violation)
- **BB84 QKD** (polarization/basis encoding, eavesdropping detection)

### Depth & Optimization
- **Circuit Depth** (critical-path parallel scheduling, .depth())
- **Circuit Introspection Cheat Sheet** (num_qubits, 2-qubit depth, count_ops())
- **Start From the Middle** (halving CX depth for GHZ states)
- **Recursive Fan-Out** (doubling entanglement spread per layer)

### Hardware Reality
- **Heavy-Hex Topology** (IBM hardware lattice layout)
- **Transpilation** (basis gates decomposition, SWAP overhead)
- **Backend Properties** (T_1, T_2, single-qubit error, CX error, readout error)

### Noise & Error Models
- **Density Matrix** (\rho = \sum p_i |\psi_i\rangle\langle\psi_i|)
- **Pauli & Depolarizing Noise Models** (bit-flip, phase-flip, thermal relaxation)

### Dynamic Circuits
- **Dynamic Circuits Overview** (mid-circuit measurement, qc.reset(), qc.if_test(), feedforward)
- **Dynamic GHZ via Qubit Reuse** (long-range entanglement)

### Error Mitigation
- **Zero Noise Extrapolation & PEC** (noise amplification & probabilistic cancellation)
- **Error Correction & Surface Codes** (stabilizer codes, syndrome measurements)

### Quantum Algorithms
- **QFT & Quantum Phase Estimation** (with H_2 worked example)
- **Grover's Search Algorithm** (amplitude amplification)
- **VQE & QAOA** (with Partition Problem worked example)

### Quantum Machine Learning
- **Data Encoding & Feature Maps** (ZZFeatureMap)
- **QNN & Quantum Kernel Methods** (Quantum Kernel Estimation)

### Quantum Advantage
- **Definition & Verification Criteria**
- **Peaked Circuits & Loschmidt Echo**

### Quantum + HPC
- **Quantum-Centric Supercomputing** (modular QPUs integrated with HPC clusters)
- **Hybrid Workflow Patterns** (ML-assisted transpilation)

### Reading the Literature
- **First-Pass Framework for Quantum Papers**
- **Spotting Hype and Omissions**
`
  },
  {
    slug: "absolute-basics/what-is-a-quantum-computer",
    title: "What is a Quantum Computer",
    category: "Absolute Basics",
    tags: ["qc/basics", "qc/hardware"],
    date: "Jul 27, 2026",
    content: `
A quantum computer is a device that stores and transforms information in qubits — quantum-mechanical states — instead of classical bits, exploiting superposition and entanglement to represent and manipulate information in ways classical bits fundamentally can’t. Key insight: it is not a faster classical computer.

### What's physically inside one
IBM’s devices use superconducting transmon qubits — tiny circuits etched from superconducting metal on a chip, each behaving like an artificial atom with quantized energy levels that stand in for $|0\\rangle$ and $|1\\rangle$.

What’s actually inside a transmon: a Josephson junction — a thin insulating gap between two superconductors — acting as a nonlinear inductor in an otherwise ordinary LC oscillator circuit.

\`\`\`python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
psi = Statevector(qc)
print("Initial statevector:", psi.data)
\`\`\`
`
  },
  {
    slug: "absolute-basics/what-is-a-qubit",
    title: "What is a Qubit",
    category: "Absolute Basics",
    tags: ["qc/basics", "qc/math"],
    date: "Jul 27, 2026",
    content: `
A classical bit is always definitely 0 or 1. A qubit is a vector in a 2-dimensional complex vector space:

$$|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle, \\qquad \\alpha,\\beta \\in \\mathbb{C}, \\qquad |\\alpha|^2 + |\\beta|^2 = 1$$

where $|0\\rangle = \\begin{pmatrix}1\\\\0\\end{pmatrix}$ and $|1\\rangle = \\begin{pmatrix}0\\\\1\\end{pmatrix}$.

\`\`\`python
from qiskit.quantum_info import Statevector

psi = Statevector([0.6, 0.8])
print("Probabilities:", psi.probabilities())
\`\`\`
`
  },
  {
    slug: "absolute-basics/superposition",
    title: "Superposition",
    category: "Absolute Basics",
    tags: ["qc/basics", "qc/math"],
    date: "Jul 27, 2026",
    content: `
A qubit in superposition is in a coherent combination of $|0\\rangle$ and $|1\\rangle$ simultaneously, e.g. $\\frac{1}{\\sqrt{2}}(|0\\rangle+|1\\rangle)$. This is not the same as a classical coin flip.

### Interference
Quantum amplitudes are complex numbers and can cancel:

$$\\frac{1}{2} + \\left(-\\frac{1}{2}\\right) = 0$$

\`\`\`python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
qc.h(0)
print("Probabilities:", Statevector(qc).probabilities())
\`\`\`
`
  },
  {
    slug: "absolute-basics/bloch-sphere",
    title: "Bloch Sphere",
    category: "Absolute Basics",
    tags: ["qc/basics", "qc/math"],
    date: "Jul 27, 2026",
    content: `
Any single-qubit pure state can be written using two real angles:

$$|\\psi\\rangle = \\cos\\!\\left(\\frac{\\theta}{2}\\right)|0\\rangle + e^{i\\phi}\\sin\\!\\left(\\frac{\\theta}{2}\\right)|1\\rangle$$

This is a point on the surface of a unit sphere — the Bloch sphere.
`
  },
  {
    slug: "absolute-basics/measurement-and-collapse",
    title: "Measurement and Collapse",
    category: "Absolute Basics",
    tags: ["qc/basics", "qc/math"],
    date: "Jul 27, 2026",
    content: `
Measuring a qubit $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ gives outcome 0 with probability $|\\alpha|^2$ and outcome 1 with probability $|\\beta|^2$ — the Born rule.

\`\`\`python
from qiskit import QuantumCircuit
from qiskit_aer.primitives import SamplerV2

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)
result = SamplerV2().run([qc], shots=1000).result()
print("Counts:", result[0].data.c.get_counts())
\`\`\`
`
  }
];
