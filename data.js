// Qashu Curriculum Data Source
// Scraped and structured directly from qcroadmap.com/qc-study-roadmap

export const CURRICULUM_DATA = [
  {
    id: "absolute-basics",
    title: "1. Absolute Basics",
    description: "Core physical and mathematical foundations of quantum information.",
    topics: [
      {
        id: "what-is-a-quantum-computer",
        title: "What is a Quantum Computer",
        subtitle: "(the physical device and why it's not 'a faster classical computer')",
        content: `A quantum computer is a specialized co-processor that stores and transforms information in qubits — quantum-mechanical states — exploiting superposition and entanglement to represent and manipulate information in ways classical bits fundamentally cannot. Key insight: it is not a faster classical computer that tries every answer at once for free. Classical bits are strictly 0 or 1; a qubit's advantage comes from engineered interference between possibilities.

**Hardware Reality:** IBM devices use superconducting transmon qubits running in a dilution refrigerator at ~15 millikelvin. Transmon qubits rely on Josephson junctions—nonlinear inductors that make energy levels non-equidistant, allowing isolated addressing of $|0\\rangle$ and $|1\\rangle$ states.`,
        qiskitCode: `# Initialize a quantum circuit with 1 qubit
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
# Qubit starts in state |0>
psi = Statevector(qc)
print("Initial statevector:", psi.data)`,
        circuit: { qubits: 1, gates: [] }
      },
      {
        id: "what-is-a-qubit",
        title: "What is a Qubit",
        subtitle: "(state vector, ket notation, normalization)",
        content: `A qubit is a state vector in a 2D complex vector space, written in ket notation:
$$|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle, \\qquad \\alpha,\\beta \\in \\mathbb{C}, \\qquad |\\alpha|^2 + |\\beta|^2 = 1$$
The state vector components $\\alpha$ and $\\beta$ represent complex probability amplitudes. The normalization constraint $|\\alpha|^2 + |\\beta|^2 = 1$ ensures the total outcome probability equals 1 upon measurement in the computational basis.`,
        qiskitCode: `from qiskit.quantum_info import Statevector
import numpy as np

# Create an arbitrary normalized statevector: alpha=0.6, beta=0.8
psi = Statevector([0.6, 0.8])
print("Is valid:", psi.is_valid())
print("Probabilities P(0), P(1):", psi.probabilities())`,
        circuit: { qubits: 1, gates: [] }
      },
      {
        id: "superposition",
        title: "Superposition",
        subtitle: "(interference, not classical probability)",
        content: `Superposition is not a classical probability distribution over hidden deterministic states; a qubit in superposition genuinely carries both amplitudes simultaneously, along with their relative phase. 

**Interference:** Quantum amplitudes are complex numbers and can cancel: $\\frac{1}{2} + \\left(-\\frac{1}{2}\\right) = 0$. Computational paths can destructively interfere to eliminate wrong answers, while paths to correct answers constructively reinforce. The Hadamard gate H prepares equal superpositions: $H|0\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}}$.`,
        qiskitCode: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
qc.h(0)  # Apply Hadamard gate to qubit 0

psi = Statevector(qc)
print("Superposition Amplitudes:", psi.data)
print("Outcome Probabilities:", psi.probabilities())`,
        circuit: { qubits: 1, gates: [{ name: 'H', target: 0 }] }
      },
      {
        id: "bloch-sphere",
        title: "Bloch Sphere",
        subtitle: "(the geometric picture — and where it stops applying)",
        content: `Any single-qubit pure state can be visualized as a point on the surface of a 3D unit sphere:
$$|\\psi\\rangle = \\cos\\!\\left(\\frac{\\theta}{2}\\right)|0\\rangle + e^{i\\phi}\\sin\\!\\left(\\frac{\\theta}{2}\\right)|1\\rangle, \\qquad \\theta \\in [0,\\pi],\\ \\phi \\in [0, 2\\pi)$$
North pole ($\\theta=0$) represents $|0\\rangle$, South pole ($\\theta=\\pi$) represents $|1\\rangle$, and the equator represents equal superposition states with relative phase $\\phi$. Single-qubit unitary operations correspond to 3D rotations of this point on the sphere.

*Limit:* The Bloch sphere representation only applies to single-qubit pure states. Multi-qubit entangled states cannot be decomposed into individual points on separate Bloch spheres.`,
        qiskitCode: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
qc.h(0)
qc.t(0)  # Adds pi/4 relative phase rotation around Z-axis

sv = Statevector(qc)
print("Bloch Statevector:", sv.data)`,
        circuit: { qubits: 1, gates: [{ name: 'H', target: 0 }, { name: 'T', target: 0 }] }
      },
      {
        id: "measurement-and-collapse",
        title: "Measurement and Collapse",
        subtitle: "(the Born rule, why quantum programs are inherently probabilistic)",
        content: `Measuring a qubit state $\\alpha|0\\rangle + \\beta|1\\rangle$ in the Z computational basis yields result 0 with probability $|\\alpha|^2$ and result 1 with probability $|\\beta|^2$ (Born rule). Measurement irreversibly collapses the superposition into the measured basis state.

Because a single measurement returns only 1 classical bit, quantum algorithms run many trials ("shots") to construct probability distributions or expectation values.`,
        qiskitCode: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)

# Exact probabilities vs single shot measurement
print("Ideal Probabilities:", Statevector.from_instruction(qc.remove_final_measurements(inplace=False)).probabilities())`,
        circuit: { qubits: 1, gates: [{ name: 'H', target: 0 }, { name: 'M', target: 0 }] }
      }
    ]
  },

  {
    id: "programming-a-quantum-computer",
    title: "2. Programming a Quantum Computer",
    description: "Building, composing, and executing circuits using Qiskit SDK primitives.",
    topics: [
      {
        id: "quantumcircuit-basics",
        title: "QuantumCircuit Basics",
        subtitle: "(registers, adding gates, .compose(), drawing)",
        content: `The \`QuantumCircuit\` object is Qiskit's core abstraction for specifying quantum programs. Circuits manage \`QuantumRegister\` and \`ClassicalRegister\` instances, allow gate append operations, and support modular composition via \`.compose()\`.`,
        qiskitCode: `from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister

qr = QuantumRegister(2, name="q")
cr = ClassicalRegister(2, name="c")
qc = QuantumCircuit(qr, cr)

qc.h(qr[0])
qc.cx(qr[0], qr[1])
qc.measure(qr, cr)

print(qc.draw(output="text"))`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'CX', control: 0, target: 1 }, { name: 'M', target: 0 }, { name: 'M', target: 1 }] }
      },
      {
        id: "the-primitives-family",
        title: "The Primitives Family",
        subtitle: "(Sampler vs Estimator vs Executor, PUBs, local vs Runtime)",
        content: `Qiskit 1.x organizes execution around Primitives:
- **Sampler (SamplerV2):** Calculates quasi-probability distributions of bitstrings from measurement outputs.
- **Estimator (EstimatorV2):** Calculates expectation values of observable operators $\\langle\\psi|H|\\psi\\rangle$.
- **PUBs (Primitive Unified Blocs):** Standardized input tuples \`(circuit, observables, parameter_values)\` passed to Primitive execution methods.`,
        qiskitCode: `from qiskit.circuit import QuantumCircuit
from qiskit.quantum_info import SparsePauliOp
from qiskit_aer.primitives import EstimatorV2

qc = QuantumCircuit(1)
qc.h(0)
observable = SparsePauliOp(["Z", "X"])

estimator = EstimatorV2()
job = estimator.run([(qc, observable)])
pub_result = job.result()[0]
print("Expectation values [⟨Z⟩, ⟨X⟩]:", pub_result.data.evs)`,
        circuit: { qubits: 1, gates: [{ name: 'H', target: 0 }] }
      },
      {
        id: "parameterized-circuits",
        title: "Parameterized Circuits",
        subtitle: "(Parameter/ParameterVector, why transpile-once-bind-many matters)",
        content: `Variational algorithms (VQE, QAOA) require updating gate rotation angles iteratively. Constructing parameterized circuits using \`Parameter\` and \`ParameterVector\` enables compilation and transpilation *once* on hardware backends, binding different parameter values dynamically during execution loops.`,
        qiskitCode: `from qiskit.circuit import QuantumCircuit, ParameterVector

theta = ParameterVector('θ', 2)
qc = QuantumCircuit(2)
qc.rx(theta[0], 0)
qc.ry(theta[1], 1)
qc.cx(0, 1)

# Bind numeric values to parameters
bound_qc = qc.assign_parameters({theta[0]: 0.5, theta[1]: 1.2})
print("Bound circuit depth:", bound_qc.depth())`,
        circuit: { qubits: 2, gates: [{ name: 'RX', target: 0 }, { name: 'RY', target: 1 }, { name: 'CX', control: 0, target: 1 }] }
      },
      {
        id: "simulators-statevector-vs-shot-based",
        title: "Simulators — Statevector vs Shot-Based",
        subtitle: "(exact amplitudes vs sampled counts, fake backends)",
        content: `Classical simulation of quantum circuits takes two main forms:
1. **Statevector Simulation:** Tracks exact $2^N$ complex amplitudes without sampling noise.
2. **Shot-based Simulation:** Emulates real hardware by measuring a statevector $M$ times to yield discrete count frequencies subject to shot noise ($1/\\sqrt{M}$).`,
        qiskitCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)
qc.measure_all()

sim = AerSimulator()
result = sim.run(qc, shots=1000).result()
counts = result.get_counts()
print("Sampled Counts:", counts)`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'CX', control: 0, target: 1 }, { name: 'M', target: 0 }, { name: 'M', target: 1 }] }
      }
    ]
  },

  {
    id: "foundations",
    title: "3. Foundations",
    description: "Pauli operators, unitary matrices, universal gate sets, and Clifford algebra.",
    topics: [
      {
        id: "pauli-operators",
        title: "Pauli Operators",
        subtitle: "(X, Y, Z, identity, matrix representations, commutation rules)",
        content: `The 2×2 complex Hermitian and Unitary Pauli matrices form a complete basis for all 1-qubit operators:
$$I = \\begin{pmatrix}1 & 0\\\\ 0 & 1\\end{pmatrix}, \\quad X = \\begin{pmatrix}0 & 1\\\\ 1 & 0\\end{pmatrix}, \\quad Y = \\begin{pmatrix}0 & -i\\\\ i & 0\\end{pmatrix}, \\quad Z = \\begin{pmatrix}1 & 0\\\\ 0 & -1\\end{pmatrix}$$
Algebraic identities: $X^2=Y^2=Z^2=I$, $XY=iZ$, $[X, Y] = 2iZ$. Anti-commutation: $\{X, Z\} = XZ + ZX = 0$.`,
        qiskitCode: `from qiskit.quantum_info import Pauli

X = Pauli('X')
Z = Pauli('Z')
print("X matrix:\\n", X.to_matrix())
print("XZ product:\\n", (X & Z).to_matrix())`,
        circuit: { qubits: 1, gates: [{ name: 'X', target: 0 }, { name: 'Z', target: 0 }] }
      },
      {
        id: "sparsepauliop",
        title: "SparsePauliOp",
        subtitle: "(constructing observable operators efficiently in Qiskit)",
        content: `\`SparsePauliOp\` represents linear combinations of multi-qubit Pauli strings: $H = \\sum_k c_k P_k$. This is the standard data structure for molecular Hamiltonians in chemistry and cost functions in QAOA/VQE.`,
        qiskitCode: `from qiskit.quantum_info import SparsePauliOp

# Hamiltonian: 0.5 * Z0 Z1 + 0.2 * X0 X1
op = SparsePauliOp.from_list([("ZZ", 0.5), ("XX", 0.2)])
print("Observable matrix shape:", op.to_matrix().shape)
print("Operator representation:", op)`,
        circuit: { qubits: 2, gates: [] }
      },
      {
        id: "gates-xhcxzt",
        title: "X / H / CX / Z / S / T Gates",
        subtitle: "(single and multi-qubit gate operations)",
        content: `Elementary gate definitions:
- **Hadamard (H):** Converts computational basis states to superposition basis states: $H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix}1 & 1 \\\\ 1 & -1\\end{pmatrix}$.
- **Phase Gates:** Z ($\\pi$), S ($\\pi/2$), T ($\\pi/4$). $T^2 = S, S^2 = Z$.
- **Controlled-NOT (CX):** Entangling 2-qubit gate; flips target qubit if control qubit is $|1\\rangle$.`,
        qiskitCode: `from qiskit import QuantumCircuit

qc = QuantumCircuit(2)
qc.h(0)
qc.s(0)
qc.t(0)
qc.cx(0, 1)
print(qc)`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'S', target: 0 }, { name: 'T', target: 0 }, { name: 'CX', control: 0, target: 1 }] }
      },
      {
        id: "tensor-products",
        title: "Tensor Products",
        subtitle: "(combining qubit statevectors and operator matrices)",
        content: `Multi-qubit states live in the tensor product vector space $\\mathcal{H}_1 \\otimes \\mathcal{H}_2 \\otimes \\dots \\otimes \\mathcal{H}_N$. A 2-qubit statevector has $2^2 = 4$ complex components:
$$|\\psi_1\\rangle \\otimes |\\psi_2\\rangle = (a|0\\rangle + b|1\\rangle) \\otimes (c|0\\rangle + d|1\\rangle) = ac|00\\rangle + ad|01\\rangle + bc|10\\rangle + bd|11\\rangle$$`,
        qiskitCode: `from qiskit.quantum_info import Statevector

v1 = Statevector.from_label('0')
v2 = Statevector.from_label('1')
v_joint = v1.tensor(v2)
print("Joint 2-qubit state |01>:", v_joint.data)`,
        circuit: { qubits: 2, gates: [] }
      },
      {
        id: "why-gates-are-unitary",
        title: "Why Gates Are Unitary",
        subtitle: "(reversibility, norm preservation, U† U = I)",
        content: `Quantum evolution is governed by the Schrödinger equation, dictating that all valid closed-system transformations are represented by Unitary matrices ($U^\\dagger U = U U^\\dagger = I$).

**Physical Implications:**
1. **Norm Preservation:** Unitary operations preserve total probability $\\langle\\psi|U^\\dagger U|\\psi\\rangle = \\langle\\psi|\\psi\\rangle = 1$.
2. **Reversibility:** Every quantum operation has a deterministic inverse $U^\\dagger$. Information is never lost during gate operations prior to measurement.`,
        qiskitCode: `from qiskit.quantum_info import Operator
from qiskit import QuantumCircuit
import numpy as np

qc = QuantumCircuit(1)
qc.h(0)
U = Operator(qc).data
# Check unitarity U^dagger * U = I
identity_check = np.allclose(U.conj().T @ U, np.eye(2))
print("Is Unitary:", identity_check)`,
        circuit: { qubits: 1, gates: [{ name: 'H', target: 0 }] }
      },
      {
        id: "universal-gate-sets",
        title: "Universal Gate Sets & Clifford Group",
        subtitle: "(Gottesman-Knill theorem, non-Clifford T gate)",
        content: `- **Clifford Group:** Generated by {H, S, CX}. By the Gottesman-Knill theorem, any circuit consisting purely of Clifford gates can be efficiently simulated classically in polynomial time $O(N^2)$.
- **Universal Quantum Computing:** Adding any non-Clifford gate (such as the T gate $\\text{diag}(1, e^{i\\pi/4})$) to the Clifford set enables universal quantum computation capable of performing arbitrary unitary transformations.`,
        qiskitCode: `from qiskit import QuantumCircuit

# Clifford + T Universal Set Example
qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)  # Clifford part
qc.t(0)      # Non-Clifford gate enabling universality
print(qc)`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'CX', control: 0, target: 1 }, { name: 'T', target: 0 }] }
      }
    ]
  },

  {
    id: "why-quantum-computing-matters",
    title: "4. Why Quantum Computing Matters",
    description: "Algorithmic speedups, complexity classes, and quantum utility benchmarks.",
    topics: [
      {
        id: "quantum-speedup",
        title: "Quantum Speedup (Ingredients & Myths)",
        subtitle: "(the true mechanism of quantum advantage)",
        content: `Quantum speedups do not arise from evaluating $2^N$ possibilities simultaneously in classical parallel fashion. They stem from quantum interference engineered across an exponential state space to concentrate probability amplitude onto correct solutions while canceling false solutions.`,
        qiskitCode: `# Interference demo
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
qc.h(0)
qc.h(0) # H^2 = I, destructive interference of |1> path
print("Statevector after H-H:", Statevector(qc).data)`,
        circuit: { qubits: 1, gates: [{ name: 'H', target: 0 }, { name: 'H', target: 0 }] }
      },
      {
        id: "deutschs-algorithm",
        title: "Deutsch's Algorithm",
        subtitle: "(first quantum algorithm showing speedup)",
        content: `Deutsch's algorithm determines whether a black-box boolean function $f: \\{0,1\\} \\to \\{0,1\\}$ is constant ($f(0)=f(1)$) or balanced ($f(0) \\neq f(1)$) using a single quantum evaluation, whereas classical algorithms require 2 evaluations.`,
        qiskitCode: `from qiskit import QuantumCircuit

# Deutsch algorithm circuit template for balanced oracle f(x)=x
qc = QuantumCircuit(2, 1)
qc.x(1)
qc.h([0, 1])
qc.cx(0, 1) # Balanced Oracle
qc.h(0)
qc.measure(0, 0)
print(qc)`,
        circuit: { qubits: 2, gates: [{ name: 'X', target: 1 }, { name: 'H', target: 0 }, { name: 'H', target: 1 }, { name: 'CX', control: 0, target: 1 }, { name: 'H', target: 0 }, { name: 'M', target: 0 }] }
      },
      {
        id: "deutsch-jozsa",
        title: "Deutsch-Jozsa Algorithm",
        subtitle: "(constant vs balanced function evaluation in 1 query)",
        content: `Extends Deutsch's problem to $N$-bit inputs $f: \\{0,1\\}^N \\to \\{0,1\\}$. Determines if $f$ is constant or balanced in 1 quantum query. Classically requires $2^{N-1}+1$ queries in the worst case, demonstrating exponential query complexity speedup.`,
        qiskitCode: `from qiskit import QuantumCircuit

n = 3
qc = QuantumCircuit(n + 1, n)
qc.x(n)
qc.h(range(n + 1))
# Oracle insertion would go here
qc.h(range(n))
qc.measure(range(n), range(n))
print("Deutsch-Jozsa N=3 framework built.")`,
        circuit: { qubits: 4, gates: [{ name: 'X', target: 3 }, { name: 'H', target: 0 }, { name: 'H', target: 1 }, { name: 'H', target: 2 }, { name: 'H', target: 3 }, { name: 'H', target: 0 }, { name: 'H', target: 1 }, { name: 'H', target: 2 }] }
      },
      {
        id: "computational-complexity",
        title: "Computational Complexity (P / NP / BQP)",
        subtitle: "(where quantum computers sit in complexity theory)",
        content: `- **P:** Problems solvable in polynomial time classically.
- **NP:** Problems verifiable in polynomial time classically.
- **BQP (Bounded-Error Quantum Polynomial-Time):** Class of decision problems solvable by a quantum computer in polynomial time with error probability ≤ 1/3.
BQP contains P and is contained in PSPACE. It is believed BQP ⊄ P and BQP does not contain NP-complete problems.`,
        qiskitCode: `# Complexity classification metadata
print("BQP Hierarchy: P ⊆ BQP ⊆ PSPACE")`,
        circuit: { qubits: 1, gates: [] }
      },
      {
        id: "quantum-algorithm-zoo",
        title: "The Quantum Algorithm Zoo",
        subtitle: "(comprehensive catalog of quantum algorithms)",
        content: `Catalogs quantum algorithms offering speedups over classical counterparts:
- **Algebraic / Number Theoretic:** Shor's Factoring ($O(N^3)$ vs sub-exponential classical), Discrete Logarithm.
- **Oracular / Search:** Grover Search ($O(\\sqrt{N})$ vs $O(N)$), Amplitude Amplification.
- **Simulation / Linear Algebra:** HHL (Linear Systems), Trotterized Hamiltonian Simulation.`,
        qiskitCode: `# Quantum Algorithm Zoo Reference
print("Shor: Exponential speedup for factoring.")
print("Grover: Quadratic speedup for unstructured search.")`,
        circuit: { qubits: 1, gates: [] }
      },
      {
        id: "quantum-utility-vs-advantage",
        title: "Quantum Utility vs Quantum Advantage",
        subtitle: "(useful classical-beating calculations vs formal speedup)",
        content: `- **Quantum Utility:** Executing quantum calculations on un-errored/mitigated hardware at scales beyond exact brute-force classical simulation (e.g. 100+ qubits, depth 100+) producing reliable expectation values.
- **Quantum Advantage:** Formally proving superior computational speedup or cost-efficiency over the best possible classical algorithm for a practical real-world problem.`,
        qiskitCode: `# Utility benchmark reference
print("Utility threshold: 100+ qubits, circuit depth > 100, reliable expectation values.")`,
        circuit: { qubits: 1, gates: [] }
      }
    ]
  },

  {
    id: "entangled-states",
    title: "5. Entangled States",
    description: "Bell pairs, GHZ multi-qubit entanglement, Bell tests, and teleportation.",
    topics: [
      {
        id: "bell-states",
        title: "Bell States",
        subtitle: "(the 4 maximally entangled 2-qubit basis states)",
        content: `The 4 Bell states form an orthonormal basis for 2-qubit entangled space:
1. $|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}$
2. $|\\Phi^-\\rangle = \\frac{|00\\rangle - |11\\rangle}{\\sqrt{2}}$
3. $|\\Psi^+\\rangle = \\frac{|01\\rangle + |10\\rangle}{\\sqrt{2}}$
4. $|\\Psi^-\\rangle = \\frac{|01\\rangle - |10\\rangle}{\\sqrt{2}}$

Constructed by preparing H on qubit 0, followed by CNOT(0,1), with optional Pauli X/Z single-qubit pre/post gates.`,
        qiskitCode: `from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)

sv = Statevector(qc)
print("Bell state |Φ+> vector:\\n", sv.data)`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'CX', control: 0, target: 1 }] }
      },
      {
        id: "ghz-states",
        title: "GHZ States",
        subtitle: "(N-qubit maximal entanglement)",
        content: `The Greenberger-Horne-Zeilinger (GHZ) state generalizes Bell entanglement to $N$ qubits:
$$|\\text{GHZ}_N\\rangle = \\frac{|00\\dots0\\rangle + |11\\dots1\\rangle}{\\sqrt{2}}$$
Measuring any single qubit in the computational basis collapses all remaining $N-1$ qubits instantly into identical classical states (all 0s or all 1s).`,
        qiskitCode: `from qiskit import QuantumCircuit

n = 4
qc = QuantumCircuit(n)
qc.h(0)
for i in range(n - 1):
    qc.cx(i, i + 1)

print(qc.draw(output="text"))`,
        circuit: { qubits: 4, gates: [{ name: 'H', target: 0 }, { name: 'CX', control: 0, target: 1 }, { name: 'CX', control: 1, target: 2 }, { name: 'CX', control: 2, target: 3 }] }
      },
      {
        id: "chsh-inequality",
        title: "CHSH Inequality & Bell Tests",
        subtitle: "(S ≤ 2 classical vs S = 2√2 quantum violation)",
        content: `The CHSH test proves experimental violation of local hidden-variable realism. Under classical local realism, the correlation combination $S \\le 2$. Quantum mechanics predicts $S = 2\\sqrt{2} \\approx 2.828$ for maximally entangled Bell states at optimal measurement setting angles.`,
        qiskitCode: `from qiskit import QuantumCircuit
import numpy as np

# CHSH setup: Alice (0, pi/4), Bob (pi/8, 3pi/8)
qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)
qc.ry(np.pi/4, 0)
qc.ry(np.pi/8, 1)
print("CHSH measurement circuit prepared.")`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'CX', control: 0, target: 1 }, { name: 'RY', target: 0 }, { name: 'RY', target: 1 }] }
      },
      {
        id: "quantum-teleportation",
        title: "Quantum Teleportation",
        subtitle: "(state transfer via pre-shared Bell pair + 2 classical bits)",
        content: `Transfers an unknown state $|\\psi\\rangle$ from Alice to Bob using 1 pre-shared Bell pair and 2 classical bits sent via classical communication channel. Alice's original state is destroyed upon measurement, fully obeying the No-Cloning theorem.`,
        qiskitCode: `from qiskit import QuantumCircuit

qc = QuantumCircuit(3, 2)
# Step 1: Bell pair setup between Alice (1) and Bob (2)
qc.h(1)
qc.cx(1, 2)
# Step 2: Alice entangles input qubit (0) with her Bell qubit (1)
qc.cx(0, 1)
qc.h(0)
# Step 3: Alice measures qubits 0 and 1
qc.measure([0, 1], [0, 1])
# Step 4: Bob applies conditional corrections (X, Z) based on bits
with qc.if_test((qc.clbits[1], 1)):
    qc.x(2)
with qc.if_test((qc.clbits[0], 1)):
    qc.z(2)

print(qc.draw(output="text"))`,
        circuit: { qubits: 3, gates: [{ name: 'H', target: 1 }, { name: 'CX', control: 1, target: 2 }, { name: 'CX', control: 0, target: 1 }, { name: 'H', target: 0 }, { name: 'M', target: 0 }, { name: 'M', target: 1 }, { name: 'X', target: 2 }, { name: 'Z', target: 2 }] }
      },
      {
        id: "no-cloning-theorem",
        title: "No-Cloning Theorem",
        subtitle: "(sketches: copy → know → measure → disturb)",
        content: `States that an arbitrary unknown quantum state $|\\psi\\rangle$ cannot be cloned identically: $U(|\\psi\\rangle|0\\rangle) \\neq |\\psi\\rangle|\\psi\\rangle$. Proof relies on unitarity: unitary operations preserve inner products, which is violated if $U(|\\psi\\rangle|0\\rangle) = |\\psi\\rangle|\\psi\\rangle$ for non-orthogonal states.`,
        qiskitCode: `# Proof concept: Unitary inner product preservation
# <psi|phi> != (<psi|phi>)^2 for general quantum states
print("No-cloning enforces quantum cryptography security.")`,
        circuit: { qubits: 2, gates: [] }
      }
    ]
  },

  {
    id: "quantum-communication",
    title: "6. Quantum Communication",
    description: "Quantum Key Distribution (QKD) protocols including E91 and BB84.",
    topics: [
      {
        id: "bb84-qkd",
        title: "BB84 Protocol",
        subtitle: "(polarization/basis encoding, eavesdropping detection)",
        content: `First quantum key distribution protocol (Bennett & Brassard 1984). Alice transmits single photons randomly prepared in one of two non-orthogonal bases (Rectilinear Z or Diagonal X). Bob measures randomly in either basis. Eavesdropping (Eve) introduces detectable error rates due to state disturbance upon measurement.`,
        qiskitCode: `from qiskit import QuantumCircuit
import random

# BB84 Alice preparation example
bits = [1, 0, 1]
bases = ['Z', 'X', 'Z']

qc = QuantumCircuit(3)
for i in range(3):
    if bits[i] == 1:
        qc.x(i)
    if bases[i] == 'X':
        qc.h(i)

print(qc)`,
        circuit: { qubits: 3, gates: [{ name: 'X', target: 0 }, { name: 'H', target: 1 }, { name: 'X', target: 2 }] }
      },
      {
        id: "e91-qkd",
        title: "E91 Protocol",
        subtitle: "(Entanglement-based QKD using CHSH Bell violation)",
        content: `Ekert QKD protocol (1991). Uses entangled Bell pairs distributed from an central source to Alice and Bob. Security is guaranteed by testing CHSH inequality violation on subset runs; any eavesdropping destroys entanglement and lowers $S \\le 2$.`,
        qiskitCode: `from qiskit import QuantumCircuit

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1) # Entangled pair source
print("E91 Bell Pair Source Ready.")`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'CX', control: 0, target: 1 }] }
      }
    ]
  },

  {
    id: "depth-and-optimization",
    title: "7. Depth & Optimization",
    description: "Circuit depth reduction, critical-path scheduling, and recursive fan-out techniques.",
    topics: [
      {
        id: "circuit-depth",
        title: "Circuit Depth",
        subtitle: "(critical-path parallel scheduling, .depth())",
        content: `Circuit depth represents the number of sequential layers of gates required assuming maximal parallel execution. Two gates share a layer only if they act on disjoint qubits. Minimizing depth reduces exposure to $T_1/T_2$ decoherence noise.`,
        qiskitCode: `from qiskit import QuantumCircuit

qc = QuantumCircuit(3)
qc.h(0)
qc.h(1)  # Parallel layer with h(0) -> depth 1
qc.cx(0, 2)
qc.cx(1, 2)  # Sequential on qubit 2 -> depth 3

print("Total Gate Count:", qc.size())
print("Circuit Depth:", qc.depth())`,
        circuit: { qubits: 3, gates: [{ name: 'H', target: 0 }, { name: 'H', target: 1 }, { name: 'CX', control: 0, target: 2 }, { name: 'CX', control: 1, target: 2 }] }
      },
      {
        id: "circuit-introspection",
        title: "Circuit Introspection Cheat Sheet",
        subtitle: "(num_qubits, 2-qubit depth, count_ops(), num_nonlocal_gates())",
        content: `Qiskit methods for introspecting structural circuit metrics:
- \`qc.depth()\`: Longest layer chain.
- \`qc.depth(filter_function)\`: Depth counting only multi-qubit gates.
- \`qc.count_ops()\`: Frequency dict of gate names.
- \`qc.num_nonlocal_gates()\`: Count of multi-qubit entangling gates.`,
        qiskitCode: `from qiskit import QuantumCircuit

qc = QuantumCircuit(3)
qc.h(0)
qc.cx(0, 1)
qc.cx(1, 2)

metrics = {
    "num_qubits": qc.num_qubits,
    "depth": qc.depth(),
    "cx_depth": qc.depth(lambda i: i.operation.name == 'cx'),
    "ops": dict(qc.count_ops()),
    "nonlocal": qc.num_nonlocal_gates()
}
print("Circuit Introspection Metrics:\\n", metrics)`,
        circuit: { qubits: 3, gates: [{ name: 'H', target: 0 }, { name: 'CX', control: 0, target: 1 }, { name: 'CX', control: 1, target: 2 }] }
      },
      {
        id: "start-from-the-middle",
        title: "Start From the Middle",
        subtitle: "(halving CX depth for GHZ states)",
        content: `Because GHZ states are symmetric, preparing them by starting Hadamard at the central qubit and entangling outwards simultaneously in both directions halves CNOT depth compared to a single-ended chain.`,
        qiskitCode: `from qiskit import QuantumCircuit

# 5 Qubit GHZ starting from middle (qubit 2)
qc = QuantumCircuit(5)
qc.h(2)
qc.cx(2, 1)
qc.cx(2, 3)
qc.cx(1, 0)
qc.cx(3, 4)
print("Middle-out GHZ depth:", qc.depth())`,
        circuit: { qubits: 5, gates: [{ name: 'H', target: 2 }, { name: 'CX', control: 2, target: 1 }, { name: 'CX', control: 2, target: 3 }, { name: 'CX', control: 1, target: 0 }, { name: 'CX', control: 3, target: 4 }] }
      },
      {
        id: "recursive-fan-out",
        title: "Recursive Fan-Out",
        subtitle: "(doubling entanglement spread per layer: ⌈log₂ N⌉ + 1)",
        content: `Applies recursive tree doubling to generate GHZ states in $\\lceil\\log_2 N\\rceil + 1$ depth. Each newly entangled qubit acts as a control in subsequent parallel layers.`,
        qiskitCode: `from qiskit import QuantumCircuit

# 4 Qubit Tree GHZ
qc = QuantumCircuit(4)
qc.h(0)
# Layer 1: Q0 -> Q2
qc.cx(0, 2)
# Layer 2: Q0 -> Q1, Q2 -> Q3 in parallel!
qc.cx(0, 1)
qc.cx(2, 3)

print("Recursive Fan-out Depth for N=4:", qc.depth())`,
        circuit: { qubits: 4, gates: [{ name: 'H', target: 0 }, { name: 'CX', control: 0, target: 2 }, { name: 'CX', control: 0, target: 1 }, { name: 'CX', control: 2, target: 3 }] }
      }
    ]
  },

  {
    id: "hardware-reality",
    title: "8. Hardware Reality",
    description: "Transpilation, topology constraints, SWAP routing, and backend properties.",
    topics: [
      {
        id: "heavy-hex-topology",
        title: "Heavy-Hex Topology",
        subtitle: "(IBM hardware lattice layout: vertices, edges, ancilla)",
        content: `IBM's Eagle/Heron processors use Heavy-Hex graph topology—a hex lattice with ancillary qubits located on edge connections. Reduces frequency crosstalk while maintaining efficient connectivity for surface codes and transpiled QAOA.`,
        qiskitCode: `# Heavy-hex topology overview
print("Heavy-hex layout reduces frequency collision crosstalk.")`,
        circuit: { qubits: 3, gates: [] }
      },
      {
        id: "transpilation",
        title: "Transpilation & Routing",
        subtitle: "(basis gates decomposition, SWAP overhead, coupling maps)",
        content: `Transpilation rewrites abstract quantum circuits into hardware-native basis gates (e.g. \`ECR\`, \`CZ\`, \`RZ\`, \`SX\`, \`X\`) constrained by physical qubit connectivity (\`CouplingMap\`). Non-adjacent multi-qubit gates require routing algorithms to insert \`SWAP\` operations.`,
        qiskitCode: `from qiskit import QuantumCircuit
from qiskit.transpiler.preset_passmanagers import generate_preset_pass_manager

qc = QuantumCircuit(3)
qc.ccx(0, 1, 2) # Toffoli gate

# Transpile to basis gates
pm = generate_preset_pass_manager(optimization_level=2, basis_gates=['sx', 'x', 'rz', 'cx'])
transpiled_qc = pm.run(qc)
print("Transpiled CX count:", transpiled_qc.count_ops().get('cx', 0))`,
        circuit: { qubits: 3, gates: [{ name: 'H', target: 2 }, { name: 'CX', control: 1, target: 2 }, { name: 'T', target: 2 }, { name: 'CX', control: 0, target: 2 }] }
      },
      {
        id: "backend-properties",
        title: "Backend Properties & Noise Numbers",
        subtitle: "(T1, T2, single-qubit error, CX error, readout error)",
        content: `Physical backend performance parameters:
- **T₁ Relaxation Time:** Characteristic time for qubit to decay from $|1\\rangle$ to $|0\\rangle$ due to thermal energy dissipation (~200–300 μs on Heron).
- **T₂ Dephasing Time:** Time scale over which relative quantum phase coherence is lost.
- **Readout Error:** Confusion probability matrix during qubit state assignment.`,
        qiskitCode: `# Backend physical properties format
properties = {
    "T1_microsec": 240.5,
    "T2_microsec": 180.2,
    "single_qubit_gate_error": 0.0002,
    "two_qubit_ecr_error": 0.0045,
    "readout_error": 0.012
}
print("Sample IBM Heron Backend Metrics:", properties)`,
        circuit: { qubits: 1, gates: [] }
      }
    ]
  },

  {
    id: "noise-and-error-models",
    title: "9. Noise & Error Models",
    description: "Density matrices, Pauli error channels, relaxation, and randomized benchmarking.",
    topics: [
      {
        id: "density-matrix",
        title: "Density Matrix",
        subtitle: "(ρ = ∑ p_i |ψ_i⟩⟨ψ_i|, mixed vs pure states)",
        content: `The density matrix $\\rho$ describes statistical ensembles of pure states and open quantum systems:
$$\\rho = \\sum_i p_i |\\psi_i\\rangle\\langle\\psi_i|$$
Properties: $\\text{Tr}(\\rho) = 1$, $\\rho = \\rho^\\dagger$, positive semi-definite. Pure states satisfy $\\text{Tr}(\\rho^2) = 1$; mixed states satisfy $\\text{Tr}(\\rho^2) < 1$.`,
        qiskitCode: `from qiskit.quantum_info import DensityMatrix, Statevector

# Mixed state: 50% |0>, 50% |1>
rho = DensityMatrix(0.5 * Statevector.from_label('0').to_operator() + 
                    0.5 * Statevector.from_label('1').to_operator())

print("Purity Tr(ρ^2):", rho.purity())`,
        circuit: { qubits: 1, gates: [] }
      },
      {
        id: "pauli-noise-models",
        title: "Pauli & Depolarizing Noise Models",
        subtitle: "(bit-flip, phase-flip, thermal relaxation channels)",
        content: `Models physical environmental decoherence channels:
- **Depolarizing Noise:** Replaces qubit state with maximally mixed state $I/2$ with probability $p$.
- **Bit-Flip Channel:** Applies X gate error with probability $p$.
- **Phase-Flip Channel:** Applies Z gate error with probability $p$.`,
        qiskitCode: `from qiskit_aer.noise import NoiseModel, depolarizing_error

noise_model = NoiseModel()
error = depolarizing_error(0.01, 1)  # 1% depolarizing error
noise_model.add_all_qubit_quantum_error(error, ['h'])

print("Noise model configured for simulation.")`,
        circuit: { qubits: 1, gates: [] }
      }
    ]
  },

  {
    id: "dynamic-circuits",
    title: "10. Dynamic Circuits",
    description: "Mid-circuit measurement, qubit reset/reuse, and feedforward control.",
    topics: [
      {
        id: "dynamic-circuits-basics",
        title: "Dynamic Circuits Overview",
        subtitle: "(mid-circuit measurement, qc.reset(), qc.if_test(), feedforward)",
        content: `Dynamic circuits break the standard static pipeline (prep -> gates -> measure) by allowing mid-circuit measurements and classical control flow (\`if_test\`, \`while_loop\`) to condition future quantum operations dynamically within the hardware coherence window.`,
        qiskitCode: `from qiskit import QuantumCircuit

qc = QuantumCircuit(2, 1)
qc.h(0)
qc.measure(0, 0)
qc.reset(0)

# Feedforward: apply X on qubit 1 if measurement on qubit 0 was 1
with qc.if_test((qc.clbits[0], 1)):
    qc.x(1)

print(qc.draw(output="text"))`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'M', target: 0 }, { name: 'X', target: 1 }] }
      },
      {
        id: "dynamic-ghz-reuse",
        title: "Dynamic GHZ via Qubit Reuse",
        subtitle: "(PRX Quantum 2024 construction for long-range entanglement)",
        content: `Constructs long-range GHZ entanglement across arbitrary distances using only nearest-neighbor connections by performing mid-circuit parity measurements and classical feedforward corrections. Drastically lowers SWAP depth overhead on limited connectivity graphs.`,
        qiskitCode: `# Dynamic GHZ step pattern
# 1. H on data qubits
# 2. CX with ancillary bridge qubits
# 3. Measure & Reset bridge qubits
# 4. Classical feedforward correction on target data qubits`,
        circuit: { qubits: 3, gates: [{ name: 'H', target: 0 }, { name: 'CX', control: 0, target: 1 }, { name: 'M', target: 1 }, { name: 'X', target: 2 }] }
      }
    ]
  },

  {
    id: "error-mitigation",
    title: "11. Error Mitigation",
    description: "Zero Noise Extrapolation (ZNE), PEC, TREX, and quantum error correction principles.",
    topics: [
      {
        id: "zne-and-pec",
        title: "Zero Noise Extrapolation (ZNE) & PEC",
        subtitle: "(noise amplification extrapolation & probabilistic cancellation)",
        content: `- **Zero Noise Extrapolation (ZNE):** Intentionally amplifies hardware noise (e.g. by pulse stretching or digital gate folding $G \\to G G^\\dagger G$), measures expectation values at multiple noise levels, and extrapolates back to the zero-noise limit.
- **Probabilistic Error Cancellation (PEC):** Expresses ideal un-errored operations as linear combinations of noisy hardware channels, sampling inverted noise instances at the cost of sampling overhead.`,
        qiskitCode: `# Digital Gate Folding for ZNE: G -> G G_dag G
from qiskit import QuantumCircuit

qc = QuantumCircuit(1)
qc.h(0) # Original gate

# Folded gate for 3x noise scaling
qc.h(0)
qc.h(0) # H_dag = H
qc.h(0)
print("Folded Circuit Gate Count:", qc.size())`,
        circuit: { qubits: 1, gates: [{ name: 'H', target: 0 }, { name: 'H', target: 0 }, { name: 'H', target: 0 }, { name: 'H', target: 0 }] }
      },
      {
        id: "error-correction-ec",
        title: "Error Correction (EC) & Surface Codes",
        subtitle: "(stabilizer codes, syndrome measurements, logical qubits)",
        content: `Quantum Error Correction (QEC) protects arbitrary unknown quantum states by encoding 1 logical qubit into $K$ physical qubits using stabilizer code operators (e.g. Surface Codes). Syndrome measurements detect bit and phase errors continuously without measuring logical state data.`,
        qiskitCode: `# Distance-3 Surface Code conceptual layout
print("Surface code encodes 1 logical qubit across D^2 physical qubits.")`,
        circuit: { qubits: 3, gates: [] }
      }
    ]
  },

  {
    id: "quantum-algorithms",
    title: "12. Quantum Algorithms",
    description: "QFT, QPE (H2 Worked Example), VQE, QAOA (Partition Problem Worked Example), and Grover Search.",
    topics: [
      {
        id: "qft-and-qpe",
        title: "QFT & Quantum Phase Estimation (QPE)",
        subtitle: "(with H2 Worked Example)",
        content: `- **Quantum Fourier Transform (QFT):** Maps computational basis states to phase frequency basis in $O(N^2)$ gates vs classical FFT $O(N 2^N)$.
- **Quantum Phase Estimation (QPE):** Estimates the eigenvalue phase $\\theta$ of unitary operator $U|\\psi\\rangle = e^{2\\pi i \\theta}|\\psi\\rangle$. Foundation for Shor's algorithm and molecular ground state chemistry.

**Worked Example Note — $H_2$ Molecule Ground State:**
Estimating the molecular ground state energy of $H_2$ at bond distance $R=0.735\\text{ Å}$. The Jordan-Wigner transformation maps the 2-qubit molecular Hamiltonian into Pauli operators $H = c_0 I + c_1 Z_0 + c_2 Z_1 + c_3 Z_0 Z_1 + c_4 X_0 X_1$. QPE measures the phase $\\theta = E_{\\text{ground}} / (2\\pi)$. *(Links back to worked example on source site)*.`,
        qiskitCode: `from qiskit import QuantumCircuit
import numpy as np

# 3-Qubit QFT Circuit Construction
qc = QuantumCircuit(3)
qc.h(2)
qc.cp(np.pi/2, 1, 2)
qc.cp(np.pi/4, 0, 2)
qc.h(1)
qc.cp(np.pi/2, 0, 1)
qc.h(0)
qc.swap(0, 2)
print("QFT Circuit:\\n", qc.draw(output="text"))`,
        circuit: { qubits: 3, gates: [{ name: 'H', target: 2 }, { name: 'H', target: 1 }, { name: 'H', target: 0 }, { name: 'SWAP', control: 0, target: 2 }] }
      },
      {
        id: "grovers-algorithm",
        title: "Grover's Search Algorithm",
        subtitle: "(amplitude amplification for O(√N) search)",
        content: `Searches an unstructured database of $N = 2^n$ elements in $O(\\sqrt{N})$ queries. Uses an Oracle phase-inversion step followed by a Diffuser operator (inversion about the mean) to amplify the amplitude of target marked elements.`,
        qiskitCode: `from qiskit import QuantumCircuit

# Grover search circuit for marking state |11>
qc = QuantumCircuit(2, 2)
qc.h([0, 1])

# Oracle for |11>
qc.cz(0, 1)

# Diffuser
qc.h([0, 1])
qc.x([0, 1])
qc.cz(0, 1)
qc.x([0, 1])
qc.h([0, 1])
qc.measure([0, 1], [0, 1])

print(qc.draw(output="text"))`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'H', target: 1 }, { name: 'CZ', control: 0, target: 1 }, { name: 'H', target: 0 }, { name: 'H', target: 1 }, { name: 'X', target: 0 }, { name: 'X', target: 1 }, { name: 'CZ', control: 0, target: 1 }, { name: 'X', target: 0 }, { name: 'X', target: 1 }, { name: 'H', target: 0 }, { name: 'H', target: 1 }, { name: 'M', target: 0 }, { name: 'M', target: 1 }] }
      },
      {
        id: "vqe-and-qaoa",
        title: "VQE & QAOA",
        subtitle: "(with Partition Problem Worked Example)",
        content: `- **VQE (Variational Quantum Eigensolver):** Hybrid quantum-classical algorithm using parameterized ansatz $U(\\theta)$ to minimize expectation value $\\langle\\psi(\\theta)|H|\\psi(\\theta)\\rangle$ to bound ground-state energies.
- **QAOA (Quantum Approximate Optimization Algorithm):** Solves combinatorial optimization graph problems (Max-Cut, Partitioning) using alternating cost Hamiltonian $H_C$ and mixer Hamiltonian $H_M = \\sum X_i$ layers.

**Worked Example Note — Number Partitioning Problem:**
Partitioning a set of numbers $S = \\{s_1, s_2, \\dots, s_N\\}$ into two subsets such that difference $(\\sum_{i \\in A} s_i - \\sum_{j \\in B} s_j)^2$ is minimized. Mapped to Ising Hamiltonian $H_C = (\\sum s_i Z_i)^2$. QAOA evaluates cost expectations using Estimator primitive. *(Links back to worked example on source site)*.`,
        qiskitCode: `from qiskit import QuantumCircuit
from qiskit.circuit import Parameter

gamma = Parameter('γ')
beta = Parameter('β')

qc = QuantumCircuit(2)
qc.h([0, 1])
# Cost Hamiltonian layer
qc.cx(0, 1)
qc.rz(2 * gamma, 1)
qc.cx(0, 1)
# Mixer layer
qc.rx(2 * beta, [0, 1])

print(qc.draw(output="text"))`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'H', target: 1 }, { name: 'CX', control: 0, target: 1 }, { name: 'RZ', target: 1 }, { name: 'CX', control: 0, target: 1 }, { name: 'RX', target: 0 }, { name: 'RX', target: 1 }] }
      }
    ]
  },

  {
    id: "quantum-machine-learning",
    title: "13. Quantum Machine Learning",
    description: "Quantum Feature Maps, Quantum Neural Networks (QNN), and Kernel Methods.",
    topics: [
      {
        id: "data-encoding-feature-maps",
        title: "Data Encoding & Feature Maps",
        subtitle: "(ZZFeatureMap, non-linear classical to quantum embedding)",
        content: `Quantum Feature Maps map classical input vectors $x \\in \\mathbb{R}^D$ into quantum Hilbert states $|\\Phi(x)\\rangle$. \`ZZFeatureMap\` uses non-linear single-qubit rotations combined with entangling ZZ phase interactions to create high-dimensional kernel spaces resistant to classical simulation.`,
        qiskitCode: `from qiskit import QuantumCircuit
from qiskit.circuit import ParameterVector

x = ParameterVector('x', 2)
qc = QuantumCircuit(2)
qc.h([0, 1])
qc.rz(2 * x[0], 0)
qc.rz(2 * x[1], 1)
qc.cx(0, 1)
qc.rz(2 * (np.pi - x[0]) * (np.pi - x[1]), 1)
qc.cx(0, 1)

print("Custom ZZ Feature Map built.")`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'H', target: 1 }, { name: 'RZ', target: 0 }, { name: 'RZ', target: 1 }, { name: 'CX', control: 0, target: 1 }, { name: 'RZ', target: 1 }, { name: 'CX', control: 0, target: 1 }] }
      },
      {
        id: "qnn-and-quantum-kernels",
        title: "QNN & Quantum Kernel Methods",
        subtitle: "(Quantum Kernel Estimation via state overlap |⟨ψ(x)|ψ(x')⟩|²)",
        content: `Quantum Kernel Estimation computes transition matrix inner products $K(x, x') = |\\langle\\Phi(x)|\\Phi(x')\\rangle|^2$ on quantum processors, which are then passed to classical Support Vector Machines (SVM) for classification.`,
        qiskitCode: `# Quantum Kernel calculation structure
# K(x, x') = |<0| U_dag(x') U(x) |0>|^2
print("Quantum Kernel estimator ready for SVM pipeline.")`,
        circuit: { qubits: 2, gates: [] }
      }
    ]
  },

  {
    id: "quantum-advantage",
    title: "14. Quantum Advantage",
    description: "Definition, criteria, peaked circuits, and Loschmidt Echo benchmarks.",
    topics: [
      {
        id: "quantum-advantage-criteria",
        title: "Definition & Verification Criteria",
        subtitle: "(verifiable, useful, classical computational hardness)",
        content: `Strict criteria for declaring genuine Quantum Advantage:
1. **Computational Hardness:** Problem must be beyond practical reach of current and future classical supercomputing algorithms.
2. **Verification:** Results must be independently verifiable (via cross-entropy benchmarking, peaked circuits, or mathematical properties).
3. **Utility:** Solves a practical, non-contrived application problem.`,
        qiskitCode: `# Advantage Verification Framework
print("Advantage Checklist: Hardness -> Verifiability -> Practical Utility")`,
        circuit: { qubits: 1, gates: [] }
      },
      {
        id: "peaked-circuits-loschmidt",
        title: "Peaked Circuits & Loschmidt Echo",
        subtitle: "(Operator Loschmidt Echo benchmark & variational trust bounds)",
        content: `- **Peaked Circuits:** Designed such that the ideal output concentrates total probability into a small subset of bitstrings, serving as scalable benchmark targets.
- **Loschmidt Echo:** Measures coherence preservation by running evolution $U$ followed by inverted backward evolution $U^\\dagger$, testing overall system fidelity $F = |\\langle\\psi_0|U^\\dagger U|\\psi_0\\rangle|^2$.`,
        qiskitCode: `from qiskit import QuantumCircuit

qc = QuantumCircuit(2)
qc.h(0)
qc.cx(0, 1)
# Inverted Loschmidt Echo segment
qc.cx(0, 1)
qc.h(0)

print("Loschmidt Echo Net Identity Check:", qc.depth())`,
        circuit: { qubits: 2, gates: [{ name: 'H', target: 0 }, { name: 'CX', control: 0, target: 1 }, { name: 'CX', control: 0, target: 1 }, { name: 'H', target: 0 }] }
      }
    ]
  },

  {
    id: "quantum-hpc",
    title: "15. Quantum + HPC",
    description: "Quantum-Centric Supercomputing, software stacks, Slurm integration, and AI loops.",
    topics: [
      {
        id: "quantum-centric-supercomputing",
        title: "Quantum-Centric Supercomputing",
        subtitle: "(modular QPUs integrated with HPC clusters)",
        content: `Integrates quantum processing units (QPUs) as specialized accelerators alongside GPU/CPU clusters in HPC data centers. Classical supercomputers manage circuit transpilation, error mitigation, and hybrid optimization loops (VQE/QAOA) while offloading subroutines to QPUs over low-latency interconnects.`,
        qiskitCode: `# Quantum + HPC Hybrid Loop Schema
# HPC CPU/GPU (Optimization / Transpilation) <--> QPU (Primitive Execution)`,
        circuit: { qubits: 2, gates: [] }
      },
      {
        id: "hybrid-workflow-patterns",
        title: "Hybrid Workflow Patterns & AI Loops",
        subtitle: "(ML-assisted transpilation & surrogate models)",
        content: `Combines Machine Learning surrogate models to approximate QPU cost landscapes, reducing required physical QPU calls. Uses HPC workload managers (Slurm) to orchestrate parallel primitive jobs.`,
        qiskitCode: `# HPC Slurm Workflow execution pipeline
print("Slurm Job Launcher: qiskit_primitives_hpc.py")`,
        circuit: { qubits: 1, gates: [] }
      }
    ]
  },

  {
    id: "reading-the-literature",
    title: "16. Reading the Literature",
    description: "First-pass framework for reading quantum papers and spotting hype/omissions.",
    topics: [
      {
        id: "first-pass-framework",
        title: "First-Pass Framework for Quantum Papers",
        subtitle: "(abstract, claim verification, depth scaling, hardware assumptions)",
        content: `A systematic approach to evaluating quantum computing literature:
1. **Target Claim:** Does the paper claim exponential speedup, polynomial speedup, or empirical utility?
2. **Circuit Depth Scaling:** Is circuit depth $O(\\log N)$, $O(N)$, or exponential in problem size?
3. **Hardware Connectivity Assumptions:** Does the algorithm assume all-to-all connectivity or account for SWAP routing on planar/heavy-hex graphs?
4. **Baseline comparison:** Is the quantum method compared against state-of-the-art classical algorithms (tensor networks, heuristics)?`,
        qiskitCode: `# Literature Audit Checklist
checklist = [
    "Verify exact SWAP overhead included",
    "Compare against classical MPS / Tensor Network baseline",
    "Check physical gate count vs reported logical count",
    "Differentiate error mitigation from error correction"
]
for item in checklist:
    print("- [ ]", item)`,
        circuit: { qubits: 1, gates: [] }
      },
      {
        id: "spotting-hype-and-omissions",
        title: "Spotting Hype and Omissions",
        subtitle: "(detecting missing SWAP counts, ideal vs noisy hardware shifts)",
        content: `Common red flags in quantum publications:
- Reporting gate counts on ideal all-to-all connectivity without transpiling to real hardware topologies.
- Comparing noisy quantum hardware results against outdated classical brute-force baselines rather than optimized GPU/Tensor Network solvers.
- Omitting classical post-processing time required for error mitigation overhead.`,
        qiskitCode: `# Red flag detector
print("Audit Rule: Always transpile to target hardware coupling map before evaluating depth.")`,
        circuit: { qubits: 1, gates: [] }
      }
    ]
  }
];

export const SUGGESTED_STUDY_ORDER = [
  { step: 1, id: "what-is-a-quantum-computer", title: "What is a Quantum Computer", category: "Absolute Basics" },
  { step: 2, id: "what-is-a-qubit", title: "What is a Qubit", category: "Absolute Basics" },
  { step: 3, id: "superposition", title: "Superposition", category: "Absolute Basics" },
  { step: 4, id: "bloch-sphere", title: "Bloch Sphere", category: "Absolute Basics" },
  { step: 5, id: "measurement-and-collapse", title: "Measurement and Collapse", category: "Absolute Basics" },
  { step: 6, id: "quantumcircuit-basics", title: "QuantumCircuit Basics", category: "Programming" },
  { step: 7, id: "gates-xhcxzt", title: "X / H / CX / Z / S / T Gates", category: "Foundations" },
  { step: 8, id: "tensor-products", title: "Tensor Products", category: "Foundations" },
  { step: 9, id: "pauli-operators", title: "Pauli Operators", category: "Foundations" },
  { step: 10, id: "bell-states", title: "Bell States", category: "Entangled States" },
  { step: 11, id: "the-primitives-family", title: "The Primitives Family", category: "Programming" },
  { step: 12, id: "parameterized-circuits", title: "Parameterized Circuits", category: "Programming" },
  { step: 13, id: "simulators-statevector-vs-shot-based", title: "Simulators — Statevector vs Shot-Based", category: "Programming" },
  { step: 14, id: "circuit-depth", title: "Circuit Depth", category: "Optimization" },
  { step: 15, id: "transpilation", title: "Transpilation", category: "Hardware Reality" },
  { step: 16, id: "deutschs-algorithm", title: "Deutsch's Algorithm & Deutsch-Jozsa", category: "Algorithms" },
  { step: 17, id: "qft-and-qpe", title: "QFT & Quantum Phase Estimation", category: "Algorithms" },
  { step: 18, id: "grovers-algorithm", title: "Grover's Search Algorithm", category: "Algorithms" },
  { step: 19, id: "vqe-and-qaoa", title: "VQE & QAOA", category: "Algorithms" }
];

export const OPEN_THREADS = [
  {
    id: "thread-1",
    title: "Dynamic Circuit Feedforward Latency on IBM Heron",
    status: "Active Research",
    date: "2026-08-10",
    description: "Investigating classical feedforward roundtrip latency (< 1 μs target) for mid-circuit conditional operations on 156-qubit Heron architecture."
  },
  {
    id: "thread-2",
    title: "Benchmarking NoiseLearnerV3 vs PEC",
    status: "In Progress",
    date: "2026-08-01",
    description: "Comparing sample complexity scaling of twirled NoiseLearnerV3 sparse Pauli models against traditional PEC on 100+ qubit observables."
  },
  {
    id: "thread-3",
    title: "Tensor Network MPS Bounds vs Quantum Utility",
    status: "Under Review",
    date: "2026-07-20",
    description: "Evaluating classical matrix product state (MPS) bond dimension limits against recent utility scale expectation experiments."
  },
  {
    id: "thread-4",
    title: "Surface Code Logical Qubit Ancilla Overhead",
    status: "Planned",
    date: "2026-07-15",
    description: "Optimizing syndrome extraction routing to reduce physical qubit requirements for distance-5 logical qubit memory."
  }
];
