// Qashu Knowledge Vault Data (Content Index)
// 100% faithful content from qcroadmap.com under title: Qashu

export const VAULT_NOTES = [
  {
    slug: "qashu-index",
    title: "Qashu",
    category: "Map of Content",
    tags: ["qc/moc"],
    date: "Jul 27, 2026",
    readTime: "16 min read",
    content: `
<pre class="ascii-art">
  ...
    .:.
      .:.
        .::.
          .:*.
            .*#:.                               ..
              .##*:.                        .:::*#*.
                :###*::..         .......:**#*.:*:::
                 .###*:...::::::**############:.#.::
                  :#:..*####**::**###*::#####*..:.:.
                   ..:###*..      ...  *####:..:..
                    :*##:            .:####:.:..
                   .*##:             .###:..:.
                   ::##:             :#*::.:
                  .::###.          .*#:.:#.
                  ::###*...     .:*#*:.....
                 ::*###. ..:::*##*:.... .*:
               ..:#####*#####*:.. .....:##*
             ...*:*####**::.  ..... .::**##*.
           ...:.::::::::.......          ..*#:
           *..*:::.........                 .:..
           .::....                             ...
                                                 ..
</pre>

Map of Content for a self-directed quantum computing curriculum, built up from lecture material, hands-on labs, and other resources along the way. Central hub — everything links back here.

## Concept Map

### Absolute Basics
- **[What is a Quantum Computer](#note/absolute-basics/what-is-a-quantum-computer)** (the physical device and why it's not "a faster classical computer")
- **[What is a Qubit](#note/absolute-basics/what-is-a-qubit)** (state vector, ket notation, normalization)
- **[Superposition](#note/absolute-basics/superposition)** (interference, not classical probability)
- **[Bloch Sphere](#note/absolute-basics/bloch-sphere)** (the geometric picture — and where it stops applying)
- **[Measurement and Collapse](#note/absolute-basics/measurement-and-collapse)** (the Born rule, why quantum programs are inherently probabilistic)

### Programming a Quantum Computer
- **[QuantumCircuit Basics](#note/programming-a-quantum-computer/quantumcircuit-basics)** (registers, adding gates, \`.compose()\`, drawing)
- **[The Primitives Family](#note/programming-a-quantum-computer/the-primitives-family)** (Sampler vs Estimator vs Executor, PUBs, local vs Runtime)
- **[Parameterized Circuits](#note/programming-a-quantum-computer/parameterized-circuits)** (\`Parameter\`/\`ParameterVector\`, why transpile-once-bind-many matters)
- **[Simulators — Statevector vs Shot-Based](#note/programming-a-quantum-computer/simulators-statevector-vs-shot-based)** (exact amplitudes vs sampled counts, fake backends)

### Foundations
- **[Pauli Operators](#note/foundations/pauli-operators)** (X, Y, Z, identity, matrix representations)
- **[SparsePauliOp](#note/foundations/sparsepauliop)** (constructing observable operators efficiently in Qiskit)
- **[X / H / CX / Z / S / T Gates](#note/foundations/gates-xhcxzt)** (single and multi-qubit gate operations)
- **[Tensor Products](#note/foundations/tensor-products)** (combining qubit statevectors and operator matrices)
- **[Why Gates Are Unitary](#note/foundations/why-gates-are-unitary)** (reversibility, norm preservation, $U^\\dagger U = I$)
- **[Universal Gate Sets & Clifford Group](#note/foundations/universal-gate-sets)** (Gottesman-Knill theorem, non-Clifford T gate)

### Why Quantum Computing Matters
- **[Quantum Speedup](#note/why-quantum-computing-matters/quantum-speedup)** (Ingredients and Myths)
- **[Deutsch's Algorithm](#note/why-quantum-computing-matters/deutschs-algorithm)** (first quantum algorithm showing speedup)
- **[Deutsch-Jozsa Algorithm](#note/why-quantum-computing-matters/deutsch-jozsa)** (constant vs balanced function evaluation in 1 query)
- **[Computational Complexity](#note/why-quantum-computing-matters/computational-complexity)** (P / NP / BQP relations)
- **[The Quantum Algorithm Zoo](#note/why-quantum-computing-matters/quantum-algorithm-zoo)**
- **[What Quantum Computers Are Good For](#note/why-quantum-computing-matters/what-quantum-computers-are-good-for)**
- **[Quantum Utility vs Quantum Advantage](#note/why-quantum-computing-matters/quantum-utility-vs-advantage)** (useful classical-beating calculations vs formal speedup)

### Entangled States
- **[Bell States](#note/entangled-states/bell-states)** (the 4 maximally entangled 2-qubit basis states)
- **[GHZ States](#note/entangled-states/ghz-states)** ($N$-qubit maximal entanglement)
- **[Dynamic GHZ via Qubit Reuse](#note/entangled-states/dynamic-ghz-reuse)** (PRX Quantum 2024 construction)
- **[CHSH Inequality and Bell Tests](#note/entangled-states/chsh-inequality)** ($S \\le 2$ classical vs $S = 2\\sqrt{2}$ quantum violation)
- **[Quantum Teleportation](#note/entangled-states/quantum-teleportation)** (state transfer via pre-shared Bell pair + 2 classical bits)
- **[No-Cloning Theorem](#note/entangled-states/no-cloning-theorem)** (sketches: copy $\\to$ know $\\to$ measure $\\to$ disturb)

### Quantum Communication
- **[E91 QKD](#note/quantum-communication/e91-qkd)** (Entanglement-Based QKD using CHSH Bell violation)
- **[BB84 QKD](#note/quantum-communication/bb84-qkd)** (polarization/basis encoding, eavesdropping detection)

### Depth & Optimization
- **[Circuit Depth](#note/depth-and-optimization/circuit-depth)** (critical-path parallel scheduling, \`.depth()\`)
- **[Circuit Introspection Cheat Sheet](#note/depth-and-optimization/circuit-introspection)** (\`num_qubits\`, 2-qubit depth, \`count_ops()\`, \`num_nonlocal_gates()\`)
- **[Start From the Middle](#note/depth-and-optimization/start-from-the-middle)** (halving CX depth for GHZ states)
- **[Recursive Fan-Out](#note/depth-and-optimization/recursive-fan-out)** (doubling entanglement spread per layer: $\\lceil\\log_2 N\\rceil + 1$)

### Hardware Reality
- **[Heavy-Hex Topology](#note/hardware-reality/heavy-hex-topology)** (IBM hardware lattice layout)
- **[Transpilation](#note/hardware-reality/transpilation)** (basis gates decomposition, SWAP overhead)
- **[Backend Properties](#note/hardware-reality/backend-properties)** ($T_1$, $T_2$, single-qubit error, CX error, readout error)

### Noise & Error Models
- **[Density Matrix](#note/noise-and-error-models/density-matrix)** ($\\rho = \\sum p_i |\\psi_i\\rangle\\langle\\psi_i|$, mixed vs pure states)
- **[Pauli & Depolarizing Noise Models](#note/noise-and-error-models/pauli-noise-models)** (bit-flip, phase-flip, thermal relaxation)

### Dynamic Circuits
- **[Dynamic Circuits Overview](#note/dynamic-circuits/dynamic-circuits-basics)** (mid-circuit measurement, \`qc.reset()\`, \`qc.if_test()\`, feedforward)
- **[Dynamic GHZ via Qubit Reuse](#note/dynamic-circuits/dynamic-ghz-reuse)** (long-range entanglement)

### Error Mitigation
- **[Zero Noise Extrapolation & PEC](#note/error-mitigation/zne-and-pec)** (noise amplification & probabilistic cancellation)
- **[Error Correction & Surface Codes](#note/error-mitigation/error-correction-ec)** (stabilizer codes, syndrome measurements)

### Quantum Algorithms
- **[QFT & Quantum Phase Estimation](#note/quantum-algorithms/qft-and-qpe)** (with $H_2$ worked example)
- **[Grover's Search Algorithm](#note/quantum-algorithms/grovers-algorithm)** (amplitude amplification for $O(\\sqrt{N})$ search)
- **[VQE & QAOA](#note/quantum-algorithms/vqe-and-qaoa)** (with Partition Problem worked example)

### Quantum Machine Learning
- **[Data Encoding & Feature Maps](#note/quantum-machine-learning/data-encoding-feature-maps)** (ZZFeatureMap)
- **[QNN & Quantum Kernel Methods](#note/quantum-machine-learning/qnn-and-quantum-kernels)** (Quantum Kernel Estimation)

### Quantum Advantage
- **[Definition & Verification Criteria](#note/quantum-advantage/quantum-advantage-criteria)**
- **[Peaked Circuits & Loschmidt Echo](#note/quantum-advantage/peaked-circuits-loschmidt)**

### Quantum + HPC
- **[Quantum-Centric Supercomputing](#note/quantum-hpc/quantum-centric-supercomputing)** (modular QPUs integrated with HPC clusters)
- **[Hybrid Workflow Patterns](#note/quantum-hpc/hybrid-workflow-patterns)** (ML-assisted transpilation & surrogate models)

### Reading the Literature
- **[First-Pass Framework for Quantum Papers](#note/reading-the-literature/first-pass-framework)**
- **[Spotting Hype and Omissions](#note/reading-the-literature/spotting-hype-and-omissions)**

## Suggested Study Order (19-Step Path)

1. What is a Quantum Computer
2. What is a Qubit
3. Superposition
4. Bloch Sphere
5. Measurement and Collapse
6. QuantumCircuit Basics
7. X / H / CX / Z / S / T Gates
8. Tensor Products
9. Pauli Operators
10. Bell States
11. The Primitives Family
12. Parameterized Circuits
13. Simulators — Statevector vs Shot-Based
14. Circuit Depth
15. Transpilation
16. Deutsch's Algorithm & Deutsch-Jozsa
17. QFT & Quantum Phase Estimation
18. Grover's Search Algorithm
19. VQE & QAOA

## Open Threads

- **Dynamic Circuit Feedforward Latency on IBM Heron:** Investigating classical feedforward roundtrip latency (< 1 μs target) for mid-circuit conditional operations on 156-qubit Heron architecture.
- **Benchmarking NoiseLearnerV3 vs PEC:** Comparing sample complexity scaling of twirled NoiseLearnerV3 sparse Pauli models against traditional PEC on 100+ qubit observables.
- **Tensor Network MPS Bounds vs Quantum Utility:** Evaluating classical matrix product state (MPS) bond dimension limits against recent utility scale expectation experiments.
- **Surface Code Logical Qubit Ancilla Overhead:** Optimizing syndrome extraction routing to reduce physical qubit requirements for distance-5 logical qubit memory.
`
  },

  // Absolute Basics
  {
    slug: "absolute-basics/what-is-a-quantum-computer",
    title: "What is a Quantum Computer",
    category: "Absolute Basics",
    tags: ["qc/basics", "qc/hardware"],
    content: `
A quantum computer is a device that stores and transforms information in qubits — quantum-mechanical states — instead of classical bits, exploiting superposition and entanglement to represent and manipulate information in ways classical bits fundamentally can’t. Key insight: it is not a faster classical computer. A classical bit is always definitely 0 or 1; a qubit’s advantage comes from interference between possibilities, not from "trying every answer at once for free" — you still only ever read out plain classical bits at the end (see Measurement and Collapse).

### What's physically inside one
IBM’s devices use superconducting transmon qubits — tiny circuits etched from superconducting metal on a chip, each behaving like an artificial atom with quantized energy levels that stand in for $|0\\rangle$ and $|1\\rangle$.

What’s actually inside a transmon: a Josephson junction — a thin insulating gap between two superconductors — acting as a nonlinear inductor in an otherwise ordinary LC oscillator circuit. The junction’s nonlinearity is essential: a plain (linear) LC oscillator has evenly-spaced energy levels, so no pair of levels could ever be addressed individually — every drive pulse would excite all levels at once. The Josephson junction’s anharmonicity unevenly spaces the levels, which is precisely what lets $|0\\rangle$ and $|1\\rangle$ be isolated and driven independently without leaking into higher levels.

### Why it needs to be so cold and isolated
Superconducting qubits only behave quantum-mechanically when isolated from thermal noise and stray electromagnetic fields. IBM’s chips run inside a dilution refrigerator at around 15 millikelvin — colder than deep space. Any stray heat or noise leaking in causes the qubit to lose its quantum state (decoherence).

\`\`\`python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
# Qubit starts in state |0>
psi = Statevector(qc)
print("Initial statevector:", psi.data)
\`\`\`

### Self-Check
- Could you explain to a friend why a quantum computer isn’t "just a faster classical computer"?
- Why does a superconducting QPU need to be cooled to ~15 millikelvin?
- Why does a Josephson junction’s nonlinearity matter for being able to address $|0\\rangle$ and $|1\\rangle$ individually?
`
  },
  {
    slug: "absolute-basics/what-is-a-qubit",
    title: "What is a Qubit",
    category: "Absolute Basics",
    tags: ["qc/basics", "qc/math"],
    content: `
A classical bit is always definitely 0 or 1. A qubit is a vector in a 2-dimensional complex vector space, written in ket notation:

$$|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle, \\qquad \\alpha,\\beta \\in \\mathbb{C}, \\qquad |\\alpha|^2 + |\\beta|^2 = 1$$

where $|0\\rangle = \\begin{pmatrix}1\\\\0\\end{pmatrix}$ and $|1\\rangle = \\begin{pmatrix}0\\\\1\\end{pmatrix}$ — kets are column vectors, and $\\alpha, \\beta$ are its amplitudes.

Key insight: "0 and 1 at once" is a misleading pop-science shorthand. A qubit isn’t secretly holding two classical values for free — it holds one pair of complex amplitudes that determine probabilities when you measure it, and those amplitudes can interfere — add or cancel — in ways plain probabilities never can.

\`\`\`python
from qiskit.quantum_info import Statevector
import numpy as np

psi = Statevector([0.6, 0.8])   # alpha=0.6, beta=0.8 — satisfies |alpha|^2+|beta|^2=1
print("Probabilities P(0), P(1):", psi.probabilities())
\`\`\`

### Bras and inner products
A ket $|\\psi\\rangle$ is a column vector; its bra $\\langle\\psi|$ is the conjugate-transpose row vector. Pairing a bra with a ket gives the inner product: $\\langle a|b\\rangle = 1$ if $a=b$, else $0$.
`
  },
  {
    slug: "absolute-basics/superposition",
    title: "Superposition",
    category: "Absolute Basics",
    tags: ["qc/basics", "qc/math"],
    content: `
A qubit in superposition is in a coherent combination of $|0\\rangle$ and $|1\\rangle$ simultaneously, e.g. $\\frac{1}{\\sqrt{2}}(|0\\rangle+|1\\rangle)$. This is not the same as a classical coin flip. A classical coin in the air is either heads or tails, and you just don’t know which yet — a probability distribution over a definite hidden fact. A qubit in superposition doesn’t have a hidden definite value; it genuinely carries both amplitudes at once, including their relative phase, until measured.

### Why this matters: interference
Classical probabilities only ever add — they can shrink toward zero but never go negative. Quantum amplitudes are complex numbers and can cancel:

$$\\frac{1}{2} + \\left(-\\frac{1}{2}\\right) = 0$$

Two computational paths that would classically both contribute probability can instead destructively interfere to a net-zero amplitude for a "wrong" answer, while paths to the "right" answer constructively reinforce.

\`\`\`python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
qc.h(0)  # Apply Hadamard gate to create superposition
print("Probabilities:", Statevector(qc).probabilities())
\`\`\`
`
  },
  {
    slug: "absolute-basics/bloch-sphere",
    title: "Bloch Sphere",
    category: "Absolute Basics",
    tags: ["qc/basics", "qc/math"],
    content: `
Any single-qubit pure state can be written, up to an unobservable global phase, using two real angles instead of two complex amplitudes:

$$|\\psi\\rangle = \\cos\\!\\left(\\frac{\\theta}{2}\\right)|0\\rangle + e^{i\\phi}\\sin\\!\\left(\\frac{\\theta}{2}\\right)|1\\rangle, \\qquad \\theta \\in [0,\\pi],\\ \\phi \\in [0, 2\\pi)$$

This is exactly a point on the surface of a unit sphere — the Bloch sphere. North pole ($\\theta=0$) is $|0\\rangle$, south pole ($\\theta=\\pi$) is $|1\\rangle$, and every point on the equator is an equal superposition of $|0\\rangle$ and $|1\\rangle$ differing only in relative phase $\\phi$.

\`\`\`python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
qc.h(0)
qc.t(0)
print("Bloch Statevector:", Statevector(qc).data)
\`\`\`
`
  },
  {
    slug: "absolute-basics/measurement-and-collapse",
    title: "Measurement and Collapse",
    category: "Absolute Basics",
    tags: ["qc/basics", "qc/math"],
    content: `
Measuring a qubit $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ in the standard (Z) basis gives outcome 0 with probability $|\\alpha|^2$ and outcome 1 with probability $|\\beta|^2$ — the Born rule. Immediately after, the state is no longer $\\alpha|0\\rangle+\\beta|1\\rangle$: it’s exactly $|0\\rangle$ or exactly $|1\\rangle$, matching whatever outcome occurred. The superposition is destroyed by the act of measuring — this is collapse, and it’s irreversible.

\`\`\`python
from qiskit import QuantumCircuit
from qiskit_aer.primitives import SamplerV2

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)
result = SamplerV2().run([qc], shots=1000).result()
print("Sampled Counts:", result[0].data.c.get_counts())
\`\`\`
`
  },

  // Programming
  {
    slug: "programming-a-quantum-computer/quantumcircuit-basics",
    title: "QuantumCircuit Basics",
    category: "Programming",
    tags: ["qc/programming"],
    content: `
The \`QuantumCircuit\` object is Qiskit's core abstraction for specifying quantum programs. Circuits manage \`QuantumRegister\` and \`ClassicalRegister\` instances, allow gate append operations, and support modular composition via \`.compose()\`.

\`\`\`python
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister

qr = QuantumRegister(2, name="q")
cr = ClassicalRegister(2, name="c")
qc = QuantumCircuit(qr, cr)

qc.h(qr[0])
qc.cx(qr[0], qr[1])
qc.measure(qr, cr)
print(qc.draw(output="text"))
\`\`\`
`
  },
  {
    slug: "programming-a-quantum-computer/the-primitives-family",
    title: "The Primitives Family",
    category: "Programming",
    tags: ["qc/primitives"],
    content: `
Qiskit 1.x organizes execution around Primitives:
- **Sampler (SamplerV2):** Calculates quasi-probability distributions of bitstrings from measurement outputs.
- **Estimator (EstimatorV2):** Calculates expectation values of observable operators $\\langle\\psi|H|\\psi\\rangle$.
- **PUBs (Primitive Unified Blocs):** Standardized input tuples \`(circuit, observables, parameter_values)\` passed to Primitive execution methods.

\`\`\`python
from qiskit.circuit import QuantumCircuit
from qiskit.quantum_info import SparsePauliOp
from qiskit_aer.primitives import EstimatorV2

qc = QuantumCircuit(1)
qc.h(0)
observable = SparsePauliOp(["Z", "X"])

estimator = EstimatorV2()
job = estimator.run([(qc, observable)])
pub_result = job.result()[0]
print("Expectation values:", pub_result.data.evs)
\`\`\`
`
  },

  // Algorithms Worked Examples
  {
    slug: "quantum-algorithms/qft-and-qpe",
    title: "QFT & Quantum Phase Estimation",
    category: "Quantum Algorithms",
    tags: ["qc/algorithms"],
    content: `
The Quantum Fourier Transform (QFT) maps computational basis states to phase frequency basis in $O(N^2)$ gates vs classical FFT $O(N 2^N)$.

Quantum Phase Estimation (QPE) estimates the eigenvalue phase $\\theta$ of unitary operator $U|\\psi\\rangle = e^{2\\pi i \\theta}|\\psi\\rangle$.

### $H_2$ Molecule Worked Example
Estimating the molecular ground state energy of $H_2$ at bond distance $R=0.735\\text{ Å}$. The Jordan-Wigner transformation maps the 2-qubit molecular Hamiltonian into Pauli operators:

$$H = c_0 I + c_1 Z_0 + c_2 Z_1 + c_3 Z_0 Z_1 + c_4 X_0 X_1$$

QPE measures phase $\\theta = E_{\\text{ground}} / (2\\pi)$.

\`\`\`python
from qiskit import QuantumCircuit
import numpy as np

qc = QuantumCircuit(3)
qc.h(2)
qc.cp(np.pi/2, 1, 2)
qc.cp(np.pi/4, 0, 2)
qc.h(1)
qc.cp(np.pi/2, 0, 1)
qc.h(0)
qc.swap(0, 2)
print("QFT Circuit:\\n", qc.draw(output="text"))
\`\`\`
`
  },
  {
    slug: "quantum-algorithms/vqe-and-qaoa",
    title: "VQE & QAOA",
    category: "Quantum Algorithms",
    tags: ["qc/algorithms"],
    content: `
- **VQE (Variational Quantum Eigensolver):** Hybrid quantum-classical algorithm using parameterized ansatz $U(\\theta)$ to minimize expectation value $\\langle\\psi(\\theta)|H|\\psi(\\theta)\\rangle$ to bound ground-state energies.
- **QAOA (Quantum Approximate Optimization Algorithm):** Solves combinatorial optimization graph problems using alternating cost Hamiltonian $H_C$ and mixer Hamiltonian $H_M = \\sum X_i$ layers.

### Partition Problem Worked Example
Partitioning a set of numbers $S = \\{s_1, s_2, \\dots, s_N\\}$ into two subsets such that difference $(\\sum_{i \\in A} s_i - \\sum_{j \\in B} s_j)^2$ is minimized. Mapped to Ising Hamiltonian $H_C = (\\sum s_i Z_i)^2$.

\`\`\`python
from qiskit import QuantumCircuit
from qiskit.circuit import Parameter

gamma = Parameter('γ')
beta = Parameter('β')

qc = QuantumCircuit(2)
qc.h([0, 1])
qc.cx(0, 1)
qc.rz(2 * gamma, 1)
qc.cx(0, 1)
qc.rx(2 * beta, [0, 1])
print(qc.draw(output="text"))
\`\`\`
`
  }
];
