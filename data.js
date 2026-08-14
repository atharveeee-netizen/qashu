// Complete Qashu Vault Content - 108 Notes (100% full content)
export const VAULT_NOTES = [
  {
    "slug": "absolute-basics/what-is-a-quantum-computer",
    "filePath": "Absolute Basics/What is a Quantum Computer.md",
    "title": "What is a Quantum Computer",
    "links": [
      "tags/qc/basics",
      "tags/qc/hardware",
      "absolute-basics/superposition",
      "absolute-basics/measurement-and-collapse",
      "noise--and--error-models/physical-decoherence-mechanisms",
      "hardware-reality/backend-properties",
      "hardware-reality/coupling-map-and-topology",
      "hardware-reality/heavy-hex-topology",
      "quantum-algorithms/hamiltonian-simulation-—-why-it's-hard",
      "why-quantum-computing-matters/deutsch's-algorithm",
      "why-quantum-computing-matters/the-quantum-algorithm-zoo",
      "quantum-algorithms/grover's-algorithm",
      "absolute-basics/what-is-a-qubit"
    ],
    "tags": [
      "qc/basics",
      "qc/hardware"
    ],
    "content": "What is a Quantum Computer?\nqc/basics qc/hardware\nA quantum computer is a device that stores and transforms information in qubits — quantum-mechanical states — instead of classical bits, exploiting superposition and entanglement to represent and manipulate information in ways classical bits fundamentally can’t. Key insight: it is not a faster classical computer. A classical bit is always definitely 0 or 1; a qubit’s advantage comes from interference between possibilities, not from “trying every answer at once for free” — you still only ever read out plain classical bits at the end (see Measurement and Collapse).\nWhat’s physically inside one\nIBM’s devices (and the ones used throughout this vault) use superconducting transmon qubits — tiny circuits etched from superconducting metal on a chip, each behaving like an artificial atom with quantized energy levels that stand in for |0\\rangle and |1\\rangle. Other physical implementations exist — trapped ions (individual atoms held by electromagnetic fields, controlled with lasers), photonic qubits (single photons) — but superconducting is what Heron/Nighthawk-class IBM hardware uses.\nWhat’s actually inside a transmon: a Josephson junction — a thin insulating gap between two superconductors — acting as a nonlinear inductor in an otherwise ordinary LC oscillator circuit. The junction’s nonlinearity is essential: a plain (linear) LC oscillator has evenly-spaced energy levels, so no pair of levels could ever be addressed individually — every drive pulse would excite all levels at once. The Josephson junction’s anharmonicity unevenly spaces the levels, which is precisely what lets |0\\rangle and |1\\rangle be isolated and driven independently without leaking into higher levels. The macroscopic quantum variable being manipulated is the superconducting phase \\phi across the junction.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPlatformQubit encodingDominant noise sourceStrengthsSuperconducting (IBM)Josephson-junction anharmonic oscillatorDecoherence (see Physical Decoherence Mechanisms)Fast gates, scalable fabricationTrapped ionHyperfine atomic statesMotional heating, laser noiseLong coherence, all-to-all connectivityNeutral atomAtomic states, optical tweezersAtom loss, laser noiseFlexible qubit layoutPhotonicPhoton statesPhoton lossRoom-temperature operation, natural for networking\nWhy it needs to be so cold and isolated\nSuperconducting qubits only behave quantum-mechanically (hold superposition without immediately decaying) when isolated from thermal noise and stray electromagnetic fields. IBM’s chips run inside a dilution refrigerator at around 15 millikelvin — colder than deep space. Any stray heat or noise leaking in causes the qubit to lose its quantum state (decoherence), which is the root cause behind T_1/T_2 limits and gate errors (see Backend Properties).\nThe architecture, top to bottom\n\nRoom-temperature classical electronics — generate and read microwave control pulses; a classical computer still orchestrates the whole experiment.\nCryostat, staged down to ~15 mK — the QPU sits at the coldest stage; wiring runs down through intermediate temperature stages to minimize heat leaking in.\nThe QPU chip itself — the physical qubits, laid out in a fixed grid dictated by chip fabrication.\n\nThe QPU is a specialized co-processor a classical computer calls out to, not a standalone replacement for one.\nWhy connectivity is limited\nPhysical qubits sit at fixed positions on the chip, wired to interact directly with only their physical neighbors. This fixed wiring is the coupling map — a hardware fact, not a software choice. See Coupling Map and Topology and Heavy-Hex Topology for how that graph looks in practice and what it costs when your circuit needs qubits that aren’t neighbors.\nA brief history\n1980–82: Paul Benioff shows computation can be built from purely quantum-mechanical laws (a quantum Turing machine); Richard Feynman and Yuri Manin independently propose using quantum systems to simulate nature, since classical computers scale so badly at it (see Hamiltonian Simulation — Why It’s Hard). 1985: David Deutsch formalizes universal quantum computation and proves a quantum machine can simulate any other physical system — see Deutsch’s Algorithm for the first concrete algorithm this produced. 1994: Shor’s algorithm demonstrates an exponential speedup for factoring, proving RSA breakable in principle — named (not derived) in The Quantum Algorithm Zoo. 1996: Grover’s algorithm gives a quadratic speedup for unstructured search, derived in full there.\nRelated\n\nWhat is a Qubit\nCoupling Map and Topology — the physical connectivity constraint described here, in full detail\nBackend Properties — the measurable numbers (error rates, T_1/T_2) that this physical reality produces\nSuperposition\nDeutsch’s Algorithm, The Quantum Algorithm Zoo\nPhysical Decoherence Mechanisms\n\nSelf-Check\n\nCould you explain to a friend why a quantum computer isn’t “just a faster classical computer”?\nWhy does a superconducting QPU need to be cooled to ~15 millikelvin?\nWhy does the coupling map exist at all — what physical fact forces it to?\nWho first proposed using quantum systems to simulate nature, and why?\nWhy does a Josephson junction’s nonlinearity matter for being able to address |0\\rangle and |1\\rangle individually?\n",
    "order": 1
  },
  {
    "slug": "absolute-basics/what-is-a-qubit",
    "filePath": "Absolute Basics/What is a Qubit.md",
    "title": "What is a Qubit",
    "links": [
      "tags/qc/basics",
      "tags/qc/math",
      "absolute-basics/measurement-and-collapse",
      "absolute-basics/superposition",
      "foundations/pauli-operators",
      "absolute-basics/what-is-a-quantum-computer",
      "absolute-basics/bloch-sphere",
      "foundations/tensor-products-and-multi-qubit-states",
      "foundations/why-gates-are-unitary"
    ],
    "tags": [
      "qc/basics",
      "qc/math"
    ],
    "content": "What is a Qubit?\nqc/basics qc/math\nA classical bit is always definitely 0 or 1. A qubit is a vector in a 2-dimensional complex vector space, written in ket notation:\n|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle, \\qquad \\alpha,\\beta \\in \\mathbb{C}, \\qquad |\\alpha|^2 + |\\beta|^2 = 1\nwhere |0\\rangle = \\begin{pmatrix}1\\\\0\\end{pmatrix} and |1\\rangle = \\begin{pmatrix}0\\\\1\\end{pmatrix} — kets are just column vectors, and \\alpha, \\beta are its amplitudes.\nKey insight: “0 and 1 at once” is a misleading pop-science shorthand. A qubit isn’t secretly holding two classical values for free — it holds one pair of complex amplitudes that determine probabilities when you measure it (see Measurement and Collapse), and those amplitudes can interfere — add or cancel — in ways plain probabilities never can. That interference, not “parallel storage,” is the actual resource quantum algorithms exploit. See Superposition for what that means in practice.\nfrom qiskit.quantum_info import Statevector\n \npsi = Statevector([0.6, 0.8])   # alpha=0.6, beta=0.8 — must satisfy |alpha|^2+|beta|^2=1\npsi.probabilities()             # array([0.36, 0.64]) — P(0), P(1)\nThe normalization constraint |\\alpha|^2+|\\beta|^2=1 is why arbitrary pairs of numbers don’t make a valid qubit state — Qiskit enforces it.\nBras and inner products\nA ket |\\psi\\rangle is a column vector; its bra \\langle\\psi| is the conjugate-transpose row vector. Pairing a bra with a ket gives the inner product: \\langle a|b\\rangle = 1 if a=b, else 0, for computational basis states — the formal statement that |0\\rangle and |1\\rangle are orthonormal. More generally \\langle\\phi|\\psi\\rangle gives the overlap (amplitude) between two states. The reverse pairing, a ket times a bra like |0\\rangle\\langle1|, is an outer product — a matrix, not a number — and is exactly how operators like the Pauli matrices can be built up from basis states.\nRelated\n\nWhat is a Quantum Computer\nSuperposition\nBloch Sphere — the geometric picture of this state\nMeasurement and Collapse\nTensor Products and Multi-Qubit States — how single-qubit states like this one combine into many-qubit states\nWhy Gates Are Unitary\n\nSelf-Check\n\nWhy is “a qubit is a 0 and a 1 at the same time” a misleading way to describe \\alpha|0\\rangle+\\beta|1\\rangle?\nWhat does the normalization constraint |\\alpha|^2+|\\beta|^2=1 actually guarantee, physically?\nWhat does Measurement and Collapse let you extract from \\alpha and \\beta, and what can it never give you directly?\nWhat’s the difference between a bra and a ket, and what does pairing them (in each order) give you?\n",
    "order": 2
  },
  {
    "slug": "absolute-basics/superposition",
    "filePath": "Absolute Basics/Superposition.md",
    "title": "Superposition",
    "links": [
      "tags/qc/basics",
      "tags/qc/math",
      "absolute-basics/measurement-and-collapse",
      "quantum-algorithms/grover's-algorithm",
      "why-quantum-computing-matters/the-deutsch-jozsa-algorithm",
      "foundations/h-gate",
      "absolute-basics/what-is-a-qubit",
      "absolute-basics/bloch-sphere",
      "why-quantum-computing-matters/quantum-speedup-—-ingredients-and-myths"
    ],
    "tags": [
      "qc/basics",
      "qc/math"
    ],
    "content": "Superposition\nqc/basics qc/math\nA qubit in superposition is in a coherent combination of |0\\rangle and |1\\rangle simultaneously, e.g. \\frac{1}{\\sqrt2}(|0\\rangle+|1\\rangle). This is not the same as a classical coin flip. A classical coin in the air is either heads or tails, and you just don’t know which yet — a probability distribution over a definite hidden fact. A qubit in superposition doesn’t have a hidden definite value; it genuinely carries both amplitudes at once, including their relative phase, until measured.\nWhy this matters: interference\nClassical probabilities only ever add — they can shrink toward zero but never go negative, so two paths to the same outcome always make it more likely, never less. Quantum amplitudes are complex numbers and can cancel:\n\\frac{1}{2} + \\left(-\\frac{1}{2}\\right) = 0\nTwo computational paths that would classically both contribute probability can instead destructively interfere to a net-zero amplitude for a “wrong” answer, while paths to the “right” answer constructively reinforce. This engineered cancellation — not brute-force parallel evaluation — is the actual mechanism behind quantum algorithmic speedups (Grover’s search and Deutsch-Jozsa are the standard textbook examples).\nCreating it\nThe standard way to put a qubit into superposition is the Hadamard gate:\nH|0\\rangle = \\frac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector\n \nqc = QuantumCircuit(1)\nqc.h(0)\nStatevector(qc).probabilities()   # array([0.5, 0.5]) — but this is amplitude info, not &quot;two values at once&quot;\nRelated\n\nWhat is a Qubit\nH Gate\nBloch Sphere — visualizing superposition states geometrically\nMeasurement and Collapse — what happens to a superposition the instant you measure it\nQuantum Speedup — Ingredients and Myths — this interference mechanism, generalized\n\nSelf-Check\n\nHow would you explain to someone why superposition isn’t the same as a classical coin flip?\nWhat does interference actually do that a classical probability distribution can’t?\nWhy is H Gate specifically the gate reached for to create superposition?\n",
    "order": 3
  },
  {
    "slug": "absolute-basics/bloch-sphere",
    "filePath": "Absolute Basics/Bloch Sphere.md",
    "title": "Bloch Sphere",
    "links": [
      "tags/qc/basics",
      "tags/qc/math",
      "absolute-basics/measurement-and-collapse",
      "foundations/x-gate",
      "foundations/z-gate-and-relative-phase",
      "foundations/h-gate",
      "foundations/pauli-operators",
      "entangled-states/bell-states",
      "absolute-basics/what-is-a-qubit",
      "absolute-basics/superposition",
      "foundations/s-and-t-gates"
    ],
    "tags": [
      "qc/basics",
      "qc/math"
    ],
    "content": "Bloch Sphere\nqc/basics qc/math\nAny single-qubit pure state can be written, up to an unobservable global phase, using two real angles instead of two complex amplitudes:\n|\\psi\\rangle = \\cos\\!\\left(\\frac{\\theta}{2}\\right)|0\\rangle + e^{i\\phi}\\sin\\!\\left(\\frac{\\theta}{2}\\right)|1\\rangle, \\qquad \\theta \\in [0,\\pi],\\ \\phi \\in [0, 2\\pi)\nThis is exactly a point on the surface of a unit sphere — the Bloch sphere. North pole (\\theta=0) is |0\\rangle, south pole (\\theta=\\pi) is |1\\rangle, and every point on the equator is an equal superposition of |0\\rangle and |1\\rangle differing only in relative phase \\phi.\nKey insight: single-qubit gates are rotations of this point around an axis.\nWhy only two degrees of freedom\nA general 2-state complex system has 4 real parameters (2 complex amplitudes = 4 real numbers). Normalization (|\\alpha|^2+|\\beta|^2=1) removes one. Global phase — multiplying the whole state by e^{i\\gamma} — is physically unobservable (see Measurement and Collapse, the Born rule only ever depends on |\\cdot|^2) and removes another. That leaves exactly 2 real degrees of freedom, \\theta and \\phi — which is precisely enough to specify a point on the surface of a sphere.\nfrom qiskit.visualization import plot_bloch_multivector\nfrom qiskit.quantum_info import Statevector\nfrom qiskit import QuantumCircuit\n \nqc = QuantumCircuit(1)\nqc.h(0)\nplot_bloch_multivector(Statevector(qc))   # shows the point moved to the equator\nGates as rotations\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nGateRotationX Gate180° about the X-axisZ Gate and Relative Phase180° about the Z-axisH Gate180° about the axis halfway between X and Z (swaps the poles with the equator)\nReading gates this way turns Pauli Operators from abstract matrices into concrete geometric moves — the same picture used later when circuits are described as sequences of rotations.\nThe limit of this picture\nThe Bloch sphere only exists for a single qubit’s pure state. There is no analogous single point for a two-qubit entangled state — that irreducibility is part of what “entangled” means. See Bell States.\nRelated\n\nWhat is a Qubit\nSuperposition\nH Gate, X Gate, Z Gate and Relative Phase\nPauli Operators\nS and T Gates — smaller Z-axis rotations than the full Z gate\n\nSelf-Check\n\nCould you sketch, or describe in words, where |0\\rangle, |1\\rangle, and H|0\\rangle each sit on the Bloch sphere?\nWhy does thinking of gates as rotations help build intuition that the raw matrices don’t?\nWhy can’t a two-qubit entangled state be drawn as a point on a single Bloch sphere?\nWhy does a 2-state complex system have exactly 2, not 3 or 4, real degrees of freedom?\n",
    "order": 4
  },
  {
    "slug": "absolute-basics/measurement-and-collapse",
    "filePath": "Absolute Basics/Measurement and Collapse.md",
    "title": "Measurement and Collapse",
    "links": [
      "tags/qc/basics",
      "tags/qc/math",
      "foundations/sparsepauliop",
      "programming-a-quantum-computer/the-primitives-family",
      "absolute-basics/what-is-a-qubit",
      "absolute-basics/superposition",
      "hardware-reality/backend-properties",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "programming-a-quantum-computer/simulators-—-statevector-vs-shot-based"
    ],
    "tags": [
      "qc/basics",
      "qc/math"
    ],
    "content": "Measurement and Collapse\nqc/basics qc/math\nMeasuring a qubit |\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle in the standard (Z) basis gives outcome 0 with probability |\\alpha|^2 and outcome 1 with probability |\\beta|^2 — the Born rule. Immediately after, the state is no longer \\alpha|0\\rangle+\\beta|1\\rangle: it’s exactly |0\\rangle or exactly |1\\rangle, matching whatever outcome occurred. The superposition is destroyed by the act of measuring — this is collapse, and it’s irreversible.\nWhy this makes quantum programs inherently probabilistic\nA single run of a circuit on hardware gives you exactly one classical bit per qubit — never \\alpha and \\beta directly. To learn anything about the underlying amplitudes (or estimate an expectation value, see SparsePauliOp), you run the same circuit many times (“shots”) and build up statistics over the outcomes. This is why Qiskit’s `Sampler` returns a distribution of counts, not a single deterministic answer, and why quantities used throughout this vault (fidelity, expectation values) are estimates, not exact numbers, once real hardware is involved.\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import Statevector\nfrom qiskit_aer.primitives import SamplerV2\n \nqc = QuantumCircuit(1, 1)\nqc.h(0)\n \n# Simulator only: peek at exact amplitudes before measurement (impossible on real hardware)\nStatevector(qc).probabilities()   # array([0.5, 0.5]) — the ground truth\n \nqc.measure(0, 0)\nresult = SamplerV2().run([qc], shots=1000).result()\nresult[0].data.c.get_counts()     # e.g. {&#039;0&#039;: 512, &#039;1&#039;: 488} — the statistical estimate of that ground truth\nRelated\n\nWhat is a Qubit\nSuperposition\nBackend Properties — readout error: measurement itself isn’t perfectly faithful on real hardware\nTREX — the mitigation technique specifically for readout error\nThe Primitives Family, Simulators — Statevector vs Shot-Based\n\nSelf-Check\n\nWhy can’t you just “read off” \\alpha and \\beta from a single run on real hardware?\nWhat’s the difference between what Statevector(qc).probabilities() gives you and what SamplerV2 gives you, and why?\nWhy does collapse being irreversible matter for how quantum programs have to be structured?\n",
    "order": 5
  },
  {
    "slug": "depth--and--optimization/circuit-depth",
    "filePath": "Depth & Optimization/Circuit Depth.md",
    "title": "Circuit Depth",
    "links": [
      "tags/qc/depth",
      "entangled-states/ghz-states",
      "depth--and--optimization/start-from-the-middle",
      "depth--and--optimization/recursive-fan-out",
      "hardware-reality/transpilation",
      "depth--and--optimization/circuit-introspection-cheat-sheet"
    ],
    "tags": [
      "qc/depth"
    ],
    "content": "Circuit Depth\nqc/depth\nThe number of sequential layers needed to run a circuit, assuming maximum parallelism.\nRules:\n\nTwo gates can share a layer only if they act on completely different qubits.\nIf two gates share any qubit, they must be in different layers.\n\nWhy it matters: every gate introduces error; more layers = more accumulated noise + more time for qubits to decohere. Minimizing depth is one of the most important practical skills in quantum computing.\nCommon trap: the circuit drawing can be misleading — gates may look side-by-side visually but still be sequential if they share a qubit. Always verify with qc.depth() when it matters.\nManual calculation (without .depth()): track, per qubit, the layer its last gate finished at. A new gate’s start layer = max(finish layer of all qubits it touches); its finish layer = start+1. Circuit depth = max finish layer over all gates. This is a critical-path/scheduling algorithm — each qubit is a timeline.\ndef compute_depth(qc):\n    qubit_layer = {q: 0 for q in qc.qubits}\n    for instr in qc.data:\n        qs = instr.qubits\n        start = max(qubit_layer[q] for q in qs)\n        for q in qs:\n            qubit_layer[q] = start + 1\n    return max(qubit_layer.values())\nRelated\n\nGHZ States — depth is the central optimization target\nStart From the Middle\nRecursive Fan-Out\nTranspilation — depth typically increases after transpiling to native gates\nCircuit Introspection Cheat Sheet — circuit.depth() is the built-in equivalent of the manual algorithm above, plus the 2-qubit-only variant\n\nSelf-Check\n\nCould you explain to someone why two gates drawn side-by-side in a diagram might still count as different layers?\nWhy does minimizing depth matter more than minimizing total gate count?\nCould you walk through the manual compute_depth algorithm on a 3-gate circuit by hand?\n",
    "order": 999
  },
  {
    "slug": "depth--and--optimization/circuit-introspection-cheat-sheet",
    "filePath": "Depth & Optimization/Circuit Introspection Cheat Sheet.md",
    "title": "Circuit Introspection Cheat Sheet",
    "links": [
      "tags/qc/qiskit",
      "hardware-reality/backend-properties",
      "hardware-reality/coupling-map-and-topology",
      "hardware-reality/physical-vs-logical-qubits-and-layout",
      "hardware-reality/swap-overhead-and-routing",
      "hardware-reality/qiskit-api-gotchas"
    ],
    "tags": [
      "qc/qiskit"
    ],
    "content": "Circuit Introspection Cheat Sheet\nqc/qiskit\nA collection of QuantumCircuit methods/properties for pulling structural facts out of a built circuit — useful for benchmarking, comparing transpilation results across backends, or just debugging.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWhat you wantHow to get itTotal qubit countcircuit.num_qubits (property)Ancilla qubit countcircuit.num_ancillasCircuit depth (longest dependent-gate chain)circuit.depth()Depth counting only 2-qubit gatescircuit.depth(lambda instr: instr.operation.num_qubits &gt;= 2)Gate name → count mappingdict(circuit.count_ops())Count of multi-qubit gate operationscircuit.num_nonlocal_gates()Iterate every instruction in orderfor instr in circuit.data: instr.operation.name\nDepth vs size, the important distinction: .size() counts total gates; .depth() counts the longest chain assuming independent gates run in parallel. Depth is the better proxy for actual circuit runtime on hardware, since gates on disjoint qubits can execute simultaneously.\nWhy 2-qubit depth specifically matters: two-qubit gates are typically the noisiest, slowest operations on real hardware (see Backend Properties), so isolating how much of the total depth comes from them specifically is a much sharper signal than raw depth when comparing e.g. two different topologies (Coupling Map and Topology) or layouts (Physical vs Logical Qubits and Layout).\ndef quantum_circuit_params(circuit: QuantumCircuit) -&gt; dict:\n    return {\n        &quot;Number of qubits&quot;: circuit.num_qubits,\n        &quot;Depth&quot;: circuit.depth(),\n        &quot;2-qubit depth&quot;: circuit.depth(lambda instr: instr.operation.num_qubits &gt;= 2),\n        &quot;Gates&quot;: dict(circuit.count_ops()),\n        &quot;Multi-qubit gates&quot;: circuit.num_nonlocal_gates(),\n        &quot;Number of ancillas&quot;: circuit.num_ancillas,\n    }\nRelated\n\nSWAP Overhead and Routing\nBackend Properties\nCoupling Map and Topology\nQiskit API Gotchas\n\nSelf-Check\n\nWhat’s the difference between circuit.size() and circuit.depth(), and which better predicts real runtime?\nWhy would you want 2-qubit-only depth instead of total depth when comparing topologies or layouts?\nWhich method would you reach for to count how many cx gates are in a circuit?\n",
    "order": 999
  },
  {
    "slug": "depth--and--optimization/recursive-fan-out",
    "filePath": "Depth & Optimization/Recursive Fan-Out.md",
    "title": "Recursive Fan-Out",
    "links": [
      "tags/qc/depth",
      "tags/qc/ghz",
      "depth--and--optimization/start-from-the-middle",
      "depth--and--optimization/circuit-depth",
      "entangled-states/ghz-states"
    ],
    "tags": [
      "qc/depth",
      "qc/ghz"
    ],
    "content": "Recursive Fan-Out\nqc/depth qc/ghz\nApplying the “start from the middle” halving trick recursively: once a qubit becomes entangled, it can immediately help spread entanglement further, not just sit there.\nMental model — spreading a rumor: everyone who already knows the secret tells exactly one new person, all at once, every round. The number of “knowers” doubles each round instead of growing by one.\nfor layer in range(k):          # k = number of doubling rounds\n    step = 2 ** layer\n    for i in range(step):\n        qc.cx(i, i + step)      # every current &quot;knower&quot; tells a new qubit\nDepth grows as ⌈log₂(N)⌉ + 1 instead of N — exponential improvement. For N=16: depth = log₂(16) + 1 = 5.\nCommon bug: a control qubit used in a layer must have been entangled in a strictly earlier layer — never in the same layer it’s currently receiving entanglement in. Violating this forces gates into a later layer (breaks the doubling), silently blowing up depth.\nRelated\n\nStart From the Middle\nCircuit Depth\nGHZ States\n\nSelf-Check\n\nCould you explain the “spreading a rumor” analogy to someone, and why it produces doubling instead of linear growth?\nWhy does depth become \\lceil\\log_2(N)\\rceil+1 instead of N?\nWhy does using a control qubit entangled in the same layer break the doubling pattern?\n",
    "order": 999
  },
  {
    "slug": "depth--and--optimization/start-from-the-middle",
    "filePath": "Depth & Optimization/Start From the Middle.md",
    "title": "Start From the Middle",
    "links": [
      "tags/qc/depth",
      "tags/qc/ghz",
      "entangled-states/ghz-states",
      "depth--and--optimization/circuit-depth",
      "depth--and--optimization/recursive-fan-out"
    ],
    "tags": [
      "qc/depth",
      "qc/ghz"
    ],
    "content": "Reducing Depth: Start From the Middle\nqc/depth qc/ghz\nKey insight: a GHZ state is symmetric — all qubits end up identical. You don’t have to build it from one end.\nPut H on the middle qubit, grow entanglement outward in both directions simultaneously (two parallel chains: one heading left, one heading right). This roughly halves the CX depth vs. a single-direction chain or fan-out (both depth N).\nSubtlety (easy to undercount visually): the two CNOTs both leaving the middle qubit at the very first step cannot be in the same layer — the middle qubit can’t fire twice at once. This costs one extra layer beyond the naive “steps in the loop” count, so total depth = 1 (H) + (steps needed for the longer arm to finish), where the longer arm’s step count is ceil of the larger half-distance to either end.\nExample: 20 qubits, middle = qubit 10 → left arm needs 10 steps (reach qubit 0), right arm needs 9 (reach qubit 19) → loop runs 10 times (until both done) → depth = 1 + 10 = 11.\nRelated\n\nGHZ States\nCircuit Depth\nRecursive Fan-Out — applies this halving idea recursively for exponential improvement\n\nSelf-Check\n\nWhy does a GHZ state’s symmetry let you start building it from the middle instead of an end?\nWhy can’t the two CNOTs leaving the middle qubit be in the same layer?\nFor 20 qubits, could you work out the depth by hand, including the “longer arm” subtlety?\n",
    "order": 999
  },
  {
    "slug": "dynamic-circuits/dynamic-ghz-via-qubit-reuse",
    "filePath": "Dynamic Circuits/Dynamic GHZ via Qubit Reuse.md",
    "title": "Dynamic GHZ via Qubit Reuse",
    "links": [
      "tags/qc/entanglement",
      "tags/qc/dynamic",
      "entangled-states/ghz-states",
      "dynamic-circuits",
      "hardware-reality/coupling-map-and-topology",
      "depth--and--optimization/circuit-introspection-cheat-sheet"
    ],
    "tags": [
      "qc/entanglement",
      "qc/dynamic"
    ],
    "content": "Dynamic GHZ via Qubit Reuse\nqc/entanglement qc/dynamic\nA GHZ state can be built with far less connectivity and depth than the naive fan-out approach (see GHZ States) if you’re willing to use mid-circuit measurement and feedforward — see Dynamic Circuits. This construction follows the paper Efficient Long-Range Entanglement Using Dynamic Circuits (PRX Quantum, 2024).\nThe core idea, step by step\n\nHadamards on data qubits — turn each “even” qubit (q_0, q_2, \\dots) into |+\\rangle: independent random coins.\nFirst CNOT layer — CX(2,1), CX(4,3), … — creates a Bell pair between each even qubit and the odd qubit just before it, forming a “bridge.”\nSecond CNOT layer — CX(0,1), CX(2,3), … — folds each even qubit into the bridge and onto the next edge qubit. After this, the bridge qubit holds the parity of its two neighboring coins.\nMeasure the bridge, then correct — measuring the bridge qubit reveals whether its two neighboring coins agreed or disagreed. Reset the bridge, and only if they disagreed, flip the next pair to force agreement. This is the feedforward step: a random local outcome gets locally corrected so the overall state stays coherent, without ever needing a direct physical connection between far-apart qubits.\nRepeat down the chain — each measured connector qubit only needs to correct the next pair, not every qubit downstream — corrections propagate link by link rather than needing global knowledge.\nBoundary qubit — the very last qubit in the chain has no downstream pair to correct, so it’s just measured and reset with no feedforward.\nFinal CNOT layer — same pattern as step 3 — brings the last pair of qubits into full agreement, producing the final GHZ signature: every run reads out as all-0s or all-1s, roughly 50/50.\n\ndef _apply_dynamic_section(qc, qr, cr, num_qubits) -&gt; None:\n    last = num_qubits - 1\n    for i in range(1, last - 1, 2):\n        _measure_reset_and_correct(qc, qr, cr, meas_qubit=i, x_targets=[i + 1, i + 2])\n    _measure_and_reset_only(qc, qr, cr, qubit=last)\nWhy this matters practically: the naive GHZ fan-out (CX(0,1), CX(0,2), ..., CX(0,n-1)) needs qubit 0 directly connected to every other qubit — physically unrealistic on real hardware topologies like heavy-hex. The dynamic version trades that impossible connectivity requirement for classical feedforward, at the cost of needing hardware that supports mid-circuit measurement (Eagle/Heron-class devices generally do; check for the if_else operation in a backend’s supported operations).\nRelated\n\nDynamic Circuits\nGHZ States\nCoupling Map and Topology\nCircuit Introspection Cheat Sheet\n\nSelf-Check\n\nCould you walk someone through the 7-step construction, in your own words, without looking?\nWhy does the “measure the bridge, then correct” step only need to fix the next pair, not every qubit downstream?\nWhat connectivity requirement does this construction trade away, and what does it trade it for?\n",
    "order": 999
  },
  {
    "slug": "dynamic-circuits/index",
    "filePath": "Dynamic Circuits/Dynamic Circuits.md",
    "title": "Dynamic Circuits",
    "links": [
      "tags/qc/hardware",
      "tags/qc/dynamic",
      "dynamic-circuits/dynamic-ghz-via-qubit-reuse",
      "entangled-states/ghz-states",
      "hardware-reality/coupling-map-and-topology"
    ],
    "tags": [
      "qc/hardware",
      "qc/dynamic"
    ],
    "content": "Dynamic Circuits\nqc/hardware qc/dynamic\nA traditional circuit is a fixed pipeline: Preparation → Quantum Operations → Final Measurement. Every operation is decided in advance; measurement only happens at the very end.\nA dynamic circuit breaks that rule: it allows mid-circuit measurement, followed by classical logic that decides what happens next — a gate applied conditionally based on a measurement outcome. This is often called feedforward (or feedback).\nTwo building blocks make this possible:\n\nMid-circuit measurement — measuring a qubit before the circuit ends, storing the result in a classical bit.\nReset + reuse — qc.reset(q) reinitializes a measured qubit back to |0\\rangle so it can be reused later in the same circuit. This matters a lot when physical qubits are scarce.\nConditional operations — with qc.if_test((cr[i], 1)): ... applies gates only if a classical bit matches a given value.\n\nqc.measure(qr[i], cr[0])\nqc.reset(qr[i])\nwith qc.if_test((cr[0], 1)):\n    qc.x(qr[j])\nThe headline use case explored in this lab is Dynamic GHZ via Qubit Reuse — using this mechanism to build long-range entanglement without needing every qubit to be directly, physically connected to every other qubit.\nRelated\n\nDynamic GHZ via Qubit Reuse\nGHZ States\nCoupling Map and Topology\n\nSelf-Check\n\nCould you explain “feedforward” to someone who’s only seen fixed-pipeline circuits before?\nWhat are the three building blocks that make a dynamic circuit possible?\nWhy does reset-and-reuse matter when physical qubits are scarce?\n",
    "order": 999
  },
  {
    "slug": "entangled-states/bell-states",
    "filePath": "Entangled States/Bell States.md",
    "title": "Bell States",
    "links": [
      "tags/qc/entanglement",
      "absolute-basics/measurement-and-collapse",
      "entangled-states/chsh-inequality-and-bell-tests",
      "absolute-basics/bloch-sphere",
      "foundations/z-gate-and-relative-phase",
      "hardware-reality/transpilation",
      "foundations/h-gate",
      "foundations/cx-gate-and-entanglement",
      "entangled-states/ghz-states",
      "entangled-states/quantum-teleportation",
      "entangled-states/no-cloning-theorem"
    ],
    "tags": [
      "qc/entanglement"
    ],
    "content": "Bell States\nqc/entanglement\nEntanglement, in plain language: two qubits become correlated in a way no classical setup can reproduce — measuring one instantly tells you something certain about the other, no matter how the pair was separated, even though neither qubit had a definite value before measurement (see Measurement and Collapse). It’s not “hidden pre-agreed answers” (that possibility is what Bell tests rule out); the correlation only exists because the two qubits share a single joint state that can’t be factored into two independent single-qubit states — which is also why a two-qubit entangled pair has no single point on any one Bloch Sphere.\nThe simplest entangled states — 2 qubits, 4 variants:\n\\frac{1}{\\sqrt2}(|00\\rangle+|11\\rangle) \\quad \\frac{1}{\\sqrt2}(|01\\rangle+|10\\rangle) \\quad \\frac{1}{\\sqrt2}(|00\\rangle-|11\\rangle) \\quad \\frac{1}{\\sqrt2}(|01\\rangle-|10\\rangle)\nBase construction: h(0); cx(0,1) → gives |00⟩+|11⟩. Applying an extra X gate (before or after) flips which basis states appear; a Z gate introduces the minus-sign variants (Z Gate and Relative Phase).\nKey insight — multiple paths, same state: X can be applied before the circuit (on qubit 1) or after (on qubit 0 or qubit 1) and all three give the same final state, because flipping either qubit of an entangled pair swaps the same basis states. This foreshadows circuit-optimization flexibility used later in Transpilation.\nRelated\n\nH Gate, CX Gate and Entanglement\nGHZ States — the N-qubit generalization\nZ Gate and Relative Phase\nBloch Sphere, Measurement and Collapse\nCHSH Inequality and Bell Tests, Quantum Teleportation, No-Cloning Theorem\n\nSelf-Check\n\nCould you explain entanglement to a friend using the Bell-state correlation, without saying “spooky”?\nWhy can’t a Bell state be described as “qubit 0 is in state A and qubit 1 is in state B” separately?\nHow do you get from the base Bell state to each of the other three, and which gates does that use?\nIf you compute the measurement probabilities for all four Bell states (not just |\\Phi^+\\rangle), what pattern do you see, and why does it follow directly from which basis states each superposition is built from?\n",
    "order": 999
  },
  {
    "slug": "entangled-states/chsh-inequality-and-bell-tests",
    "filePath": "Entangled States/CHSH Inequality and Bell Tests.md",
    "title": "CHSH Inequality and Bell Tests",
    "links": [
      "tags/qc/entanglement",
      "tags/qc/math",
      "entangled-states/bell-states",
      "entangled-states/quantum-teleportation",
      "entangled-states/no-cloning-theorem",
      "absolute-basics/measurement-and-collapse",
      "quantum-communication/e91-—-entanglement-based-quantum-key-distribution"
    ],
    "tags": [
      "qc/entanglement",
      "qc/math"
    ],
    "content": "CHSH Inequality and Bell Tests\nqc/entanglement qc/math\nThe experimental proof that entanglement isn’t just “correlation from a hidden pre-agreed answer.” Any theory where each particle secretly carries a definite, pre-determined value (a local hidden variable) is bound by the CHSH inequality: S \\le 2, for a specific combination S of correlation measurements Alice and Bob make with independently-chosen settings. Quantum mechanics predicts — and experiments confirm — S \\approx 2\\sqrt2 \\approx 2.83, clearly violating the classical bound.\nCHSH = Clauser, Horne, Shimony, Holt. First experimentally confirmed by Alain Aspect (1982); loophole-free versions closed remaining experimental gaps in 2015.\nKey insight: “Entanglement is not ignorance about a pre-existing state — the CHSH violation is the experimental receipt.” Classically, correlated outcomes always come from either direct causation or a shared hidden fact fixed in advance. The CHSH violation rules out the second option experimentally, not just theoretically.\nWhy this doesn’t allow signaling\nMeasuring one particle instantly affects the joint statistics, but this cannot send information — the correlation is only visible once Alice and Bob classically compare their individual (locally random) results, and that comparison is itself light-speed-limited. The non-locality lives in the correlations between two already-random outcomes, not in either individual outcome — so nothing travels faster than light. This is the same resolution as Quantum Teleportation’s reliance on a classical channel.\nRelated\n\nBell States — the states used to violate CHSH\nQuantum Teleportation\nNo-Cloning Theorem\nMeasurement and Collapse\nE91 — Entanglement-Based Quantum Key Distribution — this exact S\\le2/S\\approx2\\sqrt2 math, reused as a security primitive\n\nSelf-Check\n\nWhat does the classical CHSH bound (S\\le2) assume about how the world works, and what does violating it rule out?\nCould you explain why entanglement correlations don’t allow faster-than-light signaling, even though measuring one particle instantly affects the joint state?\nWhy did it take until 1982 (Aspect) and 2015 (loophole-free) to fully confirm something quantum mechanics predicted decades earlier?\nIf you parameterize a Bell state with a single rotation angle \\theta (e.g. Ry(θ) on one qubit before the entangling gate) and sweep \\theta while computing S, why does that let you scan continuously between CHSH-violating and non-violating configurations, rather than jumping straight from “classical” to “maximally quantum”?\nFramed as a nonlocal game (Alice and Bob win if a\\oplus b = x\\wedge y for their random inputs x,y), why does the best classical strategy cap out at 75% win probability while the best quantum strategy reaches \\cos^2(\\pi/8)\\approx85.4\\% — and how does that number relate to S\\approx2\\sqrt2?\n",
    "order": 999
  },
  {
    "slug": "entangled-states/ghz-states",
    "filePath": "Entangled States/GHZ States.md",
    "title": "GHZ States",
    "links": [
      "tags/qc/entanglement",
      "entangled-states/bell-states",
      "depth--and--optimization/circuit-depth",
      "depth--and--optimization/start-from-the-middle",
      "depth--and--optimization/recursive-fan-out",
      "hardware-reality/bridge-gate-identity",
      "hardware-reality/heavy-hex-topology",
      "dynamic-circuits/dynamic-ghz-via-qubit-reuse"
    ],
    "tags": [
      "qc/entanglement"
    ],
    "content": "GHZ States\nqc/entanglement\nGeneralizes Bell States to N qubits — all qubits maximally correlated:\n|\\text{GHZ}_N\\rangle = \\frac{1}{\\sqrt2}(|00\\ldots0\\rangle + |11\\ldots1\\rangle)\nMeasuring gives all-0s or all-1s, 50/50, never mixed.\nTwo naive constructions, both depth N (no advantage over each other):\n\nFan-out: H(0), then CX(0,1), CX(0,2), …, CX(0,N-1) — all share qubit 0 as control, so none parallelize.\nChain: H(0), then CX(0,1), CX(1,2), … — each CX depends on the previous, purely sequential.\n\nReducing depth is the whole story of this topic — see Circuit Depth, Start From the Middle, and Recursive Fan-Out.\nRelated\n\nBell States\nCircuit Depth\nBridge Gate Identity\nHeavy-Hex Topology — building GHZ states that respect real hardware connectivity\nDynamic GHZ via Qubit Reuse — a third construction: mid-circuit measurement + feedforward instead of more connectivity or more depth-optimization\n\nSelf-Check\n\nWhy do fan-out and chain constructions both have depth N, despite looking structurally different?\nWhat outcome do you always get when measuring a GHZ state, and why never a mix?\nName the three different ways this vault builds a GHZ state, and what each one optimizes for.\n",
    "order": 999
  },
  {
    "slug": "entangled-states/no-cloning-theorem",
    "filePath": "Entangled States/No-Cloning Theorem.md",
    "title": "No-Cloning Theorem",
    "links": [
      "tags/qc/entanglement",
      "tags/qc/math",
      "absolute-basics/measurement-and-collapse",
      "error-mitigation/error-correction-(ec)",
      "entangled-states/quantum-teleportation",
      "entangled-states/chsh-inequality-and-bell-tests",
      "quantum-communication/bb84-quantum-key-distribution"
    ],
    "tags": [
      "qc/entanglement",
      "qc/math"
    ],
    "content": "No-Cloning Theorem\nqc/entanglement qc/math\nThere is no general operation that copies an unknown quantum state. The proof is a short chain of implications: to copy a state, you’d need to know it; to know it, you’d need to measure it; to measure it is to disturb it (see Measurement and Collapse) — so any attempt to copy an unknown state destroys the information needed to make the copy accurate in the first place.\nKey insight: this is specifically about unknown states. You can always prepare two qubits in the same, already-known state — that’s not cloning, it’s just preparation done twice. No-cloning only forbids taking an arbitrary, unknown |\\psi\\rangle and producing a second independent copy of it without already knowing what it is.\nWhy this matters\n\nError correction must encode, not copy. Quantum error correction can’t protect information the way classical error correction does (majority-vote three copies of a bit) — copying the logical state isn’t an option, so stabilizer codes instead spread information redundantly without ever producing an independent duplicate.\nEavesdropping always leaves a trace. Anyone trying to intercept and copy an unknown quantum state to read it without detection would need to clone it first — impossible — which is the intuition underlying quantum cryptography’s security guarantees.\nQuantum Teleportation doesn’t violate this. Teleportation transfers a state, it doesn’t duplicate it — Alice’s original is destroyed by her measurement in the same step Bob’s copy is created. At no point do two independent copies of the unknown state coexist.\n\nRelated\n\nMeasurement and Collapse\nQuantum Teleportation\nError Correction (EC)\nCHSH Inequality and Bell Tests\nBB84 Quantum Key Distribution — the clearest practical illustration of why no-cloning matters: its security proof is the no-cloning argument\n\nSelf-Check\n\nCould you walk through the proof sketch — copy → know → measure → disturb — in your own words?\nWhy doesn’t preparing two qubits in the same known state count as “cloning”?\nWhy does Quantum Teleportation not violate no-cloning, even though Bob ends up with Alice’s original state?\n",
    "order": 999
  },
  {
    "slug": "entangled-states/quantum-teleportation",
    "filePath": "Entangled States/Quantum Teleportation.md",
    "title": "Quantum Teleportation",
    "links": [
      "tags/qc/entanglement",
      "tags/qc/gates",
      "entangled-states/bell-states",
      "entangled-states/no-cloning-theorem",
      "entangled-states/chsh-inequality-and-bell-tests",
      "dynamic-circuits"
    ],
    "tags": [
      "qc/entanglement",
      "qc/gates"
    ],
    "content": "Quantum Teleportation\nqc/entanglement qc/gates\nTransfers an unknown quantum state from Alice to Bob using a pre-shared Bell pair plus a classical channel — not matter transport, despite the name. Alice ends up with nothing (her copy is destroyed by measurement, consistent with the No-Cloning Theorem); Bob ends up with the exact original state.\nSetup\nAlice holds two qubits: Q (the unknown state to send) and A (her half of a pre-shared Bell pair). Bob holds B, the other half of that same Bell pair.\nThe protocol\n\nEntangle and measure. Alice applies CX(Q, A) then H(Q), then measures both qubits: Q\\to c_1, A\\to c_0.\nClassical channel. Alice sends the two classical bits (c_0, c_1) to Bob — over an ordinary, light-speed-limited classical channel.\nConditional correction. Bob applies X on B if c_1=1, then Z on B if c_0=1. B now holds exactly the state Q started in.\n\nfrom qiskit import QuantumCircuit\n \nqc = QuantumCircuit(3, 3)\n# ... prepare qc&#039;s qubit 0 (Q) in the unknown state to send, qubits 1(A)/2(B) as a Bell pair ...\nqc.cx(0, 1)\nqc.h(0)\nqc.measure([0, 1], [1, 0])          # c1 &lt;- Q, c0 &lt;- A\nwith qc.if_test((qc.clbits[1], 1)):  # if c1\n    qc.x(2)\nwith qc.if_test((qc.clbits[0], 1)):  # if c0\n    qc.z(2)\nWhy this doesn’t break relativity\nMeasuring A instantly affects the joint state, but Bob’s qubit is just noise until he applies the correction — and he can’t know which correction to apply without the two classical bits, which travel no faster than light. The entanglement carries correlation, not information; the classical channel is what actually carries the information (see CHSH Inequality and Bell Tests for the same “correlation without signaling” point in a different context).\nKey insight: entanglement is consumed\nThe Bell pair is used up by this protocol — it can’t be reused for a second teleportation. Entanglement here is a resource, spent to buy the transfer of one qubit’s worth of quantum information using only two classical bits.\nFirst proposed in 1993; demonstrated over 1,400 km lab-to-satellite. Considered the prototype building block for quantum networking and quantum repeaters.\nRelated\n\nBell States\nNo-Cloning Theorem — why Alice’s original has to be destroyed, not copied\nCHSH Inequality and Bell Tests\nDynamic Circuits — the same mid-circuit-measurement + classical-feedforward pattern\n\nSelf-Check\n\nCould you walk through all three steps of the teleportation protocol from memory?\nWhy does teleportation need a classical channel at all — what would go wrong without it?\nWhat happens to Alice’s copy of the state, and why does that matter for whether this violates no-cloning?\nWhy must Bob’s correction gates be classically conditioned on Alice’s measurement outcomes rather than applied unconditionally?\nIf you look at the raw measurement counts of a simulated teleportation circuit including Alice’s classical bits, why do they look wrong until you marginalize those bits out and keep only Bob’s?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/1d-ising-chain-and-the-mirror-trick",
    "filePath": "Error Mitigation/1D Ising Chain and the Mirror Trick.md",
    "title": "1D Ising Chain and the Mirror Trick",
    "links": [
      "tags/qc/mitigation",
      "tags/qc/workflow",
      "why-quantum-computing-matters/quantum-utility-vs-quantum-advantage",
      "error-mitigation/samplomatic-—-boxes-and-annotations",
      "error-mitigation/noiselearnerv3-and-pauli-lindblad-models",
      "error-mitigation/pna-—-propagated-noise-absorption",
      "error-mitigation/slc-—-shaded-lightcones",
      "quantum-algorithms/trotterization"
    ],
    "tags": [
      "qc/mitigation",
      "qc/workflow"
    ],
    "content": "1D Ising Chain and the Mirror Trick\nqc/mitigation qc/workflow\nThe 1D transverse-field Ising chain is the benchmark circuit used throughout this section’s mitigation examples. It is deep enough for per-layer noise to compound into a measurable deviation, while remaining simple enough to inspect structurally.\nThe Hamiltonian\nH = -J \\sum_{\\langle i,j \\rangle} Z_i Z_j + h \\sum_i X_i\nThe same Hamiltonian (on a 2D heavy-hex lattice) drove IBM’s 127-qubit utility demonstration (Kim et al., Nature 618, 2023).\nTrotter circuit construction\nEach Trotter step applies:\n\nR_x(\\theta) on all qubits (transverse field)\nS^\\dagger \\cdot CZ on alternating pairs (ZZ interaction — even bonds, then odd bonds)\n\nThe S^\\dagger \\cdot CZ sequence equals R_{ZZ}(-\\pi/2) up to a global phase. Writing it this way keeps every two-qubit gate a CZ, so all boxing and dressing machinery applies directly.\ndef construct_ising_circuit(num_qubits, num_trotter_steps, rx_angle, barrier=True):\n    qc = QuantumCircuit(num_qubits)\n    for _ in range(num_trotter_steps):\n        qc.rx(rx_angle, range(num_qubits))\n        if barrier:\n            qc.barrier()\n        for first_qubit in (1, 2):           # even bonds, then odd bonds\n            for idx in range(first_qubit, num_qubits, 2):\n                qc.sdg([idx - 1, idx])\n                qc.cz(idx - 1, idx)\n        if barrier:\n            qc.barrier()\n    return qc\nrx_angle = π/8 is used throughout the lab.\nThe mirror trick\nFor arbitrary circuits at utility scale, classical simulation to find the ideal result is expensive or intractable. The mirror trick sidesteps this:\nAppend the inverse circuit after the forward circuit: U^\\dagger U = I\nOn a noiseless device, every qubit returns to |0\\rangle, so:\n\\langle Z_i \\rangle = +1 \\quad \\forall i \\quad \\text{(ideal)}\nAny deviation from +1 is hardware noise. This makes the mirror a standard benchmark — the ideal answer is always known without classical simulation.\nConstruction\n# Method 1: simple (transpiler may cancel U†U to identity)\nmirror = ising.compose(ising.inverse())\nmirror.measure_all()\n \n# Method 2: with barrier (prevents transpiler cancellation — REQUIRED)\nmirror = QuantumCircuit(num_qubits)\nmirror.compose(ising, inplace=True)\nmirror.barrier()                        # ← critical\nmirror.compose(ising.inverse(), inplace=True)\nmirror.measure_all()\n\n⚠️ The barrier() between forward and inverse is required — without it the transpiler sees U^\\dagger U and optimizes it away to nothing, destroying the mirror and giving fidelity ~1 trivially rather than as a noise benchmark.\n\n\n⚠️ Also use barrier=True inside construct_ising_circuit — barriers between the Rx layer and CZ layers prevent gate reordering within each Trotter step.\n\nTranspile\nmirror_isa = isa_pm.run(mirror)   # optimization_level=0\nUse optimization_level=0 to avoid the transpiler merging or reordering gates that would break the layer structure needed for boxing.\nUnique layers in the Ising brickwork\nA 4-qubit, 1-step Ising mirror has 5 boxes but only 3 unique layers:\n\nEven-bond CZ layer (e.g. qubits 0-1 and 2-3)\nOdd-bond CZ layer (e.g. qubits 1-2)\nMeasurement layer\n\nfind_unique_box_instructions collapses to these unique layers for noise learning, since equivalent boxes share one noise model.\nEven though even-bond and odd-bond layers play symmetric roles in the physics, their learned noise profiles differ — different dominant generators, different total noise. This is why per-layer mitigation matters.\nCircuit sizes across these examples\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nExampleQubitsTrotter stepsPurposeToy example21Introduce boxing workflowDemo41Full noise-learning demoExercise (small)62Student exercisePNA example102PNA demonstrationSLC example1010SLC demonstration (deep lightcone)Exercise (locality)153Student exercise (locality comparison)\nRelated\n\nSamplomatic — Boxes and Annotations\nNoiseLearnerV3 and Pauli-Lindblad Models\nPNA — Propagated Noise Absorption\nSLC — Shaded Lightcones\nQuantum Utility vs Quantum Advantage — the same 2023 Nature paper, from the “what does utility actually mean” side\nTrotterization — the same Hamiltonian/circuit family, taught as a simulation technique instead of a noise benchmark\n\nSelf-Check\n\nCould you explain the mirror trick to someone who’s never heard of it, and why it avoids needing classical simulation?\nWhy is barrier() required in two different places for the mirror trick to work correctly?\nWhy does a 4-qubit Ising mirror have 5 boxes but only 3 unique layers, and why does that distinction matter for noise learning?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/dressed-gates-and-pauli-propagation",
    "filePath": "Error Mitigation/Dressed Gates and Pauli Propagation.md",
    "title": "Dressed Gates and Pauli Propagation",
    "links": [
      "tags/qc/mitigation",
      "tags/qc/math",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "error-mitigation/samplomatic-—-boxes-and-annotations",
      "error-mitigation/pna-—-propagated-noise-absorption"
    ],
    "tags": [
      "qc/mitigation",
      "qc/math"
    ],
    "content": "Dressed Gates and Pauli Propagation\nqc/mitigation qc/math\nThe algebra underlying all twirling-based mitigation methods. A gate “dressed” with Paulis on either side is the basic operation that both Pauli Twirling and Samplomatic rely on.\nDressed gate definition\nFor any n-qubit unitary U, a dressed version is:\n\\tilde{U} = V_\\text{out} \\, U \\, V_\\text{in}\nwhere V_\\text{in} and V_\\text{out} are products of single-qubit unitaries. The dressing is invariant when:\nV_\\text{out} \\, U \\, V_\\text{in} = U \\quad \\text{(up to global phase)}\nThis means the gate’s logical action is unchanged, but any noise attached to U gets twirled by V_\\text{in} and V_\\text{out}.\nClifford conjugation rule\nFor any Pauli P and Clifford U:\nU \\, P \\, U^\\dagger = \\pm P&#039;\nwhere P&#039; is another Pauli. Finding V_\\text{out} given V_\\text{in} amounts to propagating V_\\text{in} through U. In Qiskit:\nPauli(&quot;IX&quot;).evolve(U, frame=&#039;s&#039;)   # returns U·P·U† with correct sign\nPauli.equiv(other)                  # compare up to global phase\nCZ propagation table (key rules)\nFor the CZ gate (used throughout this section’s Ising circuits):\n\nZ on either qubit → passes through unchanged\nX or Y on one qubit → picks up a Z on the other qubit\nThe pair XY ↔ YX picks up a minus sign\n\nThis asymmetry is why CZ is symmetric (both qubits play equal roles) while CX is not.\n# Examples\nCZ · IX · CZ = ZX    (X on q0 picks up Z on q1)\nCZ · XI · CZ = XZ    (X on q1 picks up Z on q0)\nCZ · IZ · CZ = IZ    (Z passes through)\nCZ · ZI · CZ = ZI    (Z passes through)\nTwo maps from the propagation table\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nMapContainsUsed forcz_twirl_mapV_\\text{in} \\to V_\\text{out} (unsigned)What to physically apply as dressingcz_commutation_mapV_\\text{in} \\to (\\text{sign}, V_\\text{out})Propagation rules including sign\nThe sign does not affect gate invariance (absorbed as global phase) but does matter when propagating Paulis through a circuit to track observable modifications (as in PNA).\nScale of application\nThe same Clifford conjugation operation is used at every level, only the scope differs:\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nMethodScopetwirling.enable_gates in EstimatorOptionsWhole circuit, uniformTwirl box in SamplomaticPer box (layer or gate)PNA propagationPer box, forward through entire circuit into observable\nQiskit helpers\nfrom qiskit.quantum_info import Pauli\n \n# Propagate P through U: returns ±P&#039;\nresult = Pauli(&quot;IX&quot;).evolve(cz_layer, frame=&#039;s&#039;)\nresult.to_label()    # e.g. &quot;+ZX&quot; or &quot;-YX&quot;\n \n# Compare up to global phase\nPauli(&quot;ZX&quot;).equiv(Pauli(&quot;-ZX&quot;))   # True\nRelated\n\nEstimatorOptions and the Five Mitigation Knobs\nSamplomatic — Boxes and Annotations\nPNA — Propagated Noise Absorption\n\nSelf-Check\n\nCould you explain what “dressing” a gate means and why the dressing has to be invariant?\nWhy does propagating a Pauli through a CZ sometimes pick up a minus sign, and why does that sign matter for PNA but not for basic twirling?\nWhat’s the one operation (Clifford conjugation) that shows up at every scale, from whole-circuit twirling to per-box Samplomatic to PNA?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/error-correction-(ec)",
    "filePath": "Error Mitigation/Error Correction (EC).md",
    "title": "Error Correction (EC)",
    "links": [
      "tags/qc/qec",
      "tags/qc/noise",
      "error-mitigation/error-suppression-and-mitigation-—-overview",
      "dynamic-circuits",
      "foundations/universal-gate-sets-and-the-clifford-group",
      "foundations/s-and-t-gates",
      "why-quantum-computing-matters/quantum-utility-vs-quantum-advantage",
      "error-mitigation/executor-primitive",
      "quantum-+-hpc/quantum-centric-supercomputing-(qcsc)"
    ],
    "tags": [
      "qc/qec",
      "qc/noise"
    ],
    "content": "Error Correction (EC)\nqc/qec qc/noise\nUnlike mitigation, suppression, or detection, error correction actively fixes errors during a computation, at the cost of extra qubits rather than extra shots or time. A logical qubit is encoded redundantly across many physical qubits using a stabilizer code; measuring the code’s stabilizers reveals a syndrome — a pattern that identifies which error occurred — without collapsing the encoded logical information itself. A classical decoder reads the syndrome and applies the correction.\nStabilizer codes and syndromes\nA stabilizer code is defined by a set of mutually commuting Pauli operators (the stabilizer generators) whose simultaneous +1 eigenspace is the code space — the subspace where valid logical states live. Measuring each stabilizer gives ±1 without disturbing any logical state inside the code space, because logical states are eigenstates of every stabilizer by construction. If a physical error has occurred, one or more stabilizer measurements flip to −1; the specific pattern of flips (the syndrome) identifies the error (for errors within the code’s correctable set) without ever revealing what the logical state actually is — measuring the syndrome only tells you about the error, not the data.\nKey insight: this requires exactly the machinery Dynamic Circuits already introduces — ancilla qubits, mid-circuit measurement of those ancillas (not the data qubits), and classical feedforward to apply the correction — just organized around a specific redundant encoding rather than a single logical operation.\nCode families\n\nSurface codes — the most commonly discussed family; qubits arranged on a 2D grid, stabilizers act on small local neighborhoods. Straightforward to implement given real hardware’s local connectivity, but qubit overhead per logical qubit is high.\nLDPC codes (low-density parity-check) — asymptotically more resource-efficient than surface codes, needing fewer physical qubits per logical qubit at scale, at the cost of requiring longer-range connectivity between qubits than a simple 2D grid provides.\n\nWhy stabilizer codes alone aren’t enough\nStabilizer codes give you fault-tolerant Clifford operations essentially for free — but the Clifford group is efficiently classically simulable (the Gottesman-Knill theorem), so a computation made only of protected Clifford gates would be pointless to run on a quantum computer at all. Fault-tolerant computation needs at least one non-Clifford gate (typically T) implemented fault-tolerantly too. The standard technique is magic state distillation: prepare many noisy “magic states,” distill them (using additional Clifford operations) into fewer, higher-fidelity magic states, then consume one via gate teleportation to apply a fault-tolerant T gate. This distillation step is a major source of the qubit and time overhead in fault-tolerant architectures.\nThe road to fault tolerance\nError correction (EC) is not the same claim as fault-tolerant quantum computing (FTQC). EC alone — encoding + correcting during execution — only gets you protected Clifford operations. FTQC requires both that correction and a universal set of logical operations (i.e. including non-Clifford gates, via magic state distillation above) carried out while suppressing errors throughout. EC is the building block; FTQC is the full assembled capability.\nIBM’s public roadmap (stated as of 2026 — a target, not a guarantee) tracks this progression by device generation: Falcon (27 qubits, 2019) → Eagle (127 qubits) → Heron (133 qubits, ~5K gates) → Nighthawk (120 qubits, scaling to 7.5K/10K/15K gates via 3×/9× multi-chip coupling) → Starling (~100M gates, 200 qubits, fault-tolerant, targeted 2029) → Blue Jay (~1B gates, 2000 qubits, fault-tolerant, targeted 2033+). The jump from Nighthawk to Starling is exactly the jump from “noisy, mitigated” (this vault’s whole Error Mitigation section) to “fault-tolerant” (this note) — see Quantum Utility vs Quantum Advantage for where things stand today, in between the two.\nRelated\n\nError Suppression and Mitigation — Overview — the four-category taxonomy this fills in\nDynamic Circuits — the ancilla + mid-circuit-measurement + feedforward mechanism this reuses\nExecutor Primitive\nQuantum Utility vs Quantum Advantage — where current hardware sits relative to this roadmap\nQuantum-Centric Supercomputing (QCSC) — the parallel integration-architecture roadmap tracking the same timeline\nUniversal Gate Sets and the Clifford Group, S and T Gates\n\nSelf-Check\n\nCould you explain why measuring a syndrome doesn’t collapse the encoded logical information, even though it’s a measurement?\nWhy isn’t a stabilizer code alone enough for universal fault-tolerant computation — what’s still missing?\nWhat’s the practical tradeoff between a surface code and an LDPC code?\nWhy is “error correction” not the same claim as “fault-tolerant quantum computing”?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/error-suppression-and-mitigation-—-overview",
    "filePath": "Error Mitigation/Error Suppression and Mitigation — Overview.md",
    "title": "Error Suppression and Mitigation — Overview",
    "links": [
      "tags/qc/mitigation",
      "tags/qc/noise",
      "error-mitigation/error-correction-(ec)",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "error-mitigation/pna-—-propagated-noise-absorption",
      "error-mitigation/samplomatic-—-boxes-and-annotations",
      "error-mitigation/slc-—-shaded-lightcones",
      "error-mitigation/noiselearnerv3-and-pauli-lindblad-models",
      "error-mitigation/1d-ising-chain-and-the-mirror-trick",
      "hardware-reality/running-on-real-ibm-hardware"
    ],
    "tags": [
      "qc/mitigation",
      "qc/noise"
    ],
    "content": "Error Suppression and Mitigation — Overview\nqc/mitigation qc/noise\nFour categories of techniques exist for dealing with noise on today’s quantum hardware. They differ in when they act, what they cost, and whether they fix, flag, or statistically correct errors.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nCategoryWhat it doesCost typeError Correction (EC)Encodes qubits redundantly; syndromes detect and fix errors fault-tolerantlyExtra qubits (prohibitive near-term)Error Detection (ED)Flags corrupted shots and discards them via post-selectionReduced usable sample sizeError Mitigation (EM)Corrects the statistics across many noisy runs so the expectation value estimate is closer to idealMore shots (time overhead)Error Suppression (ES)Reshapes noise during execution (DD, PT)Modest circuit overhead\nThis section focuses on mitigation and suppression — the two categories Qiskit Runtime’s Estimator primitive implements.\nThe runtime default\nAt resilience_level=1 (default), Estimator already applies TREX — twirled readout error extinction. Everything else is opt-in.\nWhy whole-circuit switches aren’t enough\nQiskit Runtime exposes suppression and mitigation as circuit-wide policies — one setting applied uniformly to every gate or layer. This is sufficient for small workloads but has two gaps:\n\nNo per-layer control — PEA and PEC internally use per-layer noise models, but you cannot inspect or override per-layer noise, or apply different strategies to different layers.\nNo observable rewriting — you cannot absorb learned noise into the observable rather than the circuit (this is what PNA does).\n\nThese gaps are what Samplomatic and the Chapter 3 add-ons (PNA, SLC) fill.\nRelated\n\nEstimatorOptions and the Five Mitigation Knobs\nSamplomatic — Boxes and Annotations\nNoiseLearnerV3 and Pauli-Lindblad Models\nPNA — Propagated Noise Absorption\nSLC — Shaded Lightcones\n1D Ising Chain and the Mirror Trick\nRunning on Real IBM Hardware — the fake-backend-vs-hardware gap this chapter closes\nError Correction (EC) — the fourth category, now covered in full\n\nSelf-Check\n\nCould you explain the difference between error correction, detection, mitigation, and suppression to someone new to this?\nWhy does this section focus on mitigation and suppression instead of correction?\nWhat are the two specific gaps that whole-circuit switches leave open, and what fills them?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
    "filePath": "Error Mitigation/EstimatorOptions and the Five Mitigation Knobs.md",
    "title": "EstimatorOptions and the Five Mitigation Knobs",
    "links": [
      "tags/qc/mitigation",
      "tags/qc/qiskit",
      "error-mitigation/samplomatic-—-boxes-and-annotations",
      "error-mitigation/dressed-gates-and-pauli-propagation",
      "error-mitigation/error-suppression-and-mitigation-—-overview",
      "programming-a-quantum-computer/the-primitives-family",
      "error-mitigation/zero-noise-extrapolation-(zne)",
      "error-mitigation/m3-—-matrix-free-measurement-mitigation"
    ],
    "tags": [
      "qc/mitigation",
      "qc/qiskit"
    ],
    "content": "EstimatorOptions and the Five Mitigation Knobs\nqc/mitigation qc/qiskit\nEstimatorV2 exposes five suppression/mitigation techniques through EstimatorOptions. Each is a circuit-wide switch — it applies the same policy to every gate or layer in the circuit.\nThe five techniques\nDD — Dynamical Decoupling (suppression)\nIdle qubits drift due to slow coherent noise while waiting for other qubits to finish. DD inserts pulse sequences (e.g. XY4) on idle qubits that multiply to the identity, averaging away the drift. Only helps when the circuit has idle gaps — on a densely packed circuit it can hurt because the pulses themselves are imperfect.\ndd_options = EstimatorOptions()\ndd_options.dynamical_decoupling.enable = True\ndd_options.dynamical_decoupling.sequence_type = &quot;XY4&quot;\nPT — Pauli Twirling (suppression)\nSandwiches two-qubit gates between random single-qubit Paulis chosen so the ideal gate is unchanged. Averaged over many randomizations, an arbitrary noise channel becomes a stochastic Pauli channel — coherent error (which grows quadratically with depth) is reshaped into Pauli noise (grows only linearly). Prerequisite for PEA and PEC.\npt_options = EstimatorOptions()\npt_options.twirling.enable_gates = True\npt_options.twirling.strategy = &quot;active&quot;\npt_options.twirling.num_randomizations = 32\nTREX — Twirled Readout Error Extinction (mitigation)\nTargets measurement error. Randomly inserts X before measurement and flips the classical bit back. This diagonalizes the readout-error transfer matrix so it can be inverted by simple rescaling. On by default at resilience level 1.\ntrex_options = EstimatorOptions()\ntrex_options.resilience.measure_mitigation = True\nZNE — Zero-Noise Extrapolation (mitigation)\nRuns the circuit at amplified noise levels (by gate folding: replace U with UU†U) and extrapolates back to zero noise. Not guaranteed unbiased. Default noise factors are [1, 3, 5], so roughly 3× shot overhead.\nzne_options = EstimatorOptions()\nzne_options.resilience.zne_mitigation = True\nzne_options.resilience.zne.noise_factors = [1, 3, 5]\nzne_options.resilience.zne.amplifier = &quot;pea&quot;   # use PEA amplifier\nPEA — Probabilistic Error Amplification (used with ZNE)\nReplaces ZNE’s crude gate-folding with learned amplification. Learns the twirled Pauli-Lindblad noise model and amplifies by probabilistically injecting that learned noise — a more faithful scaling of actual device noise. Still uses ZNE’s extrapolation step.\nPEC — Probabilistic Error Cancellation (mitigation)\nLearns the noise model and inverts it by sampling “anti-noise” circuits. Gives an unbiased estimate. Cost: sampling overhead γ² that grows exponentially with circuit depth and total noise.\npec_options = EstimatorOptions()\npec_options.resilience.pec_mitigation = True\npec_options.resilience.pec.max_overhead = 100\n\n⚠️ ZNE/PEA and PEC are mutually exclusive — one amplifies noise, the other cancels it. Cannot be enabled on the same EstimatorOptions.\n\nresilience_level presets\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nLevelTechniques enabled0None1 (default)TREX2TREX + PT + ZNE\nSampling overhead\nMitigation is not free — cost is paid in shots, not qubits:\n\nZNE with 3 noise factors + 32 randomizations → ~3 × 32 = 96× overhead\nPEC overhead: J = \\bar{\\gamma}^{nd} \\cdot \\beta^d where n = qubits, d = depth, \\bar{\\gamma} comes from the learned noise model. Grows exponentially with depth.\n\nThe whole-circuit API gives no access to the per-layer \\bar{\\gamma} that drives this cost. That gap is what Samplomatic fills.\nRelated\n\nDressed Gates and Pauli Propagation\nSamplomatic — Boxes and Annotations\nError Suppression and Mitigation — Overview\nThe Primitives Family — where EstimatorOptions fits into the primitives picture\nZero Noise Extrapolation (ZNE) — a deeper dive on the ZNE knob summarized above\nM3 — Matrix-Free Measurement Mitigation — the Sampler-side, post-processing counterpart to TREX\n\nSelf-Check\n\nCould you name all five techniques and say, for each, whether it’s suppression or mitigation?\nWhy are ZNE/PEA and PEC mutually exclusive?\nWhat’s missing from this whole-circuit API that motivates Samplomatic?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/executor-primitive",
    "filePath": "Error Mitigation/Executor Primitive.md",
    "title": "Executor Primitive",
    "links": [
      "tags/qc/mitigation",
      "tags/qc/qiskit",
      "programming-a-quantum-computer/the-primitives-family",
      "error-mitigation/samplomatic-—-boxes-and-annotations",
      "error-mitigation/noiselearnerv3-and-pauli-lindblad-models",
      "error-mitigation/pna-—-propagated-noise-absorption",
      "error-mitigation/slc-—-shaded-lightcones"
    ],
    "tags": [
      "qc/mitigation",
      "qc/qiskit"
    ],
    "content": "Executor Primitive\nqc/mitigation qc/qiskit\nThe Executor is the box-aware counterpart to `Sampler` and `Estimator`. It runs programs built from Samplomatic templates and samplexes, honoring Twirl, InjectNoise, and ChangeBasis annotations at execution time.\nKey difference from Sampler/Estimator\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPrimitiveInputUse caseSampler / EstimatorPUBs (circuit + params + observables)Standard circuitsExecutorQuantumProgram with SamplexItemsBox-annotated circuits with per-layer mitigation\nThe full workflow\nfrom qiskit_ibm_runtime import Executor, QuantumProgram\n \n# 1. Build template + samplex from boxed circuit\ntemplate, samplex = build(boxed_circuit)\n \n# 2. Inspect what the samplex needs\nprint(samplex.inputs())   # shows pauli_lindblad_maps.&lt;ref&gt; slots\n \n# 3. Bind the learned noise models\nsamplex_args = (\n    samplex.inputs()\n    .make_broadcastable()\n    .bind(pauli_lindblad_maps=refs_to_noise_models)\n)\n \n# 4. Assemble QuantumProgram\nprogram = QuantumProgram(shots=64)\nprogram.append_samplex_item(\n    template,\n    samplex=samplex,\n    samplex_arguments=samplex_args,\n    shape=(16,),    # number of randomizations\n)\n \n# 5. Submit\nexecutor = Executor(backend)\njob = executor.run(program)\nsamplex.inputs() and binding\nThe samplex reports which runtime slots it needs. For a circuit with Twirl + InjectNoise:\nInputs:\n  pauli_lindblad_maps.r0001   &lt;- ref string for layer 0\n  pauli_lindblad_maps.r0002   &lt;- ref string for layer 1\nOutputs:\n  parameter_values\n  measurement_flips.meas\n  pauli_signs                 &lt;- appears when InjectNoise is present\n\nThe dict keys of refs_to_noise_models must exactly match the ref strings in samplex.inputs(). Both come from the same InjectNoise annotations, so they match automatically when using the same boxing pass manager.\nResult structure\nresult = job.result()\n \nitem_data = result[0]           # first SamplexItem\n \nmeas   = item_data[&quot;meas&quot;]                        # (randomizations, shots, qubits)\nflips  = item_data[&quot;measurement_flips.meas&quot;]      # (randomizations, 1, qubits)\nsigns  = item_data.get(&quot;pauli_signs&quot;, None)        # (randomizations, num_terms) or None\nProcessing results with executor_expectation_values\nfrom qiskit_addon_utils.exp_vals.expectation_values import executor_expectation_values\nimport numpy as np\n \n# Convert gamma to plain scalar first (version compatibility fix)\ngamma = np.asarray(gamma_value).item()\n \nresult_tuple = executor_expectation_values(\n    meas,\n    basis_mapping,       # dict from Samplomatic\n    meas_basis_axis=None,\n    avg_axis=0,          # average over randomizations axis\n    measurement_flips=flips,\n    pauli_signs=signs,\n    rescale_factors=None,\n    gamma_factor=gamma,  # None for unmitigated, gamma for PEC\n)\n \n# Return is (mean, variance) — NOT (mean, std)\nmean, variance = result_tuple[0]\nstd = np.sqrt(variance)\n\n⚠️ Version gotcha (qiskit-addon-utils 0.4.0): gamma_factor must be a plain Python scalar, not a numpy array. Use np.asarray(gamma).item(). The return value is (mean, variance) — take np.sqrt(variance) for std.\n\nRelated\n\nSamplomatic — Boxes and Annotations\nNoiseLearnerV3 and Pauli-Lindblad Models\nPNA — Propagated Noise Absorption\nSLC — Shaded Lightcones\nThe Primitives Family — where Executor sits relative to Sampler/Estimator\n\nSelf-Check\n\nWhat does Executor need as input that Sampler/Estimator don’t?\nWhy must the dict keys of refs_to_noise_models exactly match the ref strings from samplex.inputs()?\nWhat does executor_expectation_values actually return, and what’s the gotcha in extracting a standard deviation from it?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/m3-—-matrix-free-measurement-mitigation",
    "filePath": "Error Mitigation/M3 — Matrix-Free Measurement Mitigation.md",
    "title": "M3 — Matrix-Free Measurement Mitigation",
    "links": [
      "tags/qc/mitigation",
      "tags/qc/qiskit",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "error-mitigation/pec-—-probabilistic-error-cancellation",
      "error-mitigation/zero-noise-extrapolation-(zne)",
      "quantum-algorithms/the-partition-problem-—-qaoa-worked-example"
    ],
    "tags": [
      "qc/mitigation",
      "qc/qiskit"
    ],
    "content": "M3 — Matrix-Free Measurement Mitigation\nqc/mitigation qc/qiskit\nA scalable readout-error mitigation method that corrects measurement bitstring counts in post-processing without ever building the full 2^n \\times 2^n assignment matrix that naive readout correction requires. M3 assumes correlations of order three and higher between qubit readout errors are negligible, so it only needs small 2\\times2 (single-qubit) and 4\\times4 (two-qubit) assignment matrices, built by preparing all qubits in |0\\ldots0\\rangle and |1\\ldots1\\rangle and measuring their error rates. These small matrices are then combined only for the bitstrings actually observed in a run, so the effective mitigation matrix scales with the number of distinct sampled outcomes, not 2^n — which is what lets M3 mitigate circuits with far more qubits than a full linear-algebra inversion could handle. Key insight: M3 is a post-processing correction applied to counts you already have, unlike TREX, which changes what happens during circuit execution (randomized bit-flips before measurement) to make the readout-error matrix invertible in the first place — the two are complementary, not competing: TREX conditions the noise, M3 corrects the counts after the fact.\nimport mthree\n \nmeas_map = mthree.utils.final_measurement_mapping(optimized_circuit)\nmit = mthree.M3Mitigation(backend)\nmit.cals_from_system(meas_map)\n \nquasi_probs = mit.apply_correction(counts, meas_map)  # quasi-probability distribution\nAPI notes\n\nmthree.utils.final_measurement_mapping(circuit) recovers which physical qubits the classical bits actually correspond to after transpilation/routing — required before calibration, since M3 needs to calibrate the exact physical qubits used, not the virtual/logical ones.\n.cals_from_system(meas_map) runs the |0\\ldots0\\rangle/|1\\ldots1\\rangle calibration circuits on the backend for just the qubits in meas_map.\n.apply_correction(counts, meas_map) returns quasi-probabilities (can include small negative values from the correction), not counts — convert back to a valid distribution by clipping negatives to zero and renormalizing before further analysis.\nM3 correction is applied on top of raw sampled counts, so it composes with circuit-level suppression techniques (dynamical decoupling, gate/measurement twirling) applied beforehand — mitigating readout error doesn’t preclude also suppressing coherent error during execution.\n\nRelated\n\nEstimatorOptions and the Five Mitigation Knobs — TREX is the Estimator-side readout mitigation; M3 is the Sampler-side, post-processing alternative\nPEC — Probabilistic Error Cancellation\nZero Noise Extrapolation (ZNE)\nThe Partition Problem — QAOA Worked Example — M3 is compared against no-mitigation, suppression-only, and combined configurations on this worked example\n\nSelf-Check\n\nWhy does M3 avoid building the full 2^n \\times 2^n assignment matrix, and what assumption makes that possible?\nWhat’s the difference between what TREX does and what M3 does, and why are they complementary rather than redundant?\nWhy does apply_correction return quasi-probabilities that can include negative values, and what do you need to do before treating them as a normal distribution?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/noiselearnerv3-and-pauli-lindblad-models",
    "filePath": "Error Mitigation/NoiseLearnerV3 and Pauli-Lindblad Models.md",
    "title": "NoiseLearnerV3 and Pauli-Lindblad Models",
    "links": [
      "tags/qc/mitigation",
      "tags/qc/noise",
      "error-mitigation/pna-—-propagated-noise-absorption",
      "error-mitigation/slc-—-shaded-lightcones",
      "error-mitigation/samplomatic-—-boxes-and-annotations",
      "error-mitigation/executor-primitive",
      "noise--and--error-models/density-matrix"
    ],
    "tags": [
      "qc/mitigation",
      "qc/noise"
    ],
    "content": "NoiseLearnerV3 and Pauli-Lindblad Models\nqc/mitigation qc/noise\nNoiseLearnerV3 characterizes each gate layer as a sparse Pauli-Lindblad channel by running calibration circuits on real hardware. The result is the per-layer noise description that PNA, SLC, and PEC use to mitigate errors.\n\n⚠️ Noise learning requires real QPU hardware — simulators cannot provide the noise being characterized.\n\nThe Pauli-Lindblad model\nEach layer’s noise is modeled as:\n\\Lambda = \\exp(\\mathcal{L}), \\quad \\mathcal{L}(\\rho) = \\sum_k \\lambda_k \\, (P_k \\rho P_k - \\rho)\n\n\\mathcal{L} is a superoperator acting on density matrices \\rho\n\\Lambda = e^{\\mathcal{L}} is its formal exponential (the actual noise channel)\nEach P_k is a Hermitian Pauli (P_k^\\dagger = P_k, P_k^2 = I)\n\\lambda_k is the rate of that Pauli generator — what NoiseLearnerV3 learns\n\nGenerator set for a CZ layer on qubits (0, 1)\n\n3 single-qubit generators per qubit: X_0, Y_0, Z_0, X_1, Y_1, Z_1 → 6 total\n9 two-qubit generators: XX, XY, XZ, YX, YY, YZ, ZX, ZY, ZZ → 9 total\nTotal: 15 generators for a single CZ gate\n\nThe model does not capture:\n\nCoherent error (assumed twirled away into Pauli form first)\nCross-layer crosstalk (generators outside a layer’s qubit connectivity don’t appear)\n\nSetup and configuration\nfrom qiskit_ibm_runtime.options_models.noise_learner_v3_options import NoiseLearnerV3Options\nfrom qiskit_ibm_runtime.noise_learner_v3 import NoiseLearnerV3\n \nnl_options = NoiseLearnerV3Options(\n    num_randomizations=5,          # random benchmarking circuits per configuration\n    shots_per_randomization=20,    # shots per circuit\n    layer_pair_depths=[1, 2],      # depths at which each layer is repeated\n)\nlearner = NoiseLearnerV3(backend, nl_options)\nlearner.options.environment.job_tags = [&quot;my-experiment&quot;]\nThe learner fits a fidelity-vs-depth decay to extract each generator’s rate \\lambda_k. More depths → more accurate fit.\nRunning and fetching results\n# Submit (pass unique layers from find_unique_box_instructions)\nlearner_job = learner.run(unique_layers)\njob_id = learner_job.job_id()\n \n# Re-fetch on kernel restart\nlearner_job = service.job(saved_job_id)\n \n# Get result\nresult = learner_job.result()\n \n# Convert to {ref: PauliLindbladMap} dict\nrefs_to_noise = result.to_dict(unique_layers, require_refs=False)\nInspecting the learned model\nref, plm = next(iter(refs_to_noise.items()))\n \n# List of (pauli_string, qubit_indices, rate) tuples\ngenerators = plm.to_sparse_list()\ngenerators.sort(key=lambda g: -abs(g[2]))   # sort by rate magnitude\n \n# Print top 10\nfor pauli, qubits, rate in generators[:10]:\n    print(f&quot;{pauli} @ {qubits}: {rate:.4e}&quot;)\nTypical dominant generators for a CZ on Heron hardware are single-qubit Z terms at rates ~10^{-3}.\nPer-layer noise differences\nEven layers that play similar structural roles in a circuit (e.g. even-bond vs odd-bond CZ layers in an Ising brickwork) have different learned noise profiles. The dominant generator of one layer may be weak or absent in the other. This is the key motivation for per-layer mitigation — a uniform correction tuned for one layer’s noise structure will mis-correct the other.\nNoise drift\nQPU noise drifts daily due to recalibration. For best results, re-learn noise close to the time the final job is run. Results from different backends or different days are not interchangeable.\nRelated\n\nSamplomatic — Boxes and Annotations\nExecutor Primitive\nPNA — Propagated Noise Absorption\nSLC — Shaded Lightcones\nDensity Matrix — the open-system/Lindblad formalism this model is a specialization of\n\nSelf-Check\n\nWhy does noise learning require real QPU hardware, unlike most of the rest of this vault’s noise content?\nCould you explain why a single CZ gate has 15 noise generators, not just 1?\nWhy do even-bond and odd-bond layers in the same circuit end up with different learned noise, despite playing symmetric roles?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/pec-—-probabilistic-error-cancellation",
    "filePath": "Error Mitigation/PEC — Probabilistic Error Cancellation.md",
    "title": "PEC — Probabilistic Error Cancellation",
    "links": [
      "tags/qc/mitigation",
      "tags/qc/noise",
      "error-mitigation/noiselearnerv3-and-pauli-lindblad-models",
      "error-mitigation/slc-—-shaded-lightcones",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "error-mitigation/pna-—-propagated-noise-absorption",
      "error-mitigation/zero-noise-extrapolation-(zne)"
    ],
    "tags": [
      "qc/mitigation",
      "qc/noise"
    ],
    "content": "PEC — Probabilistic Error Cancellation\nqc/mitigation qc/noise\nProbabilistic Error Cancellation (PEC) mitigates gate noise by probabilistically rewriting the circuit to sample from the inverse noise channel. It produces an unbiased expectation value estimate when the noise model is accurate, at the cost of a sampling overhead \\gamma^2.\nCore idea\nPEC uses the learned Pauli-Lindblad noise model to construct an inverse noise map (anti-noise), then:\n\nSamples circuits from the quasi-probability distribution of the anti-noise\nEach shot gets a \\pm 1 sign from the quasi-probability weights\nAfter averaging with rescaling by \\gamma, the result is unbiased\n\nPEC vs PNA\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPECPNACircuitRewritten (anti-noise sampling)UnchangedObservableUnchangedRewritten to \\tilde{O}CostSampling overhead \\gamma^2More observable termsBiasExactExact (up to truncation)Requires special structureNoNo (but works best on local observables)\nSampling overhead\n\\gamma = \\exp\\!\\Big(2\\sum_{l,\\sigma} \\lambda_{l,\\sigma}\\Big)\nwhere \\lambda_{l,\\sigma} is the learned rate of generator \\sigma at layer l.\nThe number of shots needed scales as \\gamma^2. Because \\gamma is exponential in total circuit noise, PEC becomes expensive quickly as circuits grow deeper.\nFor a 100-qubit Trotter circuit at depth 4000, even at IBM’s best current error rates, full PEC would take more than a day of QPU time.\nRuntime PEC vs Samplomatic PEC\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nRuntime Estimator PECSamplomatic PEC (Chapter 3)Enableresilience.pec_mitigation = Trueinject_noise_strategy=&quot;individual_modification&quot; + SLCPer-layer controlNone exposedFull access via noise_scales per generatorOverhead controlresilience.pec.max_overhead capbias_tolerance in compute_local_scales\nThe Runtime switch is convenient but the API exposes no per-layer or per-generator knobs. The sampling overhead can blow up because every learned generator is cancelled.\nPEC + SLC\nSLC reduces PEC’s overhead by pruning generators outside the observable’s lightcone. This is the practical path for utility-scale PEC.\nFull PEC is the limit of SLC at bias_tolerance = 0 (cancel everything).\nRelated\n\nEstimatorOptions and the Five Mitigation Knobs\nSLC — Shaded Lightcones\nNoiseLearnerV3 and Pauli-Lindblad Models\nPNA — Propagated Noise Absorption\nZero Noise Extrapolation (ZNE) — the cheaper, biased alternative; mutually exclusive with PEC on the same EstimatorOptions\n\nSelf-Check\n\nCould you explain why PEC produces an unbiased estimate while ZNE doesn’t?\nWhy does PEC’s sampling overhead grow exponentially with circuit depth?\nWhat’s the practical difference between enabling PEC via resilience.pec_mitigation vs via Samplomatic’s individual_modification?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/pna-—-propagated-noise-absorption",
    "filePath": "Error Mitigation/PNA — Propagated Noise Absorption.md",
    "title": "PNA — Propagated Noise Absorption",
    "links": [
      "tags/qc/mitigation",
      "tags/qc/noise",
      "error-mitigation/dressed-gates-and-pauli-propagation",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "error-mitigation/samplomatic-—-boxes-and-annotations",
      "error-mitigation/noiselearnerv3-and-pauli-lindblad-models",
      "error-mitigation/executor-primitive",
      "error-mitigation/slc-—-shaded-lightcones",
      "error-mitigation/1d-ising-chain-and-the-mirror-trick"
    ],
    "tags": [
      "qc/mitigation",
      "qc/noise"
    ],
    "content": "PNA — Propagated Noise Absorption\nqc/mitigation qc/noise\nPropagated Noise Absorption (PNA) mitigates gate noise by rewriting the observable rather than the circuit. It propagates the inverse of each layer’s learned Pauli-Lindblad noise forward through the circuit and absorbs it into the measurement observable, producing a noise mitigating observable \\tilde{O}.\nCore idea\n\nCircuit: unchanged\nObservable: rewritten from O to \\tilde{O}\n\nMeasuring \\tilde{O} on the noisy circuit gives the same expectation value as measuring O on the ideal (noiseless) circuit.\nThis works because Pauli noise channels compose and propagate efficiently through Clifford gates via the commutation rules from section 1.2.\nPNA vs PEC\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPNAPECCircuitUnchangedRewritten (anti-noise sampling)ObservableRewritten to \\tilde{O}UnchangedCostMore observable terms to measureSampling overhead \\gamma^2BiasExact (up to truncation)Exact (with accurate model)\nBoxing strategy\nPNA uses inject_noise_strategy=&quot;uniform_modification&quot;. All layers share a global noise_scales slot, set to 0 — this leaves the sampled circuits untouched while still associating each layer with its learned model so the model can be propagated into the observable.\npna_boxing_pm = generate_boxing_pass_manager(\n    enable_gates=True,\n    enable_measures=True,\n    measure_annotations=&quot;all&quot;,       # adds ChangeBasis annotation too\n    twirling_strategy=&quot;active&quot;,\n    inject_noise_targets=&quot;gates&quot;,\n    inject_noise_strategy=&quot;uniform_modification&quot;,\n)\nmeasure_annotations=&quot;all&quot; adds both Twirl and ChangeBasis to the measurement box, because \\tilde{O} will contain non-Z terms that require measuring in different bases.\nFour-step PNA workflow\n1. Box the circuit\nboxed_circuit_pna = pna_boxing_pm.run(mirror_isa_pna)\nunique_layers_pna = find_unique_box_instructions(\n    boxed_circuit_pna, normalize_annotations=None, undress_boxes=True\n)\n2. Learn the noise\nrefs_to_noise_models_pna = noise_result_pna.to_dict(unique_layers_pna, require_refs=False)\n3. Compute the noise mitigating observable \\tilde{O}\nfrom qiskit_addon_pna import generate_noise_mitigating_observable\n \n# Define target observable\ntarget_obs = SparsePauliOp.from_sparse_list(\n    [(&quot;ZZ&quot;, [4, 5], 1.0)],   # e.g. Z₄Z₅\n    num_qubits=10,\n)\ntarget_obs_isa = target_obs.apply_layout(mirror_isa_pna.layout)\n \n# Generate noise mitigating observable\nobs_tilde = generate_noise_mitigating_observable(\n    boxed_circuit_pna,\n    target_obs_isa,\n    refs_to_noise_models_pna,\n    max_err_terms=10000,\n    max_obs_terms=10000,\n    num_processes=8,\n)\nThe function propagates the inverse of each layer’s noise channel through the circuit using Clifford conjugation, then folds those corrections into O to produce \\tilde{O}.\nTruncation: max_err_terms and max_obs_terms keep only the dominant terms so \\tilde{O} remains measurable. More terms → better accuracy, but more measurement bases required.\n4. Run with Executor\n# Use ChangeBasis because obs_tilde has non-Z terms\nsamplex_args = (\n    samplex.inputs()\n    .make_broadcastable()\n    .bind(\n        pauli_lindblad_maps=refs_to_noise_models_pna,\n        basis_changes=get_measurement_bases(obs_tilde),\n        noise_scales={ref: 0 for ref in refs_to_noise_models_pna},\n    )\n)\nWhat \\tilde{O} looks like\nFor a ZZ observable on the middle pair of a 10-qubit chain:\n\nThe original ZZ term at magnitude 1 remains the dominant term (slightly amplified above 1)\nMany new Pauli terms appear — these are the anti-noise corrections PNA propagated from the learned noise model\nResults vary by QPU and calibration date\n\nAdding TREX on top of PNA\nPNA mitigates gate noise; TREX handles readout errors. They compose:\nfrom qiskit_addon_utils.noise_management import trex_factors\n \nrescale = trex_factors(\n    meas_results,\n    obs_tilde,\n    measurement_flips=flips,\n)\n# Pass rescale_factors=rescale to executor_expectation_values\nPNA + TREX consistently outperforms either alone on hardware.\nExercise 4 — Magnetization observable\nBuild \\tilde{O}_Z for the magnetization O_Z = \\sum_{i=0}^{9} Z_i on a 10-qubit chain:\ntarget_observable_ex4 = SparsePauliOp.from_sparse_list(\n    [(&quot;Z&quot;, [i], 1.0) for i in range(10)],\n    num_qubits=10,\n)\ntarget_observable_ex4_isa = target_observable_ex4.apply_layout(mirror_isa_pna.layout)\n \nobs_tilde_ex4 = generate_noise_mitigating_observable(\n    boxed_circuit_pna,\n    target_observable_ex4_isa,\n    refs_to_noise_models_pna,\n    max_err_terms=10000,\n    max_obs_terms=10000,\n    num_processes=8,\n)\nIdeal value: \\langle O_Z \\rangle = 10 (all qubits in |0\\rangle give \\langle Z_i \\rangle = +1).\nRelated\n\nSamplomatic — Boxes and Annotations\nNoiseLearnerV3 and Pauli-Lindblad Models\nExecutor Primitive\nDressed Gates and Pauli Propagation\nSLC — Shaded Lightcones\n1D Ising Chain and the Mirror Trick\n\nSelf-Check\n\nCould you explain to someone how PNA mitigates noise without touching the circuit at all?\nWhy does PNA need uniform_modification specifically, with noise_scales set to 0?\nWhy does \\tilde{O} end up needing more measurement bases than the original observable O?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/samplomatic-—-boxes-and-annotations",
    "filePath": "Error Mitigation/Samplomatic — Boxes and Annotations.md",
    "title": "Samplomatic — Boxes and Annotations",
    "links": [
      "tags/qc/mitigation",
      "tags/qc/workflow",
      "error-mitigation/executor-primitive",
      "error-mitigation/noiselearnerv3-and-pauli-lindblad-models",
      "error-mitigation/dressed-gates-and-pauli-propagation",
      "error-mitigation/pna-—-propagated-noise-absorption",
      "error-mitigation/slc-—-shaded-lightcones"
    ],
    "tags": [
      "qc/mitigation",
      "qc/workflow"
    ],
    "content": "Samplomatic — Boxes and Annotations\nqc/mitigation qc/workflow\nSamplomatic is a framework for per-layer control over error mitigation. It addresses parts of a circuit through boxes and annotations, then compiles annotated circuits into a parametric template + recipe (samplex) that the Executor runs.\nThe three components\nTogether with NoiseLearnerV3 and the Executor, Samplomatic forms Qiskit Runtime’s directed execution model:\n\nSamplomatic — box and annotate the circuit, build template + samplex\nNoiseLearnerV3 — learn per-box noise on hardware\nExecutor — run the mitigated program\n\nBoxes\nA box is a marked region of a circuit — a single gate, a layer, or the measurement. Created with:\n# Manual (hand-written)\nwith circuit.box(annotations=[Twirl()]):\n    circuit.cz(0, 1)\n \n# Automatic (boxing pass manager)\npm = generate_boxing_pass_manager(\n    enable_gates=True,\n    enable_measures=True,\n    twirling_strategy=&quot;active&quot;,\n    inject_noise_targets=&quot;gates&quot;,\n    inject_noise_strategy=&quot;no_modification&quot;,   # or &quot;uniform_modification&quot;, &quot;individual_modification&quot;\n)\nboxed_circuit = pm.run(isa_circuit)\nAnnotations\nAnnotations are instructions attached to a box (not to the whole circuit).\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAnnotationPurposeTwirl()Randomize this box’s Pauli dressings each randomizationInjectNoise(ref=...)Declare a slot for a learned Pauli-Lindblad noise model, keyed by ref stringChangeBasis(...)Rotate the measurement to a non-Z basis (needed when PNA introduces non-Z observable terms)\ninject_noise_strategy options\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nStrategyUsed forEffect&quot;no_modification&quot;Chapter 2 baselineAll equivalent boxes share the same ref; noise is a passthrough, never applied&quot;uniform_modification&quot;PNAOne global noise_scales slot; set to 0 to leave circuits untouched while associating each layer with its learned model for propagation into the observable&quot;individual_modification&quot;SLCSeparate noise_scales.&lt;ref&gt; per box; SLC can scale each generator independently along the observable’s lightcone\nTemplates and the samplex\nbuild(boxed_circuit) converts an annotated circuit into two objects:\nfrom samplomatic import build\ntemplate, samplex = build(boxed_circuit)\n\nTemplate — a parametric QuantumCircuit with free parameter slots where random Paulis will go\nSamplex — a classical DAG (recipe) that, for each randomization, draws random Paulis and outputs parameter_values + measurement_flips\n\nThe samplex DAG nodes\n\nRed stars — sampling nodes (one per Twirl box), draws random Paulis\nGreen circles — processing steps (Pauli propagation through gates, register slicing)\nBlue bowties — collectors into parameter_values\nPurple bowtie — collector into measurement_flips.meas\n\nCommon build error\nA Twirl box places random Pauli dressings on the left side. Those dressings must propagate through the gate and land somewhere — a collector box on the right. If the circuit ends without a collector (measurement box), build raises a SamplexBuildError:\nSamplexBuildError: unterminated virtual gates on qubits [0, 1]\n\nFix: always add a measurement box after each gate box.\nSampling\n# Draw num_randomizations sets of random Paulis (purely classical)\noutputs = samplex.sample({}, num_randomizations=32)\noutputs[&quot;parameter_values&quot;]       # shape (32, num_params)\noutputs[&quot;measurement_flips.meas&quot;] # shape (32, 1, num_qubits)\nUnique layers\nEquivalent boxes share one noise model. find_unique_box_instructions collapses a boxed circuit to its structurally distinct layers:\nfrom samplomatic.utils import find_unique_box_instructions\nunique_layers = find_unique_box_instructions(\n    boxed_circuit,\n    normalize_annotations=None,\n    undress_boxes=True,   # strip dressing before comparison\n)\nOnly unique layers are passed to NoiseLearnerV3, saving QPU time.\nAPI gotcha\ngenerate_boxing_pass_manager options are keyword arguments. Always check the ref strings from samplex.inputs() — the dict keys passed to .bind() must match exactly.\nRelated\n\nNoiseLearnerV3 and Pauli-Lindblad Models\nExecutor Primitive\nDressed Gates and Pauli Propagation\nPNA — Propagated Noise Absorption\nSLC — Shaded Lightcones\n\nSelf-Check\n\nCould you explain what a “box” and an “annotation” are, and how they differ from a whole-circuit switch?\nWhy does no_modification vs uniform_modification vs individual_modification correspond to baseline vs PNA vs SLC?\nWhy must every gate box be followed by a measurement box, and what error do you get if you forget?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/slc-—-shaded-lightcones",
    "filePath": "Error Mitigation/SLC — Shaded Lightcones.md",
    "title": "SLC — Shaded Lightcones",
    "links": [
      "tags/qc/mitigation",
      "tags/qc/noise",
      "error-mitigation/pec-—-probabilistic-error-cancellation",
      "error-mitigation/pna-—-propagated-noise-absorption",
      "error-mitigation/noiselearnerv3-and-pauli-lindblad-models",
      "error-mitigation/samplomatic-—-boxes-and-annotations",
      "error-mitigation/executor-primitive",
      "error-mitigation/1d-ising-chain-and-the-mirror-trick"
    ],
    "tags": [
      "qc/mitigation",
      "qc/noise"
    ],
    "content": "SLC — Shaded Lightcones\nqc/mitigation qc/noise\nShaded Lightcones (SLC) is an evolution of PEC that reduces its exponential sampling overhead by exploiting the causal structure of the circuit. Rather than cancelling all noise, it identifies which noise generators can actually affect the observable of interest and ignores the rest.\nCore idea\nAn observable measured at the end of a circuit can only be affected by noise within its backward lightcone — the set of circuit locations whose errors can propagate to the measurement. Errors outside the lightcone cannot influence the outcome and can be excluded from error cancellation.\nSLC goes beyond a simple binary lightcone. It assigns each noise generator a bound on how strongly it can shift the observable, then uses a bias_tolerance budget to decide which generators to actively cancel vs leave alone.\nPEC vs SLC\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPECSLCWhat’s cancelledAll noise generators in the circuitOnly generators within the observable’s lightcone (above a bias threshold)Sampling overhead \\gamma^2Full: \\gamma = \\exp(2 \\sum_{l,\\sigma} \\lambda_{l,\\sigma})Reduced: only the cancelled subset contributesBiasExact (with accurate model)Small admitted bias (controlled by bias_tolerance)Best forGeneral observablesLocal observables with a narrow lightcone\nWhy locality matters\nA local observable (e.g. Z_7 on one qubit) has a narrow backward lightcone — only a small fraction of circuit gates can affect it. SLC prunes the vast majority of noise generators, dramatically reducing \\gamma^2.\nA global observable (e.g. \\sum_i Z_i) has a lightcone spanning the entire circuit — SLC provides little reduction over full PEC.\nSLC workflow\n1. Box with individual_modification\nslc_boxing_pm = generate_boxing_pass_manager(\n    enable_gates=True,\n    enable_measures=True,\n    measure_annotations=&quot;all&quot;,\n    twirling_strategy=&quot;active&quot;,\n    inject_noise_targets=&quot;gates&quot;,\n    inject_noise_strategy=&quot;individual_modification&quot;,   # ← SLC requires this\n)\nboxed_circuit_slc = slc_boxing_pm.run(isa_circuit_slc)\nindividual_modification gives each box its own noise_scales.&lt;ref&gt; slot so SLC can scale each generator independently.\n2. Predict noise model Paulis (no QPU needed)\nfrom qiskit_addon_slc.utils import generate_noise_model_paulis\n \nnoise_model_paulis = generate_noise_model_paulis(\n    unique_layers, backend.coupling_map, boxed_circuit\n)\nnoise_model_rates = {ref: None for ref in noise_model_paulis}   # rates unknown yet\nThis step scans the boxed circuit and generates all weight-1 and weight-2 Pauli terms supported by the qubit connectivity — the possible noise support, independent of noise strength. No QPU time used.\n3. Compute forward and backward bounds\nfrom qiskit_addon_slc.bounds import compute_forward_bounds, compute_backward_bounds\n \n# Forward bounds: how each error can propagate forward to the observable\n# (observable-dependent, compute once per observable)\nforward_bounds = compute_forward_bounds(\n    boxed_circuit,\n    noise_model_paulis,           # positional\n    observable=obs_isa,           # keyword\n    evolution_max_terms=1000,\n    eigval_max_qubits=18,\n    atol=1e-8,\n    num_processes=8,\n    timeout=600,\n)\n \n# Backward bounds: how errors propagate backward from the observable\n# (observable-independent, compute once)\nbackward_bounds = compute_backward_bounds(\n    boxed_circuit,\n    noise_model_paulis,           # positional\n    evolution_max_terms=1000,\n    num_processes=1,\n    timeout=600,\n)\n\n⚠️ API gotcha: noise_model_rates is not a parameter of these functions in current versions. The observable is a keyword argument for compute_forward_bounds. compute_backward_bounds does not accept atol or eigval_max_qubits.\n\n4. Merge bounds (requires learned noise)\nfrom qiskit_addon_slc.bounds import merge_bounds\n \nmerged = merge_bounds(\n    forward_bounds,\n    backward_bounds,\n    refs_to_noise_models,          # learned rates needed here\n    id_map,\n)\nMerging picks the transition point in the circuit where backward switches to forward bounds, minimizing total estimated bias. Requires learned noise rates — the circuit must be re-characterized if the qubit count changed since the last learning run.\n5. Compute local scales\nfrom qiskit_addon_slc.bounds import compute_local_scales\n \nlocal_scales, sampling_cost, residual_bias = compute_local_scales(\n    merged,\n    bias_tolerance=chosen_bias_threshold,\n)\nReturns:\n\nlocal_scales — per-generator scale factors (0 = cancel, 1 = leave, intermediate = partial)\nsampling_cost — predicted \\gamma^2 for this tolerance\nresidual_bias_bound — bias from leaving some generators unmitigated\n\n6. Execute with Executor\n# Compute gamma for PEC+SLC normalization\nfrom qiskit_addon_utils.noise_management import gamma_from_noisy_boxes\nimport numpy as np\n \ngamma_slc = gamma_from_noisy_boxes(refs_to_noise_models, id_map, local_scales)\ngamma_slc = np.asarray(gamma_slc).item()   # must be scalar\n \n# Bind local_scales into samplex arguments\nsamplex_args = (\n    samplex.inputs()\n    .make_broadcastable()\n    .bind(\n        pauli_lindblad_maps=refs_to_noise_models,\n        noise_scales=local_scales,\n        # noise_scales=-1 means &quot;use PEC anti-noise&quot;, 0 means &quot;unmitigated&quot;\n    )\n)\nSampling overhead comparison\nFor obs_Z7 (local, single qubit) on a 15-qubit, 3-step Ising mirror:\n\nFull PEC: \\gamma^2 from all generators in the circuit\nSLC at low bias_tolerance: \\gamma^2 drops by factors of 10–100× compared to full PEC\nThe trade-off is bias for cost — a small admitted bias buys a large overhead reduction\n\nFor a 7-qubit-wide observable on the same circuit, the lightcone is much wider and SLC provides much less reduction.\nExercise 5 — Locality comparison\nThree observables with different locality on a 15-qubit, 3-step Ising chain:\n# Local: Z on qubit 7 only\nobs_Z7 = SparsePauliOp.from_sparse_list([(&quot;Z&quot;, [7], 1.0)], num_qubits=15)\n \n# Two-body: X on qubit 3, Z on qubit 11\nobs_X3_Z11 = SparsePauliOp.from_sparse_list([(&quot;XZ&quot;, [3, 11], 1.0)], num_qubits=15)\n# Note: &quot;XZ&quot; maps left-to-right: X→qubit 3, Z→qubit 11\n \n# Global-ish: Z on 7 central qubits (single 7-body Pauli product)\nobs_7_Zs = SparsePauliOp.from_sparse_list(\n    [(&quot;ZZZZZZZ&quot;, [4, 5, 6, 7, 8, 9, 10], 1.0)],\n    num_qubits=15,\n)\nExpected: obs_Z7 sees the greatest SLC overhead reduction; obs_7_Zs sees the least.\nRelated\n\nPNA — Propagated Noise Absorption\nPEC — Probabilistic Error Cancellation\nNoiseLearnerV3 and Pauli-Lindblad Models\nSamplomatic — Boxes and Annotations\nExecutor Primitive\n1D Ising Chain and the Mirror Trick\n\nSelf-Check\n\nCould you explain why a local observable benefits far more from SLC than a global one?\nWhat does bias_tolerance actually trade off, and what are the three outputs of compute_local_scales?\nWhy is full PEC described as “the limit of SLC at bias_tolerance = 0”?\n",
    "order": 999
  },
  {
    "slug": "error-mitigation/zero-noise-extrapolation-(zne)",
    "filePath": "Error Mitigation/Zero Noise Extrapolation (ZNE).md",
    "title": "Zero Noise Extrapolation (ZNE)",
    "links": [
      "tags/qc/mitigation",
      "error-mitigation/pec-—-probabilistic-error-cancellation",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "error-mitigation/m3-—-matrix-free-measurement-mitigation",
      "quantum-algorithms/the-partition-problem-—-qaoa-worked-example"
    ],
    "tags": [
      "qc/mitigation"
    ],
    "content": "Zero Noise Extrapolation (ZNE)\nqc/mitigation\nA mitigation technique that deliberately runs a circuit at several amplified noise levels, then extrapolates the resulting expectation values back to the zero-noise limit — the value the circuit would produce on a noiseless device. The default amplification is gate folding: replacing a unitary U with U U^\\dagger U (or higher odd repetitions) to scale up the effective noise per gate by an integer factor while leaving the ideal computation unchanged, at noise factors typically [1, 3, 5]. Each noise-scaled circuit is measured, and a fit (linear or polynomial) across the noise-factor/expectation-value pairs is extrapolated to noise factor 0. Key insight: ZNE is not guaranteed unbiased — it depends on the extrapolation model matching how the real device’s noise actually scales with the folding factor — which is exactly what distinguishes it from PEC: PEC inverts a learned noise model for an unbiased (but exponentially expensive) estimate, while ZNE extrapolates a trend for a cheaper but approximate one. EstimatorOptions.resilience.zne_mitigation and .resilience.pec_mitigation are mutually exclusive on the same options object — one amplifies noise, the other cancels it, and Runtime doesn’t support both in the same call.\nfrom qiskit_ibm_runtime import EstimatorV2 as Estimator\nfrom qiskit_ibm_runtime.options import EstimatorOptions\n \noptions = EstimatorOptions()\noptions.default_shots = 10_000\noptions.resilience.zne_mitigation = True\noptions.twirling.enable_gates = True\noptions.twirling.enable_measure = True\n \nestimator = Estimator(backend, options=options)\nCost\nEach additional noise factor is a separate circuit execution, so ZNE with 3 noise factors costs roughly 3× the shots of an unmitigated run — before accounting for any additional overhead from combining it with gate/measurement twirling (typically run alongside ZNE to also suppress coherent error). This is far cheaper than PEC’s \\gamma^2 overhead, which is why ZNE is the default at resilience_level = 2 while PEC must be explicitly requested — ZNE trades some bias for keeping the shot cost roughly constant regardless of circuit depth, whereas PEC’s cost grows exponentially with depth.\nRelated\n\nEstimatorOptions and the Five Mitigation Knobs — where ZNE sits among the five whole-circuit mitigation/suppression knobs, including the PEA variant that replaces gate-folding with learned amplification\nPEC — Probabilistic Error Cancellation — the unbiased, more expensive alternative; mutually exclusive with ZNE on the same EstimatorOptions\nM3 — Matrix-Free Measurement Mitigation — a separate readout-only correction that composes with either ZNE or PEC\nThe Partition Problem — QAOA Worked Example — ZNE is compared against no-mitigation, TREX, and PEC on this worked example\n\nSelf-Check\n\nWhy isn’t ZNE guaranteed to produce an unbiased result, unlike PEC?\nWhat does “gate folding” mean, and why does replacing U with UU^\\dagger U leave the ideal computation unchanged while still amplifying noise?\nWhy can’t zne_mitigation and pec_mitigation both be enabled on the same EstimatorOptions?\n",
    "order": 999
  },
  {
    "slug": "foundations/cx-gate-and-entanglement",
    "filePath": "Foundations/CX Gate and Entanglement.md",
    "title": "CX Gate and Entanglement",
    "links": [
      "tags/qc/gates",
      "tags/qc/entanglement",
      "entangled-states/bell-states",
      "entangled-states/ghz-states",
      "hardware-reality/backend-properties",
      "error-mitigation/dressed-gates-and-pauli-propagation",
      "foundations/h-gate",
      "hardware-reality/bridge-gate-identity",
      "depth--and--optimization/circuit-depth"
    ],
    "tags": [
      "qc/gates",
      "qc/entanglement"
    ],
    "content": "CX Gate (CNOT) and Entanglement\nqc/gates qc/entanglement\nTwo-qubit gate: flips the target qubit iff the control qubit is |1⟩. When the control is in superposition, the two qubits become entangled — their measurement outcomes become perfectly correlated with no classical explanation.\nCX = \\begin{pmatrix} 1&amp;0&amp;0&amp;0\\\\0&amp;1&amp;0&amp;0\\\\0&amp;0&amp;0&amp;1\\\\0&amp;0&amp;1&amp;0 \\end{pmatrix}\nThis is the mechanism behind Bell States and GHZ States.\nCZ — the symmetric sibling\nCZ = \\begin{pmatrix} 1&amp;0&amp;0&amp;0\\\\0&amp;1&amp;0&amp;0\\\\0&amp;0&amp;1&amp;0\\\\0&amp;0&amp;0&amp;-1 \\end{pmatrix}\nCZ is the native two-qubit gate on IBM’s Heron devices (see Backend Properties) — it applies a -1 phase only when both qubits are |1\\rangle, which makes it symmetric under swapping the two qubits (unlike CX, which clearly distinguishes control from target). CX and CZ are interconvertible with single-qubit gates (CZ = (I\\otimes H)\\,CX\\,(I\\otimes H)), which is why the Error Mitigation section’s Ising circuits can build everything from CZ alone.\nRelated\n\nH Gate\nBridge Gate Identity — a non-local CX rewritten as nearest-neighbor CX gates\nCircuit Depth — CX gates are usually the bottleneck for depth\nBackend Properties — CZ as the hardware-native gate\nDressed Gates and Pauli Propagation\n\nSelf-Check\n\nCould you explain CNOT to someone who’s never heard of it, including why it needs a “control” and a “target”?\nWhy does entanglement only happen when the control qubit is in superposition, not when it’s in a definite state?\nWhy are CX gates usually the bottleneck for Circuit Depth?\nWhy is CZ symmetric under swapping its two qubits, but CX isn’t?\n",
    "order": 999
  },
  {
    "slug": "foundations/h-gate",
    "filePath": "Foundations/H Gate.md",
    "title": "H Gate",
    "links": [
      "tags/qc/gates",
      "absolute-basics/superposition",
      "absolute-basics/bloch-sphere",
      "foundations/x-gate",
      "entangled-states/bell-states",
      "entangled-states/ghz-states",
      "why-quantum-computing-matters/deutsch's-algorithm",
      "foundations/cx-gate-and-entanglement"
    ],
    "tags": [
      "qc/gates"
    ],
    "content": "H Gate (Hadamard / superposition)\nqc/gates\nPuts a qubit into superposition — partly |0⟩ and partly |1⟩:\nH|0\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)\nMeasuring gives |0⟩ or |1⟩ with 50/50 probability. Geometrically: 180° rotation around an axis halfway between X and Z on the Bloch Sphere.\nRelated\n\nX Gate\nBell States — H is always the first gate, creating the superposition that CX then entangles\nGHZ States\nSuperposition, Bloch Sphere\nDeutsch’s Algorithm — H sandwiching the oracle is what makes the interference trick work\n\nSelf-Check\n\nCould you explain what the Hadamard gate does to someone who’s never heard of it?\nWhat is a Hadamard gate typically used for, at the start of a circuit?\nWhy is H always the first gate in building Bell States, before CX?\n",
    "order": 999
  },
  {
    "slug": "foundations/pauli-operators",
    "filePath": "Foundations/Pauli Operators.md",
    "title": "Pauli Operators",
    "links": [
      "tags/qc/math",
      "tags/qc/gates",
      "foundations/sparsepauliop",
      "foundations/x-gate",
      "foundations/z-gate-and-relative-phase",
      "noise--and--error-models/pauli-error-model",
      "absolute-basics/bloch-sphere"
    ],
    "tags": [
      "qc/math",
      "qc/gates"
    ],
    "content": "Pauli Operators\nqc/math qc/gates\nThe four fundamental 2x2 matrices acting on a single qubit: I, X, Y, Z.\n\nI — identity, does nothing\nX — bit-flip (|0⟩↔|1⟩), 180° rotation around X-axis\nY — bit-flip + phase-flip, 180° rotation around Y-axis\nZ — phase-flip (|1⟩→-|1⟩), 180° rotation around Z-axis\n\nKey properties: Hermitian (→ valid observables) and unitary (→ valid gates). Each squares to I. They anticommute pairwise.\nWhy they matter: any single-qubit Hermitian matrix (observable/Hamiltonian term) is a weighted sum of I,X,Y,Z. Tensor products extend this to any number of qubits — the universal “alphabet” for quantum observables.\nRelated\n\nSparsePauliOp — how Pauli strings are represented in Qiskit\nX Gate\nZ Gate and Relative Phase\nPauli Error Model — the same four operators used as a probabilistic noise model instead of deterministic gates\nBloch Sphere — the “180° rotation around an axis” language above, made geometric\n\nSelf-Check\n\nCould you list all four Pauli operators and what each one does to a qubit?\nWhy does “Hermitian and unitary” matter — what does each property buy you?\nWhy can the same four operators describe both a deterministic gate and a probabilistic noise model?\n",
    "order": 999
  },
  {
    "slug": "foundations/s-and-t-gates",
    "filePath": "Foundations/S and T Gates.md",
    "title": "S and T Gates",
    "links": [
      "tags/qc/gates",
      "tags/qc/math",
      "foundations/z-gate-and-relative-phase",
      "absolute-basics/bloch-sphere",
      "foundations/universal-gate-sets-and-the-clifford-group",
      "error-mitigation/error-correction-(ec)"
    ],
    "tags": [
      "qc/gates",
      "qc/math"
    ],
    "content": "S and T Gates\nqc/gates qc/math\nTwo more special cases of the general phase gate P_\\theta, smaller rotations than Z’s full half-turn:\nS = P_{\\pi/2} = \\begin{pmatrix}1&amp;0\\\\0&amp;i\\end{pmatrix}, \\qquad T = P_{\\pi/4} = \\begin{pmatrix}1&amp;0\\\\0&amp;e^{i\\pi/4}\\end{pmatrix}\nS (“phase gate,” a quarter-turn about the Z-axis) and T (sometimes called the ”\\pi/8 gate,” an eighth-turn). S^2 = Z and T^2 = S — each is literally a finer subdivision of the last, all rotating about the same axis on the Bloch Sphere.\nWhy T specifically matters\nKey insight: T is the standard “magic” gate that shows up throughout fault-tolerant quantum computing. See Universal Gate Sets and the Clifford Group for why — S and H are not enough on their own, but adding T is. This is also the exact T referenced (without being defined) in Error Correction (EC)‘s magic state distillation section: “prepare many noisy magic states… consume one via gate teleportation to apply a fault-tolerant T gate” — this note is what that T actually is.\nRelated\n\nZ Gate and Relative Phase\nBloch Sphere\nUniversal Gate Sets and the Clifford Group\nError Correction (EC) — where T shows up again, in magic state distillation\n\nSelf-Check\n\nCould you write the matrices for S and T and verify S^2=Z?\nWhy are S and T both described as smaller rotations than Z, geometrically?\nWhy does Error Correction (EC) care about T specifically, rather than S or Z?\n",
    "order": 999
  },
  {
    "slug": "foundations/sparsepauliop",
    "filePath": "Foundations/SparsePauliOp.md",
    "title": "SparsePauliOp",
    "links": [
      "tags/qc/qiskit",
      "tags/qc/math",
      "foundations/pauli-operators",
      "hardware-reality/transpilation",
      "hardware-reality/qiskit-api-gotchas"
    ],
    "tags": [
      "qc/qiskit",
      "qc/math"
    ],
    "content": "SparsePauliOp\nqc/qiskit qc/math\nQiskit’s sparse representation of a weighted sum of Pauli strings (e.g. Z, ZZ, XIZY), used to define observables for measurement (e.g. with Estimator).\nfrom qiskit.quantum_info import SparsePauliOp\nobservable = SparsePauliOp(&#039;Z&#039;, coeffs=[1.0])   # single-qubit Z\nCommon trap: must be passed as a plain object, not wrapped in a list, for methods like .apply_layout() to work. Also: the Pauli string length must match the circuit’s qubit count (one letter = one qubit).\nRelated\n\nPauli Operators\nTranspilation — .apply_layout() is used after transpiling to remap an observable onto physical qubits\nQiskit API Gotchas — this “plain object, not a list” trap is one entry in the running gotchas list\n\nSelf-Check\n\nWhat is a SparsePauliOp actually representing, in plain language?\nWhy does the Pauli string length have to match the circuit’s qubit count?\nWhy does an observable need .apply_layout() after Transpilation?\n",
    "order": 999
  },
  {
    "slug": "foundations/tensor-products-and-multi-qubit-states",
    "filePath": "Foundations/Tensor Products and Multi-Qubit States.md",
    "title": "Tensor Products and Multi-Qubit States",
    "links": [
      "tags/qc/math",
      "foundations/pauli-operators",
      "quantum-algorithms/hamiltonian-simulation-—-why-it's-hard",
      "programming-a-quantum-computer/simulators-—-statevector-vs-shot-based",
      "entangled-states/bell-states",
      "absolute-basics/superposition",
      "absolute-basics/what-is-a-qubit"
    ],
    "tags": [
      "qc/math"
    ],
    "content": "Tensor Products and Multi-Qubit States\nqc/math\nMultiple quantum systems combine via the tensor product (\\otimes), not addition. For two single-qubit states |\\phi\\rangle=\\alpha_0|0\\rangle+\\alpha_1|1\\rangle and |\\psi\\rangle=\\beta_0|0\\rangle+\\beta_1|1\\rangle:\n|\\phi\\rangle\\otimes|\\psi\\rangle = \\sum_{a,b\\in\\{0,1\\}} \\alpha_a\\beta_b\\,|ab\\rangle\n— bilinear in both arguments. In column-vector form this is the Kronecker product:\n|\\phi\\rangle\\otimes|\\psi\\rangle = \\begin{pmatrix}\\alpha_0\\\\\\alpha_1\\end{pmatrix}\\otimes\\begin{pmatrix}\\beta_0\\\\\\beta_1\\end{pmatrix} = \\begin{pmatrix}\\alpha_0\\beta_0\\\\\\alpha_0\\beta_1\\\\\\alpha_1\\beta_0\\\\\\alpha_1\\beta_1\\end{pmatrix}\nThe same operation combines operators: M\\otimes N acts on the combined space, built the same component-wise way. This is exactly the fact behind Pauli Operators’ “tensor products extend this to any number of qubits” line — an n-qubit Pauli string like XZI is literally X\\otimes Z\\otimes I.\nWhy this makes state spaces explode\nKey insight: n single qubits combine into one 2^n-dimensional space, not 2n-dimensional — this is the exact mechanism behind why quantum states are classically expensive and why statevector simulation doesn’t scale. Two qubits: 4 amplitudes. Twenty qubits: over a million. This is also structurally why entanglement exists at all: a general 2^n-dimensional vector doesn’t have to factor as a tensor product of n single-qubit vectors — when it doesn’t, that’s what “entangled” means (see Bell States).\nClassical parallel\nMultiple classical systems combine via the Cartesian product of their state sets, and the same tensor-product operation combines their probability vectors — the math is identical. The difference isn’t the combination rule, it’s that a quantum joint state can hold superposition and phase relationships a classical joint probability distribution can’t.\nfrom qiskit.quantum_info import Statevector\n \nphi = Statevector([1, 0])       # |0&gt;\npsi = Statevector([0, 1])       # |1&gt;\ncombined = phi.tensor(psi)      # |0&gt; ⊗ |1&gt; = |01&gt;\nRelated\n\nWhat is a Qubit\nPauli Operators\nHamiltonian Simulation — Why It’s Hard\nSimulators — Statevector vs Shot-Based\nBell States\n\nSelf-Check\n\nCould you compute |0\\rangle\\otimes|1\\rangle by hand using the Kronecker product formula?\nWhy does n qubits give a 2^n-dimensional space rather than 2n?\nWhy does “not every vector in the combined space factors as a tensor product” matter for what entanglement means?\n",
    "order": 999
  },
  {
    "slug": "foundations/universal-gate-sets-and-the-clifford-group",
    "filePath": "Foundations/Universal Gate Sets and the Clifford Group.md",
    "title": "Universal Gate Sets and the Clifford Group",
    "links": [
      "tags/qc/gates",
      "tags/qc/math",
      "foundations/h-gate",
      "foundations/s-and-t-gates",
      "foundations/cx-gate-and-entanglement",
      "error-mitigation/dressed-gates-and-pauli-propagation",
      "error-mitigation/error-correction-(ec)"
    ],
    "tags": [
      "qc/gates",
      "qc/math"
    ],
    "content": "Universal Gate Sets and the Clifford Group\nqc/gates qc/math\nA gate set is universal if any n-qubit unitary can be approximated arbitrarily well by some finite sequence of gates drawn from it. One standard universal set: \\{H, T, CX\\} — every quantum algorithm in principle compiles down to just these three gate types.\nThe Clifford group — an important non-universal subgroup\nGenerated by \\{H, S, CX\\} (see H Gate, S and T Gates, CX Gate and Entanglement). Clifford gates are exactly the gates that map Paulis to Paulis under conjugation — UPU^\\dagger is always another Pauli for Clifford U, the same Clifford conjugation rule the Error Mitigation section builds an entire toolchain around.\nThe Gottesman-Knill theorem\nKey insight: any circuit built purely from Clifford gates (plus computational-basis measurements) can be efficiently simulated on a classical computer — however many qubits, however deep. A Clifford-only circuit is never “quantum-hard,” no matter how large. This is exactly why Error Correction (EC) singles out T as the gate that needs special handling (magic state distillation): stabilizer codes protect Clifford operations essentially for free, but a computation made of only protected Clifford gates would be classically simulable and therefore pointless to run on a quantum computer at all. Non-Clifford gates are what make a circuit actually worth running on quantum hardware.\nRelated\n\nS and T Gates\nDressed Gates and Pauli Propagation — the same Clifford-conjugation rule, applied to noise mitigation\nError Correction (EC) — magic state distillation exists specifically to implement T fault-tolerantly\nH Gate, CX Gate and Entanglement\n\nSelf-Check\n\nCould you name a universal gate set and explain what “universal” actually guarantees?\nWhy does the Gottesman-Knill theorem mean a Clifford-only circuit is never worth running on a quantum computer?\nWhy does adding just one gate (T) to the Clifford group make the difference between classically-simulable and not?\n",
    "order": 999
  },
  {
    "slug": "foundations/why-gates-are-unitary",
    "filePath": "Foundations/Why Gates Are Unitary.md",
    "title": "Why Gates Are Unitary",
    "links": [
      "tags/qc/math",
      "quantum-algorithms/hamiltonians-and-encoding-for-quantum-circuits",
      "absolute-basics/measurement-and-collapse",
      "foundations/pauli-operators",
      "absolute-basics/what-is-a-qubit"
    ],
    "tags": [
      "qc/math"
    ],
    "content": "Why Gates Are Unitary\nqc/math\nA valid quantum operation must preserve the norm of the state vector — probabilities have to sum to 1 both before and after, so \\|U|\\psi\\rangle\\| = \\||\\psi\\rangle\\| for every valid input state |\\psi\\rangle. Key insight: this requirement is exactly equivalent to unitarity. Since \\|U|\\psi\\rangle\\|^2 = \\langle\\psi|U^\\dagger U|\\psi\\rangle must equal \\langle\\psi|\\psi\\rangle for all |\\psi\\rangle, it forces U^\\dagger U = I — the definition of a unitary matrix. Norm-preservation isn’t a separate property gates happen to have; it’s the reason the unitary requirement exists in the first place.\nWhy this rules some matrices out\nNot every matrix is a valid gate. A plain scaling matrix breaks norm preservation immediately. More importantly: a Hamiltonian H itself is generally not unitary (see Hamiltonians and Encoding for Quantum Circuits) — which is exactly why you can’t apply H directly as a gate, only U(H,t)=e^{-iHt}, which is unitary by construction.\nUnitarity means reversibility\nEvery unitary has an inverse, U^{-1}=U^\\dagger, so every quantum gate (aside from measurement, which is not unitary — see Measurement and Collapse) is reversible. This is a sharp contrast with classical logic: an AND gate has no inverse (you can’t recover both inputs from the output), but every gate in this vault’s gate set can always be undone by applying its adjoint.\nRelated\n\nPauli Operators — states “Hermitian and unitary” as a property; this is why unitary specifically is required\nHamiltonians and Encoding for Quantum Circuits\nWhat is a Qubit\n\nSelf-Check\n\nCould you derive U^\\dagger U = I starting from the requirement that U preserves a state’s norm?\nWhy isn’t a Hamiltonian H itself a valid gate, even though it’s a perfectly good Hermitian matrix?\nWhy does unitarity imply every quantum gate is reversible, and what’s the classical contrast?\nWhat would it take to deliberately construct a matrix that is not unitary, and how would you verify computationally (e.g. via an is_unitary()-style check) that it fails U^\\dagger U = I?\n",
    "order": 999
  },
  {
    "slug": "foundations/x-gate",
    "filePath": "Foundations/X Gate.md",
    "title": "X Gate",
    "links": [
      "tags/qc/gates",
      "absolute-basics/bloch-sphere",
      "foundations/pauli-operators",
      "foundations/h-gate",
      "entangled-states/bell-states"
    ],
    "tags": [
      "qc/gates"
    ],
    "content": "X Gate (bit-flip)\nqc/gates\nFlips a qubit: |0⟩→|1⟩, |1⟩→|0⟩. Quantum analog of classical NOT. Geometrically: 180° rotation around the X-axis of the Bloch Sphere.\nX = \\begin{pmatrix} 0 &amp; 1 \\\\ 1 &amp; 0 \\end{pmatrix}\nRelated\n\nPauli Operators\nH Gate\nBell States — X is used to reach the other three Bell states from the base one\nBloch Sphere\n\nSelf-Check\n\nCould you explain the X gate to someone who’s never heard of it, using the classical NOT analogy?\nWhat rotation does X correspond to on the Bloch Sphere?\nHow is X used to move between the four different Bell States?\n",
    "order": 999
  },
  {
    "slug": "foundations/z-gate-and-relative-phase",
    "filePath": "Foundations/Z Gate and Relative Phase.md",
    "title": "Z Gate and Relative Phase",
    "links": [
      "tags/qc/gates",
      "tags/qc/phase",
      "absolute-basics/bloch-sphere",
      "foundations/s-and-t-gates",
      "foundations/pauli-operators",
      "entangled-states/bell-states"
    ],
    "tags": [
      "qc/gates",
      "qc/phase"
    ],
    "content": "Z Gate &amp; Relative Phase\nqc/gates qc/phase\nThe Z gate leaves |0⟩ unchanged but maps |1⟩ → −|1⟩:\nZ = \\begin{pmatrix} 1 &amp; 0 \\\\ 0 &amp; -1 \\end{pmatrix}\nThis minus sign is a relative phase. It doesn’t change measurement probabilities in the standard basis (still 50/50) but is physically real — it affects how the state interferes in later computation. It’s what distinguishes |00⟩+|11⟩ from |00⟩−|11⟩.\nThe general phase gate\nZ is one member of a whole family, the phase gate P_\\theta:\nP_\\theta = \\begin{pmatrix} 1 &amp; 0 \\\\ 0 &amp; e^{i\\theta} \\end{pmatrix}\nZ is the special case \\theta=\\pi (a half-turn about the Z-axis on the Bloch Sphere). See S and T Gates for the two other special cases that matter most in practice.\nRelated\n\nPauli Operators\nBell States — the two “minus” Bell states come from combining X and Z\nS and T Gates\nBloch Sphere\n\nSelf-Check\n\nWhy does the Z gate not change measurement probabilities in the standard basis, if it’s clearly doing something?\nWhat is a “relative phase,” and why does it matter even though it’s invisible to a Z-basis measurement?\nWhat’s the difference between |00\\rangle+|11\\rangle and |00\\rangle-|11\\rangle, and how would you actually detect it?\nWhat angle \\theta makes P_\\theta equal to the Z gate?\n",
    "order": 999
  },
  {
    "slug": "hardware-reality/backend-properties",
    "filePath": "Hardware Reality/Backend Properties.md",
    "title": "Backend Properties",
    "links": [
      "tags/qc/hardware",
      "hardware-reality/coupling-map-and-topology",
      "noise--and--error-models/thermal-relaxation",
      "hardware-reality/physical-vs-logical-qubits-and-layout",
      "error-mitigation/error-suppression-and-mitigation-—-overview",
      "hardware-reality/qiskit-api-gotchas",
      "programming-a-quantum-computer/simulators-—-statevector-vs-shot-based",
      "noise--and--error-models/depolarizing-noise",
      "noise--and--error-models/pauli-error-model",
      "entangled-states/ghz-states",
      "absolute-basics/what-is-a-quantum-computer"
    ],
    "tags": [
      "qc/hardware"
    ],
    "content": "Backend Properties\nqc/hardware\nA backend isn’t just “a chip with qubits” — it’s characterized by a specific set of measurable properties that determine how a circuit will actually run on it, and how much it will degrade once it does.\nThe core properties to know:\n\nBasis gates — the native gate set the hardware can physically execute (e.g. rz, sx, x, cz). Anything outside this set gets decomposed by the transpiler.\nCoupling map — which physical qubits can interact directly via a two-qubit gate. See Coupling Map and Topology.\nCLOPS (circuit layer operations per second) — a throughput metric, roughly “how many layers of gates can this device execute per second.”\nGate errors — per-gate error rates, usually much higher for two-qubit gates than single-qubit gates.\nReadout errors — the chance a measurement reports the wrong bit even if the qubit’s state was correct.\nT_1 / T_2 — coherence timescales; see Thermal Relaxation.\n\nNone of these are uniform across a chip — different physical qubits and different qubit pairs can have meaningfully different error rates, which is exactly why layout choice matters (see Physical vs Logical Qubits and Layout).\nConcrete scale: the median two-qubit gate error rate is typically about 10x the median single-qubit error rate. Useful circuits on IBM’s newest devices currently run to roughly O(100) two-qubit gate layers and up to ~10,000 total two-qubit gates — extendable further with the techniques in the Error Mitigation section.\nPractical access in Qiskit\nfrom qiskit_ibm_runtime import QiskitRuntimeService\n \nservice = QiskitRuntimeService()\nbackend = service.backend(&quot;ibm_fez&quot;)\n \nbasis_operations = backend.operation_names   # property, not a method\ncoupling_map = backend.coupling_map.get_edges()  # returns list[tuple[int, int]]\nTwo easy-to-miss gotchas here — see Qiskit API Gotchas for the full pattern: operation_names and coupling_map are properties, not methods (no parentheses), and backend.coupling_map is a CouplingMap object, not a plain list — call .get_edges() if you need a plain list[tuple[int,int]] (e.g. for strict type-checked graders).\nTwo ways to simulate backend-informed noise\n\nAerSimulator.from_backend(backend) — builds a simulator using the real (or fake) backend’s calibration data: basis gates, coupling map, and measured error rates. See Simulators — Statevector vs Shot-Based.\nManually constructed noise models — build a NoiseModel from individual pieces like Depolarizing Noise, Pauli Error Model, or Thermal Relaxation, useful when you want to isolate and study one noise mechanism at a time rather than realistic composite noise.\n\nRelated\n\nCoupling Map and Topology\nPhysical vs Logical Qubits and Layout\nThermal Relaxation\nDepolarizing Noise, Pauli Error Model — noise mechanisms this data feeds into\nQiskit API Gotchas\nGHZ States\nWhat is a Quantum Computer — the physical reality (cryostats, decoherence) behind these numbers\nSimulators — Statevector vs Shot-Based\n\nSelf-Check\n\nCould you name the six core backend properties and what each one tells you?\nWhy aren’t gate errors and T_1/T_2 uniform across a chip?\nWhat’s the difference between AerSimulator.from_backend(backend) and a manually constructed noise model?\n",
    "order": 999
  },
  {
    "slug": "hardware-reality/bridge-gate-identity",
    "filePath": "Hardware Reality/Bridge Gate Identity.md",
    "title": "Bridge Gate Identity",
    "links": [
      "tags/qc/hardware",
      "tags/qc/gates",
      "hardware-reality/transpilation",
      "foundations/cx-gate-and-entanglement",
      "entangled-states/ghz-states"
    ],
    "tags": [
      "qc/hardware",
      "qc/gates"
    ],
    "content": "Bridge Gate Identity\nqc/hardware qc/gates\nA circuit identity that implements a non-local CX(0,2) using only nearest-neighbor gates on a chain 0—1—2, without moving any state (unlike SWAP):\nCX(0,2) = CX(0,1)\\cdot CX(1,2)\\cdot CX(0,1)\\cdot CX(1,2)\nQubit 1 acts as a “bridge” — temporarily disturbed, then restored, while the entangling effect propagates from qubit 0 to qubit 2.\nCost: 4 nearest-neighbor CX gates to replace 1 non-local CX — a concrete “tax” for ignoring hardware topology. (After cancelling an adjacent identical CX with a neighboring gate in context, this can sometimes simplify to 3.)\nOrder matters, and it’s context-dependent: there are two mirror-image valid forms —\n\nCX(0,1)·CX(1,2)·CX(0,1)·CX(1,2) (starts near)\nCX(1,2)·CX(0,1)·CX(1,2)·CX(0,1) (starts far)\n\nBoth are mathematically equal to CX(0,2), but which one composes correctly depends on what gate already precedes the substitution point in your circuit — a gate that looks reusable from an earlier line usually isn’t; it was serving a different purpose (e.g. GHZ-building) and the bridge identity needs its own full, self-contained 4-gate block.\nRelated\n\nTranspilation\nCX Gate and Entanglement\nGHZ States — used to build nearest-neighbor GHZ circuits without SWAPs\n\nSelf-Check\n\nCould you explain what the “bridge” qubit is doing in this identity, and why it ends up unchanged?\nWhy is this identity sometimes preferable to a SWAP-based approach?\nWhy do the two mirror-image forms of the identity matter — why isn’t either one always correct?\n",
    "order": 999
  },
  {
    "slug": "hardware-reality/coupling-map-and-topology",
    "filePath": "Hardware Reality/Coupling Map and Topology.md",
    "title": "Coupling Map and Topology",
    "links": [
      "tags/qc/hardware",
      "hardware-reality/swap-overhead-and-routing",
      "hardware-reality/physical-vs-logical-qubits-and-layout",
      "hardware-reality/backend-properties",
      "hardware-reality/heavy-hex-topology",
      "dynamic-circuits/dynamic-ghz-via-qubit-reuse",
      "absolute-basics/what-is-a-quantum-computer"
    ],
    "tags": [
      "qc/hardware"
    ],
    "content": "Coupling Map and Topology\nqc/hardware\nThe coupling map defines which pairs of physical qubits can directly execute a two-qubit gate. Two qubits not directly connected can’t interact without help — the transpiler has to route the state between them first (see SWAP Overhead and Routing).\nDifferent IBM architectures use different topologies:\n\nHeron — heavy-hex (heavy hexagonal lattice), a sparse topology chosen partly because it’s favorable for quantum error correction schemes.\nNighthawk — a different connectivity pattern, optimized for different operation profiles.\nOther processors may use chain, grid, or fully custom topologies.\n\nThe topology directly shapes how expensive a given circuit is to run: a logical circuit that needs lots of long-range interactions will need many more SWAP insertions on a sparse topology than on a denser one — this is exactly why comparing architectures (Heron vs Nighthawk) for the same circuit is a meaningful benchmark, not just an academic exercise.\ncoupling_map = backend.coupling_map.get_edges()  # list[tuple[int, int]]\nRelated\n\nSWAP Overhead and Routing\nPhysical vs Logical Qubits and Layout\nBackend Properties\nHeavy-Hex Topology — Heron’s specific coupling map, worked through in detail\nDynamic GHZ via Qubit Reuse — a way to sidestep topology limits entirely via feedforward instead of routing\nWhat is a Quantum Computer — why this constraint exists physically in the first place\n\nSelf-Check\n\nCould you explain what a coupling map is to someone who’s never seen one?\nWhy does comparing Heron vs Nighthawk on the same circuit count as a meaningful benchmark?\nWhat has to happen if a circuit needs two qubits to interact that aren’t in the coupling map?\n",
    "order": 999
  },
  {
    "slug": "hardware-reality/heavy-hex-topology",
    "filePath": "Hardware Reality/Heavy-Hex Topology.md",
    "title": "Heavy-Hex Topology",
    "links": [
      "tags/qc/hardware",
      "programming-a-quantum-computer/simulators-—-statevector-vs-shot-based",
      "hardware-reality/transpilation",
      "hardware-reality/coupling-map-and-topology",
      "entangled-states/ghz-states",
      "depth--and--optimization/circuit-depth",
      "noise--and--error-models/noisy-execution-and-fidelity"
    ],
    "tags": [
      "qc/hardware"
    ],
    "content": "Heavy-Hex Topology\nqc/hardware\nThe physical connectivity pattern of IBM Heron processors (e.g. FakeTorino, 133 qubits — see fake backends):\n\nHorizontal chains of qubits run across rows\nVertical bridge qubits connect rows at staggered positions\nMost qubits: degree 2 (two neighbors)\nJunction qubits: degree 3 (three neighbors) — branching points\n\nNot all-to-all — gates between non-neighbors require SWAPs (expensive, see Transpilation). Efficient circuit design means working with this graph structure, not against it.\nBuilding GHZ on a subgraph: start from the qubit that minimizes the maximum distance to any other qubit in the subgraph — the graph-theoretic “center” (minimum eccentricity). On a junction/T-shape, that’s the junction itself, even though it can only fire one CX per layer (so it “tells” its neighbors one at a time, staggered, while already-informed neighbors relay onward in parallel).\nGeneral case (many qubits): build a BFS spanning tree from a well-chosen center qubit, then entangle each qubit with its BFS parent, layer by layer. Depth ≈ longest root-to-leaf distance in the tree. This generalizes “start from the middle” from a line to an arbitrary graph.\nRelated\n\nTranspilation\nCoupling Map and Topology — the general concept this is a specific instance of (Heron’s coupling map)\nGHZ States\nCircuit Depth\nNoisy Execution and Fidelity\nSimulators — Statevector vs Shot-Based — fake backends like FakeTorino, explained\n\nSelf-Check\n\nCould you describe what a junction qubit is and why it’s structurally different from most qubits on the chip?\nWhy does building a GHZ state on this topology start from the graph-theoretic “center” rather than an arbitrary qubit?\nWhat does a BFS spanning tree buy you here that a simple fan-out doesn’t?\n",
    "order": 999
  },
  {
    "slug": "hardware-reality/physical-vs-logical-qubits-and-layout",
    "filePath": "Hardware Reality/Physical vs Logical Qubits and Layout.md",
    "title": "Physical vs Logical Qubits and Layout",
    "links": [
      "tags/qc/hardware",
      "hardware-reality/backend-properties",
      "hardware-reality/qiskit-api-gotchas",
      "hardware-reality/coupling-map-and-topology",
      "hardware-reality/swap-overhead-and-routing"
    ],
    "tags": [
      "qc/hardware"
    ],
    "content": "Physical vs Logical Qubits and Layout\nqc/hardware\nLogical qubits are the abstract q[0], q[1], … you design a circuit with. Physical qubits are the actual hardware elements, each sitting at a specific location on the chip with its own error rates and connectivity. A layout is the mapping between the two.\nBy default, logical qubit i maps to physical qubit i — but you can control this explicitly via initial_layout during transpilation, which matters a lot because backend properties (gate errors, readout errors, T_1/T_2 — see Backend Properties) are not uniform across a chip. A good layout puts your circuit’s qubits on the hardware’s best-performing, best-connected physical qubits.\nfrom qiskit import transpile\n \ninitial_layout = list(range(qc.num_qubits))  # ascending logical-&gt;physical mapping\n \ntranspiled = transpile(\n    qc,\n    backend=backend,\n    initial_layout=initial_layout,\n    basis_gates=[&#039;h&#039;, &#039;cx&#039;, &#039;swap&#039;],\n    optimization_level=3,\n)\nWhy list(range(n)) and not just range(n): Qiskit’s transpiler internals distinguish list from other iterables when disambiguating “one layout” vs “a list of layouts, one per circuit” — passing a bare range can get silently misinterpreted. See Qiskit API Gotchas.\nLayout choice interacts directly with Coupling Map and Topology: if the layout puts two qubits that need to interact onto physical qubits that aren’t directly connected, the transpiler has to insert extra SWAP gates to route around it.\nRelated\n\nBackend Properties\nCoupling Map and Topology\nSWAP Overhead and Routing\nQiskit API Gotchas\n\nSelf-Check\n\nCould you explain the difference between a logical qubit and a physical qubit to someone new to this?\nWhy does layout choice matter if every physical qubit can run the same gates?\nWhy list(range(n)) and not just range(n) for initial_layout?\n",
    "order": 999
  },
  {
    "slug": "hardware-reality/qiskit-api-gotchas",
    "filePath": "Hardware Reality/Qiskit API Gotchas.md",
    "title": "Qiskit API Gotchas",
    "links": [
      "tags/qc/qiskit",
      "foundations/sparsepauliop",
      "depth--and--optimization/circuit-introspection-cheat-sheet",
      "error-mitigation/pna-—-propagated-noise-absorption",
      "error-mitigation/slc-—-shaded-lightcones",
      "error-mitigation/executor-primitive",
      "error-mitigation/1d-ising-chain-and-the-mirror-trick",
      "hardware-reality/backend-properties",
      "hardware-reality/physical-vs-logical-qubits-and-layout",
      "error-mitigation/samplomatic-—-boxes-and-annotations"
    ],
    "tags": [
      "qc/qiskit"
    ],
    "content": "Qiskit API Gotchas\nqc/qiskit\nA running list of “looks right, breaks anyway” traps in the Qiskit API — the kind of thing that costs 20 minutes of confused debugging once, then never again once it’s written down.\nProperties vs methods\nSome backend attributes are properties, not callable methods — no parentheses:\nbackend.operation_names   # correct\nbackend.coupling_map      # correct\nbackend.operation_names()  # AttributeError\nSame pattern for circuit.num_qubits, circuit.num_ancillas.\nWrapper objects vs their “obvious” type\nbackend.coupling_map returns a CouplingMap object, not a plain list — it behaves like one (iterable, prints like a list of edges) but strict type-checkers (like autograders using typeguard) will reject it. Call .get_edges() to get an actual list[tuple[int, int]].\nSame lesson applies elsewhere: a SparsePauliOp needs to be passed as a plain object (not wrapped in a list) for methods like .apply_layout() to work — see SparsePauliOp.\nGeneral rule: if something looks like the type a type hint or grader expects, but a type-checked function rejects it anyway, check type(x) — it’s probably a Qiskit wrapper class that duck-types like the primitive but isn’t literally an instance of it.\nrange vs list when passing sequences into Qiskit APIs\ntranspile(qc, initial_layout=range(n))       # can silently misbehave\ntranspile(qc, initial_layout=list(range(n))) # correct\nSome internal Qiskit logic does an isinstance(x, list)-style check to decide how to interpret an argument (e.g. “one layout” vs “a list of layouts, one per circuit”). range is iterable but fails that check, causing confusing downstream errors that don’t look related to the actual cause.\nAlso prefer circuit.num_qubits over a hardcoded qubit count when building a layout — avoids off-by-one errors if the circuit size changes.\nIntrospecting what’s actually inside a circuit\nfor instruction in circuit.data:\n    instruction.operation.name   # e.g. &quot;h&quot;, &quot;cx&quot;, &quot;swap&quot;\ncircuit.data is a list of CircuitInstruction objects (in current Qiskit versions — older tutorials may show plain 3-tuples instead). This is the general-purpose way to count, filter, or analyze gates — see Circuit Introspection Cheat Sheet.\nSystem dependencies vs pip packages\nSome Python libraries are thin wrappers around real system-level binaries. rustworkx’s graphviz_draw calls out to a dot executable — installing the pip package graphviz gives you Python bindings, but you still need the actual Graphviz binary installed via your OS package manager (pacman -S graphviz on Arch/Omarchy, apt install graphviz on Debian/Ubuntu). No amount of pip installing fixes a missing system binary.\nSamplomatic / error-mitigation gotchas\n\ngenerate_boxing_pass_manager’s inject_noise_strategy must be &quot;uniform_modification&quot; for PNA and &quot;individual_modification&quot; for SLC — not &quot;no_modification&quot;, which is the passthrough baseline.\ncompute_forward_bounds(circuit, noise_model_paulis, observable=obs, ...) — observable is a keyword argument; noise_model_rates is not a parameter in the current API.\ncompute_backward_bounds(circuit, noise_model_paulis, ...) — does not accept atol or eigval_max_qubits in the current API.\ngamma_from_noisy_boxes(...) returns an array-like — call np.asarray(gamma).item() before passing it on to executor_expectation_values.\nexecutor_expectation_values returns (mean, variance), not (mean, std) — take np.sqrt(variance) for std. See Executor Primitive.\nThe mirror trick needs barrier=True both inside the circuit constructor and between the forward/inverse halves — without it, the transpiler cancels U^\\dagger U to identity and silently destroys the benchmark.\nSparsePauliOp.from_sparse_list([(&quot;XZ&quot;, [3, 11], 1.0)], num_qubits=N) — string characters map left-to-right onto the qubit index list: X → qubit 3, Z → qubit 11.\n\nRelated\n\nSparsePauliOp\nCircuit Introspection Cheat Sheet\nBackend Properties\nPhysical vs Logical Qubits and Layout\nSamplomatic — Boxes and Annotations\n\nSelf-Check\n\nCould you explain the difference between a Qiskit “property” and a “method,” and why it trips people up?\nWhat’s the general rule for diagnosing a “looks like the right type but got rejected anyway” error?\nWhy does range(n) misbehave in places where list(range(n)) works fine?\n",
    "order": 999
  },
  {
    "slug": "hardware-reality/qiskit-patterns",
    "filePath": "Hardware Reality/Qiskit Patterns.md",
    "title": "Qiskit Patterns",
    "links": [
      "tags/qc/workflow",
      "hardware-reality/transpilation",
      "programming-a-quantum-computer/the-primitives-family",
      "foundations/sparsepauliop",
      "noise--and--error-models/noisy-execution-and-fidelity",
      "programming-a-quantum-computer/quantumcircuit-basics",
      "quantum-+-hpc/why-quantum-needs-hpc"
    ],
    "tags": [
      "qc/workflow"
    ],
    "content": "Qiskit Patterns (Map–Optimize–Execute–Post-process)\nqc/workflow\nThe standard 4-step workflow for running a quantum computation:\n\nMap — design the abstract circuit for the problem (gates, qubits, observable)\nOptimize (Transpile) — adapt the circuit to the target backend’s native gates &amp; connectivity — see Transpilation\nExecute — run using a primitive (Sampler for bitstring counts, Estimator for expectation values of an observable)\nPost-process — analyze/interpret the results (e.g. compare fidelity, plot distributions)\n\nRelated\n\nTranspilation\nSparsePauliOp\nNoisy Execution and Fidelity\nThe Primitives Family — what “Execute” actually dispatches to\nQuantumCircuit Basics — what “Map” actually builds\nWhy Quantum Needs HPC — the same four steps, reframed at HPC scale\n\nSelf-Check\n\nCould you name all four steps of Qiskit Patterns in order, and explain what each one does?\nWhy does “Optimize” (transpile) have to happen between “Map” and “Execute,” not before or after?\nWhich primitive would you use for “Execute” if you wanted expectation values instead of bitstring counts?\n",
    "order": 999
  },
  {
    "slug": "hardware-reality/running-on-real-ibm-hardware",
    "filePath": "Hardware Reality/Running on Real IBM Hardware.md",
    "title": "Running on Real IBM Hardware",
    "links": [
      "tags/qc/hardware",
      "noise--and--error-models/depolarizing-noise",
      "noise--and--error-models/pauli-error-model",
      "noise--and--error-models/thermal-relaxation",
      "dynamic-circuits/dynamic-ghz-via-qubit-reuse",
      "hardware-reality/backend-properties",
      "error-mitigation/error-suppression-and-mitigation-—-overview"
    ],
    "tags": [
      "qc/hardware"
    ],
    "content": "Running on Real IBM Hardware\nqc/hardware\nOnce a circuit works on simulators and fake backends, submitting it to real hardware via qiskit-ibm-runtime is the natural next step — and the point where every noise mechanism studied (Depolarizing Noise, Pauli Error Model, Thermal Relaxation) shows up at once, plus effects no toy model fully captures (crosstalk, leakage, drift).\nWorkflow\n\nAuthenticate — QiskitRuntimeService.save_account(...) once; reused automatically afterward.\nPick a backend that supports the features you need — for dynamic circuits specifically, check for if_else in the backend’s supported operations, or the dynamic_reprate_enabled flag. Eagle/Heron-class devices generally support this; not every backend does.\nInspect hardware properties (Backend Properties) before choosing a layout — pick physical qubits with good connectivity and low error rates for your circuit’s specific interaction pattern.\nTranspile with that layout, then submit via SamplerV2, which handles session management, queuing, and result packaging.\nCompare against an ideal simulator run of the same transpiled circuit — the gap between them is a direct, visual measure of real-hardware noise.\n\nfrom qiskit_ibm_runtime import SamplerV2 as Sampler\n \nsampler = Sampler(mode=backend)\njob = sampler.run([transpiled_circuit])\nresult = job.result()\nThe gap between fake-backend prediction and real hardware is exactly the target of quantum error mitigation techniques — narrowing that gap is an active, ongoing area, not something any of these toy noise models fully solves.\nRelated\n\nDynamic GHZ via Qubit Reuse\nBackend Properties\nThermal Relaxation\nError Suppression and Mitigation — Overview — the mitigation techniques that actually close this gap\n\nSelf-Check\n\nCould you walk through the five-step workflow for running on real IBM hardware, in order?\nWhy is step 5 — comparing against an ideal simulator run — an essential part of the workflow, not just a nice-to-have?\nWhat is the “gap” this note keeps referring to, and what closes it?\n",
    "order": 999
  },
  {
    "slug": "hardware-reality/swap-overhead-and-routing",
    "filePath": "Hardware Reality/SWAP Overhead and Routing.md",
    "title": "SWAP Overhead and Routing",
    "links": [
      "tags/qc/hardware",
      "hardware-reality/coupling-map-and-topology",
      "noise--and--error-models/thermal-relaxation",
      "hardware-reality/physical-vs-logical-qubits-and-layout",
      "depth--and--optimization/circuit-introspection-cheat-sheet"
    ],
    "tags": [
      "qc/hardware"
    ],
    "content": "SWAP Overhead and Routing\nqc/hardware\nWhen two logical qubits that need to interact are mapped onto physical qubits that aren’t directly connected (per the coupling map), the transpiler inserts SWAP gates to physically move quantum states around until the interaction becomes possible on real hardware.\nThis has real costs:\n\nMore circuit depth — more sequential layers, so more elapsed time and more exposure to Thermal Relaxation.\nMore total gates — and since a SWAP is typically built from three CNOTs, each one adds three lots of two-qubit gate error, not just one.\n\nThis is exactly why layout (Physical vs Logical Qubits and Layout) and topology (Coupling Map and Topology) matter so much: a poor layout on a sparse topology can multiply your effective error rate through SWAP overhead alone, even with perfect individual gate fidelities.\nCounting SWAPs in a transpiled circuit\ndef count_swap_gates(circuit: QuantumCircuit) -&gt; int:\n    swap_count = 0\n    for instruction in circuit.data:\n        if instruction.operation.name == &quot;swap&quot;:\n            swap_count += 1\n    return swap_count\nThis uses circuit.data, a list of CircuitInstruction objects — one of the general tools for introspecting exactly what’s inside a circuit. See Circuit Introspection Cheat Sheet for the fuller toolkit.\nRelated\n\nCoupling Map and Topology\nPhysical vs Logical Qubits and Layout\nCircuit Introspection Cheat Sheet\n\nSelf-Check\n\nWhy is a SWAP gate actually three CNOTs, and what does that mean for error accumulation?\nCould you explain why a poor layout can hurt fidelity even with perfect individual gate quality?\nHow would you count SWAP gates in a transpiled circuit using circuit.data\n",
    "order": 999
  },
  {
    "slug": "hardware-reality/transpilation",
    "filePath": "Hardware Reality/Transpilation.md",
    "title": "Transpilation",
    "links": [
      "tags/qc/hardware",
      "foundations/sparsepauliop",
      "hardware-reality/heavy-hex-topology",
      "hardware-reality/coupling-map-and-topology",
      "hardware-reality/physical-vs-logical-qubits-and-layout",
      "hardware-reality/swap-overhead-and-routing",
      "hardware-reality/backend-properties",
      "hardware-reality/bridge-gate-identity",
      "depth--and--optimization/circuit-depth",
      "hardware-reality/transpiling-qaoa-circuits-—-swap-strategies-and-sat-mapping"
    ],
    "tags": [
      "qc/hardware"
    ],
    "content": "Transpilation\nqc/hardware\nThe process of turning an abstract circuit (H, CX, arbitrary qubit indices) into one that respects real hardware constraints:\n\nLimited native gate set — IBM Heron processors use only {R_Z, √X, X, CZ}. No H, no CX — these get decomposed into combinations of native gates.\nLimited connectivity — not all qubit pairs are physically connected; a two-qubit gate between non-neighbors needs inserted SWAP gates (each = 3 CZ gates).\nPhysical qubit assignment (layout) — abstract qubit 0 gets mapped to some specific physical qubit.\n\nfrom qiskit.transpiler.preset_passmanagers import generate_preset_pass_manager\npm = generate_preset_pass_manager(optimization_level=1, backend=backend, initial_layout=[...])\nisa_qc = pm.run(qc)\nEffects to expect: depth typically increases (each abstract gate expands into several native gates). If your abstract circuit already matches the hardware’s connectivity, no SWAPs are needed and the increase is smaller. If it ignores topology (e.g. a fan-out GHZ on a line-connected chip), the transpiler inserts many SWAPs and depth/gate-count jumps dramatically.\nIf layout changes which physical qubit is which, an observable used for measurement must also be remapped via .apply_layout(isa_qc.layout).\nRelated\n\nSparsePauliOp\nHeavy-Hex Topology\nCoupling Map and Topology — the general concept behind point 2 (limited connectivity)\nPhysical vs Logical Qubits and Layout — deeper dive on point 3 (layout)\nSWAP Overhead and Routing — the concrete cost of routing around limited connectivity\nBackend Properties — where the native gate set, coupling map, and error rates actually come from\nBridge Gate Identity — an alternative to SWAP for one non-local gate\nCircuit Depth\nTranspiling QAOA Circuits — SWAP Strategies and SAT Mapping — a deep dive for the special case where the circuit’s gates commute, turning this NP-hard problem tractable\n\nSelf-Check\n\nCould you name the three main things transpilation has to solve, in your own words?\nWhy does depth typically increase after transpiling, even for a circuit that was already efficient?\nIf you change a circuit’s layout, what else has to be updated, and why?\n",
    "order": 999
  },
  {
    "slug": "hardware-reality/transpiling-qaoa-circuits-—-swap-strategies-and-sat-mapping",
    "filePath": "Hardware Reality/Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping.md",
    "title": "Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping",
    "links": [
      "tags/qc/hardware",
      "tags/qc/algorithms",
      "hardware-reality/transpilation",
      "quantum-algorithms/qaoa-—-quantum-approximate-optimization-algorithm",
      "hardware-reality/swap-overhead-and-routing",
      "quantum-algorithms/the-full-pipeline-of-a-quantum-solver",
      "hardware-reality/heavy-hex-topology"
    ],
    "tags": [
      "qc/hardware",
      "qc/algorithms"
    ],
    "content": "Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping\nqc/hardware qc/algorithms\nGeneral-purpose transpilation — greedily inserting SWAPs given a random initial qubit placement — is NP-hard and has an exponentially small chance of finding a good initial map, because it treats the circuit as an arbitrary sequence of gates. Key insight: QAOA cost-layer gates all commute (they’re all built from the same diagonal H_C), so instead of solving the general routing problem, you can fix a sequence of SWAP layers up front and use it to reach every required interaction — turning an NP-hard search into a structured, near-optimal recipe.\nThe two questions transpilation has to answer\n\nHow to place qubits on hardware initially (\\pi_i)?\nIn what order to apply gates to minimize depth (the routing schedule)?\n\nFor circuits with arbitrary gates, answering both well is NP-hard. For QAOA specifically, commutativity of the cost-layer gates makes both tractable.\nSWAP strategies (Weidenfeller et al. 2022)\nFix a sequence of SWAP layers S_0, S_1, S_0, \\ldots along a line of qubits; each layer induces a new set of possible interactions E&#039;(k) after k layers. Pick an initial mapping so the problem graph’s required interactions E(\\text{nodes}) land inside E&#039;(\\text{qubits}) as early as possible.\n\nTheorem (Weidenfeller et al. 2022): a fully-connected QUBO on n qubits is optimally implemented in at most n-2 linear SWAP layers.\n\nSAT mapping (Matsuo et al.)\nOnce a SWAP strategy is fixed, finding the best initial qubit map is itself encoded as a Boolean satisfiability question: “does this layout need \\le k SWAP layers?” — then binary-searched over k using a SAT solver. Scales to 500+ qubits, far beyond what brute-force search over initial mappings could handle.\nThree Qiskit tools for the full pipeline\n\nqiskit-addon-opt-mapper — NetworkX graph → optimization problem → QUBO → Ising Hamiltonian, in ~4 lines; built-in problems include MaxCut, TSP, Knapsack, VehicleRouting, BinPacking, VertexCover, Clique, SKModel.\nqopt-best-practices — implements the three-step hardware-aware transpilation above: (1) find_lines(num_qubits, backend) to pick a long line through the hardware’s coupling graph, (2) SwapStrategy.from_line(line_qubits) + make_qaoa_pm(swap_strategy, backend) to apply the SWAP strategy, (3) SATMapper(timeout=60).find_initial_mappings(program_graph, swap_strategy) for the initial layout.\nqaoa_training_pipeline — trains QAOA angles (\\gamma,\\beta) classically offline before running on hardware (quantum parameter training is expensive and prone to barren plateaus): brute-force scan at p=1, transition-state seeding at p=2, then MPS-based recursion for p=3; beyond p=3, barren plateaus dominate.\n\nThe real-world payoff\nOn a 50-node 3-regular MaxCut problem on heavy-hex hardware at depth p=1, each transpilation step roughly halves the cost:\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nStep2-qubit gate countCircuit depthDefault transpile3850820+ SWAP strategy1980 (−~50%)410+ SAT mapper1320 (−~30% more)295\nSince two-qubit gates are the dominant noise source, this is a direct, large reduction in the error the circuit accumulates before it ever reaches an error-mitigation layer — a smaller/simpler graph (10 nodes, 24 edges, p=3) shows the same pattern at a different scale: naive transpile gives 359 CZ gates / depth 241, versus 333 CZ gates / depth 84 for the optimized version — the gate-count gain is modest here but the depth gain is large, since the naive circuit serializes far more than it needs to.\nRelated\n\nTranspilation — the general transpilation problem this note specializes for QAOA\nSWAP Overhead and Routing — why SWAP gates are costly in general (3 CNOTs each)\nQAOA — Quantum Approximate Optimization Algorithm — the algorithm whose commuting cost layer makes this optimization possible\nThe Full Pipeline of a Quantum Solver — this note is a deep dive on that pipeline’s “Hardware” stage\nHeavy-Hex Topology — the connectivity these SWAP-strategy examples are routed against\n\nSelf-Check\n\nWhy does QAOA’s cost-layer commutativity turn an NP-hard routing problem into something tractable?\nWhat does the SWAP-strategy theorem guarantee, and for what class of problem?\nLooking at the gate-count table, why does the SAT mapper’s percentage improvement look smaller than the SWAP strategy’s, even though both matter?\n",
    "order": 999
  },
  {
    "slug": "index",
    "filePath": "index.md",
    "title": "Qashu",
    "links": [
      "qc-study-roadmap"
    ],
    "tags": [],
    "content": "  ...\n    .:.\n      .:.\n        .::.\n          .:*.\n            .*#:.                               ..\n              .##*:.                        .:::*#*.\n                :###*::..         .......:**#*.:*:::\n                 .###*:...::::::**############:.#.::\n                  :#:..*####**::**###*::#####*..:.:.\n                   ..:###*..      ...  *####:..:..\n                    :*##:            .:####:.:..\n                   .*##:             .###:..:.\n                   ::##:             :#*::.:\n                  .::###.          .*#:.:#.\n                  ::###*...     .:*#*:.....\n                 ::*###. ..:::*##*:.... .*:\n               ..:#####*#####*:.. .....:##*\n             ...*:*####**::.  ..... .::**##*.\n           ...:.::::::::.......          ..*#:\n           *..*:::.........                 .:..\n           .::....                             ...\n                                                  ..\nA self-directed quantum computing curriculum — gates and entanglement through algorithms, error mitigation, and quantum advantage.\nStart here: Qashu",
    "order": 999
  },
  {
    "slug": "noise--and--error-models/bit-flip-and-phase-flip-sensitivity",
    "filePath": "Noise & Error Models/Bit-flip and Phase-flip Sensitivity.md",
    "title": "Bit-flip and Phase-flip Sensitivity",
    "links": [
      "tags/qc/noise",
      "noise--and--error-models/pauli-error-model",
      "noise--and--error-models/depolarizing-noise",
      "entangled-states/ghz-states"
    ],
    "tags": [
      "qc/noise"
    ],
    "content": "Bit-flip and Phase-flip Sensitivity\nqc/noise\nThe same measurement can be “blind” to certain errors and highly sensitive to others — it all depends on which basis you measure in relative to what the error actually does.\nThe core intuition\n\nA bit flip swaps the roles of |0\\rangle and |1\\rangle — this is exactly what X does.\nA phase flip flips the sign of the |1\\rangle component without touching the |0\\rangle/|1\\rangle labels — this is exactly what Z does: Z|0\\rangle = |0\\rangle, Z|1\\rangle = -|1\\rangle.\n\nA Z-basis measurement only cares about |\\alpha|^2 vs |\\beta|^2 — a sign flip on \\beta changes nothing observable there. That’s why a pure Z error is invisible to a computational-basis measurement.\nBut |+\\rangle and |-\\rangle differ only by that same sign:\n|+\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle), \\qquad |-\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle - |1\\rangle)\nSo Z|+\\rangle = |-\\rangle — the same sign flip that was invisible in the Z basis becomes a fully distinguishable outcome in the X basis. Measuring in a different basis turns invisible phase information into visible which-outcome information.\nTwo complementary experiments (built on the repeated-X circuit)\nExperiment A — bit-flip test: start at |0\\rangle, apply 2n x gates, measure in Z-basis. Sensitive to X/Y errors, blind to pure Z.\nExperiment B — phase-flip test: prepare |+\\rangle (via H), apply 2n x gates, then apply another H before measuring (this rotates the X-basis question into a Z-basis measurement). Sensitive to Z/Y errors, blind to pure X (since X|+\\rangle = |+\\rangle).\ndef repeated_x_meas_x_circuit(n):\n    qc = QuantumCircuit(1, 1)\n    qc.h(0)\n    for _ in range(2 * n):\n        qc.x(0)\n    qc.h(0)          # rotate back before measuring — the &quot;Hadamard sandwich&quot; trick\n    qc.measure(0, 0)\n    return qc\nThe “Hadamard sandwich” — one H to enter a different basis, one H at the end to rotate back before a standard measurement — is a general technique for measuring in any basis, not just this experiment.\nRelated\n\nPauli Error Model\nDepolarizing Noise\nGHZ States\n\nSelf-Check\n\nCould you explain why a pure Z error is invisible to a Z-basis measurement?\nWhat does the “Hadamard sandwich” trick actually accomplish, and why does it work?\nWhy does a phase flip become visible in the X basis when it was invisible in the Z basis?\n",
    "order": 999
  },
  {
    "slug": "noise--and--error-models/coherent-vs-incoherent-gate-errors",
    "filePath": "Noise & Error Models/Coherent vs Incoherent Gate Errors.md",
    "title": "Coherent vs Incoherent Gate Errors",
    "links": [
      "tags/qc/noise",
      "noise--and--error-models/physical-decoherence-mechanisms",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "noise--and--error-models/pauli-error-model",
      "noise--and--error-models/readout-as-a-confusion-matrix"
    ],
    "tags": [
      "qc/noise"
    ],
    "content": "Coherent vs Incoherent Gate Errors\nqc/noise\nNot all gate errors accumulate the same way with circuit depth — the distinction matters for predicting how badly a deep circuit will actually degrade.\n\nCoherent (systematic) errors — deterministic miscalibration, e.g. a gate that over-rotates by a small fixed angle every time. In principle correctable if you knew the exact miscalibration.\nIncoherent errors — decoherence-driven, fundamentally stochastic (see Physical Decoherence Mechanisms). Not correctable by better calibration, because there’s no fixed error to calibrate away.\nCrosstalk — a third category, from unwanted coupling between qubits rather than either qubit’s own imperfection.\n\nWhy the distinction matters: different depth scaling\nKey insight: in the short-time/shallow-circuit limit, coherent error accumulates quadratically with circuit depth (small systematic rotations compound coherently, adding up like amplitudes), while incoherent error accumulates linearly (independent random events just add in probability). SPAM errors (state preparation and measurement) add a depth-independent constant offset — they happen once per circuit, not once per layer.\nThis means two circuits with the same total error budget can behave very differently: a circuit dominated by coherent error gets disproportionately worse as it gets deeper, while one dominated by incoherent error degrades more predictably. Pauli twirling exists specifically to convert coherent error into incoherent (Pauli) error — trading the bad quadratic scaling for the more benign linear one, at the cost of extra randomization overhead.\nRelated\n\nPhysical Decoherence Mechanisms\nPauli Error Model\nEstimatorOptions and the Five Mitigation Knobs — Pauli twirling as coherent-to-incoherent conversion\nReadout as a Confusion Matrix\n\nSelf-Check\n\nCould you explain the difference between coherent and incoherent errors, and why only one is “correctable by calibration”?\nWhy does coherent error scale quadratically with depth while incoherent error scales linearly?\nWhy does Pauli twirling deliberately convert coherent error into incoherent error, given incoherent sounds worse?\n",
    "order": 999
  },
  {
    "slug": "noise--and--error-models/density-matrix",
    "filePath": "Noise & Error Models/Density Matrix.md",
    "title": "Density Matrix",
    "links": [
      "tags/qc/noise",
      "tags/qc/math",
      "noise--and--error-models/depolarizing-noise",
      "noise--and--error-models/pauli-error-model",
      "noise--and--error-models/thermal-relaxation",
      "error-mitigation/noiselearnerv3-and-pauli-lindblad-models"
    ],
    "tags": [
      "qc/noise",
      "qc/math"
    ],
    "content": "Density Matrix\nqc/noise qc/math\nA statevector |\\psi\\rangle can only describe a qubit that’s in a definite (if possibly superposed) pure state. Once noise enters the picture — a qubit weakly coupled to its environment, an imperfect gate, a noisy measurement — you often need to describe a mixture of possible states, each with some classical probability. That’s what a density matrix \\rho is for.\nFor a pure state, \\rho = |\\psi\\rangle\\langle\\psi| — no new information, just a different notation. The real value shows up for mixed states, where \\rho is a weighted sum over several possible pure states:\n\\rho = \\sum_i p_i |\\psi_i\\rangle\\langle\\psi_i|\nThis is the natural language for describing noise: every noise model in this lab — Depolarizing Noise, Pauli Error Model, Thermal Relaxation — is really just a rule for how \\rho transforms under an imperfect operation.\nOpen vs. closed systems\nKey insight: noise is what happens when your qubit isn’t actually isolated — it’s weakly entangled with an environment (“bath”) you don’t have access to. The density matrix \\rho is what you get by mathematically averaging out (formally, taking the partial trace over) that inaccessible bath, leaving only the qubit’s own reduced description. The general law governing how an open system’s \\rho evolves over time is the Lindblad master equation — it replaces the closed-system Schrödinger equation once you can’t ignore the environment. This is the formal justification underneath NoiseLearnerV3’s Pauli-Lindblad noise model: that model’s \\mathcal{L}(\\rho)=\\sum_k\\lambda_k(P_k\\rho P_k-\\rho) is a Lindblad-form generator, specialized to Pauli jump operators.\nRelated\n\nDepolarizing Noise\nPauli Error Model\nThermal Relaxation\nNoiseLearnerV3 and Pauli-Lindblad Models — the Pauli-Lindblad model this open-system framing justifies\n\nSelf-Check\n\nCould you explain why a statevector alone isn’t enough once noise enters the picture?\nWhat does \\rho = |\\psi\\rangle\\langle\\psi| tell you for a pure state, and why is it “no new information”?\nWhy is the density matrix described as “the natural language for describing noise”?\nWhat does the partial trace conceptually do, and why does it produce exactly the density matrix?\n",
    "order": 999
  },
  {
    "slug": "noise--and--error-models/depolarizing-noise",
    "filePath": "Noise & Error Models/Depolarizing Noise.md",
    "title": "Depolarizing Noise",
    "links": [
      "tags/qc/noise",
      "noise--and--error-models/pauli-error-model",
      "noise--and--error-models/thermal-relaxation",
      "noise--and--error-models/density-matrix",
      "hardware-reality/backend-properties",
      "noise--and--error-models/bit-flip-and-phase-flip-sensitivity"
    ],
    "tags": [
      "qc/noise"
    ],
    "content": "Depolarizing Noise\nqc/noise\nThe simplest way to model an imperfect gate: after the gate, the state gets partially replaced by the fully mixed (maximally random) state.\n\\rho \\mapsto (1-\\lambda)\\rho + \\lambda \\frac{I}{2}\nLarger \\lambda = more randomization. It’s intentionally non-specific about why the gate is imperfect — no direction, no timing dependence, just “some of the information got scrambled.”\nThe repeated-X experiment\nA clean way to see this noise accumulate: apply an even number 2n of x gates to |0\\rangle and measure. Since X^2 = I, an ideal circuit always returns exactly to |0\\rangle regardless of n — so any decay in \\Pr(0) as n grows is a pure noise signal, not a logic error.\ndef repeated_x_circuit(n):\n    qc = QuantumCircuit(1, 1)\n    for _ in range(2 * n):\n        qc.x(0)\n    qc.measure(0, 0)\n    return qc\nUnder this model, the survival probability decays exponentially toward 1/2 (fully random) as n grows:\n\\Pr(0) = \\frac{1 + (1-\\lambda)^{2n}}{2}\nThis same repeated-gate structure is reused (with different measurement bases) to probe directional Pauli errors and time-dependent decay — it’s a general-purpose noise-characterization pattern, not just a depolarization-specific trick.\nRelated\n\nDensity Matrix\nPauli Error Model\nThermal Relaxation\nBackend Properties\nBit-flip and Phase-flip Sensitivity — same repeated-gate experiment, extended to detect which Pauli error is present\n\nSelf-Check\n\nWhy does the repeated-X experiment isolate noise from logic errors — what makes 2n gates special?\nCould you explain in plain language what depolarizing noise does to a qubit?\nWhy is depolarizing noise called “non-specific” compared to the Pauli error model?\n",
    "order": 999
  },
  {
    "slug": "noise--and--error-models/noisy-execution-and-fidelity",
    "filePath": "Noise & Error Models/Noisy Execution and Fidelity.md",
    "title": "Noisy Execution and Fidelity",
    "links": [
      "tags/qc/hardware",
      "tags/qc/noise",
      "hardware-reality/heavy-hex-topology",
      "hardware-reality/transpilation",
      "depth--and--optimization/circuit-depth",
      "noise--and--error-models/density-matrix",
      "noise--and--error-models/depolarizing-noise",
      "noise--and--error-models/pauli-error-model",
      "noise--and--error-models/thermal-relaxation",
      "hardware-reality/backend-properties",
      "hardware-reality/running-on-real-ibm-hardware"
    ],
    "tags": [
      "qc/hardware",
      "qc/noise"
    ],
    "content": "Noisy Execution &amp; Fidelity\nqc/hardware qc/noise\nComparing a topology-naive GHZ (e.g. fan-out from qubit 0, ignoring hardware connectivity → many inserted SWAPs) against a topology-aware GHZ (e.g. start-from-middle, matching physical connectivity → no SWAPs) on a noisy simulator (FakeTorino) shows the efficient circuit achieves significantly higher fidelity.\nWhy:\n\nFewer CZ gates → fewer sources of two-qubit error\nLower depth → less time for qubits to decohere\nNo SWAP gates → no routing overhead\n\nAbsolute fidelities on real noisy hardware for e.g. a 15-qubit GHZ are often only ~0.4–0.6, not near-1 — every two-qubit gate adds error and there are many. What matters is the relative improvement of efficient vs. naive design.\nTakeaway: circuit optimization isn’t academic — it directly determines whether your computation’s results are usable.\nRelated\n\nHeavy-Hex Topology\nTranspilation\nCircuit Depth\nDensity Matrix — the underlying formalism every noise model below transforms\nDepolarizing Noise, Pauli Error Model, Thermal Relaxation — the specific toy noise mechanisms behind fidelity loss\nBackend Properties — where realistic per-qubit/per-gate error rates come from\nRunning on Real IBM Hardware — the same naive-vs-aware comparison, run for real instead of simulated\n\nSelf-Check\n\nCould you list the three concrete reasons a topology-aware GHZ circuit beats a naive one on fidelity?\nWhy does the note emphasize relative improvement rather than absolute fidelity numbers?\nWhat’s the practical takeaway here, in your own words?\n",
    "order": 999
  },
  {
    "slug": "noise--and--error-models/pauli-error-model",
    "filePath": "Noise & Error Models/Pauli Error Model.md",
    "title": "Pauli Error Model",
    "links": [
      "tags/qc/noise",
      "noise--and--error-models/depolarizing-noise",
      "noise--and--error-models/bit-flip-and-phase-flip-sensitivity",
      "noise--and--error-models/density-matrix",
      "noise--and--error-models/thermal-relaxation",
      "foundations/pauli-operators",
      "noise--and--error-models/coherent-vs-incoherent-gate-errors",
      "noise--and--error-models/physical-decoherence-mechanisms"
    ],
    "tags": [
      "qc/noise"
    ],
    "content": "Pauli Error Model\nqc/noise\nA more structured alternative to Depolarizing Noise: instead of randomizing uniformly, apply one specific Pauli operator (I, X, Y, or Z) with some probability after each gate.\n\\rho \\mapsto p_I \\rho + p_X X\\rho X + p_Y Y\\rho Y + p_Z Z\\rho Z, \\qquad p_I = 1 - p_X - p_Y - p_Z\nIf p_X = p_Y = p_Z = \\lambda/4 (uniform), this reduces exactly to the depolarizing model. The key extra power here is directionality — noise can be stronger along one axis than another, which is physically realistic (real hardware noise is rarely isotropic).\nThis directionality is exactly what Bit-flip and Phase-flip Sensitivity exploits: by choosing which basis you measure in, you can selectively reveal or hide different Pauli components of the error.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nErrorBit-flip sensitive (Z-basis)Phase-flip sensitive (X-basis)INoNoXYesNoYYesYesZNoYes\nQuick mnemonic: bit-flip sensitivity ↔ “does this error contain an X?”; phase-flip sensitivity ↔ “does this error contain a Z?” — reading straight off the identity Y = iXZ explains why Y trips both.\nRelated\n\nBit-flip and Phase-flip Sensitivity\nDepolarizing Noise\nDensity Matrix\nThermal Relaxation — sibling toy noise model, but time-dependent rather than per-gate\nPauli Operators\nCoherent vs Incoherent Gate Errors — this model describes incoherent (stochastic Pauli) error specifically\nPhysical Decoherence Mechanisms\n\nSelf-Check\n\nWhat extra realism does the Pauli error model add over depolarizing noise?\nUsing the Y=iXZ mnemonic, could you explain why a Y error trips both bit-flip and phase-flip sensitivity?\nUnder what condition does the Pauli error model reduce exactly to the depolarizing model?\n",
    "order": 999
  },
  {
    "slug": "noise--and--error-models/physical-decoherence-mechanisms",
    "filePath": "Noise & Error Models/Physical Decoherence Mechanisms.md",
    "title": "Physical Decoherence Mechanisms",
    "links": [
      "tags/qc/noise",
      "tags/qc/hardware",
      "noise--and--error-models/depolarizing-noise",
      "noise--and--error-models/pauli-error-model",
      "noise--and--error-models/thermal-relaxation",
      "absolute-basics/what-is-a-quantum-computer",
      "noise--and--error-models/coherent-vs-incoherent-gate-errors"
    ],
    "tags": [
      "qc/noise",
      "qc/hardware"
    ],
    "content": "Physical Decoherence Mechanisms\nqc/noise qc/hardware\nDepolarizing Noise, Pauli Error Model, and Thermal Relaxation describe noise effects — what the state does under imperfection. This note is the physical layer underneath: the actual named causes of decoherence in superconducting hardware (see What is a Quantum Computer).\n\nCharge noise — fluctuating electric charges near the qubit shift its energy levels.\nFlux noise — fluctuating magnetic flux does the same for flux-sensitive qubit designs.\nDielectric loss — energy absorbed by imperfections in the insulating materials surrounding the qubit circuit.\nQuasiparticle poisoning — stray unpaired electrons (quasiparticles) breaking the superconducting state locally, causing energy relaxation.\nCrosstalk — unwanted coupling between nominally-independent qubits or control lines, so an operation on one qubit leaks into its neighbors.\n\nKey insight: the toy models elsewhere in this vault (depolarizing/Pauli/thermal) are deliberately agnostic about why — they’re useful precisely because they isolate an effect for study without needing the underlying physics. This note is what those effects are effects of.\nRelated\n\nDepolarizing Noise, Pauli Error Model, Thermal Relaxation\nWhat is a Quantum Computer\nCoherent vs Incoherent Gate Errors\n\nSelf-Check\n\nCould you name the five physical decoherence mechanisms listed here?\nWhy do the vault’s toy noise models deliberately avoid specifying a physical cause?\nWhat’s the difference between quasiparticle poisoning and crosstalk?\n",
    "order": 999
  },
  {
    "slug": "noise--and--error-models/randomized-benchmarking",
    "filePath": "Noise & Error Models/Randomized Benchmarking.md",
    "title": "Randomized Benchmarking",
    "links": [
      "tags/qc/noise",
      "tags/qc/qiskit",
      "foundations/universal-gate-sets-and-the-clifford-group",
      "noise--and--error-models/coherent-vs-incoherent-gate-errors",
      "hardware-reality/backend-properties"
    ],
    "tags": [
      "qc/noise",
      "qc/qiskit"
    ],
    "content": "Randomized Benchmarking\nqc/noise qc/qiskit\nA technique for measuring a specific gate’s error rate directly on hardware, isolated from state-preparation and measurement error. Run a long random sequence of gates from the Clifford group, choosing the sequence so it composes to the identity — ideally you always measure back |0\\rangle^{\\otimes n}, and any deviation is accumulated gate error.\nReference vs. interleaved\n\nReference RB — random Clifford sequences alone, gives a baseline decay rate r_\\text{reference}.\nInterleaved RB — the same random sequences, but with the gate under test inserted between every random Clifford, giving r_\\text{interleaved}.\n\nThe error per Clifford (EPC) for the gate under test is extracted from the difference:\n\\text{EPC} = \\left(1 - \\frac{r_\\text{interleaved}}{r_\\text{reference}}\\right)\\times\\frac{D-1}{D}\nwhere D=2^n for n qubits. Key insight: comparing interleaved to reference cancels out the other Clifford gates’ contribution to decay, isolating the error attributable specifically to the interleaved gate.\nIn Qiskit\nfrom qiskit_experiments.library import InterleavedRB\nfrom qiskit.circuit.library import CXGate\n \nexp = InterleavedRB(\n    interleaved_element=CXGate(),\n    qubits=(0, 1),\n    lengths=[1, 10, 30, 50, 100],\n    num_samples=10,\n    backend=backend,\n)\nresult = exp.run().block_for_results()\nRelated\n\nUniversal Gate Sets and the Clifford Group — why Clifford sequences specifically\nCoherent vs Incoherent Gate Errors\nBackend Properties\n\nSelf-Check\n\nWhy does a randomized benchmarking sequence get built to compose to the identity?\nWhat does comparing interleaved RB to reference RB let you isolate that either alone wouldn’t?\nWhy are Clifford gates specifically the right building block for this technique?\n",
    "order": 999
  },
  {
    "slug": "noise--and--error-models/readout-as-a-confusion-matrix",
    "filePath": "Noise & Error Models/Readout as a Confusion Matrix.md",
    "title": "Readout as a Confusion Matrix",
    "links": [
      "tags/qc/noise",
      "tags/qc/hardware",
      "hardware-reality/backend-properties",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "noise--and--error-models/coherent-vs-incoherent-gate-errors",
      "absolute-basics/measurement-and-collapse"
    ],
    "tags": [
      "qc/noise",
      "qc/hardware"
    ],
    "content": "Readout as a Confusion Matrix\nqc/noise qc/hardware\nA qubit is read out via dispersive coupling to a resonator: the qubit’s state shifts the resonator’s frequency slightly, and that shift is inferred from the reflected microwave signal’s I/Q (in-phase/quadrature) components, classified against a decision boundary as 0 or 1. This classification step isn’t perfect — readout error is exactly the rate at which it gets it wrong.\nThe confusion matrix formalism\nFor n qubits, readout error is fully described by a 2^n\\times2^n confusion matrix M:\n\\vec{p}_\\text{meas} = M\\,\\vec{p}_\\text{true}\nwhere \\vec p_\\text{true} is the true outcome-probability vector and \\vec p_\\text{meas} is what you actually observe after readout error mixes things up. Key insight: this is a real matrix, not just an error rate — it captures which wrong outcomes a given true outcome tends to be confused with, not just how often readout is wrong overall. In principle, if M is known and invertible, M^{-1}\\vec p_\\text{meas} recovers an estimate of \\vec p_\\text{true} — this is the formal object TREX is built to correct for, more efficiently than inverting the full 2^n\\times2^n matrix directly.\nRelated\n\nBackend Properties\nEstimatorOptions and the Five Mitigation Knobs — TREX, the readout-error-correction technique\nCoherent vs Incoherent Gate Errors\nMeasurement and Collapse\n\nSelf-Check\n\nCould you explain what dispersive readout physically measures, and why classification can go wrong?\nWhy is a full confusion matrix more informative than a single readout error rate?\nWhat would M^{-1}\\vec p_\\text{meas} give you, in principle, and why is that only “in principle”?\n",
    "order": 999
  },
  {
    "slug": "noise--and--error-models/thermal-relaxation",
    "filePath": "Noise & Error Models/Thermal Relaxation.md",
    "title": "Thermal Relaxation",
    "links": [
      "tags/qc/noise",
      "noise--and--error-models/depolarizing-noise",
      "noise--and--error-models/pauli-error-model",
      "noise--and--error-models/bit-flip-and-phase-flip-sensitivity",
      "noise--and--error-models/density-matrix",
      "hardware-reality/backend-properties"
    ],
    "tags": [
      "qc/noise"
    ],
    "content": "Thermal Relaxation (T1 / T2)\nqc/noise\nUnlike Depolarizing Noise and Pauli Error Model, which apply noise per gate, thermal relaxation is noise per unit time — it happens just because time passes and the qubit isn’t perfectly isolated from its environment. This means two circuits that are logically identical can perform differently if one simply takes longer to run.\nTwo governing timescales:\n\nT_1 (energy relaxation time): how long it takes an excited state to decay toward |0\\rangle.\nT_2 (dephasing time): how long superposition/coherence survives, typically T_2 \\le 2T_1.\n\nTwo complementary experiments\nExperiment A (T_1-type): prepare |1\\rangle, insert a delay, measure in the computational basis. Tracks population decay — longer delay, more likely to have relaxed back to |0\\rangle.\nExperiment B (T_2-type): prepare |+\\rangle, insert a delay, measure in the X basis (same “Hadamard sandwich” idea as in Bit-flip and Phase-flip Sensitivity). Tracks coherence loss — a superposition can lose its “quantumness” even before its population has fully relaxed.\nReal numbers\nOn real IBM hardware: T_1 = 330\\pm12\\,\\mu s measured on ibm_marrakesh, T_2 = 269\\pm20.3\\,\\mu s on ibm_fez — and the two aren’t independent: \\frac{1}{T_2}=\\frac{1}{2T_1}+\\frac{1}{T_\\phi}, where T_\\phi is the pure-dephasing contribution. Rule of thumb: roughly 37% of population remains after one T_1, under 5% after three. A typical gate takes 50–100ns, so a circuit gets roughly 1,000–5,000 gates before T_1 decay starts to dominate the error budget — a concrete depth ceiling, not just an abstract “keep circuits shallow” rule.\nQuick comparison of all three toy noise models\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nModelTypeGoverned byDepolarizing Noiseisotropic gate imperfection\\lambdaPauli Error Modeldirectional stochastic errorp_X, p_Y, p_ZThermal relaxationtime-dependent decayT_1, T_2\nThe point of all three isn’t to memorize formulas — it’s to have a mental model for why a real device’s output distribution spreads probability beyond the ideal outcomes: some randomization, some directionality, some just from elapsed time.\nRelated\n\nDepolarizing Noise\nPauli Error Model\nDensity Matrix\nBackend Properties\n\nSelf-Check\n\nWhy is thermal relaxation fundamentally different from depolarizing and Pauli noise in when it acts?\nCould you explain the difference between what T_1 and T_2 each measure?\nWhy can two logically identical circuits perform differently under this noise model?\nRoughly how many gates can run before T_1 decay starts to dominate, and why does that number matter practically?\n",
    "order": 999
  },
  {
    "slug": "programming-a-quantum-computer/parameterized-circuits",
    "filePath": "Programming a Quantum Computer/Parameterized Circuits.md",
    "title": "Parameterized Circuits",
    "links": [
      "tags/qc/programming",
      "tags/qc/qiskit",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "programming-a-quantum-computer/the-primitives-family",
      "error-mitigation/1d-ising-chain-and-the-mirror-trick",
      "error-mitigation/samplomatic-—-boxes-and-annotations",
      "programming-a-quantum-computer/quantumcircuit-basics",
      "quantum-machine-learning/data-encoding-circuits-(feature-maps)",
      "quantum-machine-learning/quantum-neural-networks-(qnn)"
    ],
    "tags": [
      "qc/programming",
      "qc/qiskit"
    ],
    "content": "Parameterized Circuits\nqc/programming qc/qiskit\nA Parameter is a symbolic placeholder in a circuit — you build the circuit’s structure once, then bind concrete numeric values later, possibly many different sets of values against the exact same compiled circuit.\nfrom qiskit import QuantumCircuit\nfrom qiskit.circuit import Parameter\n \ntheta = Parameter(&#039;θ&#039;)\nqc = QuantumCircuit(1)\nqc.rx(theta, 0)          # circuit built once, angle unbound\n \nbound = qc.assign_parameters({theta: 3.14159})   # bind a concrete value\nParameterVector is the same idea for many parameters at once (e.g. one angle per layer of a variational circuit):\nfrom qiskit.circuit import ParameterVector\n \nangles = ParameterVector(&#039;a&#039;, length=4)\nqc = QuantumCircuit(4)\nfor i, angle in enumerate(angles):\n    qc.rx(angle, i)\nWhy this matters\nKey insight: transpilation is expensive, and it only depends on circuit structure (gates and connectivity), not on the numeric values inside rotation gates. A parameterized circuit is transpiled once; every subsequent run just rebinds numbers into the already-transpiled template. Variational algorithms (VQE, QAOA) exploit this directly — they sweep over hundreds of parameter values on the same fixed circuit structure, and would be far slower if every iteration re-transpiled from scratch.\nYou don’t have to bind values yourself before running — primitives accept parameter values directly as part of a PUB (see The Primitives Family), letting you submit many parameter sets as one batched job:\nfrom qiskit_aer.primitives import EstimatorV2\nfrom qiskit.quantum_info import SparsePauliOp\n \nobs = SparsePauliOp(&#039;Z&#039;)\nparam_sets = [[0.0], [1.57], [3.14]]   # three different theta values, one job\nEstimatorV2().run([(qc, obs, param_sets)]).result()[0].data.evs\nA missed opportunity, in hindsight\n1D Ising Chain and the Mirror Trick’s construct_ising_circuit takes rx_angle as a plain Python float baked in at construction time (rx_angle = π/8 throughout the worked examples here), rebuilding the whole circuit for any other angle. A Parameter there would let the same boxed/Samplomatic-compiled template be reused across many angle values without rebuilding or re-boxing it — exactly the same “structure once, values many times” idea Samplomatic already applies to random Pauli dressings.\nOfficial reference: Qiskit circuit library documentation.\nRelated\n\nQuantumCircuit Basics\nThe Primitives Family\nSamplomatic — Boxes and Annotations — the same “template once, bind many times” idea, applied to noise mitigation\n1D Ising Chain and the Mirror Trick\nVariational Quantum Eigensolver (VQE) — the real worked example this note only namedropped\nData Encoding Circuits (Feature Maps), Quantum Neural Networks (QNN) — the same “structure once, bind many times” pattern, applied to encoding classical data instead of energy minimization\n\nSelf-Check\n\nWhy is a parameterized circuit transpiled once instead of once per parameter value?\nCould you explain to someone why variational algorithms like VQE and QAOA specifically benefit from this?\nWhat would change in 1D Ising Chain and the Mirror Trick’s construct_ising_circuit if rx_angle were a Parameter instead of a float?\n",
    "order": 999
  },
  {
    "slug": "programming-a-quantum-computer/quantumcircuit-basics",
    "filePath": "Programming a Quantum Computer/QuantumCircuit Basics.md",
    "title": "QuantumCircuit Basics",
    "links": [
      "tags/qc/programming",
      "tags/qc/qiskit",
      "programming-a-quantum-computer/simulators-—-statevector-vs-shot-based",
      "error-mitigation/1d-ising-chain-and-the-mirror-trick",
      "programming-a-quantum-computer/the-primitives-family",
      "programming-a-quantum-computer/parameterized-circuits",
      "entangled-states/bell-states",
      "depth--and--optimization/circuit-introspection-cheat-sheet"
    ],
    "tags": [
      "qc/programming",
      "qc/qiskit"
    ],
    "content": "QuantumCircuit Basics\nqc/programming qc/qiskit\nQuantumCircuit is Qiskit’s abstract representation of a quantum program — a sequence of gates (and measurements) acting on registers. Every code snippet elsewhere in this vault assumes you can read this layer fluently.\nfrom qiskit import QuantumCircuit\n \nqc = QuantumCircuit(2, 2)   # 2 qubits, 2 classical bits\nqc.h(0)                     # gate on qubit 0\nqc.cx(0, 1)                 # two-qubit gate: control=0, target=1\nqc.measure([0, 1], [0, 1])  # qubit i -&gt; classical bit i\nRegisters\nQuantumCircuit(n) creates n qubits with no classical register (fine for statevector work — see Simulators — Statevector vs Shot-Based). QuantumCircuit(n, m) adds m classical bits for storing measurement outcomes. Explicit QuantumRegister/ClassicalRegister objects exist for naming/grouping qubits, but the shorthand above covers most circuits in this vault.\nComposing circuits\n.compose() stitches one circuit into another — this is how 1D Ising Chain and the Mirror Trick builds the mirror benchmark: mirror.compose(ising, inplace=True) followed by mirror.compose(ising.inverse(), inplace=True). It’s the general tool for building circuits out of reusable sub-circuit pieces rather than writing every gate inline.\nBarriers\nqc.barrier() is not a gate — it’s an instruction to the transpiler: “don’t reorder or cancel anything across this line.” See 1D Ising Chain and the Mirror Trick for why this matters in practice (without a barrier, the transpiler can silently optimize a mirror circuit’s U^\\dagger U down to nothing).\nInspecting and drawing\nqc.draw()          # text diagram\nqc.draw(&#039;mpl&#039;)      # matplotlib diagram\nqc.depth()          # see [[Circuit Depth]]\nqc.data             # list of CircuitInstruction — see [[Circuit Introspection Cheat Sheet]]\nOfficial reference: Qiskit documentation.\nRelated\n\nThe Primitives Family — what actually runs a built circuit\nParameterized Circuits\nBell States — the canonical h(0); cx(0,1) pattern in practice\nCircuit Introspection Cheat Sheet\n1D Ising Chain and the Mirror Trick — .compose() and .barrier() used together at scale\n\nSelf-Check\n\nWhat’s the difference between QuantumCircuit(3) and QuantumCircuit(3, 3), and when would you need the second form?\nWhat does qc.barrier() actually do — is it a gate?\nWhy does 1D Ising Chain and the Mirror Trick need both .compose() and .barrier() to build its benchmark correctly?\n",
    "order": 999
  },
  {
    "slug": "programming-a-quantum-computer/simulators-—-statevector-vs-shot-based",
    "filePath": "Programming a Quantum Computer/Simulators — Statevector vs Shot-Based.md",
    "title": "Simulators — Statevector vs Shot-Based",
    "links": [
      "tags/qc/programming",
      "tags/qc/qiskit",
      "absolute-basics/measurement-and-collapse",
      "noise--and--error-models/density-matrix",
      "hardware-reality/backend-properties",
      "hardware-reality/heavy-hex-topology",
      "programming-a-quantum-computer/the-primitives-family"
    ],
    "tags": [
      "qc/programming",
      "qc/qiskit"
    ],
    "content": "Simulators — Statevector vs Shot-Based\nqc/programming qc/qiskit\nTwo fundamentally different ways to run a circuit without real hardware.\nStatevector simulation\nComputes the exact amplitudes directly — no sampling, no shot noise, the mathematical ground truth.\nfrom qiskit.quantum_info import Statevector\nfrom qiskit import QuantumCircuit\n \nqc = QuantumCircuit(1)\nqc.h(0)\nStatevector(qc).probabilities()   # array([0.5, 0.5]) — exact, not estimated\nKey insight: this only works because the simulator can see amplitudes directly — something no real device can ever give you (see Measurement and Collapse). It also doesn’t scale: representing n qubits exactly needs 2^n complex amplitudes, so this is a debugging/learning tool for small circuits, not a path to simulating utility-scale circuits. Concretely: exact statevector simulation becomes infeasible beyond roughly 30 qubits, and 50 qubits alone would need on the order of 8 petabytes of RAM. Simulating noisy circuits is worse still — density-matrix simulation (see Density Matrix) scales as 4^n, strictly worse than statevector’s already-brutal 2^n, since \\rho is a 2^n\\times2^n matrix (4^n entries) where |\\psi\\rangle is just a 2^n-entry vector.\nShot-based simulation\nAerSimulator simulates individual measurement shots the way real hardware actually behaves — you get counts, not exact probabilities, with statistical noise from finite sampling even when the simulator itself is otherwise “clean” (noiseless).\nfrom qiskit_aer import AerSimulator\nfrom qiskit import QuantumCircuit, transpile\n \nqc = QuantumCircuit(1, 1)\nqc.h(0)\nqc.measure(0, 0)\n \nsim = AerSimulator()\ncounts = sim.run(transpile(qc, sim), shots=1000).result().get_counts()\n# e.g. {&#039;0&#039;: 512, &#039;1&#039;: 488} — sampling noise even though the simulator has zero hardware noise\nAdding realistic noise\nAerSimulator.from_backend(backend) builds a shot-based simulator informed by a real (or fake) backend’s actual calibration data — basis gates, coupling map, measured error rates — see Backend Properties for the full breakdown of what that data contains.\nFake backends (e.g. FakeTorino, used in Heavy-Hex Topology) package up a real device’s calibration snapshot without needing live hardware access — useful for realistic testing without consuming QPU time or waiting in a queue.\nOfficial reference: Qiskit Aer documentation.\nRelated\n\nMeasurement and Collapse\nBackend Properties\nHeavy-Hex Topology\nThe Primitives Family — local primitives wrap these same two simulation modes\nDensity Matrix — the noisy-simulation object, and why it scales even worse\n\nSelf-Check\n\nWhy does statevector simulation give you “ground truth” while shot-based simulation still has noise even with zero hardware error?\nWhy doesn’t statevector simulation scale to large circuits?\nWhat’s the point of a fake backend like FakeTorino if it’s still just a simulator?\nWhy does density-matrix (noisy) simulation scale as 4^n instead of 2^n?\n",
    "order": 999
  },
  {
    "slug": "programming-a-quantum-computer/the-primitives-family",
    "filePath": "Programming a Quantum Computer/The Primitives Family.md",
    "title": "The Primitives Family",
    "links": [
      "tags/qc/programming",
      "tags/qc/qiskit",
      "foundations/sparsepauliop",
      "error-mitigation/executor-primitive",
      "error-mitigation/samplomatic-—-boxes-and-annotations",
      "programming-a-quantum-computer/parameterized-circuits",
      "programming-a-quantum-computer/simulators-—-statevector-vs-shot-based",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "hardware-reality/running-on-real-ibm-hardware",
      "programming-a-quantum-computer/quantumcircuit-basics",
      "absolute-basics/measurement-and-collapse"
    ],
    "tags": [
      "qc/programming",
      "qc/qiskit"
    ],
    "content": "The Primitives Family\nqc/programming qc/qiskit\nQiskit doesn’t “run a circuit and read qubits directly” — it runs a circuit through a primitive, an object that abstracts over simulator-vs-real-hardware and returns one of two things: bitstring counts, or expectation values.\nThe two base primitives\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPrimitiveReturnsNeedsSamplerBitstring counts/probabilitiesCircuit with measurement gatesEstimatorExpectation values of an observableCircuit without measurement — a SparsePauliOp instead\nfrom qiskit_aer.primitives import SamplerV2, EstimatorV2\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import SparsePauliOp\n \nqc = QuantumCircuit(1)\nqc.h(0)\n \n# Sampler needs an explicit measurement\nsampler_qc = qc.copy()\nsampler_qc.measure_all()\nSamplerV2().run([sampler_qc], shots=1000).result()[0].data.meas.get_counts()\n \n# Estimator needs an observable, not a measurement\nobs = SparsePauliOp(&#039;Z&#039;)\nEstimatorV2().run([(qc, obs)]).result()[0].data.evs\nA third family member\nExecutor is the box-aware counterpart used by Samplomatic — same family, but it consumes a QuantumProgram built from a template + samplex instead of a plain circuit. See Executor Primitive for the full workflow.\nPUBs (Primitive Unified Blocs)\nEvery primitive call takes a list of PUBs — tuples describing one job of work:\n\nSampler PUB: (circuit,) or (circuit, parameter_values)\nEstimator PUB: (circuit, observable) or (circuit, observable, parameter_values)\n\nSubmitting a list of PUBs in one .run() call batches many circuits/observables/parameter sets into a single job — see Parameterized Circuits for why the parameter-values slot matters.\nLocal vs Runtime\n\nLocal (qiskit.primitives, qiskit_aer.primitives) — runs on your machine, either exact statevector math or local noisy simulation. See Simulators — Statevector vs Shot-Based.\nRuntime (qiskit_ibm_runtime) — submits to real IBM hardware or cloud simulators, and is where EstimatorOptions (suppression/mitigation knobs) and session/job management live. See Running on Real IBM Hardware.\n\nSame PUB-based interface either way — swapping qiskit_aer.primitives.SamplerV2 for qiskit_ibm_runtime.SamplerV2 is usually the only code change needed to go from local testing to real hardware.\nOfficial reference: Qiskit primitives documentation.\nRelated\n\nQuantumCircuit Basics\nEstimatorOptions and the Five Mitigation Knobs\nExecutor Primitive\nRunning on Real IBM Hardware\nMeasurement and Collapse — why Sampler returns statistics, not exact amplitudes\n\nSelf-Check\n\nHow would you explain the difference between Sampler and Estimator to someone who’s never used either?\nWhy does Sampler need a measurement gate in the circuit while Estimator doesn’t?\nWhat does going from local testing to real hardware actually require you to change in your code?\n",
    "order": 999
  },
  {
    "slug": "qc-study-roadmap",
    "filePath": "QC Study Roadmap.md",
    "title": "Qashu",
    "links": [
      "tags/qc/moc",
      "absolute-basics/what-is-a-quantum-computer",
      "absolute-basics/what-is-a-qubit",
      "absolute-basics/superposition",
      "absolute-basics/bloch-sphere",
      "absolute-basics/measurement-and-collapse",
      "programming-a-quantum-computer/quantumcircuit-basics",
      "programming-a-quantum-computer/the-primitives-family",
      "programming-a-quantum-computer/parameterized-circuits",
      "programming-a-quantum-computer/simulators-—-statevector-vs-shot-based",
      "foundations/pauli-operators",
      "foundations/sparsepauliop",
      "foundations/x-gate",
      "foundations/h-gate",
      "foundations/cx-gate-and-entanglement",
      "foundations/z-gate-and-relative-phase",
      "foundations/s-and-t-gates",
      "foundations/tensor-products-and-multi-qubit-states",
      "foundations/why-gates-are-unitary",
      "foundations/universal-gate-sets-and-the-clifford-group",
      "why-quantum-computing-matters/quantum-speedup-—-ingredients-and-myths",
      "why-quantum-computing-matters/deutsch's-algorithm",
      "why-quantum-computing-matters/the-deutsch-jozsa-algorithm",
      "why-quantum-computing-matters/computational-complexity-—-p,-np,-bqp",
      "why-quantum-computing-matters/the-quantum-algorithm-zoo",
      "why-quantum-computing-matters/what-quantum-computers-are-good-for",
      "why-quantum-computing-matters/quantum-utility-vs-quantum-advantage",
      "entangled-states/bell-states",
      "entangled-states/ghz-states",
      "dynamic-circuits/dynamic-ghz-via-qubit-reuse",
      "entangled-states/chsh-inequality-and-bell-tests",
      "entangled-states/quantum-teleportation",
      "entangled-states/no-cloning-theorem",
      "quantum-communication/e91-—-entanglement-based-quantum-key-distribution",
      "quantum-communication/bb84-quantum-key-distribution",
      "depth--and--optimization/circuit-depth",
      "depth--and--optimization/circuit-introspection-cheat-sheet",
      "depth--and--optimization/start-from-the-middle",
      "depth--and--optimization/recursive-fan-out",
      "hardware-reality/qiskit-patterns",
      "hardware-reality/transpilation",
      "hardware-reality/heavy-hex-topology",
      "hardware-reality/coupling-map-and-topology",
      "hardware-reality/physical-vs-logical-qubits-and-layout",
      "hardware-reality/swap-overhead-and-routing",
      "hardware-reality/bridge-gate-identity",
      "hardware-reality/backend-properties",
      "hardware-reality/running-on-real-ibm-hardware",
      "hardware-reality/qiskit-api-gotchas",
      "hardware-reality/transpiling-qaoa-circuits-—-swap-strategies-and-sat-mapping",
      "noise--and--error-models/density-matrix",
      "noise--and--error-models/depolarizing-noise",
      "noise--and--error-models/pauli-error-model",
      "noise--and--error-models/thermal-relaxation",
      "noise--and--error-models/bit-flip-and-phase-flip-sensitivity",
      "noise--and--error-models/noisy-execution-and-fidelity",
      "noise--and--error-models/physical-decoherence-mechanisms",
      "noise--and--error-models/coherent-vs-incoherent-gate-errors",
      "noise--and--error-models/readout-as-a-confusion-matrix",
      "noise--and--error-models/randomized-benchmarking",
      "dynamic-circuits",
      "error-mitigation/error-suppression-and-mitigation-—-overview",
      "error-mitigation/error-correction-(ec)",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "error-mitigation/dressed-gates-and-pauli-propagation",
      "error-mitigation/samplomatic-—-boxes-and-annotations",
      "error-mitigation/noiselearnerv3-and-pauli-lindblad-models",
      "error-mitigation/executor-primitive",
      "error-mitigation/1d-ising-chain-and-the-mirror-trick",
      "error-mitigation/pna-—-propagated-noise-absorption",
      "error-mitigation/pec-—-probabilistic-error-cancellation",
      "error-mitigation/slc-—-shaded-lightcones",
      "error-mitigation/zero-noise-extrapolation-(zne)",
      "error-mitigation/m3-—-matrix-free-measurement-mitigation",
      "quantum-algorithms/hamiltonian-simulation-—-why-it's-hard",
      "quantum-algorithms/hamiltonians-and-encoding-for-quantum-circuits",
      "quantum-algorithms/trotterization",
      "quantum-algorithms/the-ground-state-problem",
      "quantum-algorithms/the-quantum-fourier-transform",
      "quantum-algorithms/quantum-phase-estimation-(qpe)",
      "quantum-algorithms/quantum-chemistry-—-qpe-on-h2-(worked-example)",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "quantum-algorithms/quantum-krylov-methods",
      "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)",
      "quantum-algorithms/the-lucj-ansatz",
      "quantum-algorithms/skqd-and-sqdrift",
      "quantum-algorithms/sqd-on-n₂-(worked-example)",
      "quantum-algorithms/grover's-algorithm",
      "quantum-algorithms/qaoa-—-quantum-approximate-optimization-algorithm",
      "quantum-algorithms/the-partition-problem-—-qaoa-worked-example",
      "quantum-algorithms/pauli-correlation-encoding-(pce)",
      "quantum-algorithms/the-full-pipeline-of-a-quantum-solver",
      "quantum-machine-learning/data-encoding-circuits-(feature-maps)",
      "quantum-machine-learning/quantum-neural-networks-(qnn)",
      "quantum-machine-learning/quantum-kernel-methods",
      "quantum-advantage/quantum-advantage-—-definition-and-criteria",
      "quantum-advantage/peaked-circuits-and-verifiable-quantum-advantage",
      "quantum-advantage/the-variational-principle-as-a-trust-tool",
      "quantum-advantage/the-operator-loschmidt-echo-(ole)-benchmark",
      "quantum-+-hpc/what-is-hpc",
      "quantum-+-hpc/why-quantum-needs-hpc",
      "quantum-+-hpc/quantum-centric-supercomputing-(qcsc)",
      "quantum-+-hpc/the-quantum+hpc-software-stack",
      "quantum-+-hpc/hybrid-workflow-patterns-—-vqe-and-sqd-at-hpc-scale",
      "quantum-+-hpc/ai-in-the-quantum+hpc-loop",
      "reading-the-literature/the-first-pass-framework-for-reading-a-quantum-paper",
      "reading-the-literature/spotting-hype-and-omissions-in-quantum-claims"
    ],
    "tags": [
      "qc/moc"
    ],
    "content": "Qashu\nqc/moc\n  ...\n    .:.\n      .:.\n        .::.\n          .:*.\n            .*#:.                               ..\n              .##*:.                        .:::*#*.\n                :###*::..         .......:**#*.:*:::\n                 .###*:...::::::**############:.#.::\n                  :#:..*####**::**###*::#####*..:.:.\n                   ..:###*..      ...  *####:..:..\n                    :*##:            .:####:.:..\n                   .*##:             .###:..:.\n                   ::##:             :#*::.:\n                  .::###.          .*#:.:#.\n                  ::###*...     .:*#*:.....\n                 ::*###. ..:::*##*:.... .*:\n               ..:#####*#####*:.. .....:##*\n             ...*:*####**::.  ..... .::**##*.\n           ...:.::::::::.......          ..*#:\n           *..*:::.........                 .:..\n           .::....                             ...\n                                                  ..\nMap of Content for a self-directed quantum computing curriculum, built up from lecture material, hands-on labs, and other resources along the way. Central hub — everything links back here.\nConcept Map\nAbsolute Basics\n\nWhat is a Quantum Computer (the physical device and why it’s not “a faster classical computer”)\nWhat is a Qubit (state vector, ket notation, normalization)\nSuperposition (interference, not classical probability)\nBloch Sphere (the geometric picture — and where it stops applying)\nMeasurement and Collapse (the Born rule, why quantum programs are inherently probabilistic)\n\nProgramming a Quantum Computer\n\nQuantumCircuit Basics (registers, adding gates, .compose(), drawing)\nThe Primitives Family (Sampler vs Estimator vs Executor, PUBs, local vs Runtime)\nParameterized Circuits (Parameter/ParameterVector, why transpile-once-bind-many matters)\nSimulators — Statevector vs Shot-Based (exact amplitudes vs sampled counts, fake backends)\n\nFoundations\n\nPauli Operators → SparsePauliOp\nX Gate, H Gate, CX Gate and Entanglement\nZ Gate and Relative Phase → S and T Gates\nTensor Products and Multi-Qubit States (how single-qubit states combine into 2^n-dimensional multi-qubit states)\nWhy Gates Are Unitary (derived from norm-preservation, not just asserted)\nUniversal Gate Sets and the Clifford Group (the Gottesman-Knill theorem — why non-Clifford gates are what make a circuit quantum-hard)\n\nWhy Quantum Computing Matters\n\nQuantum Speedup — Ingredients and Myths (superposition + entanglement + interference — and why “evaluate everything at once” is a myth)\nDeutsch’s Algorithm (the first concrete proof: 1 query vs. 2, via phase kickback)\nThe Deutsch-Jozsa Algorithm (the n-qubit generalization — first proven exponential speedup)\nComputational Complexity — P, NP, BQP (what “speedup” formally means, and the Church-Turing caveat)\nThe Quantum Algorithm Zoo (the milestone timeline — Grover/Shor/QPE named, not yet derived here)\nWhat Quantum Computers Are Good For (three problem-area categories + named industry applications)\nQuantum Utility vs Quantum Advantage (precise definitions, and an honest read on where things actually stand)\n\nEntangled States\n\nBell States (2-qubit) → GHZ States (N-qubit) → Dynamic GHZ via Qubit Reuse (connectivity-free, via feedforward)\nCHSH Inequality and Bell Tests (the experimental proof entanglement isn’t hidden pre-agreed answers)\nQuantum Teleportation (transferring an unknown state using one Bell pair + a classical channel)\nNo-Cloning Theorem (why teleportation isn’t cloning, and why error correction can’t just copy)\n\nQuantum Communication\n\nE91 — Entanglement-Based Quantum Key Distribution (Bell-pair distribution + a live CHSH-violation check as the eavesdropping signal — reuses CHSH Inequality and Bell Tests directly as a security primitive, not just a physics demo)\nBB84 Quantum Key Distribution (prepare-and-measure QKD; basis-mismatch error rate as the eavesdropping signal; the practical, concrete face of No-Cloning Theorem)\n\nDepth &amp; Optimization\n\nCircuit Depth (what it is, how to compute it by hand) → Circuit Introspection Cheat Sheet (the built-in tooling equivalent)\nStart From the Middle (halves depth)\nRecursive Fan-Out (log-depth, exponential improvement)\n\nHardware Reality\n\nQiskit Patterns (Map → Optimize → Execute → Post-process)\nTranspilation\nHeavy-Hex Topology → Coupling Map and Topology (the general concept behind it)\nPhysical vs Logical Qubits and Layout\nSWAP Overhead and Routing (the cost of ignoring topology)\nBridge Gate Identity (alternative to SWAP)\nBackend Properties (basis gates, CLOPS, gate/readout errors, T1/T2 — where all of the above gets its numbers from)\nRunning on Real IBM Hardware (the end-to-end workflow, tying the whole section together)\nQiskit API Gotchas (running list of API traps encountered along the way)\nTranspiling QAOA Circuits — SWAP Strategies and SAT Mapping (why circuit-to-hardware mapping is NP-hard in general, the SWAP-strategy theorem, and SAT-based mapping — real gate-count numbers on a 50-node problem)\n\nNoise &amp; Error Models\n\nDensity Matrix (the formalism: pure vs. mixed states)\nDepolarizing Noise (isotropic, simplest model) → Pauli Error Model (directional generalization) → Thermal Relaxation (time-dependent, not per-gate)\nBit-flip and Phase-flip Sensitivity (why which basis you measure in determines what noise you can even see)\nNoisy Execution and Fidelity (why all of this matters: naive vs. topology-aware circuits under real noise)\nPhysical Decoherence Mechanisms (the actual physical causes underneath the toy noise models: charge/flux noise, dielectric loss, quasiparticle poisoning, crosstalk)\nCoherent vs Incoherent Gate Errors (quadratic vs. linear vs. constant depth-scaling — and why twirling deliberately converts one into the other)\nReadout as a Confusion Matrix (the 2^n\\times2^n matrix formalism underneath readout error, and what TREX corrects)\nRandomized Benchmarking (isolating one gate’s error rate from SPAM, via reference vs. interleaved Clifford sequences)\n\nDynamic Circuits\n\nDynamic Circuits (mid-circuit measurement + reset + conditional ops)\nDynamic GHZ via Qubit Reuse (the headline application: long-range entanglement without long-range connectivity)\n\nError Mitigation\n\nError Suppression and Mitigation — Overview (the four categories: EC, ED, EM, ES — and why this section focuses on the last two)\nError Correction (EC) (stabilizer codes, syndromes, LDPC codes, magic state distillation — the fourth category, in full)\nEstimatorOptions and the Five Mitigation Knobs (DD, PT, TREX, ZNE/PEA, PEC as circuit-wide switches)\nDressed Gates and Pauli Propagation (the Clifford-conjugation algebra underneath all twirling-based methods)\nSamplomatic — Boxes and Annotations (per-layer control via boxes/annotations → template + samplex)\nNoiseLearnerV3 and Pauli-Lindblad Models (learning per-layer noise as a sparse Pauli-Lindblad channel on real hardware)\nExecutor Primitive (the box-aware primitive that runs samplex-built programs)\n1D Ising Chain and the Mirror Trick (the Trotter benchmark circuit + the U†U ideal-answer trick used throughout)\nPNA — Propagated Noise Absorption (rewrites the observable instead of the circuit)\nPEC — Probabilistic Error Cancellation (rewrites the circuit via anti-noise sampling; unbiased but exponential overhead)\nSLC — Shaded Lightcones (prunes PEC’s overhead using the observable’s causal lightcone)\nZero Noise Extrapolation (ZNE) (deliberately amplify noise via gate-folding, then extrapolate back to the zero-noise limit)\nM3 — Matrix-Free Measurement Mitigation (post-processing readout-error correction via mthree, distinct from TREX’s execution-time approach)\n\nQuantum Algorithms\n\nHamiltonian Simulation — Why It’s Hard (the motivating problem: exponential state size, and where every classical workaround fails)\nHamiltonians and Encoding for Quantum Circuits (H vs. e^{-iHt}, Pauli decomposition, Jordan-Wigner/Bravyi-Kitaev, now with a worked JW derivation example)\nTrotterization (first/second-order product formulas — the same Ising Hamiltonian as 1D Ising Chain and the Mirror Trick, taught as technique instead of benchmark)\nThe Ground-State Problem (why it’s hard both classically and quantumly, and the assumptions every algorithm leans on)\nThe Quantum Fourier Transform (Hadamard + controlled-phase circuit; O(n^2) vs. classical FFT’s O(N\\log N) — and why that speedup evaporates once you account for loading real classical data)\nQuantum Phase Estimation (QPE) (full circuit; QFT now derived, not a black box)\nQuantum Chemistry — QPE on H2 (Worked Example) (a real H₂ ground-state energy calculation matching the literature value, the Hartree-Fock-vs-random initial-state experiment, and the accuracy-vs-circuit-cost curve)\nVariational Quantum Eigensolver (VQE) (real ansatz, cost function, the classical-optimizer loop)\nQuantum Krylov Methods (the middle ground between QPE and VQE; real 44-qubit PEA/ZNE-mitigated experiment)\nSample-Based Quantum Diagonalization (SQD) (near-term chemistry: sample → recover → diagonalize classically)\nThe LUCJ Ansatz (the circuit that prepares SQD’s input state)\nSKQD and SqDRIFT (provably-convergent SQD variants, real 50–100 qubit results)\nSQD on N₂ (Worked Example) (a real chemistry run: LUCJ/CCSD state prep, Heron-vs-Nighthawk hardware mapping, configuration recovery, and the reference-subspace-augmentation “quantum utility” result)\nGrover’s Algorithm (unstructured search; oracle phase kickback; the geometric two-state rotation picture; provably-optimal quadratic speedup)\nQAOA — Quantum Approximate Optimization Algorithm (combinatorial optimization via alternating cost/mixer layers; QUBO/Ising encoding; warm-starting across depths)\nThe Partition Problem — QAOA Worked Example (a real QUBO→Ising derivation for graph partitioning, plus the transpilation tooling that turns it into a runnable circuit)\nPauli Correlation Encoding (PCE) (O(√n)-qubit combinatorial-optimization encoding — pairwise qubit correlations instead of one-qubit-per-variable)\nThe Full Pipeline of a Quantum Solver (MOC: target problem → encoding → algorithm → hardware → post-processing, tying the whole section together)\n\nQuantum Machine Learning\n\nData Encoding Circuits (Feature Maps) (how classical data becomes a quantum state — angle/Chebyshev encoding, built directly on Parameterized Circuits)\nQuantum Neural Networks (QNN) (encoding circuit + trainable observable + classical optimizer — VQE’s loop, retargeted at supervised learning instead of energy minimization)\nQuantum Kernel Methods (a fidelity kernel feeding a classical SVM — no circuit parameters are trained at all, a fundamentally different way to be a “quantum ML model”)\n\nQuantum Advantage\n\nQuantum Advantage — Definition and Criteria (the Lanes et al. two-criterion framework — rigorous error bars + a demonstrable, provisional performance edge — and the three problem families poised for it)\nPeaked Circuits and Verifiable Quantum Advantage (classically-checkable quantum output, using Shor’s algorithm as the example)\nThe Variational Principle as a Trust Tool (why VQE-style estimates are self-verifying, and what isn’t)\nThe Operator Loschmidt Echo (OLE) Benchmark (the real 56-qubit ibm_boston trust-building experiment, and the honest “not yet advantage” verdict)\n\nQuantum + HPC\n\nWhat is HPC (thousands of interconnected CPU+GPU nodes; a concrete 2.9 exaflop system)\nWhy Quantum Needs HPC (control electronics, optimization loops, pre/post-processing — QPU never stands alone)\nQuantum-Centric Supercomputing (QCSC) (IBM’s three-stage integration roadmap, parallel to the EC hardware roadmap)\nThe Quantum+HPC Software Stack (the four-layer stack, and QRMI)\nHybrid Workflow Patterns — VQE and SQD at HPC Scale (what HPC does around the algorithms already covered)\nAI in the Quantum+HPC Loop (calibration, mitigation, and compiler optimization, all learned)\n\nReading the Literature\n\nThe First-Pass Framework for Reading a Quantum Paper (5-part reading order, the 3 first-pass questions, author/venue credibility ladder, and a 6-step figure-reading workflow)\nSpotting Hype and Omissions in Quantum Claims (what’s typically missing from bold quantum claims, red-flag patterns, and calibration over cynicism)\n\nSuggested Study Order\n\nAbsolute basics — what a quantum computer physically is → what a qubit is → Superposition → Bloch Sphere → Measurement and Collapse. The ground floor everything below is built on; start here with zero prior knowledge.\nProgramming a quantum computer — QuantumCircuit Basics → The Primitives Family → Parameterized Circuits → Simulators — Statevector vs Shot-Based. The mechanical/code layer every snippet from here on assumes; without this, the rest of the vault reads as unexplained syntax.\nGates — Pauli Operators, X Gate, H Gate, CX Gate and Entanglement, Z Gate and Relative Phase. The vocabulary everything else is written in.\nWhy quantum computing matters — now that you can read gates, see the actual payoff: Quantum Speedup — Ingredients and Myths → Deutsch’s Algorithm → The Deutsch-Jozsa Algorithm → Computational Complexity — P, NP, BQP → The Quantum Algorithm Zoo → What Quantum Computers Are Good For → Quantum Utility vs Quantum Advantage. This is the “why bother” answer, made concrete instead of assumed.\nEntanglement → Bell states (build intuition for correlation)\nQuantum Communication — E91 — Entanglement-Based Quantum Key Distribution → BB84 Quantum Key Distribution. Bell states and CHSH stop being abstract physics demos and become a working security protocol: E91 catches an eavesdropper via a live CHSH-inequality violation, BB84 via a basis-mismatch error rate — two different mechanisms for the same goal.\nGHZ states → circuit depth (why depth matters at all)\nDepth-reduction tricks (middle-out, recursive fan-out) — the “aha” of exponential improvement\nTranspilation reality check (abstract circuit → real hardware constraints) — later revisited with real numbers in Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping\nHeavy-hex topology + coupling maps + layout + bridge identity (designing with the hardware graph)\nNoisy execution — first the black-box comparison (Noisy Execution and Fidelity), then the mechanisms underneath it: density matrices → depolarizing → Pauli → thermal relaxation, plus how measurement basis reveals different error types\nDynamic circuits — feedforward as a third lever (besides depth-reduction and topology-awareness) for building entanglement cheaply\nRunning on real IBM hardware — close the loop from simulation to an actual backend\nError suppression/mitigation — the whole-circuit knobs first (EstimatorOptions and the Five Mitigation Knobs), then the algebra underneath them (Dressed Gates and Pauli Propagation), then the per-layer machinery that fixes the whole-circuit knobs’ blind spots: Samplomatic — Boxes and Annotations → NoiseLearnerV3 and Pauli-Lindblad Models → Executor Primitive, applied to a real benchmark circuit, then the Chapter 3 add-ons (PNA — Propagated Noise Absorption, PEC — Probabilistic Error Cancellation, SLC — Shaded Lightcones), then the fault-tolerant endgame (Error Correction (EC)) — full loop from “noisy today” to “corrected tomorrow”\nQuantum algorithms — the capstone: why simulation is hard (Hamiltonian Simulation — Why It’s Hard) → how to encode a real Hamiltonian (Hamiltonians and Encoding for Quantum Circuits) → Trotterization → The Ground-State Problem → derive the QFT itself → the three ways to attack the ground-state problem (Quantum Phase Estimation (QPE) with its H2 worked example, Variational Quantum Eigensolver (VQE), Quantum Krylov Methods) → the near-term chemistry frontier (Sample-Based Quantum Diagonalization (SQD) → The LUCJ Ansatz → SKQD and SqDRIFT → a real N2 worked example) → the other landmark algorithms, Grover’s Algorithm and QAOA — Quantum Approximate Optimization Algorithm (with its own worked example and the qubit-saving Pauli Correlation Encoding (PCE)) → zoom back out with The Full Pipeline of a Quantum Solver, tying every stage back to the section that covers it. Everything from Foundations, Programming a Quantum Computer, and Error Mitigation gets used here for real.\nQuantum Machine Learning — Data Encoding Circuits (Feature Maps) → Quantum Neural Networks (QNN) → Quantum Kernel Methods. Two different ways to put Parameterized Circuits to work on supervised learning: one trains circuit parameters like VQE does, the other trains nothing quantum at all and just computes a kernel matrix.\nQuantum advantage — the “how do we know we can trust this” finale: start with the formal definition itself, then the trust-building tools that satisfy it: Peaked Circuits and Verifiable Quantum Advantage → The Variational Principle as a Trust Tool → The Operator Loschmidt Echo (OLE) Benchmark. Ties back to Quantum Utility vs Quantum Advantage from step 4, now with a real 56-qubit answer to the question that section could only pose.\nQuantum + HPC — zooming out to systems scale: What is HPC → Why Quantum Needs HPC → Quantum-Centric Supercomputing (QCSC) → The Quantum+HPC Software Stack → Hybrid Workflow Patterns — VQE and SQD at HPC Scale → AI in the Quantum+HPC Loop. The final answer to “how does any of this actually get deployed for real” — closes the loop from single-qubit basics all the way to exascale integration.\nReading the literature — a change of register: The First-Pass Framework for Reading a Quantum Paper → Spotting Hype and Omissions in Quantum Claims. Not a physics topic and not required for anything above — a standalone research-literacy skill for once you’re reading real papers instead of secondhand material.\n\nOpen Threads\n\nHow does Nighthawk’s denser connectivity change the “start from center” strategy? Only introduced as a named contrast to Heron’s heavy-hex in Coupling Map and Topology, without a worked comparison. Partially resolved — see the Heron (ibm_kingston) vs. Nighthawk (ibm_miami) interaction-pair mapping exercise added to The LUCJ Ansatz. That’s a worked comparison for LUCJ circuits specifically, not a general “start from center” answer — still open for the depth-reduction strategies in Depth &amp; Optimization.\nWill recursive fan-out still give O(log N) depth on a non-heavy-hex graph? (Still open.)\nWhat does quantum error mitigation actually look like in practice? Resolved — see Error Suppression and Mitigation — Overview and the rest of the Error Mitigation section.\nError Correction (EC) … was named only as a contrast category, not covered in depth. Resolved — see Error Correction (EC), written from lecture material on noise, hardware, and error correction. Lighter than a dedicated QEC course, but real; extend additively once richer training material is available.\nError Detection (ED) is still only a one-line contrast category in Error Suppression and Mitigation — Overview, not covered in depth anywhere yet — open.\nA batch of lecture-slide decks was extracted for content in July 2026. Fully built out: Error Correction (EC), Why Quantum Computing Matters, Quantum Algorithms, Quantum Advantage, Quantum + HPC (all four new sections), plus the full reinforcement batch — tensor products &amp; unitarity (Tensor Products and Multi-Qubit States, Why Gates Are Unitary), S/T gates &amp; the Clifford group (S and T Gates, Universal Gate Sets and the Clifford Group), teleportation/CHSH/no-cloning (Quantum Teleportation, CHSH Inequality and Bell Tests, No-Cloning Theorem), and real noise physics (Physical Decoherence Mechanisms, Coherent vs Incoherent Gate Errors, Readout as a Confusion Matrix, Randomized Benchmarking).\nGrover’s algorithm, QAOA, and the QFT itself (used as a black-box inside Quantum Phase Estimation (QPE) but never derived) were deliberately on hold. Resolved by a batch of hands-on notebooks (13 notebooks, extracted and built out July 2026): Grover’s Algorithm and The Quantum Fourier Transform — both fully derived, closing QPE’s “QFT is a black box” honest gap — and QAOA — Quantum Approximate Optimization Algorithm, derived from a from-scratch QUBO/Ising encoding and cost/mixer-unitary construction exercise. The same batch also built two entirely new sections: Quantum Communication (E91 — Entanglement-Based Quantum Key Distribution, BB84 Quantum Key Distribution) and Quantum Machine Learning (Data Encoding Circuits (Feature Maps), Quantum Neural Networks (QNN), Quantum Kernel Methods) — plus Quantum Chemistry — QPE on H2 (Worked Example) and a worked Jordan-Wigner derivation added to Hamiltonians and Encoding for Quantum Circuits. Several notebooks in the same batch (teleportation, no-cloning, a general exercises notebook) were pure reinforcement or unsolved stubs and produced no vault changes; two exam notebooks were mined instead for Self-Check questions, added to CHSH Inequality and Bell Tests, Bell States, Why Gates Are Unitary, and Quantum Teleportation.\nDeliberately on hold (per explicit request): Shor’s algorithm and superdense coding. Shor’s is still only named, not derived, in The Quantum Algorithm Zoo — no source material has worked through it yet. Superdense coding’s only source notebook left the actual protocol as unsolved student TODOs with no prose fallback either (unlike BB84, whose protocol was fully described in prose even though its code was also left blank) — holding off in case a future resource covers it properly first.\nA further batch of algorithms lecture slides and a companion hands-on lab (three notebooks) were extracted July 2026: The Full Pipeline of a Quantum Solver and Transpiling QAOA Circuits — SWAP Strategies and SAT Mapping from the slides; Quantum Advantage — Definition and Criteria from the first notebook; The Partition Problem — QAOA Worked Example, Pauli Correlation Encoding (PCE), M3 — Matrix-Free Measurement Mitigation, and Zero Noise Extrapolation (ZNE) from the second (its exercise cells are unsolved — its content is the markdown/API surface, not confirmed working numbers); SQD on N₂ (Worked Example) plus enrichments to The LUCJ Ansatz and Sample-Based Quantum Diagonalization (SQD) from the third (also unsolved, so the worked example gives the qualitative HF &lt; SQD &lt; classical-reference &lt; reference-augmented-SQD ordering, not literature energy numbers). A separate one-off resource on how to read a quantum paper became the new Reading the Literature section — out of scope for the rest of the vault by design.\n",
    "order": 999
  },
  {
    "slug": "quantum-+-hpc/ai-in-the-quantum+hpc-loop",
    "filePath": "Quantum + HPC/AI in the Quantum+HPC Loop.md",
    "title": "AI in the Quantum+HPC Loop",
    "links": [
      "tags/qc/hpc",
      "error-mitigation/error-suppression-and-mitigation-—-overview",
      "hardware-reality/transpilation",
      "quantum-+-hpc/quantum-centric-supercomputing-(qcsc)",
      "quantum-+-hpc/what-is-hpc"
    ],
    "tags": [
      "qc/hpc"
    ],
    "content": "AI in the Quantum+HPC Loop\nqc/hpc\nA third participant alongside HPC and QPUs: AI models trained and run on the classical side, feeding back into how the quantum computation itself is run. Three concrete roles:\n\nAI-assisted calibration and noise suppression — drift prediction, pulse tuning, anomaly detection on the QPU’s calibration state, replacing or augmenting manual recalibration schedules.\nML for error mitigation — learned correction maps, denoising observables, and shot-allocation strategies, trained using either noiseless-simulator targets or error-mitigated QPU output as ground truth.\nCompiler optimization — learned mapping, routing, and gate synthesis; reinforcement-learning agents searching circuit-architecture/gate-selection space directly, rather than using fixed transpiler heuristics (see Transpilation).\n\nKey insight: the framing is “AI+HPC+QPU convergence” — HPC provides the scale to train and run these models, AI provides adaptive control and learned models that fixed heuristics can’t easily replicate, and the QPU executes the quantum-native kernel none of the other two can substitute for. Each piece does the part the others structurally can’t.\nRelated\n\nQuantum-Centric Supercomputing (QCSC)\nError Suppression and Mitigation — Overview\nTranspilation\nWhat is HPC\n\nSelf-Check\n\nCould you name the three roles AI plays in this loop, and give one concrete example of each?\nWhy does AI-based error mitigation need either simulator or already-mitigated QPU data as a training target?\nWhy is “AI+HPC+QPU convergence” a three-way split rather than AI simply replacing one of the other two?\n",
    "order": 999
  },
  {
    "slug": "quantum-+-hpc/hybrid-workflow-patterns-—-vqe-and-sqd-at-hpc-scale",
    "filePath": "Quantum + HPC/Hybrid Workflow Patterns — VQE and SQD at HPC Scale.md",
    "title": "Hybrid Workflow Patterns — VQE and SQD at HPC Scale",
    "links": [
      "tags/qc/hpc",
      "tags/qc/algorithms",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)",
      "quantum-+-hpc/why-quantum-needs-hpc",
      "quantum-+-hpc/the-quantum+hpc-software-stack"
    ],
    "tags": [
      "qc/hpc",
      "qc/algorithms"
    ],
    "content": "Hybrid Workflow Patterns — VQE and SQD at HPC Scale\nqc/hpc qc/algorithms\nVQE and SQD are already covered in depth as algorithms — this note is about what HPC specifically contributes around them, not how they work internally.\nVQE’s HPC footprint\nHPC generates the molecular integrals and basis sets classically before any quantum circuit runs; the QPU only evaluates the parameterized ansatz. Key insight — VQE is not a single computation, it’s repeated classical-quantum loops, and HPC’s job is to batch, parallelize, and validate those loops across many nodes rather than run them one at a time. The same trainability/barren-plateau and shot-count challenges from the algorithm itself apply here — HPC scale doesn’t remove them, it just gives you more parallel attempts to work around them.\nSQD’s HPC footprint\nHPC orchestrates and preprocesses (one- and two-body electronic integrals, qubit mapping, circuit preparation) before sampling; after the QPU produces bitstrings, classical HPC — CPU/GPU, MPI-based, multi-node — constructs the effective subspace and performs the diagonalization. The iterative configuration recovery step scales the same way: more classical compute means more samples can be corrected and re-diagonalized per round.\nThe common pattern\nBoth are the same shape: a narrow, specialized quantum kernel embedded inside a much larger classical workflow. The QPU never sees molecular integrals, optimizer state, or subspace diagonalization directly — it only ever sees a circuit and returns bitstrings or expectation values. Everything else, at whatever scale, is HPC’s job.\nRelated\n\nVariational Quantum Eigensolver (VQE)\nSample-Based Quantum Diagonalization (SQD)\nWhy Quantum Needs HPC\nThe Quantum+HPC Software Stack\n\nSelf-Check\n\nWhat does HPC actually do in a VQE run that the QPU itself never sees?\nWhy does SQD’s configuration recovery step specifically benefit from more classical compute?\nCould you describe the “common pattern” both algorithms share, in one sentence?\n",
    "order": 999
  },
  {
    "slug": "quantum-+-hpc/quantum-centric-supercomputing-(qcsc)",
    "filePath": "Quantum + HPC/Quantum-Centric Supercomputing (QCSC).md",
    "title": "Quantum-Centric Supercomputing (QCSC)",
    "links": [
      "tags/qc/hpc",
      "tags/qc/hardware",
      "error-mitigation/error-correction-(ec)",
      "error-mitigation/error-suppression-and-mitigation-—-overview",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "quantum-+-hpc/what-is-hpc",
      "quantum-+-hpc/why-quantum-needs-hpc",
      "quantum-+-hpc/the-quantum+hpc-software-stack"
    ],
    "tags": [
      "qc/hpc",
      "qc/hardware"
    ],
    "content": "Quantum-Centric Supercomputing (QCSC)\nqc/hpc qc/hardware\nIBM’s stated three-stage roadmap (as of 2026 — a target, not a guarantee) for integrating quantum processors into classical HPC infrastructure, tracking the same underlying timeline as the hardware roadmap but describing how the systems get wired together rather than what the QPU itself can do.\nThe three stages\n\nQuantum as co-processor to HPC (~2026–2028) — specialized offload engines, quantum hardware co-located with existing HPC systems, post-selected error correction.\nHeterogeneous Quantum+HPC Systems (~2028–2031) — tight coupling between quantum and classical resources, advanced middleware purpose-built for hybrid algorithms, unified scheduling across both, near-time conditional error correction.\nTightly Integrated Quantum+HPC Systems (~2031–2034) — co-designed heterogeneous systems from the ground up, a single unified programming model spanning quantum and classical resources, interoperable high-performance fabric, multi-tenant execution, real-time error correction.\n\nKey insight: this maps directly onto the hardware side’s progression from noisy-and-mitigated to fault-tolerant — Stage 1 is today’s Error Mitigation section reality, Stage 3 assumes the Starling/Blue Jay fault-tolerant hardware already described there. Two parallel roadmaps (hardware capability, integration architecture) converging on the same fault-tolerant endpoint.\nQiskit Runtime’s role\nPositioned specifically as the layer that reduces classical-quantum latency — the round-trip cost of a classical optimizer calling back into a QPU repeatedly (as in VQE’s loop) is itself a bottleneck QCSC’s middleware stages are designed to shrink.\nRelated\n\nError Correction (EC) — the parallel hardware-capability roadmap\nWhat is HPC\nWhy Quantum Needs HPC\nThe Quantum+HPC Software Stack\n\nSelf-Check\n\nCould you name the three QCSC stages and, for each, say what actually changes about how a QPU is used?\nWhy does this roadmap track the same timeline as the hardware fault-tolerance roadmap in Error Correction (EC)?\nWhy does classical-quantum latency matter enough to be a named design goal for Qiskit Runtime?\n",
    "order": 999
  },
  {
    "slug": "quantum-+-hpc/the-quantum+hpc-software-stack",
    "filePath": "Quantum + HPC/The Quantum+HPC Software Stack.md",
    "title": "The Quantum+HPC Software Stack",
    "links": [
      "tags/qc/hpc",
      "tags/qc/workflow",
      "quantum-+-hpc/quantum-centric-supercomputing-(qcsc)",
      "programming-a-quantum-computer/the-primitives-family",
      "quantum-+-hpc/what-is-hpc"
    ],
    "tags": [
      "qc/hpc",
      "qc/workflow"
    ],
    "content": "The Quantum+HPC Software Stack\nqc/hpc qc/workflow\nThe layered software architecture that makes QCSC actually runnable, top to bottom:\n\nUser layer — Python/Qiskit APIs, C/C++ APIs, the Executor primitive for box-annotated programs.\nApplication middleware &amp; orchestration — MPI and other distributed-programming models, schedulers, containers, telemetry.\nSystem orchestration — workflow management, resource management, and QRMI.\nCompute — multi-tenancy support, co-located classical and quantum backends.\n\nQRMI — Quantum Resource Management Interface\nKey insight: QPUs are scarcer and harder to schedule than GPUs — there’s no equivalent of spinning up another GPU node on demand, and a QPU’s calibration state changes over time in ways a GPU’s doesn’t. QRMI exists specifically to standardize vendor-neutral scheduling of this scarce, stateful resource across an HPC system, the same role Slurm plays for classical compute but adapted to quantum’s constraints.\nConcrete architecture\nSlurm login node\n  → classical job queue / circuit job queue\n    → middleware (Qiskit primitives handler)\n      → classical compute nodes (CPU)  /  virtual quantum nodes (vQPU)\n        → quantum computer (DA API, controllers)\n\nA benchmark suite — Benchpress — spans chemistry, physics models, and discrete/binary optimization problem categories, used to evaluate this stack’s actual end-to-end performance rather than just individual component speed.\nRelated\n\nQuantum-Centric Supercomputing (QCSC)\nThe Primitives Family\nWhat is HPC\n\nSelf-Check\n\nCould you walk through the four layers of this stack, from user code down to the QPU?\nWhy does QPU scheduling need its own interface (QRMI) instead of reusing GPU scheduling tools?\nWhat role does a benchmark suite like Benchpress play that testing individual components wouldn’t cover?\n",
    "order": 999
  },
  {
    "slug": "quantum-+-hpc/what-is-hpc",
    "filePath": "Quantum + HPC/What is HPC.md",
    "title": "What is HPC",
    "links": [
      "tags/qc/hpc",
      "tags/qc/hardware",
      "quantum-algorithms/hamiltonian-simulation-—-why-it's-hard",
      "quantum-+-hpc/why-quantum-needs-hpc",
      "quantum-+-hpc/quantum-centric-supercomputing-(qcsc)"
    ],
    "tags": [
      "qc/hpc",
      "qc/hardware"
    ],
    "content": "What is HPC?\nqc/hpc qc/hardware\nHigh-performance computing (HPC): thousands of interconnected CPU+GPU nodes working as one system. CPUs orchestrate and handle conventional workloads; GPUs do the massively parallel numerical work. High-speed interconnects (InfiniBand, Slingshot) link nodes together, hierarchical memory and parallel filesystems feed them data, and Slurm (scheduling), Kubernetes (automation), and MPI (distributed computation) coordinate the whole thing. Power budgets run into the tens of megawatts.\nA concrete sense of scale\nA representative modern HPC system: 11,520 nodes, 4 GPUs per node (46,080 GPUs total), 250.8 TFLOPS per node, 2,889.2 PFLOPS system peak, 512 GiB memory per node (5,760 TiB system-wide), ~36.0 MW peak power draw.\nHistorical trajectory: ENIAC (1946) — 500 FLOPS. Cray-1 (1976) — 160 MFLOPS. El Capitan (2024) — 1.7 EXAFLOPS. Roughly 15 orders of magnitude in under 80 years.\nWhat HPC is actually good at\n\nStructured PDE/continuum problems — climate modeling, computational fluid dynamics, nuclear/plasma physics.\nLarge-scale AI training and inference.\nSampling, uncertainty, and ensembles — digital twins, Monte Carlo methods, parameter sweeps.\n\nKey insight: none of this is what a QPU is good at (see Hamiltonian Simulation — Why It’s Hard) — HPC and quantum computing are solving different parts of the same larger problem, which is exactly why they need to be integrated, not swapped.\nRelated\n\nWhy Quantum Needs HPC\nQuantum-Centric Supercomputing (QCSC)\nHamiltonian Simulation — Why It’s Hard — the specific problem class HPC can’t solve alone\n\nSelf-Check\n\nCould you describe, in your own words, what an HPC system’s CPUs and GPUs each contribute?\nWhy does the scale example (46,080 GPUs, 36 MW) matter for understanding what “supercomputing” actually means today?\nWhat kinds of problems is HPC well-suited for, and how does that differ from what a QPU targets?\n",
    "order": 999
  },
  {
    "slug": "quantum-+-hpc/why-quantum-needs-hpc",
    "filePath": "Quantum + HPC/Why Quantum Needs HPC.md",
    "title": "Why Quantum Needs HPC",
    "links": [
      "tags/qc/hpc",
      "tags/qc/hardware",
      "absolute-basics/what-is-a-quantum-computer",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "hardware-reality/qiskit-patterns",
      "quantum-+-hpc/what-is-hpc",
      "quantum-+-hpc/quantum-centric-supercomputing-(qcsc)"
    ],
    "tags": [
      "qc/hpc",
      "qc/hardware"
    ],
    "content": "Why Quantum Needs HPC\nqc/hpc qc/hardware\nKey insight: quantum computing complements HPC, it does not replace it. Even a fully quantum-native application still needs a classical supercomputer around it, for reasons that don’t go away as hardware improves:\n\nClassical control electronics — every quantum computer is driven by extensive classical infrastructure (see What is a Quantum Computer); the QPU is never standalone.\nClassical optimization loops — algorithms like VQE are fundamentally iterative classical-quantum loops, not one-shot quantum computations.\nPre- and post-processing — even the most quantum-native applications need classical work before (problem encoding, basis sets, qubit mapping) and after (result interpretation, error mitigation post-processing) the quantum part runs.\nMost of the workload stays classical — QPUs target narrow, specialized kernels within a much larger computation; the surrounding orchestration, data movement, and analysis is HPC’s job.\n\nReframing the workflow\nThis is the same Map → Optimize → Execute → Post-process pattern from earlier in this vault, just viewed at HPC scale: classical preprocessing on HPC → problem decomposition/encoding → QPU execution of a specialized kernel → HPC postprocessing. The steps don’t change; what changes is that “classical” now means a full supercomputer, not a laptop.\nRelated\n\nWhat is HPC\nQiskit Patterns — the same four-step pattern, at circuit scale\nVariational Quantum Eigensolver (VQE)\nQuantum-Centric Supercomputing (QCSC)\n\nSelf-Check\n\nCould you explain why “quantum computing complements HPC” rather than replaces it, using VQE as an example?\nName the four reasons a quantum computer still needs HPC around it, even hypothetically at its best.\nHow does this note’s four-step workflow map onto Qiskit Patterns’s Map → Optimize → Execute → Post-process?\n",
    "order": 999
  },
  {
    "slug": "quantum-advantage/peaked-circuits-and-verifiable-quantum-advantage",
    "filePath": "Quantum Advantage/Peaked Circuits and Verifiable Quantum Advantage.md",
    "title": "Peaked Circuits and Verifiable Quantum Advantage",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/hardware",
      "why-quantum-computing-matters/the-quantum-algorithm-zoo",
      "why-quantum-computing-matters/quantum-utility-vs-quantum-advantage",
      "error-mitigation/error-suppression-and-mitigation-—-overview",
      "quantum-advantage/quantum-advantage-—-definition-and-criteria"
    ],
    "tags": [
      "qc/algorithms",
      "qc/hardware"
    ],
    "content": "Peaked Circuits and Verifiable Quantum Advantage\nqc/algorithms qc/hardware\nA peaked circuit is one whose measurement outcomes concentrate heavily on a single bitstring rather than spreading across the full output distribution. Key insight: a peak can be efficiently verified classically — either by design (you constructed the circuit knowing the answer) or because the peak bitstring is classically checkable even without knowing it in advance. Shor’s algorithm is the standard example: its output peak encodes a factor of the number being factored, and checking whether that factor is correct is trivial classical trial division — verifying the answer is easy even though finding it was hard.\nWhy this matters for trust\nThis is exactly the kind of problem advantage claims want: a genuinely hard quantum computation whose output you can still trust, because checking the answer doesn’t require re-solving the problem classically.\nThe noise problem\nReal hardware noise flattens the peak toward the uniform distribution — the very thing that made the circuit’s output trustworthy gets washed out by the same noise every circuit in this vault’s Error Mitigation section fights. A simple mitigation: majority voting across many noisy samples to distill the peak back out, on the assumption that the correct bitstring still appears more often than any single wrong one even under noise. This is described as an active area of research, not a solved problem — more sophisticated peak-recovery techniques than simple majority voting are still being developed.\nRelated\n\nQuantum Advantage — Definition and Criteria — this is the “classically verifiable” sub-strategy of criterion 1, made concrete\nQuantum Utility vs Quantum Advantage\nThe Quantum Algorithm Zoo — Shor’s algorithm, named there, not derived\nError Suppression and Mitigation — Overview\n\nSelf-Check\n\nWhy does a peaked circuit’s output being classically checkable not mean the problem itself was classically easy?\nCould you explain, using Shor’s algorithm, what makes its output specifically verifiable?\nWhy does noise on real hardware threaten exactly the property that makes a peaked circuit useful for advantage claims?\n",
    "order": 999
  },
  {
    "slug": "quantum-advantage/quantum-advantage-—-definition-and-criteria",
    "filePath": "Quantum Advantage/Quantum Advantage — Definition and Criteria.md",
    "title": "Quantum Advantage — Definition and Criteria",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/hardware",
      "quantum-advantage/peaked-circuits-and-verifiable-quantum-advantage",
      "quantum-advantage/the-variational-principle-as-a-trust-tool",
      "quantum-advantage/the-operator-loschmidt-echo-(ole)-benchmark",
      "quantum-+-hpc/quantum-centric-supercomputing-(qcsc)",
      "why-quantum-computing-matters/quantum-utility-vs-quantum-advantage"
    ],
    "tags": [
      "qc/algorithms",
      "qc/hardware"
    ],
    "content": "Quantum Advantage — Definition and Criteria\nqc/algorithms qc/hardware\nLanes et al. (Framework for Quantum Advantage, 2025) define quantum advantage as an information-processing task on quantum hardware that satisfies two essential criteria: (1) the correctness of the output can be rigorously validated, and (2) the result demonstrates a genuine performance separation over classical methods. Key insight: criterion 1 isn’t one universal test — it splits into three different sub-strategies depending on the problem, and which one applies determines how you’d even go about trusting the answer: rigorous error bars/bounds (fault-tolerant computing, justified error mitigation, or post-selected error detection), efficient classical verification of an otherwise-hard-to-find answer (sampling problems — see Peaked Circuits and Verifiable Quantum Advantage), or variational scoring against a known bound (ground-state/optimization problems — see The Variational Principle as a Trust Tool). When none of the three apply — general observable estimation with no built-in check — you’re in the hardest case this vault documents: The Operator Loschmidt Echo (OLE) Benchmark.\nCriterion 2 is harder than it sounds: no unconditional quantum-vs-classical separation has been proven in general, so every claimed separation currently rests either on the best known classical algorithm or on complexity-theoretic assumptions — meaning any advantage claim must be tested against both today’s classical methods and plausible future classical improvements, not a fixed goalpost.\nThree problem families poised for advantage\n\nSampling problems — generating probability distributions a classical computer can’t feasibly reproduce, but whose specific output can be checked once produced.\nVariational principle problems — finding ground states or optimal solutions, where the answer can be scored and compared even without knowing the true optimum in advance.\nExpectation values of observables — measuring physical properties of quantum systems; the hardest family, since there’s often no independent classical ground truth at all.\n\nWhat has to work together\nNo single piece of hardware or software gets you there alone: Quantum Error Correction (QEC), Quantum Error Mitigation (QEM), and Error Detection each address a different failure mode and have to work in concert with high-fidelity hardware (tunable-coupler superconducting qubits, dynamic circuits with mid-circuit measurement). The orchestration layer for all of this at scale is Quantum-Centric Supercomputing (QCSC), where QPUs, CPUs, and GPUs each handle the part of a hybrid workflow they’re best suited for.\nRelated\n\nQuantum Utility vs Quantum Advantage — the utility/advantage distinction this framework formalizes, plus the Quantum Advantage Tracker that catalogs real attempts against it\nPeaked Circuits and Verifiable Quantum Advantage — a concrete instance of the “efficient classical verification” sub-strategy\nThe Variational Principle as a Trust Tool — a concrete instance of the “variational scoring” sub-strategy\nThe Operator Loschmidt Echo (OLE) Benchmark — the hardest case, where none of the three sub-strategies apply directly\nQuantum-Centric Supercomputing (QCSC)\n\nSelf-Check\n\nWhy does “criterion 1” split into three different sub-strategies instead of being one single test you can always apply?\nIf no proven quantum-classical separation exists in general, what does it actually mean to satisfy “criterion 2” for a specific task?\nCan you map each of this note’s three problem families onto one of the vault’s three existing Quantum Advantage notes (Peaked Circuits, Variational Principle, OLE Benchmark)?\n",
    "order": 999
  },
  {
    "slug": "quantum-advantage/the-operator-loschmidt-echo-(ole)-benchmark",
    "filePath": "Quantum Advantage/The Operator Loschmidt Echo (OLE) Benchmark.md",
    "title": "The Operator Loschmidt Echo (OLE) Benchmark",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/hardware",
      "quantum-advantage/the-variational-principle-as-a-trust-tool",
      "why-quantum-computing-matters/quantum-utility-vs-quantum-advantage",
      "quantum-advantage/quantum-advantage-—-definition-and-criteria",
      "quantum-advantage/peaked-circuits-and-verifiable-quantum-advantage",
      "hardware-reality/backend-properties"
    ],
    "tags": [
      "qc/algorithms",
      "qc/hardware"
    ],
    "content": "The Operator Loschmidt Echo (OLE) Benchmark\nqc/algorithms qc/hardware\nThe hardest case for trust: estimating an observable \\langle O\\rangle = \\langle\\psi|U^\\dagger O U|\\psi\\rangle where there’s no built-in quality metric — unlike the variational principle, nothing guarantees you’re getting closer to the right answer as you improve, and the ground truth is often genuinely unknown. Trust has to be built the conventional way physics has always built it — the same way telescopes and particle colliders earned trust before either could be checked against a known answer: benchmark on small classically-solvable cases, check reproducibility under different conditions, and compare against theoretical predictions.\nThe circuit\nThe Operator Loschmidt Echo probes exactly this: \\rho \\propto O \\to U \\to V_\\delta \\to U^\\dagger \\to measure O, where U is Floquet Ising dynamics (chosen specifically because it scrambles operators under time evolution) and V_\\delta is a small single-qubit-rotation perturbation. The signal follows\n\\text{Signal} \\approx 1 - \\tfrac{1}{2}\\delta^2 \\times \\text{OTOC}\nwhere OTOC is the out-of-time-order correlator — the quantity that actually probes how far an operator has spread under U.\nThe real experiment\nRun on a 56-qubit patch of ibm_boston (a Heron-generation device), at circuit depths up to 72 (1488 CZ gates), measuring k-local Pauli observables drawn from \\{I,Z\\}^{\\otimes N}. Mitigation used: Global Rescaling — assumes the noise-induced decay factor \\alpha=\\tilde f_i/f_i stays constant across different perturbation strengths \\delta, so noisy signals \\tilde f_i get rescaled by 1/\\alpha to recover the underlying signal f_i.\nThe classical competitor\nCompared against Tensor-Network Belief Propagation (TN-BP) at bond dimension \\chi (see the three classical competitors): CPU runtime becomes impractical around \\chi=256 (~6 hours), GPU memory exceeds an Nvidia H200’s 141GB beyond \\chi=640, and even a hybrid GPU-CPU approach needs roughly 3 hours to evolve plus 1 hour to measure per observable, per initial state. The quantum run took roughly 1 hour total for all 512 initial states and all diagonal observables combined.\nThe disagreement, and how trust was actually built\nAt depth 72, the mitigated quantum answer and TN-BP disagree. Three independent pieces of evidence were used to decide which to trust:\n\nAt lower depth (36), the mitigated quantum signal agrees with converged TN-BP — the methods validate each other where TN-BP is still reliable.\nThe mitigated quantum signal is reproducible across different CZ gate durations (68/96/128ns) and different perturbation strengths \\delta — a result that depended on a specific hardware quirk wouldn’t survive this.\nAt depth 72, the result falls within a theoretically predicted bound region.\n\nThe honest verdict: “We can trust the answer from ibm_boston more than TN-BP.” But “Quantum Advantage? No” — the result hasn’t been benchmarked against every classical heuristic that exists, only against TN-BP specifically. More trustworthy is not the same as verified, and verified-against-one-method is not the same as advantage over the field. This is the utility-vs-advantage distinction playing out on real hardware, in real time.\nRelated\n\nQuantum Advantage — Definition and Criteria — this benchmark is a real instance of criterion 1’s error-mitigation sub-strategy, and the honest “utility, not yet advantage” verdict is criterion 2 playing out in practice\nQuantum Utility vs Quantum Advantage\nThe Variational Principle as a Trust Tool — the easier case, contrasted against this one\nPeaked Circuits and Verifiable Quantum Advantage\nBackend Properties\n\nSelf-Check\n\nWhy does observable estimation lack the kind of built-in check the variational principle gives VQE?\nCould you name the three pieces of evidence used to trust the ibm_boston result, and explain why each one matters?\nWhy is “more trustworthy than TN-BP” explicitly not the same claim as “quantum advantage”?\n",
    "order": 999
  },
  {
    "slug": "quantum-advantage/the-variational-principle-as-a-trust-tool",
    "filePath": "Quantum Advantage/The Variational Principle as a Trust Tool.md",
    "title": "The Variational Principle as a Trust Tool",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/math",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "quantum-advantage/peaked-circuits-and-verifiable-quantum-advantage",
      "quantum-advantage/the-operator-loschmidt-echo-(ole)-benchmark",
      "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)",
      "quantum-algorithms/skqd-and-sqdrift",
      "quantum-advantage/quantum-advantage-—-definition-and-criteria",
      "quantum-algorithms/the-ground-state-problem"
    ],
    "tags": [
      "qc/algorithms",
      "qc/math"
    ],
    "content": "The Variational Principle as a Trust Tool\nqc/algorithms qc/math\nVQE-style ground-state estimates have a property most quantum computations lack: a built-in correctness check. The variational principle guarantees E(\\vec\\theta)=\\langle\\psi(\\vec\\theta)|H|\\psi(\\vec\\theta)\\rangle \\geq E_\\text{ground} for any trial state — so a lower measured energy is provably closer to the true ground state, verifiable without ever knowing the true ground-state energy in advance.\nKey insight: this is exactly what peaked circuits have and general observable estimation doesn’t — a way to know your answer is improving without an independent classical check. Contrast with the honest difficulty in The Operator Loschmidt Echo (OLE) Benchmark: there, no such built-in guarantee exists, and trust has to be built by other means entirely.\nWhere this shows up in practice\nSQD and its variants (SKQD and SqDRIFT) are described as “quantum heuristics becoming increasingly competitive” for ground-state problems precisely because of this self-verifying property — every iteration’s energy estimate is checkable against the same inequality, giving a natural convergence signal even without a known correct answer to compare against.\nRelated\n\nQuantum Advantage — Definition and Criteria — this is the “rigorous error bars via the problem’s own structure” sub-strategy of criterion 1, made concrete\nVariational Quantum Eigensolver (VQE) — the algorithm this principle underlies\nThe Ground-State Problem\nSample-Based Quantum Diagonalization (SQD)\nPeaked Circuits and Verifiable Quantum Advantage — the other case where a built-in check exists\n\nSelf-Check\n\nCould you state the variational principle and explain why it holds for any trial state, not just good ones?\nWhy does this inequality act as a trust mechanism even when the true ground-state energy is unknown?\nWhy don’t all quantum computations get this kind of built-in check — what’s different about observable estimation in general?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/grover's-algorithm",
    "filePath": "Quantum Algorithms/Grover's Algorithm.md",
    "title": "Grover's Algorithm",
    "links": [
      "tags/qc/algorithms",
      "why-quantum-computing-matters/the-quantum-algorithm-zoo",
      "why-quantum-computing-matters/deutsch's-algorithm",
      "quantum-algorithms/the-quantum-fourier-transform"
    ],
    "tags": [
      "qc/algorithms"
    ],
    "content": "Grover’s Algorithm\nqc/algorithms\nSolves unstructured search: given f:\\{0,1\\}^n\\to\\{0,1\\} marking M “solution” strings out of N=2^n total, find one — classically this needs O(N/M) oracle calls on average, Grover’s needs only O(\\sqrt{N/M}). Key insight: this is a proven-optimal quadratic speedup, not a shortcut to exponential — no sequence of unitaries interleaved with oracle calls can beat O(\\sqrt{N/M}) for a genuinely unstructured problem. Shor’s algorithm gets an exponential speedup instead, but only because factoring has extra algebraic structure (see The Quantum Algorithm Zoo) that Grover’s problem setup doesn’t have.\nOracle and phase kickback\nThe oracle acts as U_f|x,y\\rangle=|x,y\\oplus f(x)\\rangle. Prepared against a target qubit in |-\\rangle, this becomes a pure phase flip on solutions — exactly the phase-kickback trick: U_f|x,-\\rangle=P_f|x\\rangle\\otimes|-\\rangle where P_f|x\\rangle=(-1)^{f(x)}|x\\rangle.\nThe geometric picture\nSplit the search space into |\\alpha\\rangle (uniform superposition over the N-M non-solutions) and |\\beta\\rangle (uniform superposition over the M solutions). The uniform starting state is |\\psi_0\\rangle=\\cos\\vartheta_0|\\alpha\\rangle+\\sin\\vartheta_0|\\beta\\rangle with \\sin\\vartheta_0=\\sqrt{M/N} — a 2D problem living entirely in the \\{|\\alpha\\rangle,|\\beta\\rangle\\} plane. P_f reflects the state across |\\alpha\\rangle; the diffusion operator D=H^{\\otimes n}(2|0\\rangle\\langle0|-\\mathbb{1})H^{\\otimes n}=2|\\psi_0\\rangle\\langle\\psi_0|-\\mathbb{1} reflects it back across |\\psi_0\\rangle. Two reflections compose into a rotation: one Grover iteration G=DP_f rotates the state by 2\\vartheta_0 toward |\\beta\\rangle.\nAfter m iterations, |\\psi_m\\rangle=\\cos\\vartheta_m|\\alpha\\rangle+\\sin\\vartheta_m|\\beta\\rangle with \\vartheta_m=(1+2m)\\vartheta_0, and success probability \\sin^2\\vartheta_m. Since this is a rotation, overshooting past \\vartheta_m\\approx\\pi/2 swings the probability back down — there’s a sharp optimum, not a monotonic improvement:\nm \\approx \\frac{\\pi}{4}\\sqrt{\\frac{N}{M}}\nCircuit sketch\n# one Grover iteration = oracle (phase flip on solutions) + diffusion\nqc.append(oracle, range(n))                  # P_f: flips sign of solution states\nqc.h(range(n))\nqc.append(MCXGate(n-1), range(n))             # 2|0&gt;&lt;0| - I, via multi-controlled phase\nqc.h(range(n))\n# repeat ~ (pi/4)*sqrt(N/M) times, then measure\nRelated\n\nDeutsch’s Algorithm — same phase-kickback mechanism, applied to a search problem instead of a promise problem\nThe Quantum Algorithm Zoo — names Grover’s on the milestone timeline; this note is the derivation that closes that gap\nThe Quantum Fourier Transform — the other major “on hold” algorithm, unrelated mechanism but same milestone tier\n\nSelf-Check\n\nWhy is one Grover iteration a rotation rather than a monotonic increase toward the answer — what goes wrong if you run too many iterations?\nHow does phase kickback let a classical-looking oracle U_f|x,y\\rangle=|x,y\\oplus f(x)\\rangle turn into a pure sign flip on solutions?\nWhy is O(\\sqrt{N/M}) provably optimal for unstructured search, while Shor’s algorithm still gets an exponential speedup on a different problem?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/hamiltonian-simulation-—-why-it's-hard",
    "filePath": "Quantum Algorithms/Hamiltonian Simulation — Why It's Hard.md",
    "title": "Hamiltonian Simulation — Why It's Hard",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/math",
      "why-quantum-computing-matters/what-quantum-computers-are-good-for",
      "programming-a-quantum-computer/simulators-—-statevector-vs-shot-based",
      "quantum-algorithms/the-ground-state-problem",
      "quantum-algorithms/hamiltonians-and-encoding-for-quantum-circuits"
    ],
    "tags": [
      "qc/algorithms",
      "qc/math"
    ],
    "content": "Hamiltonian Simulation — Why It’s Hard\nqc/algorithms qc/math\nSimulating how a quantum system evolves over time — the field’s founding motivation (see What Quantum Computers Are Good For) — is classically hard for a structural reason: an n-qubit state needs 2^n complex amplitudes to describe exactly (see Simulators — Statevector vs Shot-Based). At 100 qubits that’s roughly 10^{31} bytes — informally, about 2000 Earth-surfaces’ worth of supercomputer memory. There is no clever encoding that avoids this in general.\nClassical workarounds, and where each one fails\n\nSparse/structured states — exploit zero-amplitudes or symmetries. Fails when the physical system genuinely has no such structure.\nTensor networks — exploit limited entanglement, representing a state compactly if correlations stay short-range. Fails once entanglement grows (bond dimension blows up).\nQuantum Monte Carlo — samples instead of storing the full state. Fails when the sign problem makes the sampled quantity’s variance intractable (common for fermionic and frustrated systems).\nEffective theories (mean-field, DFT) — approximate away most microscopic detail. Fails outside the semiclassical regime the approximation assumes.\n\nKey insight: each classical method has a specific failure mode, not a uniform “too slow” — a quantum computer’s advantage shows up precisely in the regime where all four break down at once (strongly correlated, high-entanglement, sign-problem-afflicted systems).\nFour target problem classes\n\nTime evolution — how does a state evolve under H? (dynamics)\nGround/low-energy states — see The Ground-State Problem\nSpectral properties — Green’s functions, response functions\nThermal properties — finite-temperature expectation values\n\nRelated\n\nHamiltonians and Encoding for Quantum Circuits\nThe Ground-State Problem\nSimulators — Statevector vs Shot-Based — the same exponential-scaling fact, from the simulator side\nWhat Quantum Computers Are Good For\n\nSelf-Check\n\nCould you explain, with the memory-size framing, why simulating 100 qubits classically is genuinely infeasible?\nFor each of the four classical workarounds, could you say specifically what makes it fail?\nWhy do all four classical methods tend to fail together in exactly the regime where quantum computers are expected to help?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/hamiltonians-and-encoding-for-quantum-circuits",
    "filePath": "Quantum Algorithms/Hamiltonians and Encoding for Quantum Circuits.md",
    "title": "Hamiltonians and Encoding for Quantum Circuits",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/math",
      "foundations/pauli-operators",
      "error-mitigation/1d-ising-chain-and-the-mirror-trick",
      "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)",
      "quantum-algorithms/the-lucj-ansatz",
      "quantum-algorithms/quantum-chemistry-—-qpe-on-h2-(worked-example)",
      "foundations/sparsepauliop",
      "quantum-algorithms/hamiltonian-simulation-—-why-it's-hard",
      "quantum-algorithms/trotterization",
      "quantum-algorithms/the-full-pipeline-of-a-quantum-solver"
    ],
    "tags": [
      "qc/algorithms",
      "qc/math"
    ],
    "content": "Hamiltonians and Encoding for Quantum Circuits\nqc/algorithms qc/math\nA Hamiltonian H is the energy operator of a physical system: its eigenvalues are the system’s allowed energies, its eigenvectors are the corresponding physical states, and it governs time evolution via i\\,\\partial|\\psi\\rangle/\\partial t = H|\\psi\\rangle (setting \\hbar=1). Key insight: H itself is generally not unitary, so it isn’t a valid quantum gate — the operator you actually implement on a circuit is U(H,t)=e^{-iHt}, the unitary time-evolution operator generated by H.\nWhy Paulis are the universal language\nTwo facts make circuit-level Hamiltonian work tractable:\n\nAny 2^n\\times2^n Hermitian matrix can be written as a real-weighted linear combination of n-qubit Pauli strings — this is the same fact behind Pauli Operators’ role as the “universal alphabet” for observables, extended via tensor products to n qubits.\nA Pauli rotation R_P(2\\theta) = e^{i\\theta P} = I\\cos\\theta + iP\\sin\\theta is unitary for any Pauli string P — so each term in a Pauli-decomposed Hamiltonian is directly implementable as a rotation gate.\n\nThree ways to hand H to a circuit\n\nLCP (linear combination of Paulis) — H=\\sum_j h_j P_j with real coefficients h_j. Natural for spin models, and the format near-term algorithms in this section mostly use.\nLCU (linear combination of unitaries) — H=\\sum_j h_j U_j with complex coefficients, used by block-encoding methods for fault-tolerant-era algorithms.\nSparse matrix oracles — O_L (locations) and O_V (values), an oracle-access model rather than an explicit decomposition.\n\nMapping physical systems onto qubits\nSpin models map directly — one physical spin becomes one qubit, and the Hamiltonian is naturally in LCP form. Example, the transverse-field Ising model (the same Hamiltonian family as 1D Ising Chain and the Mirror Trick):\nH = -J\\sum_{\\langle i,j\\rangle} Z_i Z_j + g\\sum_i X_i\nFermions are harder — creation/annihilation operators anticommute, which plain qubit operators don’t do by default. Two standard mappings:\n\nJordan-Wigner: b_j^\\dagger \\mapsto \\tfrac12(X_j - iY_j)Z_{j-1}\\cdots Z_0 — simple, but a single fermionic operator touches O(n) qubits (the trailing Z string).\nBravyi-Kitaev: touches only O(\\log n) qubits, at the cost of a less intuitive encoding — still delocalized, just less so.\n\nThis fermion-to-qubit mapping step is exactly what the SQD/LUCJ chemistry algorithms later in this section assume has already happened.\nWorked Jordan-Wigner example (from an H₂ Hamiltonian, see Quantum Chemistry — QPE on H2 (Worked Example)): a number operator n_0 = b_0^\\dagger b_0 maps to n_0 = (I-Z_0)/2 — a single-qubit Z term. A density-density (Coulomb repulsion) term n_0 n_1 maps to a ZZ-type two-qubit term, since it’s just a product of two number operators. Hopping terms (b_p^\\dagger b_q + b_q^\\dagger b_p) map to XY-type terms carrying the Z-string between p and q. This is how a molecular Hamiltonian with a handful of orbitals turns into the kind of 15-term Pauli sum that Quantum Chemistry — QPE on H2 (Worked Example) then feeds into a QPE circuit.\nRelated\n\nPauli Operators\nSparsePauliOp\nHamiltonian Simulation — Why It’s Hard\nTrotterization — what you actually do with this decomposition on a circuit\nQuantum Chemistry — QPE on H2 (Worked Example) — a full worked example of this Jordan-Wigner mapping applied to a real molecule\nThe Full Pipeline of a Quantum Solver — this note covers the pipeline’s “Encoding” stage in depth\n\nSelf-Check\n\nWhy is e^{-iHt} the thing you implement on a circuit, not H itself?\nCould you explain why any Hermitian matrix being a sum of Pauli strings matters practically?\nWhy do fermionic systems need a mapping like Jordan-Wigner or Bravyi-Kitaev, but spin systems don’t?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/pauli-correlation-encoding-(pce)",
    "filePath": "Quantum Algorithms/Pauli Correlation Encoding (PCE).md",
    "title": "Pauli Correlation Encoding (PCE)",
    "links": [
      "tags/qc/algorithms",
      "quantum-algorithms/the-partition-problem-—-qaoa-worked-example",
      "quantum-algorithms/qaoa-—-quantum-approximate-optimization-algorithm",
      "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)"
    ],
    "tags": [
      "qc/algorithms"
    ],
    "content": "Pauli Correlation Encoding (PCE)\nqc/algorithms\nA qubit-reduction technique that encodes n classical variables into only \\mathcal{O}(\\sqrt{n}) qubits by exploiting pairwise correlations between qubits, instead of the usual one-qubit-per-variable encoding (from Sciorili et al., Nature Communications 2024). Rather than assigning each classical node its own qubit, PCE partitions the n nodes into three groups and assigns each group a Pauli basis (X, Y, or Z); a node’s classical value is then read out not from a single qubit’s expectation value but from the correlation between a pair of qubits measured in its assigned basis. Because a set of k qubits supports \\binom{k}{2} pairwise correlations, encoding n nodes this way only needs enough qubits so that \\mathcal{O}(k^2) \\approx n, i.e. k = \\mathcal{O}(\\sqrt{n}) — for example, 160 classical nodes compress down to 11 qubits. Key insight: this trades a hardware constraint (limited qubit count) for a different cost — building the cost Hamiltonian now requires a nonlinear (\\tanh-based) loss function over correlations rather than a direct linear sum over per-node expectation values, since the correlation itself, not a single-qubit measurement, carries the classical information.\ndef reduce_qubits_with_pce(initial_qubits: int) -&gt; int:\n    # k such that O(k^2) ~= n, e.g. reduce_qubits_with_pce(160) == 11\n    ...\n \n# Partition nodes into three groups, one per Pauli basis\nnode_x, node_y, node_z = ...  # index lists\n \n# 2-body Pauli correlation Hamiltonian terms per basis\npauli_correlation_encoding_x = build_pauli_correlation_encoding(&quot;X&quot;, node_x, num_qubits)\npauli_correlation_encoding_y = build_pauli_correlation_encoding(&quot;Y&quot;, node_y, num_qubits)\npauli_correlation_encoding_z = build_pauli_correlation_encoding(&quot;Z&quot;, node_z, num_qubits)\nThe loss function\nBecause classical values are encoded as products of pairwise expectation values rather than single-qubit ones, the cost function used for optimization applies \\tanh(\\alpha \\cdot \\langle Z_i\\rangle) per node (with \\alpha scaling with qubit count) before combining pairs — a soft, differentiable proxy for the \\pm 1 classical assignment, plus a regularization term that pulls each node’s expectation toward \\pm 1 (a confident classical assignment) rather than letting it sit near 0.\nRelated\n\nThe Partition Problem — QAOA Worked Example — PCE is applied here to scale the same partition problem from ~160 to ~1600 nodes\nQAOA — Quantum Approximate Optimization Algorithm — the algorithm whose ansatz PCE’s reduced-qubit Hamiltonian feeds into\nSample-Based Quantum Diagonalization (SQD) — a different qubit/resource-reduction strategy, for chemistry rather than optimization\n\nSelf-Check\n\nWhy does encoding n classical variables into pairwise qubit correlations only require \\mathcal{O}(\\sqrt{n}) qubits instead of n?\nWhat’s the practical cost of using PCE — what do you have to give up in exchange for the qubit savings?\nIf you doubled the number of classical nodes to encode, roughly how many more qubits would PCE need?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/qaoa-—-quantum-approximate-optimization-algorithm",
    "filePath": "Quantum Algorithms/QAOA — Quantum Approximate Optimization Algorithm.md",
    "title": "QAOA — Quantum Approximate Optimization Algorithm",
    "links": [
      "tags/qc/algorithms",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "programming-a-quantum-computer/parameterized-circuits",
      "why-quantum-computing-matters/the-quantum-algorithm-zoo",
      "hardware-reality/transpiling-qaoa-circuits-—-swap-strategies-and-sat-mapping",
      "quantum-algorithms/the-full-pipeline-of-a-quantum-solver"
    ],
    "tags": [
      "qc/algorithms"
    ],
    "content": "QAOA — Quantum Approximate Optimization Algorithm\nqc/algorithms\nA variational algorithm for combinatorial optimization (TSP, Max-Cut, scheduling, …), not chemistry — same classical-optimizer-in-the-loop pattern as VQE, but instead of a general-purpose hardware-efficient ansatz, QAOA uses a problem-specific fixed structure: alternating layers of a cost unitary and a mixer unitary. Key insight: the problem itself becomes the ansatz — you don’t design a generic trial state and hope it can represent the ground state, you build a circuit whose repeated structure is literally “apply the cost function, then stir,” and let depth p (how many times you alternate) trade circuit cost for solution quality.\nEncoding the problem\nCombinatorial problems are first written as QUBO (Quadratic Unconstrained Binary Optimization): binary variables x_i\\in\\{0,1\\}, a cost function to minimize, plus penalty terms enforcing any constraints (e.g. “each city visited exactly once” for TSP). QUBO converts to an Ising Hamiltonian via the substitution\nx_i = \\frac{1 - Z_i}{2}\nturning the classical cost function into a diagonal Hamiltonian H_C built entirely from Z and ZZ Pauli terms — a real quantum operator whose ground state is the optimal solution. For TSP specifically this blows up fast: encoding n cities takes n^2 qubits (one per city-timestep pair), so 10 cities already means 100 qubits.\nThe circuit\n|\\vec\\gamma,\\vec\\beta\\rangle = \\underbrace{U_M(\\beta_p)U_C(\\gamma_p)\\cdots U_M(\\beta_1)U_C(\\gamma_1)}_{p \\text{ layers}}\\,|+\\rangle^{\\otimes n}\n\nCost unitary U_C(\\gamma)=e^{-i\\gamma H_C} — encodes the objective; since H_C is diagonal in the computational basis, this is just a phase applied to each basis state, proportional to that state’s cost.\nMixer unitary U_M(\\beta)=e^{-i\\beta H_M}, typically H_M=\\sum_i X_i — spreads amplitude across bitstrings, letting the optimizer explore rather than getting stuck.\nClassical outer loop (COBYLA, Powell, …) adjusts (\\vec\\gamma,\\vec\\beta) to push amplitude toward low-cost bitstrings, exactly VQE’s measure→optimize→repeat loop, just with a combinatorial cost instead of a molecular energy.\nDepth p is the real knob: on a worked 4-city TSP instance, ground-state (optimal-tour) probability rose from 0.15 at p=1 to 0.44 at p=2 to 0.54 at p=3 — deeper circuits track the true optimum more closely, at the cost of more gates.\nWarm-starting: rather than optimizing each depth from scratch, interpolate the converged (\\vec\\gamma,\\vec\\beta) from depth p{-}1 as the starting point for depth p — a real, named refinement that speeds up the optimization loop noticeably.\n\nQAOA as discretized adiabatic annealing\nQAOA isn’t an arbitrary circuit template — it’s the Adiabatic Theorem, discretized. The theorem says: if a system starts in the ground state of H_0 and H_0 is perturbed slowly enough into H_C, the system stays in the ground state throughout — ending in the ground state of H_C, i.e. the optimal solution. Adiabatic annealing implements this as one continuous evolution\nH(t) = -A(t)\\sum_i X_i + B(t)\\sum_{i,j} Z_iZ_j\nwith A(t) decreasing from large to zero and B(t) increasing from zero to large — “slowly enough” being the catch, since the runtime needed scales with the inverse of the minimum spectral gap the system passes through.\nQAOA discretizes this schedule into p alternating steps: each (\\gamma_k,\\beta_k) pair is one “time slice” of (B(t),A(t)), and increasing p is literally slowing down the annealing schedule to make the approximation to true adiabatic evolution more accurate — this is why p trades circuit cost for solution quality, not just an empirical observation. QAOA can even outperform true adiabatic annealing for subexponential runtimes, since the variational optimizer can find shortcuts (deliberately diabatic transitions) through the minimum-gap bottleneck that a strictly-adiabatic schedule can’t take.\nWarm-starting, in full\nRather than starting QAOA from the equal superposition |+\\rangle^{\\otimes n}, warm-starting biases the initial state toward a classically-obtained approximate solution. Given a QUBO, relax the binary constraint to get a continuous Quadratic Program \\min_{x\\in[0,1]^n} x^TQx+b^Tx (efficiently solvable classically since convex QPs with PSD Q have no combinatorial hardness), producing a fractional solution c^*\\in[0,1]^n. Prepare the initial state as\n|\\psi_{c^*}\\rangle = \\bigotimes_{i=0}^{n-1} R_Y(\\theta_i)|0\\rangle, \\qquad \\theta_i = 2\\sin^{-1}\\!\\left(\\sqrt{c_i^*}\\right)\nand pair it with a modified mixer H_{X,c^*}=\\sum_i H^i_{X,c^*} whose ground state is exactly |\\psi_{c^*}\\rangle (rather than the standard mixer’s ground state |+\\rangle^{\\otimes n}). This works because |\\psi_{c^*}\\rangle already overlaps the true optimum more than an equal superposition does, and it’s still the correct ground state for the (modified) mixer Hamiltonian the algorithm needs. On a portfolio-optimization QUBO, warm-start QAOA reached a much higher probability of sampling the optimal solution than standard QAOA at the same depth, with the gap being largest at low p — exactly where circuit-cost pressure is highest.\nBecause H_C and H_M act simply (diagonal phase, per-qubit rotation) on a computational-basis state, QAOA can be prototyped entirely in classical linear algebra — no quantum circuit needed at all — by applying the cost phase as elementwise multiplication and the mixer as an X-rotation amplitude mix directly on the statevector array. This is a deliberate transparency/speed trade-off for exploration and small instances, not how QAOA runs on real hardware.\nQAOA vs. quantum annealing\nBoth target the same class of problems (find the ground state of an Ising-type Hamiltonian), but QAOA is gate-based and gives explicit, tunable control over p discrete layers, while quantum annealing (D-Wave-style) continuously interpolates from a simple Hamiltonian to H_C over one long analog evolution — different hardware, different tuning knobs, same underlying optimization target.\nRelated\n\nVariational Quantum Eigensolver (VQE) — same classical-optimizer-in-the-loop pattern, applied to molecular ground-state energy instead of combinatorial cost\nParameterized Circuits — the “structure once, bind many times” pattern both VQE and QAOA build on\nThe Quantum Algorithm Zoo — QAOA sits in that note’s “Machine Learning”/optimization-adjacent territory, and in its physics-inspired adiabatic lineage\nTranspiling QAOA Circuits — SWAP Strategies and SAT Mapping — how QAOA’s commuting cost layer makes hardware-aware transpilation tractable\nThe Full Pipeline of a Quantum Solver — QAOA as one “Algorithm” stage choice among several\n\nSelf-Check\n\nWhy does QAOA use a problem-specific alternating cost/mixer circuit instead of a generic hardware-efficient ansatz like VQE does?\nWhat does increasing depth p actually buy you, and what does it cost?\nHow does the QUBO→Ising substitution x_i=\\frac{1-Z_i}{2} turn a classical cost function into something a quantum computer can act on?\nIn what precise sense is QAOA “discretized adiabatic annealing,” and why can it sometimes outperform true adiabatic annealing?\nWhat does warm-starting actually change about the initial state and the mixer, and why does that improve low-depth performance specifically?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/quantum-chemistry-—-qpe-on-h2-(worked-example)",
    "filePath": "Quantum Algorithms/Quantum Chemistry — QPE on H2 (Worked Example).md",
    "title": "Quantum Chemistry — QPE on H2 (Worked Example)",
    "links": [
      "tags/qc/algorithms",
      "quantum-algorithms/quantum-phase-estimation-(qpe)",
      "quantum-algorithms/hamiltonians-and-encoding-for-quantum-circuits",
      "quantum-algorithms/the-ground-state-problem",
      "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)"
    ],
    "tags": [
      "qc/algorithms"
    ],
    "content": "Quantum Chemistry — QPE on H2 (Worked Example)\nqc/algorithms\nA concrete, end-to-end run of Quantum Phase Estimation (QPE) on a real molecule: H₂ at its equilibrium bond length (0.735 Å). The pipeline is compute → map → estimate → read: classical chemistry software (PySCF, STO-3G basis) produces the molecular integrals, Jordan-Wigner (see Hamiltonians and Encoding for Quantum Circuits) maps the fermionic Hamiltonian to a 4-qubit, 15-Pauli-term operator, then a full QPE circuit — Hadamards on the ancilla register, controlled-U^{2^k} time evolutions, inverse QFT, measurement — extracts the ground-state energy as a phase. The result matches the textbook value: nuclear repulsion 0.71996899 Ha plus electronic energy gives a total of -1.13730604 Ha, in line with the literature figure of -1.137 Ha. Key insight: QPE’s accuracy is not free — it comes from how many phase (ancilla) qubits you spend, and this notebook makes that trade-off concrete rather than asymptotic: chemical accuracy (&lt;0.01 Ha error) is first reached at 6 phase qubits and 4494 CX gates, and error keeps shrinking roughly exponentially all the way to 14 phase qubits (10537 CX gates, error \\approx 8\\times10^{-6} Ha) — precision bought directly with circuit depth, exactly as Quantum Phase Estimation (QPE)‘s O(1/\\varepsilon) scaling predicts, just now with real numbers attached.\nWhy the initial state matters in practice, not just in theory\nQPE only measures out an eigenvalue E_i with probability |\\gamma_i|^2, where \\gamma_i is the initial state’s overlap with eigenstate |E_i\\rangle — so a poorly chosen initial state can make the ground-state energy vanishingly unlikely to ever be measured. This experiment tests that directly: preparing the ancilla-target register in the Hartree-Fock state (the standard classical mean-field guess for the electron configuration) gives 99.376% amplitude overlap with the true ground state (98.76% measurement probability), while random initial states essentially never win — 0 out of 20 trials in the experiment beat Hartree-Fock. A uniform-superposition or all-zero initial state fares no better than random. The lesson: QPE’s promise of “measure out the ground energy” is conditional on supplying it a state that already has substantial overlap with the answer — a good classical initial guess isn’t a nicety, it’s what makes the whole run worth attempting.\nRelated\n\nQuantum Phase Estimation (QPE) — the general circuit and derivation this is a worked instance of\nHamiltonians and Encoding for Quantum Circuits — the Jordan-Wigner mapping mechanics used to build the 4-qubit Hamiltonian here\nThe Ground-State Problem\nSample-Based Quantum Diagonalization (SQD) — a contrasting near-term approach to chemistry: SQD leans on classical sampling and post-processing instead of a deep fault-tolerant-flavored QPE circuit like this one\n\nSelf-Check\n\nWhy does the Hartree-Fock initial state win almost every trial against a random initial state, when both are just guesses at the ground state?\nIf you wanted chemical accuracy (&lt;0.01 Ha) on this H₂ example, roughly how many phase qubits and CX gates would you need to budget for?\nWhat would happen to the measured energy distribution if you ran this experiment starting from an eigenstate orthogonal to the true ground state?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/quantum-krylov-methods",
    "filePath": "Quantum Algorithms/Quantum Krylov Methods.md",
    "title": "Quantum Krylov Methods",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/math",
      "quantum-algorithms/quantum-phase-estimation-(qpe)",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "quantum-algorithms/trotterization",
      "error-mitigation/estimatoroptions-and-the-five-mitigation-knobs",
      "quantum-algorithms/the-ground-state-problem"
    ],
    "tags": [
      "qc/algorithms",
      "qc/math"
    ],
    "content": "Quantum Krylov Methods\nqc/algorithms qc/math\nFramed as a happy medium between QPE (deep, precise, needs fault tolerance) and VQE (shallow, near-term, but a hard classical optimization with no convergence guarantee). Key insight: the quantum computer only collects short-time data; the actual spectral estimation (extracting eigenvalues) happens classically, unlike QPE where the phase is extracted coherently on the QPU itself.\nStatistical phase estimation\nCollect a timeseries x_k = \\langle\\psi_0|U^k|\\psi_0\\rangle via a Hadamard-test circuit for increasing k. Interpreted as a signal, its frequencies are H‘s eigenvalues and its weights are |\\gamma_i|^2 — recoverable classically (e.g. via a Fourier transform), without ever running a coherent phase-estimation circuit. One concrete method: Observable Dynamic Mode Decomposition (ODMD) — solve X&#039; = AX (shifted vs. unshifted data matrices) by least squares, then diagonalize A classically.\nQuantum Krylov construction\nBuild the Krylov subspace \\{|\\psi_0\\rangle, U|\\psi_0\\rangle, U^2|\\psi_0\\rangle, \\dots, U^{d-1}|\\psi_0\\rangle\\} from repeated applications of U=e^{-iH\\Delta t} (see Trotterization). Measure the overlap matrix S_{jk}=\\langle\\psi_j|\\psi_k\\rangle and the projected Hamiltonian matrix in this basis, then solve the generalized eigenvalue problem:\nHv = \\lambda S v\nThe lowest \\lambda approximates the ground-state energy. This converges exponentially fast in the Krylov dimension d — a small d often suffices — and has favorable noise properties compared to deep coherent circuits, since each individual circuit stays comparatively shallow.\nWhy this matters for the rest of this vault\nA real IBM+University of Tokyo experiment ran quantum Krylov on a 5-particle Heisenberg model across 44 qubits — roughly 10× the scale of prior quantum-Krylov demonstrations — and explicitly used PEA and ZNE error mitigation to get there. This is a direct, real-world payoff of the Error Mitigation section: Krylov methods are exactly the kind of near-term algorithm those mitigation techniques exist to make practical at scale.\nRelated\n\nThe Ground-State Problem\nQuantum Phase Estimation (QPE)\nVariational Quantum Eigensolver (VQE)\nEstimatorOptions and the Five Mitigation Knobs — the mitigation techniques the 44-qubit demonstration actually used\n\nSelf-Check\n\nWhy is Krylov described as a “happy medium” between QPE and VQE — what does it take from each?\nWhat’s the key structural difference between how QPE extracts a phase and how statistical phase estimation does?\nWhy does exponential convergence in Krylov dimension d matter practically — what would linear convergence have meant instead?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/quantum-phase-estimation-(qpe)",
    "filePath": "Quantum Algorithms/Quantum Phase Estimation (QPE).md",
    "title": "Quantum Phase Estimation (QPE)",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/gates",
      "quantum-algorithms/trotterization",
      "why-quantum-computing-matters/deutsch's-algorithm",
      "quantum-algorithms/the-quantum-fourier-transform",
      "error-mitigation/error-correction-(ec)",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "quantum-algorithms/quantum-krylov-methods",
      "quantum-algorithms/the-ground-state-problem",
      "quantum-algorithms/quantum-chemistry-—-qpe-on-h2-(worked-example)"
    ],
    "tags": [
      "qc/algorithms",
      "qc/gates"
    ],
    "content": "Quantum Phase Estimation (QPE)\nqc/algorithms qc/gates\nGiven a state |\\psi_0\\rangle = \\sum_i \\gamma_i|E_i\\rangle decomposed in H‘s eigenbasis, QPE measures out an eigenvalue E_i with probability |\\gamma_i|^2 — in particular, E_0 (the ground-state energy) whenever |\\psi_0\\rangle has overlap with the true ground state. It’s called “phase estimation” because it extracts E_i from the phase accumulated by U=e^{-iH\\Delta t} (see Trotterization for how to actually build U).\nCircuit (3-bit example)\n\nApply H (Hadamard) to each of 3 ancilla qubits, preparing an equal superposition.\nApply controlled-U, controlled-U^2, controlled-U^4 from each ancilla onto the |\\psi_0\\rangle register — each ancilla controls a different power of U, writing binary digits of the phase into the ancilla register via phase kickback.\nApply the inverse Quantum Fourier Transform (QFT^\\dagger) to the ancilla register — see The Quantum Fourier Transform for the full circuit derivation.\nMeasure the ancillas — the result is a 3-bit binary approximation of an energy eigenvalue, sampled with probability |\\gamma_i|^2.\n\nQPE is the QFT’s one genuinely load-bearing use case: it never loads classical data into amplitude form and its output (an eigenvalue) is exactly the kind of peaked distribution the QFT reads out cheaply — see The Quantum Fourier Transform for why that combination matters.\nWorked example — spin precession\nA single qubit under R_z(\\pi/2) has eigenphase \\varphi=1/8 (since R_z(\\theta) contributes phase \\theta/2\\pi per application). Running QPE with enough ancilla/phase qubits to represent 1/8=0.001 in binary recovers \\varphi exactly; with fewer ancillas, the estimate rounds to the nearest representable binary fraction — a concrete illustration of why circuit depth (ancilla count) trades directly against estimation accuracy \\varepsilon.\nPros and cons\nPros: high accuracy, asymptotically optimal query complexity, the natural target algorithm for future fault-tolerant hardware (see Error Correction (EC)).\nCons: needs circuit depth O(1/\\varepsilon) for error \\varepsilon — deep circuits with today’s noise levels — and the controlled time-evolutions are nonlocal, adding significant overhead even for small problems. This is exactly why Variational Quantum Eigensolver (VQE) and Quantum Krylov Methods exist as near-term alternatives.\nRelated\n\nThe Ground-State Problem\nTrotterization — how U is actually implemented\nThe Quantum Fourier Transform — the circuit this note’s step 3 uses, now derived in full\nVariational Quantum Eigensolver (VQE)\nQuantum Krylov Methods\nQuantum Chemistry — QPE on H2 (Worked Example) — this circuit run end-to-end on a real molecule, with concrete accuracy-vs-circuit-cost numbers\n\nSelf-Check\n\nWhy is QPE called “phase estimation” — what phase, and where does it come from?\nWhy does deeper circuit depth trade directly against QPE’s accuracy \\varepsilon?\nWhy is QPE considered better suited to future fault-tolerant hardware than to today’s noisy devices?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)",
    "filePath": "Quantum Algorithms/Sample-Based Quantum Diagonalization (SQD).md",
    "title": "Sample-Based Quantum Diagonalization (SQD)",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/workflow",
      "quantum-algorithms/the-ground-state-problem",
      "quantum-algorithms/hamiltonians-and-encoding-for-quantum-circuits",
      "quantum-algorithms/the-lucj-ansatz",
      "quantum-algorithms/skqd-and-sqdrift",
      "quantum-+-hpc/hybrid-workflow-patterns-—-vqe-and-sqd-at-hpc-scale",
      "quantum-algorithms/sqd-on-n₂-(worked-example)"
    ],
    "tags": [
      "qc/algorithms",
      "qc/workflow"
    ],
    "content": "Sample-Based Quantum Diagonalization (SQD)\nqc/algorithms qc/workflow\nA near-term, research-level approach to The Ground-State Problem for quantum chemistry: the ground-state energy is the extremal eigenvalue of a Hamiltonian H_{x,x&#039;} living in a 2^N-dimensional space — exponentially large and exponentially sparse — but in practice the true eigenvector’s amplitudes have only polynomial support (only a small number of electron configurations actually matter). SQD exploits this: use a quantum circuit to find which configurations matter, then diagonalize classically in just that subspace.\nMechanics\nA quantum circuit prepares |\\psi\\rangle; sampling it gives bitstrings \\mathbf{x} with probability P(\\mathbf{x})=|\\langle\\mathbf{x}|\\psi_{QC}\\rangle|^2. Each bitstring parametrizes a Slater determinant (e.g. 110101 = a specific electron-orbital occupation pattern — this is exactly the fermion encoding from Hamiltonians and Encoding for Quantum Circuits). Writing |\\psi\\rangle=\\sum_{x\\in\\chi}c_x|x\\rangle over the sampled set \\chi, solving\n\\sum_{x\\in\\chi}\\langle y|H|x\\rangle\\, c_x = E_0\\, c_y\nmeans building H restricted to the sampled subspace \\chi and diagonalizing it classically (CPU), after the sampling itself happened on the QPU. The quantum computer’s only job is proposing which basis states are worth including — the actual linear algebra is classical.\nSelf-consistent configuration recovery\nReal samples are noisy — some sampled bitstrings violate particle-number conservation, which is physically impossible for the true ground state. Key insight: rather than discarding noisy samples, compute the average per-orbital occupancy n_{p\\sigma}=\\langle\\psi|\\hat n_{p\\sigma}|\\psi\\rangle from the whole sample set, then probabilistically flip bits in noisy samples (weighted by how far each bit is from the average occupancy and a target filling factor) to restore valid particle number. Recompute occupancies from the corrected samples, iterate — this squeezes real signal out of a noisy QPU rather than throwing noisy shots away.\nFull loop: Sample (QPU) → postselect + recover configurations (CPU, using occupancies) → project + diagonalize + update occupancies → repeat.\nConcretely, the flip-probability weighting is W_{0\\to1}(\\text{occ}) = e^{\\text{occ}} - 1 for filling an empty orbital (0 at occupancy 0, e-1\\approx1.718 at occupancy 1 — never fill an orbital that’s usually empty, strongly prefer filling one that’s usually occupied) and its mirror W_{1\\to0}(\\text{occ})=W_{0\\to1}(1-\\text{occ}) for emptying an occupied one. The very first iteration has no measured occupancy yet, so it bootstraps from the Hartree-Fock occupancy (the cheap classical mean-field guess — orbitals filled from lowest energy up) as the initial prior, then replaces it with the diagonalizer’s own output occupancy each subsequent iteration.\nReference-subspace augmentation\nA useful diagnostic and quality boost: build a purely classical baseline subspace by brute-force enumerating the lowest-excitation-rank Slater determinants around the Hartree-Fock reference (no chemical insight, just systematic enumeration) and diagonalizing in that fixed set alone. This typically beats pure-sampling SQD, since hardware noise can suppress chemically important near-HF configurations that a classical enumeration would never drop. Pinning the best of these classical reference determinants as a guaranteed floor in the subspace — while still letting quantum samples fill the remaining slots each iteration — typically both lowers the energy further and tightens the run-to-run variance. If this reference-augmented result beats the classical-reference-only baseline, that’s a concrete, falsifiable instance of quantum utility: the quantum sampling contributed configurations no brute-force classical enumeration found on its own.\nExtension: excited states\nThe same sampled subspace can be reused for excited states via quantum subspace expansion: build |e_i\\rangle=\\hat e_i^\\dagger|\\psi_0\\rangle for excitation operators \\hat e_i^\\dagger (single/double excitations), then solve the generalized eigenvalue problem \\langle e_j|H|e_i\\rangle c_i^n = E_n\\langle e_j|e_i\\rangle c_i^n within the same sampled bitstring basis \\chi — no new quantum sampling needed.\nReal-world scale\nN₂ bond-breaking curves matching classical HCI references better than RHF/CISD/CCSD across the whole curve; a Fe₄S₄ cluster calculation at 77 qubits approaching CCSD-level accuracy as the subspace dimension grows to 10^8. Qiskit addon: qiskit-addon-sqd — tutorials for chemistry Hamiltonians and fermionic lattice models.\nRelated\n\nThe Ground-State Problem\nHamiltonians and Encoding for Quantum Circuits — the Slater-determinant/fermion encoding this relies on\nThe LUCJ Ansatz — the circuit that prepares |\\psi\\rangle for SQD\nSKQD and SqDRIFT\nHybrid Workflow Patterns — VQE and SQD at HPC Scale — what HPC does around this loop\nSQD on N₂ (Worked Example) — a full end-to-end run of this loop, including the concrete recovery weight function and reference-subspace augmentation described above\n\nSelf-Check\n\nWhy does SQD only need the quantum computer to sample, not to compute the final energy?\nCould you explain what self-consistent configuration recovery fixes, and why average occupancy is the right signal to use?\nWhy does polynomial (not exponential) support in the true ground state make this whole approach tractable?\nWhy does beating a classical brute-force reference subspace count as “quantum utility” when beating Hartree-Fock alone does not?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/skqd-and-sqdrift",
    "filePath": "Quantum Algorithms/SKQD and SqDRIFT.md",
    "title": "SKQD and SqDRIFT",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/math",
      "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)",
      "quantum-algorithms/quantum-krylov-methods",
      "quantum-algorithms/trotterization",
      "quantum-algorithms/the-lucj-ansatz"
    ],
    "tags": [
      "qc/algorithms",
      "qc/math"
    ],
    "content": "SKQD and SqDRIFT\nqc/algorithms qc/math\nTwo variants of SQD that add a provable convergence guarantee — a step up from SQD’s more heuristic self-consistent recovery.\nSKQD — Statistical/Sample-based Krylov Quantum Diagonalization\nCombines the sampling idea from SQD with the Krylov subspace construction: samples bitstrings from time-evolution circuits e^{-ik\\epsilon\\hat H} at increasing depths k=1,2,\\dots,T applied to a reference state, building up a Krylov-like sampled subspace instead of a single fixed circuit’s output. Convergence is provable given three conditions all hold at only polynomial (not exponential) smallness in system size n:\n\nThe reference state’s overlap with the true ground state is 1/\\text{poly}(n).\nThe spectral gap is 1/\\text{poly}(n).\nThe ground state is approximately sparse.\n\nNot suitable for fully ab-initio chemistry (it needs a lattice/model Hamiltonian with well-defined hopping terms) — but a natural fit for lattice/impurity models, e.g. the Anderson impurity model H=H_\\text{bath}+H_\\text{imp.}+H_\\text{hyb.} used in dynamical mean-field theory (DMFT) workflows, where SKQD results have matched DMRG closely across multiple interaction strengths. Reference: arXiv:2501.09702.\nSqDRIFT — randomized time evolution\nA qDRIFT-style approach: decompose H=\\sum_k \\hat h_k into individual terms, randomly sample a sequence of terms weighted by |h_k|, and apply the sampled sequence as a product of small time-evolution exponentials \\prod\\exp(-i\\Delta t\\,\\hat h_k) — convergent, and hardware-friendly since it never needs a full Trotterization of the entire Hamiltonian at once. Reference: arXiv:2508.02578.\nSparsity is basis-dependent\nKey insight: whether a ground state is “approximately sparse” — the assumption SKQD’s convergence proof leans on — depends on your choice of basis, not just the physics. Fermionic Gaussian unitaries (orbital rotations) can be applied efficiently classically to rotate into a basis (e.g. natural orbitals) where sparsity is much better, which is exactly why basis choice is a real, practical lever for these methods, not just a mathematical footnote.\nReal-world scale\nN₂ at 58 qubits, Fe₄S₄ at 77 qubits, a 100-qubit SqDRIFT run computing a Dyson-orbital correlation energy (Science, 2026), and a coronene active-space calculation (24 electrons/24 orbitals) benchmarked against HCI, CCSD, and FCIQMC classical methods.\nRelated\n\nSample-Based Quantum Diagonalization (SQD)\nThe LUCJ Ansatz\nQuantum Krylov Methods — the Krylov idea SKQD borrows\nTrotterization — the time-evolution machinery SqDRIFT randomizes over\n\nSelf-Check\n\nWhat does SKQD add on top of plain SQD, and why does that matter?\nCould you name the three conditions SKQD’s convergence proof depends on, and explain why “polynomial, not exponential” smallness matters for each?\nWhy is sparsity “basis-dependent,” and what practical lever does that give you?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/sqd-on-n₂-(worked-example)",
    "filePath": "Quantum Algorithms/SQD on N₂ (Worked Example).md",
    "title": "SQD on N₂ (Worked Example)",
    "links": [
      "tags/qc/algorithms",
      "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)",
      "quantum-algorithms/the-lucj-ansatz",
      "quantum-algorithms/quantum-chemistry-—-qpe-on-h2-(worked-example)",
      "why-quantum-computing-matters/quantum-utility-vs-quantum-advantage",
      "quantum-algorithms/the-ground-state-problem"
    ],
    "tags": [
      "qc/algorithms"
    ],
    "content": "SQD on N₂ (Worked Example)\nqc/algorithms\nA concrete, end-to-end run of Sample-Based Quantum Diagonalization (SQD) on molecular nitrogen (N₂), stretched to 2.0 Å (roughly double its ~1.1 Å equilibrium bond length, chosen because a stretched bond has stronger electron correlation and a bigger gap between the cheap Hartree-Fock guess and the true ground state). The pipeline: PySCF builds the molecule in a cc-pvdz basis (28 spatial orbitals total), freezes the 2 inert core orbitals, and leaves an active space of 26 orbitals with 5 electrons per spin — a Hilbert space of \\binom{26}{5}=65{,}780 configurations per spin sector, over 4 billion states total, far beyond brute-force diagonalization. Key insight: the lab makes “quantum utility” a measurable, falsifiable claim rather than a slogan — it defines a purely classical brute-force baseline, then shows the quantum-sampled subspace beats it once augmented, which is the actual empirical bar for “the quantum computer contributed something classical enumeration alone could not.”\nState preparation and hardware mapping\nThe LUCJ ansatz circuit is built from CCSD amplitudes (ffsim.UCJOpSpinBalanced.from_t_amplitudes) and prepared via Jordan-Wigner encoding on 2\\times26=52 qubits (26 for spin-α, 26 for spin-β). The same circuit is mapped to two different IBM device topologies to compare hardware connectivity, directly answering the “which topology fits this circuit better” question:\n\nHeron (ibm_kingston): the α and β qubit chains only touch at every 4th site — only 5 hardware-native α–β crossing pairs are available ([(p, p) for p in range(0, 26, 4)], truncated to 5).\nNighthawk (ibm_miami): the α and β rails sit adjacent to each other, so up to 24 α–β pairs can be made hardware-native — far denser cross-spin connectivity than Heron, at the cost of needing a custom initial_layout that keeps each same-spin chain connected and keeps α–β pairs close.\n\nSampling and configuration recovery\n2,000 shots are drawn from the mapped circuit; each shot is a 52-bit string splitting into an α-half and β-half, one proposed electron configuration. On real hardware, it’s normal for zero of the 2,000 raw shots to have the correct particle number (5 electrons per spin) — bit-flip noise reliably pushes samples out of the physical sector. Configuration recovery repairs this using the concrete weight function W_{0\\to1}(\\text{occ}) = e^{\\text{occ}} - 1 (favor filling orbitals that are usually occupied) and its mirror W_{1\\to0}(\\text{occ})=W_{0\\to1}(1-\\text{occ}), seeded from the Hartree-Fock occupancy prior and refined each iteration using the diagonalizer’s own orbital-occupancy output.\nThe self-consistent loop and the reference-subspace result\nThe full loop (recover → subsample into batches → build a Slater-determinant subspace via qiskit_addon_sqd.fermion.solve_sci_batch → diagonalize → feed occupancies back) runs for several iterations, tracking the best (lowest) energy seen. On its own, this typically lands below Hartree-Fock but above CCSD — proof the quantum samples carry real signal, but not yet chemistry-grade. The lab then builds a purely classical baseline: enumerate the 300 lowest-excitation-rank Slater determinants around the Hartree-Fock reference (brute-force, no chemical insight, via itertools.combinations) and diagonalize in that fixed set alone. This classical reference subspace typically beats pure-sampling SQD — proof that hardware noise is dropping chemically important near-HF configurations that a systematic classical enumeration would keep. The final step pins the 100 best classical reference determinants as a guaranteed floor and lets quantum sampling fill the remaining subspace slots each iteration. If this reference-augmented SQD result beats the classical-only reference subspace, that is quantum utility demonstrated empirically: the quantum device contributed configurations that brute-force classical enumeration could not find on its own, and that contribution measurably lowered the energy (and typically tightens the run-to-run variance too, since the pinned floor stabilizes every batch).\nRelated\n\nSample-Based Quantum Diagonalization (SQD) — the general method this is a worked instance of\nThe LUCJ Ansatz — the state-preparation circuit used here, including the CCSD-seeded orbital rotations\nQuantum Chemistry — QPE on H2 (Worked Example) — the QPE-flavored worked example on a much smaller molecule; contrast the fault-tolerant-style precision-vs-depth tradeoff there with SQD’s noisy near-term sampling-plus-classical-cleanup approach here\nQuantum Utility vs Quantum Advantage — the general framing of what “quantum utility” means; this note is a concrete instance of it\nThe Ground-State Problem\n\nSelf-Check\n\nWhy is it unsurprising (not a bug) that zero of the 2,000 raw hardware shots have the correct particle number before configuration recovery?\nWhat exactly does it mean for reference-augmented SQD to beat the classical reference subspace, and why is that the specific bar for “quantum utility” rather than just “SQD beat Hartree-Fock”?\nWhy would the Nighthawk topology allow far more native α–β interaction pairs than Heron, and what does that cost in the initial-layout design?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/the-full-pipeline-of-a-quantum-solver",
    "filePath": "Quantum Algorithms/The Full Pipeline of a Quantum Solver.md",
    "title": "The Full Pipeline of a Quantum Solver",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/moc",
      "quantum-algorithms/qaoa-—-quantum-approximate-optimization-algorithm",
      "quantum-algorithms/hamiltonians-and-encoding-for-quantum-circuits",
      "quantum-algorithms/quantum-phase-estimation-(qpe)",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "hardware-reality/transpilation",
      "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)",
      "why-quantum-computing-matters/the-quantum-algorithm-zoo",
      "hardware-reality/transpiling-qaoa-circuits-—-swap-strategies-and-sat-mapping"
    ],
    "tags": [
      "qc/algorithms",
      "qc/moc"
    ],
    "content": "The Full Pipeline of a Quantum Solver\nqc/algorithms qc/moc\nEvery quantum algorithm you meet in this vault is really one stage of a five-stage pipeline: target problem → encoding → algorithm → hardware → post-processing. Key insight: most of the “quantum” part (stage 3) is reused across wildly different problems — QAOA, Shor’s, and VQE are all just different choices at stage 3 — while stages 1, 2, 4, and 5 are where a real-world problem actually gets bent into and out of that shared quantum core.\nThe five stages\n\nTarget problem — what you actually want to solve: Combinatorial Optimization (MaxCut, MIS, portfolios, scheduling), Cryptography (RSA, elliptic curves), Chemistry/materials (molecular ground states, reactions).\nEncoding — rewriting the problem as qubits: QUBO → Ising via x_i=(1-Z_i)/2 for optimization (see QAOA — Quantum Approximate Optimization Algorithm), binary/decimal → qubit for numeric problems, fermion → qubit (Jordan-Wigner, Bravyi-Kitaev, or a more compact encoding) for chemistry — see Hamiltonians and Encoding for Quantum Circuits for the full mapping toolkit.\nAlgorithm — the quantum core itself: adiabatic/counter-diabatic evolution (e.g. QAOA), QFT-based (e.g. QPE, Shor’s), or variational (e.g. VQE, ADAPT-VQE).\nHardware — making the abstract circuit survive real qubits: circuit compilation for a specific connectivity (see Transpilation), gate optimization for the device’s native gate set, and error correction/mitigation — either full error correction (surface codes, LDPC, bicycle-bivariate codes) for the fault-tolerant future, or mitigation techniques (ZNE, PEC, dynamical decoupling) that suffice today.\nPost-processing — turning raw quantum output back into an answer: computing observables \\langle\\psi|H|\\psi\\rangle, repairing constraint violations specific to the target problem (e.g. bit-flip correction using problem structure), or decoding (for error-correction-flavored algorithms).\n\nWhy this framing matters\nThe same five slots recur whether the target problem is combinatorial optimization, chemistry, or (eventually) cryptography — only the specific choice made at each stage changes. Seeing SQD and QAOA as two different fillings of the same five slots, rather than as unrelated algorithms, is what makes the “algorithm zoo” navigable — see The Quantum Algorithm Zoo for how the stage-3 choices themselves cluster by mathematical origin (physics-, math-, or CS-inspired).\nRelated\n\nHamiltonians and Encoding for Quantum Circuits — stage 2 in full depth\nQAOA — Quantum Approximate Optimization Algorithm, Variational Quantum Eigensolver (VQE), Quantum Phase Estimation (QPE) — stage 3 choices\nTranspilation — stage 4, hardware compilation\nTranspiling QAOA Circuits — SWAP Strategies and SAT Mapping — a concrete, optimized version of stage 4 for QAOA specifically\nThe Quantum Algorithm Zoo — how stage-3 algorithm choices group by inspiration and what hardware pressure (mitigation vs. full error correction) they each need\n\nSelf-Check\n\nWithout naming any specific algorithm, what are the five stages every quantum solver pipeline goes through?\nWhy does it help to see QAOA and SQD as different fillings of the same five-stage template rather than as unrelated algorithms?\nWhich stage does error mitigation belong to, and why does that stage currently have two very different long-term vs. short-term answers?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/the-ground-state-problem",
    "filePath": "Quantum Algorithms/The Ground-State Problem.md",
    "title": "The Ground-State Problem",
    "links": [
      "tags/qc/algorithms",
      "quantum-algorithms/hamiltonian-simulation-—-why-it's-hard",
      "quantum-algorithms/quantum-phase-estimation-(qpe)",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "quantum-algorithms/quantum-krylov-methods"
    ],
    "tags": [
      "qc/algorithms"
    ],
    "content": "The Ground-State Problem\nqc/algorithms\nFind the lowest eigenvalue (the ground-state energy) and its eigenvector (the ground state) of a Hamiltonian H — one of the most broadly important computational problems in physics and chemistry: reaction energies, material properties, and binding energies all reduce to some version of this.\nWhy it’s hard, both ways\nClassically: representing an arbitrary quantum state at all is exponentially expensive (see Hamiltonian Simulation — Why It’s Hard), and searching the full 2^n-dimensional Hilbert space for the minimum-energy direction is intractable without approximation.\nQuantumly, it’s still hard: a quantum computer doesn’t remove the need to search Hilbert space efficiently — you still need an algorithm that converges toward the ground state in reasonable time, not just a device that can represent one.\nThe assumptions every practical algorithm leans on\n\nA good initial guess state — some overlap with the true ground state to start from, rather than starting blind.\nA gapped adiabatic path — a way to deform a simple, known ground state into the target ground state without crossing a near-degenerate energy level.\nBounded correlation length — the ground state isn’t arbitrarily long-range entangled.\n\nKey insight: these assumptions are exactly what separates the three approaches this section covers — Quantum Phase Estimation (QPE), Variational Quantum Eigensolver (VQE), and Quantum Krylov Methods — each leans on a different subset of them, and trades circuit depth against how good an initial guess you need.\nRelated\n\nHamiltonian Simulation — Why It’s Hard\nQuantum Phase Estimation (QPE)\nVariational Quantum Eigensolver (VQE)\nQuantum Krylov Methods\n\nSelf-Check\n\nWhy is finding a ground state still hard on a quantum computer, even though representing the state itself is easy?\nCould you name the three typical assumptions ground-state algorithms rely on?\nWhy might a “gapped adiabatic path” assumption fail for a real physical system?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/the-lucj-ansatz",
    "filePath": "Quantum Algorithms/The LUCJ Ansatz.md",
    "title": "The LUCJ Ansatz",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/gates",
      "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)",
      "quantum-algorithms/hamiltonians-and-encoding-for-quantum-circuits",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "quantum-algorithms/sqd-on-n₂-(worked-example)"
    ],
    "tags": [
      "qc/algorithms",
      "qc/gates"
    ],
    "content": "The LUCJ Ansatz\nqc/algorithms qc/gates\nThe circuit that prepares |\\psi\\rangle for SQD — Local Unitary Cluster Jastrow, a chemistry-motivated ansatz built specifically to be both physically meaningful and hardware-friendly.\nFrom UCCSD to a hardware-native circuit\nStart from Unitary Coupled-Cluster Singles and Doubles (UCCSD), the standard quantum-chemistry ansatz:\n|\\Psi\\rangle = e^{T-T^\\dagger}|\\Phi_0\\rangle, \\qquad T = \\sum_{ai}t_i^a\\hat c_a^\\dagger\\hat c_i + \\sum_{abij}t_{ij}^{ab}\\hat c_a^\\dagger\\hat c_b^\\dagger\\hat c_j\\hat c_i\n(single and double fermionic excitation operators — see Hamiltonians and Encoding for Quantum Circuits for the underlying fermion encoding). This is accurate but expensive to implement directly. Jastrow-factorizing it gives an equivalent-in-spirit but circuit-friendlier form:\nT - T^\\dagger \\simeq \\sum_\\mu e^{-K_\\mu}\\,iJ_\\mu\\,e^{K_\\mu}\nwhere K_\\mu is an orbital rotation generator and J_\\mu is a density-density Jastrow term (\\sum J^{\\sigma\\tau}_{pr}\\hat n_{p\\sigma}\\hat n_{r\\tau}). LUCJ keeps this structure directly:\n|\\Psi\\rangle \\simeq \\prod_\\mu e^{-K_\\mu}\\,e^{iJ_\\mu}\\,e^{K_\\mu}\\,|\\Phi_0\\rangle\n— a product of orbital-rotation → Jastrow → inverse-orbital-rotation layers, each implementable as a specific hardware-native gate block.\nThe tradeoff it resolves\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nHardware-efficient ansätzePhysically-motivated ansätze (e.g. plain UCCSD)Compatible with real device gates/connectivity/depthYesNo — needs all-to-all connectivity, high depthEasy to initialize/optimizeNo — arbitrary parameters, no physical starting pointYes — parameters come from classical calculations\nKey insight: LUCJ is designed to get both — physical motivation (parameters derived from classical coupled-cluster theory, so optimization starts from a sensible point) and hardware compatibility (the gate sequence respects a specific device’s native connectivity).\nReal-world evidence\nLUCJ circuits are believed hard to classically simulate, have outperformed their classical coupled-cluster counterpart on real benchmarks, and are compatible with real hardware execution — demonstrated on an N₂ bond-breaking curve (matching HCI reference energies better than RHF/CISD/CCSD) and a 77-qubit Fe₄S₄ cluster calculation. Reference: Motta, Sung, Whaley, Head-Gordon, Shee, Chem. Sci. 14, 40, 11213–11227 (2023).\nConcrete circuit construction (ffsim)\nIn practice, one LUCJ layer \\mu is built from two ingredients with a slightly different but equivalent notation to the derivation above:\nU_\\mu = e^{i\\hat K_\\mu}\\; e^{i\\sum_{p&lt;q} J^{(\\mu)}_{pq}\\,\\hat n_p \\hat n_q}\\; e^{-i\\hat K_\\mu}\n— an orbital rotation e^{i\\hat K} (a one-body unitary that mixes molecular orbitals, i.e. “rearranges the seats”) composed with a Jastrow factor e^{i\\sum_{pq} J_{pq}\\hat n_p\\hat n_q} (a diagonal term that penalizes or rewards pairs of orbitals being simultaneously occupied), where \\hat n_p=a_p^\\dagger a_p is the occupation-number operator. ffsim.UCJOpSpinBalanced.from_t_amplitudes(t1, t2, n_reps, interaction_pairs) takes classically-computed CCSD amplitudes — t_1[i,a] (single-electron jump amplitudes) and t_2[i,j,a,b] (electron-pair scattering amplitudes) — and compiles them directly into the rotation angles K_\\mu and Jastrow couplings J_{pq}^{(\\mu)}. This is the literal mechanism behind “parameters come from classical calculations” in the tradeoff table above: CCSD is not used as the final answer, just mined for its amplitudes as a high-quality parameter seed. “Spin-balanced” means the α and β sectors share the same orbital-rotation parameters, appropriate for closed-shell molecules like N₂ where both spin sectors are chemically identical.\nEncoding onto qubits uses Jordan-Wigner: orbital p occupied ⟺ qubit p=|1\\rangle, empty ⟺ |0\\rangle, with the qubit register split into a first block for spin-α orbitals and a second block for spin-β orbitals (PrepareHartreeFockJW sets the initial Hartree-Fock occupation pattern; UCJOpSpinBalancedJW applies the correlator in this qubit basis).\nHardware topology shapes the circuit, not just the ansatz math\nThe Jastrow term’s \\hat n_p\\hat n_q couplings need physical qubit adjacency between orbital p and orbital q for the corresponding gate to be hardware-native — so which interaction_pairs are cheap to implement depends entirely on the target device’s connectivity graph, not on the chemistry. Two IBM topologies illustrate this concretely:\n\nHeron (ibm_kingston): the α and β qubit chains only touch at every 4th site — only 5 α–β crossing pairs are hardware-native.\nNighthawk (ibm_miami): the α and β rails run adjacent to each other, so up to 24 α–β pairs can be made hardware-native — far denser cross-spin connectivity, at the cost of a harder initial_layout design problem (each same-spin chain must trace a connected path through the device graph and stay close to its α–β partners, occasionally requiring a few parallel swaps).\n\nThis is a concrete answer to “how does LUCJ perform on heavy-hex vs. a different connectivity graph”: more native cross-spin connectivity (Nighthawk) means fewer or shallower SWAP insertions are needed to realize the same Jastrow couplings, directly reducing two-qubit gate count for the identical ansatz.\nRelated\n\nSample-Based Quantum Diagonalization (SQD)\nHamiltonians and Encoding for Quantum Circuits\nVariational Quantum Eigensolver (VQE) — another parameterized-ansatz approach, different tradeoff\nSQD on N₂ (Worked Example) — the Heron-vs-Nighthawk mapping exercise and CCSD-seeded circuit construction described above, in full worked-example context\n\nSelf-Check\n\nWhy does Jastrow-factorizing UCCSD make it more hardware-friendly?\nCould you explain the hardware-efficient vs. physically-motivated tradeoff, and how LUCJ tries to get both?\nWhy does starting optimization from classically-derived parameters matter in practice?\nWhy does the number of hardware-native α–β interaction pairs depend on the device topology rather than on the molecule being simulated?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/the-partition-problem-—-qaoa-worked-example",
    "filePath": "Quantum Algorithms/The Partition Problem — QAOA Worked Example.md",
    "title": "The Partition Problem — QAOA Worked Example",
    "links": [
      "tags/qc/algorithms",
      "quantum-algorithms/qaoa-—-quantum-approximate-optimization-algorithm",
      "why-quantum-computing-matters/the-quantum-algorithm-zoo",
      "quantum-algorithms/pauli-correlation-encoding-(pce)",
      "hardware-reality/transpiling-qaoa-circuits-—-swap-strategies-and-sat-mapping",
      "quantum-algorithms/quantum-chemistry-—-qpe-on-h2-(worked-example)"
    ],
    "tags": [
      "qc/algorithms"
    ],
    "content": "The Partition Problem — QAOA Worked Example\nqc/algorithms\nA concrete, end-to-end derivation of QAOA applied to the partition problem: given a set of numbers, split them into two groups whose sums are as close as possible. It’s NP-hard classically (verifying a candidate split is trivial — sum both sides — but finding one requires checking 2^n splits in the worst case) yet easy to verify — that “easy to check, hard to find” shape is exactly what QUBO/Ising heuristics like QAOA are built to attack, but QAOA has no proven speedup over classical solvers here (see The Quantum Algorithm Zoo), so this note is a worked implementation, not a demonstration of quantum advantage. The derivation goes QUBO → Ising in three steps: encode each element with a binary variable x_i \\in \\{0,1\\} (which subset it’s in), write the imbalance cost C = \\sum_i a_i(2x_i-1), then swap to spin variables z_i \\in \\{-1,+1\\} via x_i = (1-z_i)/2 and minimize C^2 instead of |C| to avoid absolute values. Expanding C^2 and dropping the constant diagonal term (using z_i^2=1) leaves C^2 = 2\\sum_{i&lt;j} a_i a_j z_i z_j — replacing spins with Pauli-Z operators gives the cost Hamiltonian H_C = \\sum_{i&lt;j} a_i a_j Z_i Z_j, with each coupling weighted by the product of the two numbers it connects. Key insight: this is the same graph-based recipe as MaxCut — the partition problem is MaxCut on a complete graph whose edge weights are a_i a_j — which is why the implementation reaches for MaxCut tooling rather than writing a bespoke encoder.\nfrom qiskit_addon_opt_mapper.applications import Maxcut\nfrom qiskit_addon_opt_mapper.translators import to_ising\nfrom qopt_best_practices.circuit_library import annotated_qaoa_ansatz\n \n# graph: networkx.Graph with edge weights = a_i * a_j\nmaxcut = Maxcut(graph)\npartition_hamiltonian = to_ising(maxcut.to_quadratic_program())  # SparsePauliOp\ncircuit = annotated_qaoa_ansatz(partition_hamiltonian, reps=layers)\nAPI notes\n\nto_ising takes an OptimizationProblem, not a Maxcut object directly — call .to_quadratic_program() (or equivalent) on the Maxcut application first.\nannotated_qaoa_ansatz (from qopt_best_practices) produces a circuit with the QAOA cost/mixer layers annotated (boxed), which the transpiler can then unroll with UnrollBoxes() — this preserves layer structure through generate_preset_qaoa_pass_manager for SWAP-strategy-aware routing, instead of losing it to generic optimization passes.\nFor a hardware-native graph (one that already matches the backend’s coupling map after a greedy edge-coloring), SwapStrategy(cmap, ()) — an empty strategy — is valid: no SWAPs are needed because the problem graph and the hardware graph coincide after coloring.\n\nBonus: scaling to larger instances\nAt 1600 nodes, brute-force partition assignment from raw sampling accumulates bit-flip errors. A local-search refinement pass (swap_partitions) improves the best sampled bitstring by trying single-node swaps between the two partitions and keeping any swap that reduces the imbalance — cheap classical post-processing layered on top of the quantum result rather than an alternative to it. Because this refinement is itself a graph operation over thousands of edges, the notebook converts the NetworkX graph to Rustworkx first — Rustworkx is a Rust-backed graph library with the same conceptual API as NetworkX but built for exactly this kind of large-graph performance case.\nRelated\n\nQAOA — Quantum Approximate Optimization Algorithm — the algorithm this note is a worked instance of\nPauli Correlation Encoding (PCE) — the qubit-reduction technique used to scale this same partition problem from ~160 to ~1600 nodes\nTranspiling QAOA Circuits — SWAP Strategies and SAT Mapping — how the annotated ansatz here gets mapped onto real hardware connectivity\nQuantum Chemistry — QPE on H2 (Worked Example) — another worked-example note in the same style, for a different algorithm family\n\nSelf-Check\n\nWhy does minimizing C^2 avoid the need to handle an absolute value, and what step of the derivation drops the constant term that z_i^2=1 produces?\nWhy is “easy to verify, hard to find” a useful shape for a QUBO/Ising heuristic like QAOA to target, and why doesn’t NP-hardness by itself mean QAOA has any proven advantage over classical solvers here?\nWhat would go wrong if you passed a Maxcut object directly to to_ising instead of first converting it to a quadratic program?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/the-quantum-fourier-transform",
    "filePath": "Quantum Algorithms/The Quantum Fourier Transform.md",
    "title": "The Quantum Fourier Transform",
    "links": [
      "tags/qc/algorithms",
      "quantum-algorithms/quantum-phase-estimation-(qpe)",
      "foundations/z-gate-and-relative-phase",
      "quantum-algorithms/grover's-algorithm"
    ],
    "tags": [
      "qc/algorithms"
    ],
    "content": "The Quantum Fourier Transform\nqc/algorithms\nThe QFT is the classical Discrete Fourier Transform (y_k=\\frac{1}{\\sqrt N}\\sum_j x_j e^{2\\pi ijk/N}) applied to a quantum state instead of a classical array: \\sum_j x_j|j\\rangle \\to \\sum_k y_k|k\\rangle. Key insight: the QFT circuit itself is exponentially cheaper than the classical FFT — O(n^2)=O((\\log N)^2) gates versus the FFT’s O(N\\log N) — but that speedup evaporates the moment you need real classical data in or out, which is why the QFT is almost never used to “Fourier-transform a dataset” and instead shows up buried inside other algorithms like Quantum Phase Estimation (QPE).\nCircuit\nBuilt from Hadamards and controlled phase gates P_k=\\text{diag}(1,e^{2\\pi i/2^k}) — the same general phase gate already defined in Z Gate and Relative Phase, just with \\theta=2\\pi/2^k. Each qubit gets an H followed by controlled-P_k gates from every qubit below it, then a final qubit-reversal (swap) pass restores the expected bit order:\nfrom qiskit.circuit.library import QFT\nqc = QFT(num_qubits=4)   # or build by hand: H + controlled-P_k per qubit + swaps\nWhy the speedup doesn’t survive contact with real data\nLoading a classical array of N values into amplitude-encoded form (\\sum_j x_j|j\\rangle) costs at least O(N) operations — you have to touch every data point once — which already erases the QFT’s asymptotic advantage before the transform even runs. Reading the output back out is worse: extracting all y_k amplitudes needs exponentially many measurement shots unless the output distribution happens to be sharply peaked. This is exactly why Quantum Phase Estimation (QPE) exists as the QFT’s real use case — QPE never loads a classical signal; it only ever reads a phase already encoded by a quantum evolution U, and only ever needs a peaked output (the eigenvalue), so neither of the QFT’s usual failure modes applies.\nRelated\n\nQuantum Phase Estimation (QPE) — applies the inverse QFT to read out eigenvalue phases; the QFT’s one genuinely load-bearing use case\nZ Gate and Relative Phase — P_\\theta is the exact phase gate the QFT circuit is built from\nGrover’s Algorithm — the other algorithm-milestone gap this closes; unrelated mechanism, same “on hold” tier\n\nSelf-Check\n\nWhy is the QFT circuit exponentially cheaper than the classical FFT, and why doesn’t that make it useful for Fourier-transforming ordinary classical data?\nWhat are the controlled-P_k gates inside the QFT circuit, in terms of a gate already covered in Z Gate and Relative Phase?\nWhy does Quantum Phase Estimation (QPE) avoid both of the QFT’s usual bottlenecks (data loading and output readout)?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/trotterization",
    "filePath": "Quantum Algorithms/Trotterization.md",
    "title": "Trotterization",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/math",
      "error-mitigation/1d-ising-chain-and-the-mirror-trick",
      "quantum-algorithms/hamiltonians-and-encoding-for-quantum-circuits",
      "quantum-algorithms/quantum-phase-estimation-(qpe)"
    ],
    "tags": [
      "qc/algorithms",
      "qc/math"
    ],
    "content": "Trotterization\nqc/algorithms qc/math\nThe standard technique for turning e^{-iHt} into an actual circuit when H=\\sum_{j=1}^N h_j P_j is a sum of non-commuting Pauli terms — you can’t just exponentiate each term independently and multiply, because e^{-iHt} \\neq \\prod_j e^{-ih_jP_jt} unless the terms commute. Trotterization approximates the product by breaking the evolution into r small time slices.\nFirst-order Trotter\ne^{-iHt} \\approx \\left(\\prod_{j=1}^N e^{-ih_jP_jt/r}\\right)^{r}, \\qquad \\text{error } O(t^2/r)\nMore slices (r) means a better approximation, at the cost of a deeper circuit — one layer of gates per slice.\nSecond-order (symmetric) Trotter\nSplitting H into two non-commuting pieces (e.g. H_X and H_{ZZ} for a transverse-field model) and symmetrizing:\ne^{-iHt}\\approx\\left(e^{-iH_Xt/2r}\\,e^{-iH_{ZZ}t/r}\\,e^{-iH_Xt/2r}\\right)^{r}, \\qquad \\text{error } O(t^3/r^2)\nKey insight: the leading first-order error term cancels in the symmetric ordering, so second-order Trotter reaches the same accuracy with far fewer slices — better error scaling in r, at the cost of a more complex (three-part) gate sequence per slice.\nThe exact circuit family you already know\nThis is the same transverse-field Ising Hamiltonian and Trotter-step structure as 1D Ising Chain and the Mirror Trick — R_x(\\theta) layers for the transverse-field term, CZ-based layers for the ZZ interaction term, repeated per Trotter step. The two notes use it for opposite purposes: that note treats the circuit as a fixed-structure noise benchmark (append U^\\dagger, check you get back to |0\\rangle^{\\otimes n}) and never varies t or r for physics reasons. This note is about Trotterization as a simulation technique in its own right — choosing r and the order to trade circuit depth against approximation error for an actual physics question, independent of any noise-benchmarking use.\nBeyond Trotter (named, not derived here)\n\nQDRIFT — randomized Trotterization; sample which term to apply next, weighted by |h_j|, rather than a fixed deterministic order.\nTaylor expansion / quantum walk / Qubitization methods — fault-tolerant-era techniques with better asymptotic query complexity (Qubitization: O(k\\|H\\|t + \\log(1/\\varepsilon)) for sparsity k and error \\varepsilon), not used in near-term algorithms in this vault.\n\nRelated\n\nHamiltonians and Encoding for Quantum Circuits\n1D Ising Chain and the Mirror Trick — the same circuit family, used as a mitigation benchmark instead\nQuantum Phase Estimation (QPE) — the next step once you can implement e^{-iHt}\n\nSelf-Check\n\nWhy doesn’t e^{-iHt} just equal \\prod_j e^{-ih_jP_jt} when the P_j don’t commute?\nWhy does second-order Trotter need fewer slices than first-order for the same accuracy?\nWhat’s the actual difference in purpose between this note’s use of the Ising Hamiltonian and 1D Ising Chain and the Mirror Trick’s use of it, given the circuit is nearly identical?\n",
    "order": 999
  },
  {
    "slug": "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
    "filePath": "Quantum Algorithms/Variational Quantum Eigensolver (VQE).md",
    "title": "Variational Quantum Eigensolver (VQE)",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/gates",
      "quantum-algorithms/quantum-phase-estimation-(qpe)",
      "programming-a-quantum-computer/parameterized-circuits",
      "absolute-basics/measurement-and-collapse",
      "quantum-algorithms/the-ground-state-problem",
      "foundations/sparsepauliop",
      "quantum-algorithms/quantum-krylov-methods",
      "quantum-+-hpc/hybrid-workflow-patterns-—-vqe-and-sqd-at-hpc-scale",
      "quantum-advantage/the-variational-principle-as-a-trust-tool",
      "quantum-machine-learning/quantum-neural-networks-(qnn)"
    ],
    "tags": [
      "qc/algorithms",
      "qc/gates"
    ],
    "content": "Variational Quantum Eigensolver (VQE)\nqc/algorithms qc/gates\nAmong the earliest algorithms designed specifically for noisy quantum computers — the near-term counterpart to QPE’s deep, fault-tolerant-era circuits. Build a parameterized circuit |\\psi(\\vec\\theta)\\rangle, measure it against the Hamiltonian’s Pauli terms, and let a classical optimizer search for the energy-minimizing \\vec\\theta.\nThe loop\n1. Prepare |ψ(θ)⟩ on the QPU — a hardware-efficient ansatz:\n   layers of Ry/Rz single-qubit rotations + CNOT entangling gates, repeated\n2. Measure each Pauli term P_j of H = Σ h_j P_j (see [[SparsePauliOp]])\n3. Combine: E(θ) = ⟨ψ(θ)|H|ψ(θ)⟩ = Σ_j h_j ⟨ψ(θ)|P_j|ψ(θ)⟩\n4. Classical optimizer proposes new θ to reduce E(θ)\n5. Repeat from step 1 with the new θ\n\nKey insight: this is exactly the “structure once, values many times” pattern from Parameterized Circuits — the same ansatz circuit is transpiled once, then rebound with new parameter values every optimization iteration, which is what makes hundreds of iterations practical at all.\nPros and cons\nPros: works with any viable parameterized circuit (no restriction to a specific ansatz family), and classical optimization can partially compensate for coherent quantum errors by simply optimizing around them.\nCons: each energy evaluation needs many shots for adequate precision (see Measurement and Collapse); classical parameter optimization is genuinely hard and slow in practice, with no general convergence guarantee — and any assumption strong enough to guarantee convergence would typically also make the problem classically tractable, defeating the point.\nRelated\n\nThe Ground-State Problem\nParameterized Circuits — VQE is the worked example that note only namedropped\nSparsePauliOp\nQuantum Phase Estimation (QPE)\nQuantum Krylov Methods\nHybrid Workflow Patterns — VQE and SQD at HPC Scale — what HPC does around this loop\nThe Variational Principle as a Trust Tool — why this loop’s output is self-verifying\nQuantum Neural Networks (QNN) — the same circuit→measure→classical-optimizer loop, retargeted at a supervised-learning loss instead of energy minimization\n\nSelf-Check\n\nCould you walk through VQE’s five-step loop from memory?\nWhy does VQE need a classical optimizer in the loop at all, instead of computing \\theta directly?\nWhy is “no general convergence guarantee” not just a minor caveat, but a real practical problem for VQE?\n",
    "order": 999
  },
  {
    "slug": "quantum-communication/bb84-quantum-key-distribution",
    "filePath": "Quantum Communication/BB84 Quantum Key Distribution.md",
    "title": "BB84 Quantum Key Distribution",
    "links": [
      "tags/qc/crypto",
      "absolute-basics/measurement-and-collapse",
      "entangled-states/no-cloning-theorem",
      "quantum-communication/e91-—-entanglement-based-quantum-key-distribution"
    ],
    "tags": [
      "qc/crypto"
    ],
    "content": "BB84 Quantum Key Distribution\nqc/crypto\nA protocol for two parties to agree on a shared secret key by sending single qubits through a quantum channel, where any eavesdropping attempt is guaranteed to introduce a detectable error rate. Alice encodes each random bit in one of two randomly-chosen bases — computational (Z: |0\\rangle,|1\\rangle) or Hadamard (X: |+\\rangle,|-\\rangle) — by applying X if the bit is 1, then H if the basis is Hadamard. Bob measures each incoming qubit in his own randomly-chosen basis (applying H first if his basis is Hadamard, then measuring in Z). Key insight: Bob only ever gets a meaningful, correlated result when his basis happens to match Alice’s — because the four possible states span two mutually unbiased bases, measuring in the wrong basis collapses the qubit to a uniformly random outcome that carries zero information about the encoded bit. This is basis-dependent Measurement and Collapse doing the real security work.\nThe protocol flow\n\nEncode (Alice): for each bit, pick a random basis and a random bit value; prepare the corresponding single-qubit state and send it.\nDecode (Bob): pick a random basis independently; measure in it.\nSift: Alice and Bob publicly announce only their basis choices (never their bit values) and keep only the positions where both chose the same basis — on average, half the string.\nVerify: publish a random subset of the sifted key openly and compare. A near-zero mismatch rate means the channel was clean; a mismatch rate near 25% means someone eavesdropped. The remaining, unpublished sifted bits become the final secret key.\n\nWhy 25%, not 50%: an eavesdropper (Eve) who intercepts a qubit has to guess a measurement basis before relaying a fresh qubit onward — she has no way to know Alice’s basis any more than Bob does. She picks the wrong basis half the time; when she does, she irreversibly randomizes the state before re-sending it, and Bob’s own later measurement (even in the correct Alice-basis) then disagrees with Alice’s original bit half the time. 0.5\\times0.5=0.25. This is the same physical fact the No-Cloning Theorem formalizes: Eve cannot copy the unknown qubit and forward an undisturbed original while keeping a copy for herself — measuring to extract information is disturbing it.\nimport random\nfrom qiskit import QuantumCircuit\nfrom qiskit_aer import AerSimulator\n \nn = 100\nalice_bits = [random.randint(0, 1) for _ in range(n)]\nalice_bases = [random.randint(0, 1) for _ in range(n)]   # 0 = Z, 1 = X\nbob_bases   = [random.randint(0, 1) for _ in range(n)]\n \ndef encode(bit, basis):\n    qc = QuantumCircuit(1, 1)\n    if bit == 1:\n        qc.x(0)\n    if basis == 1:\n        qc.h(0)\n    return qc\n \ndef decode(qc, basis):\n    if basis == 1:\n        qc.h(0)\n    qc.measure(0, 0)\n    return qc\n \nsim = AerSimulator()\nbob_bits = []\nfor bit, a_basis, b_basis in zip(alice_bits, alice_bases, bob_bases):\n    qc = decode(encode(bit, a_basis), b_basis)\n    counts = sim.run(qc, shots=1).result().get_counts()\n    bob_bits.append(int(next(iter(counts))))\n \nsifted = [(a, b) for a, b, ab, bb in zip(alice_bits, bob_bits, alice_bases, bob_bases) if ab == bb]\nmismatch_rate = sum(a != b for a, b in sifted) / len(sifted)  # ~0 clean, ~0.25 under eavesdropping\nRelated\n\nNo-Cloning Theorem — BB84’s security proof is the no-cloning argument in protocol form: Eve can’t extract information from an unknown state without disturbing it\nMeasurement and Collapse — basis-dependent measurement is the entire mechanism\nE91 — Entanglement-Based Quantum Key Distribution — sibling protocol; contrast the eavesdropping-detection mechanism (basis-mismatch error rate here vs. live Bell-test violation there)\n\nSelf-Check\n\nWhy does Bob only get a meaningful result when his basis matches Alice’s, rather than a partially-correct one?\nWalk through why an eavesdropper’s interception introduces errors in exactly 25% of the sifted key, not 50% or 100%.\nWhy do Alice and Bob compare their basis choices publicly but never their bit values, until the final verification step?\n",
    "order": 999
  },
  {
    "slug": "quantum-communication/e91-—-entanglement-based-quantum-key-distribution",
    "filePath": "Quantum Communication/E91 — Entanglement-Based Quantum Key Distribution.md",
    "title": "E91 — Entanglement-Based Quantum Key Distribution",
    "links": [
      "tags/qc/crypto",
      "tags/qc/entanglement",
      "entangled-states/chsh-inequality-and-bell-tests",
      "entangled-states/bell-states",
      "quantum-communication/bb84-quantum-key-distribution",
      "entangled-states/no-cloning-theorem"
    ],
    "tags": [
      "qc/crypto",
      "qc/entanglement"
    ],
    "content": "E91 — Entanglement-Based Quantum Key Distribution\nqc/crypto qc/entanglement\nA protocol for two parties to agree on a shared secret key using entangled qubit pairs, where the security check is a live violation of the CHSH inequality rather than an error-rate comparison. A source distributes Bell pairs to Alice and Bob; each independently and randomly picks one of three measurement bases per qubit (Alice: Z, X, and a tilted W=(Z+X)/\\sqrt2 basis; Bob: Z and two other bases tilted at the standard CHSH offset angles). Key insight: the protocol splits its measurement outcomes into two disjoint uses — outcomes from one specific set of basis-pairs become the raw secret key (kept secret, never compared), while outcomes from the other basis-pairs are publicly compared to compute the CHSH value S. A clean channel gives S\\approx2\\sqrt2\\approx2.83; any eavesdropper intercepting and re-measuring the pairs collapses the entanglement, pulling the measured S down toward — or below — the classical bound S\\le2. The eavesdropping check and the key-generation measurements never touch the same data, so checking security doesn’t cost you any key material.\nWhy this differs from prepare-and-measure QKD\nUnlike BB84 Quantum Key Distribution, where Alice actively prepares and sends a qubit in a state she knows, E91 relies purely on a shared entangled resource — neither party “chooses” the bit value, it falls out of the (genuinely random) measurement outcome. Security doesn’t come from Eve’s measurement disturbing a known preparation; it comes from Eve’s intercept-and-resend attack being fundamentally unable to preserve the correlations that make CHSH violation possible in the first place. A real implementation also has to separate this from ordinary hardware noise: depolarizing noise degrades S the same way an eavesdropper does, so a measured S between the classical and quantum bounds doesn’t unambiguously mean “attacked” — it could just mean “noisy.”\nfrom qiskit import QuantumCircuit\nfrom qiskit.quantum_info import SparsePauliOp\n \n# Bell pair source\nqc = QuantumCircuit(2)\nqc.h(0)\nqc.cx(0, 1)\n \n# CHSH combination reuses the same S = E(a1,b1) + E(a1,b2) + E(a2,b1) - E(a2,b2)\n# machinery as CHSH Inequality and Bell Tests — here applied to the\n# *non-key* basis-pairs only, as a live eavesdropping check.\nRelated\n\nCHSH Inequality and Bell Tests — the exact S\\le2 vs. S\\approx2\\sqrt2 math, here repurposed as a security primitive instead of a foundational physics demo\nBell States\nNo-Cloning Theorem — the deeper reason Eve can’t intercept-and-resend without disturbing the correlations\nBB84 Quantum Key Distribution — sibling protocol; contrast the eavesdropping-detection mechanism (live Bell-test violation here vs. basis-mismatch error rate there)\n\nSelf-Check\n\nWhy can the same set of entangled pairs supply both a secret key and a live security check, without the check leaking any key information?\nWhy does an eavesdropper’s intercept-and-resend attack necessarily pull the measured CHSH value down, even though Eve never touches the qubits Alice and Bob keep for their key?\nHow would you distinguish “the channel is just noisy” from “someone is eavesdropping” if both push S below 2\\sqrt2?\n",
    "order": 999
  },
  {
    "slug": "quantum-machine-learning/data-encoding-circuits-(feature-maps)",
    "filePath": "Quantum Machine Learning/Data Encoding Circuits (Feature Maps).md",
    "title": "Data Encoding Circuits (Feature Maps)",
    "links": [
      "tags/qc/ml",
      "programming-a-quantum-computer/parameterized-circuits",
      "quantum-machine-learning/quantum-neural-networks-(qnn)",
      "quantum-machine-learning/quantum-kernel-methods"
    ],
    "tags": [
      "qc/ml"
    ],
    "content": "Data Encoding Circuits (Feature Maps)\nqc/ml\nA feature map (or encoding circuit) is what turns a classical data point x into a quantum state |\\Psi(x)\\rangle before anything “quantum” can happen to it — every quantum machine learning technique needs one. Mechanically it’s a parameterized circuit exactly like the ones VQE/QAOA use, except the bound values aren’t free optimization variables — they’re (transformations of) the classical input itself. The simplest version is angle encoding: feed x directly into a rotation gate, e.g. R_y(x)|0\\rangle. Key insight: naive angle encoding wastes the circuit’s expressive range, since a single rotation only covers one period; Chebyshev encoding (used by sQUlearn’s ChebyshevPQC) instead scales the input through Chebyshev polynomials before it hits the rotation angles, spreading the data non-linearly across multiple qubits/layers — a form of data re-uploading, where the same classical value gets fed back into the circuit at several points rather than just once, which measurably increases the model’s expressive capacity for the same qubit count.\nfrom qiskit.circuit import Parameter\nimport numpy as np\n \nx = Parameter(&#039;x&#039;)\n# naive angle encoding: one rotation, one period of coverage\nqc.ry(x, 0)\n \n# Chebyshev-style: re-scale through a polynomial before the rotation,\n# then re-upload x again in a later layer — same value, more expressive coverage\nqc.ry(2 * np.arccos(x), 0)   # T_1(x)-style rescaling, illustrative\nRelated\n\nParameterized Circuits — same “structure once, bind values” substrate; here the bound values come from data, not free optimization parameters\nQuantum Neural Networks (QNN) — the model built on top of this encoding\nQuantum Kernel Methods — the other model built on top of this encoding\n\nSelf-Check\n\nHow is a feature map’s Parameter binding different from how VQE binds its ansatz parameters, given both use the exact same Parameter/ParameterVector machinery?\nWhy does naive single-rotation angle encoding limit a circuit’s expressive range, and how does Chebyshev/data-re-uploading encoding address that?\nCould you explain “data re-uploading” to someone who only knows angle encoding as “feed x into a rotation gate”?\n",
    "order": 999
  },
  {
    "slug": "quantum-machine-learning/quantum-kernel-methods",
    "filePath": "Quantum Machine Learning/Quantum Kernel Methods.md",
    "title": "Quantum Kernel Methods",
    "links": [
      "tags/qc/ml",
      "quantum-machine-learning/quantum-neural-networks-(qnn)",
      "quantum-machine-learning/data-encoding-circuits-(feature-maps)"
    ],
    "tags": [
      "qc/ml"
    ],
    "content": "Quantum Kernel Methods\nqc/ml\nAn entirely different way to build a “quantum ML model” from QNNs: instead of training circuit parameters, use a fixed feature map |\\Psi(x)\\rangle to compute a fidelity kernel — a similarity score between two data points — and hand that kernel matrix to an ordinary classical support-vector machine.\nK(x, x&#039;) = |\\langle\\Psi(x)|\\Psi(x&#039;)\\rangle|^2\nKey insight: no quantum circuit parameters are ever optimized here. The quantum computer’s only job is to compute K(x,x&#039;) for every pair of data points once, producing a kernel/similarity matrix; all actual learning — finding the decision boundary — happens classically afterward via a standard SVM (QSVC = quantum kernel + classical SVC). This is a fundamentally different division of labor than a QNN, where the circuit is the trainable model. Here the quantum part is a fixed similarity-measuring subroutine, and the “quantumness” of the model lives entirely in the choice of feature map — a different encoding circuit gives a different notion of similarity, and therefore a different classifier, without any quantum-side training at all.\n# schematic — sQUlearn-style\nfrom squlearn.encoding_circuit import YZ_CX_EncodingCircuit\nfrom squlearn.kernel import FidelityKernel, QSVC\n \nfmap = YZ_CX_EncodingCircuit(num_qubits=4, num_layers=2, num_features=2)\nkernel = FidelityKernel(fmap)\nmodel = QSVC(kernel)\nmodel.fit(X_train, y_train)   # kernel matrix computed once, SVM optimizes classically\nRelated\n\nData Encoding Circuits (Feature Maps) — the only quantum-side choice that matters here\nQuantum Neural Networks (QNN) — contrast: circuit parameters are trained there, not here\n\nSelf-Check\n\nWhat role does the quantum computer actually play in a quantum kernel method, versus a QNN?\nIf no circuit parameters are trained, what quantum-side choice still determines how good the classifier is?\nWhy might two different feature maps produce two different classifiers from the exact same classical SVM training procedure?\n",
    "order": 999
  },
  {
    "slug": "quantum-machine-learning/quantum-neural-networks-(qnn)",
    "filePath": "Quantum Machine Learning/Quantum Neural Networks (QNN).md",
    "title": "Quantum Neural Networks (QNN)",
    "links": [
      "tags/qc/ml",
      "quantum-machine-learning/data-encoding-circuits-(feature-maps)",
      "quantum-algorithms/variational-quantum-eigensolver-(vqe)",
      "error-mitigation/noiselearnerv3-and-pauli-lindblad-models",
      "programming-a-quantum-computer/parameterized-circuits",
      "quantum-machine-learning/quantum-kernel-methods"
    ],
    "tags": [
      "qc/ml"
    ],
    "content": "Quantum Neural Networks (QNN)\nqc/ml\nA QNN is a feature map plus a trainable observable, optimized against a supervised loss the same way VQE optimizes against energy. Key insight: it’s the same five-step variational loop as VQE — prepare a parameterized state, measure an observable, classically optimize — except the loss is a supervised prediction error instead of \\langle H\\rangle, and (distinctively) the observable itself can be trainable, not just the circuit. sQUlearn’s construction uses O=\\theta_0 I+\\sum_i\\theta_i Z_i (a SummedPaulis observable): the readout weighting on each qubit is a learned parameter, so the model isn’t just choosing how to prepare a state, it’s also choosing how to weigh what it measures — a second trainable stage VQE doesn’t have (VQE’s observable, the Hamiltonian, is fixed by the physics problem, not learned).\nThe loop\n1. Encode input x through a feature map circuit (see [[Data Encoding Circuits (Feature Maps)]])\n2. Prepare |ψ(x, θ)⟩ — encoding + trainable ansatz layers\n3. Measure the trainable observable O(θ_readout) = θ_0·I + Σ θ_i·Z_i\n4. Loss = SquaredLoss(prediction, y_true); classical optimizer (e.g. Adam) updates θ\n5. Repeat over the training set\n\nTraining under the noise you’ll deploy on\nA concrete result worth internalizing: a QNN trained directly on a noisy backend (e.g. FakeTorino) measurably outperforms a QNN trained on an ideal noiseless simulator and only evaluated on the noisy backend afterward. The optimizer, given noisy feedback throughout training, finds parameters that are robust to that specific noise profile — noise-aware training is a real, usable technique, not just theoretical hardening. Same broader lesson as elsewhere in this vault (see the Error Mitigation section generally, e.g. NoiseLearnerV3 and Pauli-Lindblad Models): don’t treat “ideal circuit, apply mitigation after” and “expose the noise during optimization” as equivalent — they aren’t.\nRelated\n\nData Encoding Circuits (Feature Maps)\nVariational Quantum Eigensolver (VQE) — same loop shape, energy loss instead of supervised loss, fixed observable instead of trainable\nParameterized Circuits\nQuantum Kernel Methods — the other QML approach: no circuit parameters trained at all\n\nSelf-Check\n\nHow does a QNN’s training loop resemble VQE’s, and where does it diverge?\nWhy does making the readout observable O=\\theta_0 I+\\sum\\theta_i Z_i trainable give the model something VQE’s fixed Hamiltonian observable doesn’t have?\nWhy would a QNN trained directly on a noisy backend outperform one trained ideally and only evaluated on noise afterward?\n",
    "order": 999
  },
  {
    "slug": "reading-the-literature/spotting-hype-and-omissions-in-quantum-claims",
    "filePath": "Reading the Literature/Spotting Hype and Omissions in Quantum Claims.md",
    "title": "Spotting Hype and Omissions in Quantum Claims",
    "links": [
      "tags/qc/research",
      "reading-the-literature/the-first-pass-framework-for-reading-a-quantum-paper"
    ],
    "tags": [
      "qc/research"
    ],
    "content": "Spotting Hype and Omissions in Quantum Claims\nqc/research\nA quantum paper can be technically correct and still leave out the context needed for strong evaluation — common omissions are cherry-picked qubit performance (best-case shown, not average), missing or incomplete error rates, vague noise-model/mitigation details, results shown only under ideal or simulated conditions, no comparison to existing state-of-the-art, and no discussion of scalability or practical limits. Key insight: train yourself to ask “what would a failure look like, and is that data shown?”, “average across many runs, or the best single run?”, “all qubits tested, or only the best subset?”, “real hardware or only simulation?”, and “are the error bars meaningful?” — hidden information tends to cluster in supplementary materials/appendices, footnotes and fine print in figure captions, and “limitations” or “future work” paragraphs.\nBold claims outside the paper itself (press releases, headlines, social posts) follow recurring, spottable patterns rather than requiring case-by-case suspicion: no baseline named (“X% better than classical” without saying which classical method, on which problem), engineering increment sold as breakthrough (“first N-qubit chip” without two-qubit gate fidelities or coherence numbers), speedup claims that quietly hide the classical I/O cost, an application tied to a specific year (“drug discovery solved by 2028”), a narrow toy-benchmark result blown up into a broad headline, a buzzword stack (quantum + AI + blockchain + agentic + …), and a press conference that arrives before peer review (the paper is missing or still a preprint). The same red-flag checklist applies to any bold theoretical claim: solving major open problems without peer review, contradicting established limits without explanation, heavy jargon without clear definitions, no experimental validation for a theory, overly broad conclusions from narrow results, and “quantum breakthrough” language without rigorous benchmarks attached.\nBefore believing an extraordinary claim, ask: has it been independently replicated, is the claim actually narrower in the paper than in the headline, are the benchmarks fair, and do later responses/corrections change the picture? Key insight: the goal is calibrated interpretation, not cynicism — strong readers update their view when better evidence appears, and repeat the claim supported by the strongest source, not the loudest one.\nRelated\n\nThe First-Pass Framework for Reading a Quantum Paper — apply this skepticism check as the last step after you’ve already extracted the claim, evidence, authors, and figures\n\nSelf-Check\n\nA headline says “quantum computer achieves 1000x speedup over classical methods.” What single follow-up question would most quickly tell you whether this claim is trustworthy?\nWhy can a paper be “technically correct” and still be misleading — what’s actually happening when that occurs?\nWhat’s the difference between healthy skepticism and cynicism when reading a bold quantum claim, and why does the workshop insist on the former?\n",
    "order": 999
  },
  {
    "slug": "reading-the-literature/the-first-pass-framework-for-reading-a-quantum-paper",
    "filePath": "Reading the Literature/The First-Pass Framework for Reading a Quantum Paper.md",
    "title": "The First-Pass Framework for Reading a Quantum Paper",
    "links": [
      "tags/qc/research",
      "reading-the-literature/spotting-hype-and-omissions-in-quantum-claims"
    ],
    "tags": [
      "qc/research"
    ],
    "content": "The First-Pass Framework for Reading a Quantum Paper\nqc/research\nQuantum papers feel dense because of unfamiliar structure, compressed jargon, figures that carry more meaning than the surrounding text, and caveats hidden outside the headline claim — but reading them well is a learnable method, not a cover-to-cover slog. Key insight: read out of order. Hit Abstract → Conclusion → Figures → Introduction → Methods/Supplement, asking three questions immediately: what is the claim, what evidence supports it, and what would weaken it. The goal of a first pass is to triage the paper before investing in technical detail — not every section deserves equal attention (Methods matters for reproducibility but can be skimmed first-pass; Supplementary info is low-priority to skim but often hides the important caveats).\nOnce you’ve triaged the claim, check who’s making it: first author did the bulk of the work, last author is the PI/lab lead, and venue carries real weight — peer-reviewed journal (PRL, Nature Physics, PRX Quantum) &gt; conference proceeding &gt; arXiv preprint &gt; blog post/press release (marketing, not science). Credibility comes from context plus evidence, not branding alone.\nFigures get their own workflow, read in this order: caption (what you’re supposed to see) → axes/units/legend (the coordinate system) → raw visual trend (what the data actually shows) → error bars/confidence regions (how certain is this) → fit lines/model curves (separate data from interpretation) → compare to the text’s claim (does the figure actually match what’s asserted). Red flags in figures: missing/unlabeled axes, no error bars where uncertainty should exist, truncated/manipulated axis scales that exaggerate effects, a figure that tells a weaker story than the text claims, or figures referenced in text but never clearly explained.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nFigure typeWhat to look forGate fidelity chartsAverage vs. best-case values, which gates were testedCoherence time graphs (T1/T2)Time scales, comparison across qubits, decay curvesBloch sphere representationsState trajectories, decoherence paths, ideal vs. measured statesQuantum circuit diagramsCircuit depth, gate types, measurement pointsEnergy level diagramsLevel spacing, avoided crossings, drive frequenciesRandomized benchmarkingDecay rate, confidence intervals, comparison conditions\nEven a paper’s headline figure only answers a subset of the important questions — a caption like “Fig. 6: two specialized sparse iterative solvers and DMRG on the same 49-qubit Hamiltonian” can reveal that a companion figure narrows the scope of what the headline figure actually claims. Recovering that precise scope, rather than the one-sentence summary version, is the whole point of reading figures carefully instead of skimming past them.\nRelated\n\nSpotting Hype and Omissions in Quantum Claims — the companion skill: what to do once you suspect the claim outruns the evidence\n\nSelf-Check\n\nSomeone hands you a new quantum paper and says “just read the abstract and intro first.” Why is that the wrong order, and what should you read first instead?\nYou’re comparing two papers on the same technique — one is a Nature Physics article, the other a company blog post making a bigger claim. Which do you trust more, and why isn’t that just snobbery?\nA figure’s caption says it compares method A and B, but the plot only shows a single curve trending downward with no error bars. What two things are missing before you’d trust this as evidence?\n",
    "order": 999
  },
  {
    "slug": "why-quantum-computing-matters/computational-complexity-—-p,-np,-bqp",
    "filePath": "Why Quantum Computing Matters/Computational Complexity — P, NP, BQP.md",
    "title": "Computational Complexity — P, NP, BQP",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/math",
      "why-quantum-computing-matters/the-deutsch-jozsa-algorithm",
      "why-quantum-computing-matters/quantum-speedup-—-ingredients-and-myths",
      "why-quantum-computing-matters/the-quantum-algorithm-zoo"
    ],
    "tags": [
      "qc/algorithms",
      "qc/math"
    ],
    "content": "Computational Complexity — P, NP, BQP\nqc/algorithms qc/math\nThe formal language for what “quantum speedup” actually claims. Problems are grouped into complexity classes by how their solution cost scales with input size n — the key distinction is polynomial (O(n^c), considered efficient) vs. exponential (O(c^n), considered intractable at scale).\n\nP — solvable in polynomial time on a classical computer.\nNP — a candidate solution can be verified in polynomial time on a classical computer, even if finding one might not be.\nBQP — bounded-error quantum polynomial time: solvable with high probability in polynomial time on a quantum computer.\n\nHow they relate\nP \\subseteq NP (anything efficiently solvable is efficiently verifiable) and P \\subseteq BQP (a classical polynomial-time algorithm is trivially also a quantum one). Key insight: BQP and NP overlap without either containing the other — some BQP problems (like factoring) are inside NP, but BQP is not a subset of NP in general, and NP is not a subset of BQP either. Deutsch-Jozsa is a clean example of a problem efficiently solvable in BQP via a structured promise, independent of whether it sits inside NP.\nThe Church-Turing caveat\nA quantum computer does not compute anything a classical computer fundamentally cannot. The (extended) Church-Turing thesis holds: anything computable on a quantum computer is theoretically computable on a classical one too, given enough time. What quantum computing changes is efficiency — moving a problem from an exponential classical runtime into a polynomial quantum one (BQP) — not computability. This is the precise, careful version of “why quantum computers matter”: not magic, not unlimited power, but a different cost curve for a specific class of problems with the right hidden structure (see Quantum Speedup — Ingredients and Myths).\nRelated\n\nThe Deutsch-Jozsa Algorithm\nQuantum Speedup — Ingredients and Myths\nThe Quantum Algorithm Zoo — the actual catalog of problems known to live in BQP with better-than-classical scaling\n\nSelf-Check\n\nCould you explain the difference between P, NP, and BQP to someone who’s never seen complexity theory?\nWhy does BQP overlap with NP instead of one containing the other?\nWhy does the Church-Turing caveat matter — what would be a wrong way to describe what quantum computers can do?\n",
    "order": 999
  },
  {
    "slug": "why-quantum-computing-matters/deutsch's-algorithm",
    "filePath": "Why Quantum Computing Matters/Deutsch's Algorithm.md",
    "title": "Deutsch's Algorithm",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/gates",
      "why-quantum-computing-matters/quantum-speedup-—-ingredients-and-myths",
      "why-quantum-computing-matters/the-deutsch-jozsa-algorithm",
      "foundations/h-gate",
      "absolute-basics/measurement-and-collapse"
    ],
    "tags": [
      "qc/algorithms",
      "qc/gates"
    ],
    "content": "Deutsch’s Algorithm\nqc/algorithms qc/gates\nThe first concrete proof that a quantum computer can need fewer queries than any classical algorithm. Deutsch’s problem: given a function f:\\{0,1\\}\\to\\{0,1\\} as a black-box oracle, determine whether f is constant (f(0)=f(1)) or balanced (f(0)\\neq f(1)). Classically, this needs 2 queries to be certain (evaluate f(0) and f(1), compare). Deutsch’s algorithm does it in 1 query.\nThe oracle and phase kickback\nThe oracle is a unitary U_f|x\\rangle|y\\rangle = |x\\rangle|y\\oplus f(x)\\rangle — reversible, since classical f generally isn’t. Key insight — phase kickback: if the target qubit is prepared in |-\\rangle=\\frac{1}{\\sqrt2}(|0\\rangle-|1\\rangle) instead of a computational basis state, applying U_f leaves |-\\rangle unchanged but writes f(x) into the phase of the query register instead:\nU_f|x\\rangle|-\\rangle = (-1)^{f(x)}|x\\rangle|-\\rangle\nThis is because U_f flips the target qubit iff f(x)=1, and flipping |-\\rangle just gives -|-\\rangle.\nCircuit and derivation\nPrepare |0\\rangle|1\\rangle, apply H to both qubits, apply U_f, apply H to the first qubit, measure it.\n|\\psi_0\\rangle = |0\\rangle|1\\rangle \\xrightarrow{H\\otimes H} |\\psi_1\\rangle = |+\\rangle|-\\rangle\nApplying U_f via phase kickback on each branch of the query register’s superposition:\n|\\psi_2\\rangle = \\frac{1}{\\sqrt2}\\Big[(-1)^{f(0)}|0\\rangle + (-1)^{f(1)}|1\\rangle\\Big]\\otimes|-\\rangle = (-1)^{f(0)}\\frac{1}{\\sqrt2}\\Big[|0\\rangle + (-1)^{f(0)\\oplus f(1)}|1\\rangle\\Big]\\otimes|-\\rangle\nApplying H to the first qubit: H\\frac{1}{\\sqrt2}(|0\\rangle+|1\\rangle)=|0\\rangle if f(0)\\oplus f(1)=0, or H\\frac{1}{\\sqrt2}(|0\\rangle-|1\\rangle)=|1\\rangle if f(0)\\oplus f(1)=1. So:\n|\\psi_3\\rangle = (-1)^{f(0)}\\,|f(0)\\oplus f(1)\\rangle \\otimes |-\\rangle\nMeasuring the first qubit gives f(0)\\oplus f(1) exactly: outcome 0 means constant, outcome 1 means balanced — determined with a single call to U_f, using the interference set up by the two Hadamards around it.\nRelated\n\nQuantum Speedup — Ingredients and Myths\nThe Deutsch-Jozsa Algorithm — the n-qubit generalization\nH Gate\nMeasurement and Collapse\n\nSelf-Check\n\nCould you explain phase kickback — why does U_f acting on |-\\rangle change the phase instead of the state?\nWhy does Deutsch’s algorithm need only 1 query when classically you need 2?\nWhat would happen to the final measurement outcome if you skipped the first Hadamard layer?\n",
    "order": 999
  },
  {
    "slug": "why-quantum-computing-matters/quantum-speedup-—-ingredients-and-myths",
    "filePath": "Why Quantum Computing Matters/Quantum Speedup — Ingredients and Myths.md",
    "title": "Quantum Speedup — Ingredients and Myths",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/math",
      "absolute-basics/superposition",
      "entangled-states/bell-states",
      "absolute-basics/measurement-and-collapse",
      "why-quantum-computing-matters/deutsch's-algorithm",
      "quantum-algorithms/grover's-algorithm",
      "why-quantum-computing-matters/the-quantum-algorithm-zoo"
    ],
    "tags": [
      "qc/algorithms",
      "qc/math"
    ],
    "content": "Quantum Speedup — Ingredients and Myths\nqc/algorithms qc/math\nThree ingredients are necessary for a quantum algorithm to beat its classical counterpart: Superposition (a system in a complex linear combination of states until measured), entanglement (information shared jointly across qubits — see Bell States), and interference (combining amplitudes so possibilities reinforce or cancel — see Superposition). None of them alone is enough; real speedups come from an algorithm that engineers all three together around a problem’s hidden structure.\nThe myth: does superposition evaluate everything at once, for free?\nNo. Prepare an equal superposition over all inputs x, apply a query gate U_f computing f:\nU_f \\frac{1}{\\sqrt{2^n}}\\sum_x |x\\rangle|0\\rangle = \\frac{1}{\\sqrt{2^n}}\\sum_x |x\\rangle|f(x)\\rangle\nThis state genuinely contains every input-output pair — but measuring it collapses to exactly one random pair, exactly as if you’d picked one x classically and computed f(x) (see Measurement and Collapse). You have not “read out” every answer; you’ve paid the cost of preparing a superposition and gotten one sample back. Key insight: quantum algorithms don’t win by brute-force evaluating every possibility — they win by exploiting a problem’s hidden global structure (symmetry, periodicity, correlations) so that interference makes wrong answers cancel and right answers reinforce, concentrating measurement probability where you want it. Deutsch’s Algorithm is the smallest possible worked example of this.\nThe other myth: entanglement alone isn’t enough either\nEntanglement plus a random circuit gives no advantage over classical computation — a random tangle of correlations with no structure to exploit is just noise. Entanglement plus structured interference (the actual mechanism behind Shor’s and Grover’s algorithms, see The Quantum Algorithm Zoo) is what gives a speedup. The algorithm does the work; entanglement only enables it — entanglement is necessary but nowhere near sufficient, the same way having a well-shuffled deck doesn’t win you a card game by itself.\nRelated\n\nSuperposition\nBell States\nMeasurement and Collapse\nDeutsch’s Algorithm — the mechanism above, made concrete\nThe Quantum Algorithm Zoo\n\nSelf-Check\n\nWhy doesn’t preparing a superposition over all inputs let you read out every f(x) value?\nCould you name the three necessary ingredients for quantum speedup and explain, in one sentence each, what role they play?\nWhat does “hidden global structure” mean, and why does an algorithm need one to exploit for a speedup to exist?\nWhy does entanglement alone, without structured interference, fail to give any speedup?\n",
    "order": 999
  },
  {
    "slug": "why-quantum-computing-matters/quantum-utility-vs-quantum-advantage",
    "filePath": "Why Quantum Computing Matters/Quantum Utility vs Quantum Advantage.md",
    "title": "Quantum Utility vs Quantum Advantage",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/hardware",
      "error-mitigation/1d-ising-chain-and-the-mirror-trick",
      "quantum-advantage/the-operator-loschmidt-echo-(ole)-benchmark",
      "hardware-reality/backend-properties",
      "programming-a-quantum-computer/simulators-—-statevector-vs-shot-based",
      "quantum-algorithms/hamiltonian-simulation-—-why-it's-hard",
      "quantum-advantage/quantum-advantage-—-definition-and-criteria",
      "quantum-algorithms/sample-based-quantum-diagonalization-(sqd)",
      "why-quantum-computing-matters/what-quantum-computers-are-good-for",
      "error-mitigation/error-correction-(ec)",
      "quantum-advantage/peaked-circuits-and-verifiable-quantum-advantage"
    ],
    "tags": [
      "qc/algorithms",
      "qc/hardware"
    ],
    "content": "Quantum Utility vs Quantum Advantage\nqc/algorithms qc/hardware\nTwo precise, easy-to-conflate claims about where the field actually stands.\n\nQuantum Utility (achieved, 2023) — a demonstration that a quantum computer can run quantum circuits beyond the ability of a classical computer simulating a quantum computer. IBM’s claim rests on the same Nature 618 paper (Kim et al., 2023) already cited in this vault’s own 1D Ising Chain and the Mirror Trick note — the 127-qubit utility demonstration that motivated the Trotter-circuit benchmark used throughout the Error Mitigation section.\nQuantum Advantage (not yet achieved) — a demonstration that a quantum computer can solve a problem more accurately, cheaper, or more efficiently than classical computing alone. This is a strictly higher bar: utility only requires being hard to simulate classically, not being useful or better than the best classical alternative for the same task.\n\nKey insight: these are commonly conflated in pop-science coverage. “We ran a circuit no classical computer could simulate” (utility) is not the same claim as “we solved a real problem better than the best classical method” (advantage) — see the honest verdict on a real 56-qubit benchmark that walks through exactly this distinction.\nWhy the gap is hard to close\nIndividual gate error rates are low (~0.1%), but failure probability compounds with every additional operation — a circuit with thousands of two-qubit gates accumulates meaningful aggregate error even at excellent per-gate fidelity (see Backend Properties). IBM has deployed 60 devices under 100 qubits and 29 devices over 100 qubits capable of over 5,000 two-qubit gates since 2016 — utility-scale hardware is real and growing, but closing the remaining gap to advantage is an active research problem, not a solved one.\nThe three pillars of advantage\nClaiming quantum advantage for real requires all three at once:\n\nComplexity — the problem must be one where classical heuristics genuinely become computationally unviable, either through a proven complexity separation or practical time/memory exhaustion.\nTrust — the output must be trustworthy even when it can’t be classically double-checked, built up step-by-step through calibration and mitigation — the same way physicists came to trust telescopes and particle colliders before either could be “checked” against a known answer.\nUtility — it has to drive real impact (materials science, drug discovery, fundamental physics), not just demonstrate hardware speed on an abstract puzzle.\n\nThe three classical competitors\nWhenever a quantum result claims to beat classical methods, it’s being compared against the best available classical simulation — and each has a different limiting resource:\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nMethodLimited byState vectorQubit count — exact, but memory is exponential (see Simulators — Statevector vs Shot-Based)Tensor networksEntanglement / bond dimension (see Hamiltonian Simulation — Why It’s Hard)Pauli path methodsOperator spreading — how fast Heisenberg-picture operators grow under evolution\nA quantum result only counts as advantage over all three — beating one classical method while another would have solved it faster isn’t advantage, it’s picking a weak opponent.\nThe Quantum Advantage Tracker\nA community-run platform (quantum-advantage-tracker.github.io) that catalogs real experimental attempts at the gap above, organized into three pathways that map directly onto the three problem families poised for advantage:\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPathwayExample on the trackerObservable EstimationIsing-model simulation — see The Operator Loschmidt Echo (OLE) BenchmarkVariational ProblemsSample-Based Quantum Diagonalization (SQD) for molecular ground statesClassically Verifiable ProblemsQAOA for optimization problems\nTwo concrete 2025-baseline entries worth knowing: the ground-state energy of Fe₄S₄ (an iron-sulfur cluster, biologically important and classically hard due to strong electron correlation) computed via TrimCI (Trimmed Configuration Interaction — builds ground states from random Slater determinants without a pre-selected reference, then trims unimportant components; recovers &gt;99% of the 8×8 Hubbard model’s ground-state energy using just 10^{-28} of the Hilbert space, beating AFQMC); and the expectation value of the Loschmidt Echo operator via Single-Path Monte Carlo at 49 qubits / 648 gates — the same quantity, and largely the same mitigation story, as The Operator Loschmidt Echo (OLE) Benchmark’s 56-qubit run, just a different baseline entry on the tracker rather than the same experiment.\nKey insight: the tracker doesn’t declare winners — it’s a running scoreboard of attempts, most of which (like the OLE benchmark in this vault) land on “more trustworthy than one classical method” rather than “advantage over the field.”\nRelated\n\nWhat Quantum Computers Are Good For\n1D Ising Chain and the Mirror Trick — the same 2023 Nature paper, from the mitigation-benchmark side\nBackend Properties\nError Correction (EC) — the long-term path to closing this gap for good\nPeaked Circuits and Verifiable Quantum Advantage\nThe Operator Loschmidt Echo (OLE) Benchmark — a real worked example of exactly this gap\nQuantum Advantage — Definition and Criteria — the formal two-criterion framework this whole distinction is built on\nSample-Based Quantum Diagonalization (SQD) — the Variational Problems pathway’s flagship example\n\nSelf-Check\n\nCould you explain the difference between quantum utility and quantum advantage in your own words?\nWhy is “no classical computer could simulate this circuit” a weaker claim than “this beat the best classical method”?\nWhy does a low individual gate error rate (~0.1%) not guarantee a low overall circuit error rate?\nWhy does claiming advantage require beating all three classical competitors, not just one?\nHow do the Quantum Advantage Tracker’s three pathways map onto the three problem families in Quantum Advantage — Definition and Criteria?\n",
    "order": 999
  },
  {
    "slug": "why-quantum-computing-matters/the-deutsch-jozsa-algorithm",
    "filePath": "Why Quantum Computing Matters/The Deutsch-Jozsa Algorithm.md",
    "title": "The Deutsch-Jozsa Algorithm",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/gates",
      "why-quantum-computing-matters/deutsch's-algorithm",
      "why-quantum-computing-matters/quantum-speedup-—-ingredients-and-myths",
      "why-quantum-computing-matters/computational-complexity-—-p,-np,-bqp"
    ],
    "tags": [
      "qc/algorithms",
      "qc/gates"
    ],
    "content": "The Deutsch-Jozsa Algorithm\nqc/algorithms qc/gates\nGeneralizes Deutsch’s Algorithm from one bit to n bits: given f:\\{0,1\\}^n\\to\\{0,1\\}, promised to be either constant (same output for all inputs) or balanced (output 1 for exactly half of all inputs), determine which — in 1 query, regardless of n.\nWhy this is a bigger deal than Deutsch’s algorithm\nClassically, a deterministic algorithm needs 2^{n-1}+1 queries in the worst case to be certain (you could query 2^{n-1} inputs, get the same answer every time, and still be looking at a balanced function whose other half you haven’t checked). Deutsch-Jozsa’s constant-vs-2^{n-1}+1 gap is the first algorithm with a proven exponential speedup over any deterministic classical algorithm — not just a constant-factor win like Deutsch’s original 2-vs-1.\nCircuit\nSame structure as Deutsch’s algorithm, extended to n query qubits: prepare |0\\rangle^{\\otimes n}|1\\rangle, apply H^{\\otimes n} to the query register and H to the ancilla, apply the oracle U_f|x\\rangle|y\\rangle=|x\\rangle|y\\oplus f(x)\\rangle (phase-kicked back onto the query register exactly as in Deutsch’s algorithm), apply H^{\\otimes n} to the query register again, then measure it.\nResult: the query register reads all-zeros (|0\\rangle^{\\otimes n}) with certainty if f is constant, and never reads all-zeros if f is balanced. One measurement, one bit of information (“was it all-zeros or not”), fully resolves the promise.\nRelated\n\nDeutsch’s Algorithm\nQuantum Speedup — Ingredients and Myths\nComputational Complexity — P, NP, BQP — this is the algorithm that made “exponential speedup” a concrete, provable claim rather than a hope\n\nSelf-Check\n\nWhy does a classical deterministic algorithm need 2^{n-1}+1 queries in the worst case, not just 2?\nWhat specifically makes Deutsch-Jozsa’s speedup “exponential” rather than just “faster”?\nWhat does measuring “not all-zeros” tell you, and why is that enough to conclude “balanced” with certainty?\n",
    "order": 999
  },
  {
    "slug": "why-quantum-computing-matters/the-quantum-algorithm-zoo",
    "filePath": "Why Quantum Computing Matters/The Quantum Algorithm Zoo.md",
    "title": "The Quantum Algorithm Zoo",
    "links": [
      "tags/qc/algorithms",
      "tags/qc/moc",
      "why-quantum-computing-matters/deutsch's-algorithm",
      "why-quantum-computing-matters/the-deutsch-jozsa-algorithm",
      "quantum-algorithms/grover's-algorithm",
      "quantum-algorithms/hamiltonian-simulation-—-why-it's-hard",
      "quantum-algorithms/trotterization",
      "quantum-algorithms/quantum-phase-estimation-(qpe)",
      "quantum-algorithms/qaoa-—-quantum-approximate-optimization-algorithm",
      "hardware-reality/transpiling-qaoa-circuits-—-swap-strategies-and-sat-mapping",
      "quantum-algorithms/the-full-pipeline-of-a-quantum-solver",
      "why-quantum-computing-matters/computational-complexity-—-p,-np,-bqp",
      "why-quantum-computing-matters/what-quantum-computers-are-good-for"
    ],
    "tags": [
      "qc/algorithms",
      "qc/moc"
    ],
    "content": "The Quantum Algorithm Zoo\nqc/algorithms qc/moc\nA running map of what’s actually been discovered since Deutsch kicked things off in 1985. Maintained in full as the Quantum Algorithm Zoo (Stephen Jordan, 400+ entries) — this note is the milestone skeleton, not the exhaustive list.\nMilestone timeline\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nYearAlgorithmSignificance1985Deutsch’s AlgorithmFirst proof a quantum computer needs fewer queries than classical1992The Deutsch-Jozsa AlgorithmFirst proven exponential speedup1994Simon’s algorithmExponential speedup for a hidden-structure problem, direct precursor to Shor’s1994Shor’s algorithmSuperpolynomial speedup for integer factoring — breaks RSA1995Quantum Phase Estimation (QPE)Extracts eigenvalues efficiently; the subroutine underlying Shor’s and many later algorithms1996Grover’s AlgorithmQuadratic speedup for unstructured search\n\n⚠️ Honest gap: Shor’s and QPE’s internals are named here as milestones but not derived in this vault. Grover’s algorithm is now derived in full — see Grover’s Algorithm for the oracle/phase-kickback mechanism, the geometric rotation picture, and the optimal-iteration-count proof.\n\nCategorized by speedup type\n\nFactoring (superpolynomial) — Shor’s algorithm.\nQuantum Simulation (superpolynomial) — the general problem of simulating physical Hamiltonians; see Hamiltonian Simulation — Why It’s Hard and the rest of the Quantum Algorithms section for Trotterization/QPE-based approaches.\nSearching (polynomial) — Grover’s algorithm and variants.\nAbelian Hidden Subgroup (superpolynomial) — the general algebraic framework Shor’s algorithm is a special case of.\nMachine Learning (varies) — speedups here are more use-case-dependent and contested than the others.\nCombinatorial Optimization (heuristic, no proven speedup) — QAOA, unlike the entries above, has no proven asymptotic speedup; it’s a practical near-term heuristic for problems like TSP and Max-Cut.\nVerifying Matrix Products (polynomial).\nPattern Matching, String Rewriting, Knot Invariants (superpolynomial) — narrower, more specialized results.\n\nFew foundational ideas, many variants\nNearly every entry in the zoo traces back to one of three foundational ideas, each with its own “inspiration” lineage:\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nInspirationFoundational ideaGeneral goalResulting algorithmsPhysicsAdiabatic &amp; counter-diabatic evolutionResolve the energy spectrum of HamiltoniansQAOA — Quantum Approximate Optimization Algorithm, DC-QAOA / BF-DCQO, Floquet engineeringMathQuantum Fourier TransformSolve discrete problemsQuantum Phase Estimation (QPE), Shor’s, HHLCSQuantum oracles &amp; machine learningBuild tools for quantum solversGrover’s Algorithm, amplitude amplification, DQI, quantum neural networks\nThis is a good sanity check for “is this a new algorithm or a new variant?” — most new results are a new variant along one of these three lineages, not a fourth foundational idea.\nError correction needed vs. mitigation suffices\nEvery algorithm above eventually runs into the same wall: noisy hardware. The zoo splits cleanly along how each entry copes with that, and on what time horizon:\n\nHardware pressure — long term (full error correction needed): algorithms that need genuinely correct answers at scale — resulting technology: surface codes, LDPC codes, bicycle-bivariate codes (e.g. IBM’s “Gross code,” denoted [\\![144,12,12]\\!] in the literature, ~10× lower qubit overhead than surface codes at the same error suppression).\nHardware pressure — short term (error mitigation suffices): near-term heuristics like VQE, ADAPT-VQE, and RQAOA get by on problem-based robustness (warm-starts, problem-dependent mixers, efficient QAOA transpilation) plus error mitigation (PEC, ZNE) rather than requiring corrected qubits.\n\nThis is the same “Error Mitigation &amp; Reduction SUFFICE” vs. “Error Correction NEEDED” split that determines which algorithms are usable today versus which are waiting on the fault-tolerant era — see The Full Pipeline of a Quantum Solver for where this choice sits in the overall solver pipeline.\nRelated\n\nComputational Complexity — P, NP, BQP — the formal classes these speedups are claims about\nDeutsch’s Algorithm, The Deutsch-Jozsa Algorithm\nGrover’s Algorithm — the full derivation behind the 1996 milestone above\nQAOA — Quantum Approximate Optimization Algorithm — the “Combinatorial Optimization” category above, in full\nWhat Quantum Computers Are Good For — translating “speedup exists” into “useful for X”\nHamiltonian Simulation — Why It’s Hard — where “Quantum Simulation” actually gets taught\nThe Full Pipeline of a Quantum Solver — the “Algorithm” stage this note’s lineage table zooms in on\nTranspiling QAOA Circuits — SWAP Strategies and SAT Mapping — a concrete “error mitigation suffices, for now” technique in practice\n\nSelf-Check\n\nCould you name three algorithms from this timeline and, for each, say whether its speedup is polynomial or superpolynomial?\nWhy is it worth knowing Grover’s/Shor’s exist and what they claim, even without knowing how they work internally?\nWhat’s the relationship between Shor’s algorithm and the “Abelian Hidden Subgroup” category?\nWhich of the three foundational lineages (physics/math/CS) does QAOA belong to, and which does Shor’s belong to?\nWhy do some algorithms get by on error mitigation today while others are stuck waiting for full error correction?\n",
    "order": 999
  },
  {
    "slug": "why-quantum-computing-matters/what-quantum-computers-are-good-for",
    "filePath": "Why Quantum Computing Matters/What Quantum Computers Are Good For.md",
    "title": "What Quantum Computers Are Good For",
    "links": [
      "tags/qc/algorithms",
      "why-quantum-computing-matters/the-quantum-algorithm-zoo",
      "quantum-algorithms/hamiltonian-simulation-—-why-it's-hard",
      "error-mitigation/1d-ising-chain-and-the-mirror-trick",
      "why-quantum-computing-matters/quantum-speedup-—-ingredients-and-myths",
      "quantum-algorithms/qaoa-—-quantum-approximate-optimization-algorithm",
      "why-quantum-computing-matters/computational-complexity-—-p,-np,-bqp",
      "why-quantum-computing-matters/quantum-utility-vs-quantum-advantage"
    ],
    "tags": [
      "qc/algorithms"
    ],
    "content": "What Quantum Computers Are Good For\nqc/algorithms\nTranslating complexity-class speedups into actual problem domains. Three broad categories:\n\nSimulating nature — spin models, materials science, quantum chemistry, high-energy physics. The founding motivation for the whole field: “Nature isn’t classical, dammit, and if you want to make a simulation of nature, you’d better make it quantum mechanical” (Feynman, 1981). This is the domain the whole Quantum Algorithms section, this vault’s own Ising-chain benchmark, and the Error Mitigation section’s toolchain are all built around.\nMathematics and data with structure — factoring, the Abelian hidden subgroup problem, supervised/unsupervised learning, time series, regression, linear algebra. “Structure” is the operative word — see Quantum Speedup — Ingredients and Myths for why unstructured problems don’t get the same benefit.\nSearch and optimization — combinatorial optimization, black-box optimization, general mixed-integer programming. Unlike the two domains above, this one is heuristic today, not proven: algorithms like QAOA have no proven speedup over classical solvers (see The Quantum Algorithm Zoo).\n\nNamed industry applications\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSectorExample applicationsAerospace &amp; AutomotiveMaterials design, structural optimizationFinancial ServicesFraud detection, derivatives pricing, portfolio optimization, risk analysisHigh TechSeismic imaging, catalyst design, supply chain, manufacturing schedulingEnergy, Environment &amp; UtilitiesPortfolio optimization, grid optimization, battery designHealth Care &amp; Life SciencesDisease risk prediction, drug discovery, protein folding\nKey insight: none of these are guaranteed wins yet — they’re the domains where the shape of the problem (structured, high-dimensional, hard to simulate classically) matches what quantum algorithms are actually good at, per Computational Complexity — P, NP, BQP. Whether a given instance of any of these actually achieves quantum advantage is a separate, harder question.\nRelated\n\nThe Quantum Algorithm Zoo\nComputational Complexity — P, NP, BQP\nQuantum Utility vs Quantum Advantage\n1D Ising Chain and the Mirror Trick — a concrete “simulating nature” example already in this vault\n\nSelf-Check\n\nCould you name the three problem-area categories and give one example application for each?\nWhy does “structure” keep coming up as the deciding factor for whether quantum helps?\nWhy is naming an industry application not the same as proving quantum advantage for it?\n",
    "order": 999
  }
];
