(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,52683,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let i=[{slug:"qashu-index",title:"Qashu",category:"Map of Content",tags:["qc/moc"],date:"Jul 27, 2026",readTime:"16 min read",content:`
Map of Content for a self-directed quantum computing curriculum, built up from lecture material, hands-on labs, and other resources along the way. Central hub - everything links back here.

## Concept Map

### Absolute Basics
- **What is a Quantum Computer** (the physical device and why it's not "a faster classical computer")
- **What is a Qubit** (state vector, ket notation, normalization)
- **Superposition** (interference, not classical probability)
- **Bloch Sphere** (the geometric picture - and where it stops applying)
- **Measurement and Collapse** (the Born rule, why quantum programs are inherently probabilistic)

### Programming a Quantum Computer
- **QuantumCircuit Basics** (registers, adding gates, .compose(), drawing)
- **The Primitives Family** (Sampler vs Estimator vs Executor, PUBs, local vs Runtime)
- **Parameterized Circuits** (Parameter/ParameterVector, why transpile-once-bind-many matters)
- **Simulators - Statevector vs Shot-Based** (exact amplitudes vs sampled counts, fake backends)

### Foundations
- **Pauli Operators** (X, Y, Z, identity, matrix representations)
- **SparsePauliOp** (constructing observable operators efficiently in Qiskit)
- **Gates (X, H, CX, Z, S, T)** (single and multi-qubit gate operations)
- **Tensor Products** (combining qubit statevectors and operator matrices)
- **Why Gates Are Unitary** (reversibility, norm preservation, U^dagger U = I)

### Why Quantum Computing Matters
- **Quantum Speedup** (Ingredients and Myths)
- **Deutsch's Algorithm** (first quantum algorithm showing speedup)
- **Deutsch-Jozsa Algorithm** (constant vs balanced function evaluation in 1 query)
- **Computational Complexity** (P / NP / BQP relations)

### Entangled States
- **Bell States** (the 4 maximally entangled 2-qubit basis states)
- **GHZ States** (N-qubit maximal entanglement)
- **Dynamic GHZ via Qubit Reuse** (PRX Quantum 2024 construction)
- **CHSH Inequality and Bell Tests** (S <= 2 classical vs S = 2sqrt{2} quantum violation)
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
- **Density Matrix** (\rho = sum p_i |psi_i\ranglelanglepsi_i|)
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
`},{slug:"absolute-basics/what-is-a-quantum-computer",title:"What is a Quantum Computer",category:"Absolute Basics",tags:["qc/basics","qc/hardware"],date:"Jul 27, 2026",content:`
A quantum computer is a device that stores and transforms information in qubits - quantum-mechanical states - instead of classical bits, exploiting superposition and entanglement to represent and manipulate information in ways classical bits fundamentally can’t. Key insight: it is not a faster classical computer.

### What's physically inside one
IBM’s devices use superconducting transmon qubits - tiny circuits etched from superconducting metal on a chip, each behaving like an artificial atom with quantized energy levels that stand in for $|0\\rangle$ and $|1\\rangle$.

What’s actually inside a transmon: a Josephson junction - a thin insulating gap between two superconductors - acting as a nonlinear inductor in an otherwise ordinary LC oscillator circuit.

\`\`\`python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
psi = Statevector(qc)
print("Initial statevector:", psi.data)
\`\`\`
`},{slug:"absolute-basics/what-is-a-qubit",title:"What is a Qubit",category:"Absolute Basics",tags:["qc/basics","qc/math"],date:"Jul 27, 2026",content:`
A classical bit is always definitely 0 or 1. A qubit is a vector in a 2-dimensional complex vector space:

$$|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle, \\qquad \\alpha,\\beta \\in \\mathbb{C}, \\qquad |\\alpha|^2 + |\\beta|^2 = 1$$

where $|0\\rangle = \\begin{pmatrix}1\\\\0\\end{pmatrix}$ and $|1\\rangle = \\begin{pmatrix}0\\\\1\\end{pmatrix}$.

\`\`\`python
from qiskit.quantum_info import Statevector

psi = Statevector([0.6, 0.8])
print("Probabilities:", psi.probabilities())
\`\`\`
`},{slug:"absolute-basics/superposition",title:"Superposition",category:"Absolute Basics",tags:["qc/basics","qc/math"],date:"Jul 27, 2026",content:`
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
`},{slug:"absolute-basics/bloch-sphere",title:"Bloch Sphere",category:"Absolute Basics",tags:["qc/basics","qc/math"],date:"Jul 27, 2026",content:`
Any single-qubit pure state can be written using two real angles:

$$|\\psi\\rangle = \\cos\\!\\left(\\frac{\\theta}{2}\\right)|0\\rangle + e^{i\\phi}\\sin\\!\\left(\\frac{\\theta}{2}\\right)|1\\rangle$$

This is a point on the surface of a unit sphere - the Bloch sphere.
`},{slug:"absolute-basics/measurement-and-collapse",title:"Measurement and Collapse",category:"Absolute Basics",tags:["qc/basics","qc/math"],date:"Jul 27, 2026",content:`
Measuring a qubit $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ gives outcome 0 with probability $|\\alpha|^2$ and outcome 1 with probability $|\\beta|^2$ - the Born rule.

\`\`\`python
from qiskit import QuantumCircuit
from qiskit_aer.primitives import SamplerV2

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)
result = SamplerV2().run([qc], shots=1000).result()
print("Counts:", result[0].data.c.get_counts())
\`\`\`
`}],s=(...e)=>e.filter((e,t,a)=>!!e&&""!==e.trim()&&a.indexOf(e)===t).join(" ").trim(),n=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let l=(0,a.createContext)({}),o=(0,a.forwardRef)(({color:e,size:t,strokeWidth:i,absoluteStrokeWidth:n,className:o="",children:c,iconNode:u,...d},m)=>{let{size:h=24,strokeWidth:p=2,absoluteStrokeWidth:x=!1,color:g="currentColor",className:b=""}=(0,a.useContext)(l)??{},f=n??x?24*Number(i??p)/Number(t??h):i??p;return(0,a.createElement)("svg",{ref:m,...r,width:t??h??r.width,height:t??h??r.height,stroke:e??g,strokeWidth:f,className:s("lucide",b,o),...!c&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(d)&&{"aria-hidden":"true"},...d},[...u.map(([e,t])=>(0,a.createElement)(e,t)),...Array.isArray(c)?c:[c]])}),c=(e,t)=>{let i=(0,a.forwardRef)(({className:i,...r},l)=>(0,a.createElement)(o,{ref:l,iconNode:t,className:s(`lucide-${n(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,i),...r}));return i.displayName=n(e),i},u=c("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),d=c("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]),m=c("moon",[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]),h=c("sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]),p=c("pin",[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]]),x=({currentSlug:e,onSelectNote:s,onOpenSearch:n,isDarkMode:r,onToggleTheme:l,isPinned:o,onTogglePin:c})=>{let[x,g]=(0,a.useState)({"Map of Content":!0,"Absolute Basics":!0}),b={};i.forEach(e=>{let t=e.category||"Map of Content";b[t]||(b[t]=[]),b[t].push(e)});let f=Object.keys(b).sort((e,t)=>"Map of Content"===e?-1:"Map of Content"===t?1:e.localeCompare(t));return(0,t.jsxs)("aside",{className:`left-sidebar ${o?"pinned":"unpinned"}`,children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,t.jsx)("h1",{className:"text-2xl font-bold tracking-tight text-zinc-100 cursor-pointer",onClick:()=>s("qashu-index"),children:"Qashu"}),(0,t.jsx)("button",{onClick:c,title:"Pin / Unpin Sidebar",className:"p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors",children:(0,t.jsx)(p,{className:"w-4 h-4"})})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-6",children:[(0,t.jsxs)("button",{onClick:n,className:"flex-1 flex items-center gap-2 px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors",children:[(0,t.jsx)(d,{className:"w-4 h-4"}),(0,t.jsx)("span",{children:"Search"})]}),(0,t.jsx)("button",{onClick:l,className:"p-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors",children:r?(0,t.jsx)(h,{className:"w-4 h-4"}):(0,t.jsx)(m,{className:"w-4 h-4"})})]}),(0,t.jsxs)("div",{className:"explorer-tree overflow-y-auto pr-1",children:[(0,t.jsx)("h2",{className:"text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3",children:"Explorer"}),(0,t.jsx)("div",{className:"space-y-1",children:f.map(a=>{let i=b[a],n=!!x[a];return(0,t.jsxs)("div",{className:"category-folder",children:[(0,t.jsxs)("div",{onClick:()=>{g(e=>({...e,[a]:!e[a]}))},className:"flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/60 rounded-md cursor-pointer select-none transition-colors",children:[(0,t.jsx)(u,{className:`w-3.5 h-3.5 text-zinc-400 transition-transform ${n?"rotate-90":""}`}),(0,t.jsx)("span",{children:a})]}),n&&(0,t.jsx)("div",{className:"pl-4 mt-0.5 space-y-0.5",children:i.map(a=>{let i=a.slug===e;return(0,t.jsx)("button",{onClick:()=>s(a.slug),className:`w-full text-left px-2 py-1 text-sm rounded-md transition-colors ${i?"bg-zinc-800 text-blue-400 font-medium":"text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"}`,children:a.title},a.slug)})})]},a)})})]})]})},g=({currentNote:e,onSelectNote:s,isPinned:n,onTogglePin:r})=>{let l=(0,a.useRef)(null);(0,a.useEffect)(()=>{let e=l.current;if(!e)return;let t=e.getContext("2d");if(!t)return;let a=e.width=240,s=e.height=150,n=i.slice(0,12).map((e,t)=>({x:30+Math.random()*(a-60),y:20+Math.random()*(s-40),radius:0===t?5:3,isMain:0===t}));t.clearRect(0,0,a,s),t.strokeStyle="rgba(138, 180, 248, 0.2)",t.lineWidth=1;for(let e=0;e<n.length;e++)for(let a=e+1;a<n.length;a++)65>Math.hypot(n[e].x-n[a].x,n[e].y-n[a].y)&&(t.beginPath(),t.moveTo(n[e].x,n[e].y),t.lineTo(n[a].x,n[a].y),t.stroke());n.forEach(e=>{t.beginPath(),t.arc(e.x,e.y,e.radius,0,2*Math.PI),t.fillStyle=e.isMain?"#60a5fa":"#9ca3af",t.fill()})},[e]);let o=i.filter(t=>t.slug!==e.slug&&(t.content.includes(e.slug)||t.content.includes(e.title)));return(0,t.jsxs)("aside",{className:`right-sidebar ${n?"pinned":"unpinned"}`,children:[(0,t.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,t.jsx)("h2",{className:"text-xs font-semibold text-zinc-400 uppercase tracking-wider",children:"Graph View"}),(0,t.jsx)("button",{onClick:r,title:"Pin / Unpin Right Sidebar",className:"p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors",children:(0,t.jsx)(p,{className:"w-4 h-4"})})]}),(0,t.jsx)("div",{className:"bg-zinc-900 border border-zinc-800 rounded-lg p-2 mb-6",children:(0,t.jsx)("canvas",{ref:l,className:"w-full rounded"})}),(0,t.jsxs)("div",{className:"mb-6",children:[(0,t.jsx)("h3",{className:"text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2",children:"Table of Contents"}),(0,t.jsxs)("ul",{className:"space-y-1 text-sm text-zinc-400",children:[(0,t.jsx)("li",{className:"hover:text-blue-400 cursor-pointer",children:e.title}),(0,t.jsx)("li",{className:"pl-3 hover:text-blue-400 cursor-pointer",children:"Concept Overview"}),(0,t.jsx)("li",{className:"pl-3 hover:text-blue-400 cursor-pointer",children:"Code Implementation"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2",children:"Backlinks"}),0===o.length?(0,t.jsx)("p",{className:"text-xs text-zinc-500",children:"No backlinks found"}):(0,t.jsx)("ul",{className:"space-y-1 text-sm",children:o.slice(0,5).map(e=>(0,t.jsx)("li",{children:(0,t.jsx)("button",{onClick:()=>s(e.slug),className:"text-zinc-400 hover:text-blue-400 text-left line-clamp-1 transition-colors",children:e.title})},e.slug))})]})]})},b=({note:e,onSelectNote:i})=>{let[s,n]=(0,a.useState)(!1);return((0,a.useEffect)(()=>{n(!0)},[]),s)?(0,t.jsxs)("main",{className:"center-content",children:[(0,t.jsxs)("div",{className:"mb-6 border-b border-zinc-800 pb-4",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 text-sm text-zinc-400 mb-2",children:[(0,t.jsx)("button",{onClick:()=>i("qashu-index"),className:"hover:text-blue-400 transition-colors",children:"Home"}),(0,t.jsx)("span",{children:"❯"}),(0,t.jsx)("span",{className:"text-zinc-200 font-medium",children:e.title})]}),(0,t.jsx)("h1",{className:"text-4xl font-extrabold text-zinc-100 tracking-tight mb-2",children:e.title}),(0,t.jsxs)("div",{className:"text-xs text-zinc-400",children:[(0,t.jsx)("span",{children:e.date||"Jul 27, 2026"}),(0,t.jsx)("span",{className:"mx-2",children:"•"}),(0,t.jsx)("span",{children:e.readTime||"16 min read"})]})]}),(0,t.jsx)("div",{className:"markdown-content text-zinc-200 text-lg leading-relaxed space-y-4",dangerouslySetInnerHTML:{__html:(e=>{if(!e)return"";let t=[],a=e.replace(/```([\s\S]*?)```/g,(e,a)=>(t.push(a),`___CODE_BLOCK_${t.length-1}___`)),i=(a=(a=a.replace(/\[([^\]]+)\]\(\.\/([^)]+)\)/g,'<a href="#note/$2">$1</a>')).replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="#note/$2">$1</a>')).split(/\n\n+/).map(e=>{let t=e.trim();if(t.startsWith("# "))return`<h1>${t.substring(2)}</h1>`;if(t.startsWith("## "))return`<h2>${t.substring(3)}</h2>`;if(t.startsWith("### "))return`<h3>${t.substring(4)}</h3>`;if((t=(t=(t=t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")).replace(/\*(.*?)\*/g,"<em>$1</em>")).replace(/`([^`]+)`/g,"<code>$1</code>")).includes("- ")){let e=t.split("\n").filter(e=>e.trim().startsWith("- "));if(e.length>0){let t=e.map(e=>`<li>${e.trim().substring(2)}</li>`).join("");return`<ul>${t}</ul>`}}return`<p>${t.replace(/\n/g,"<br>")}</p>`}).join("\n");return i.replace(/___CODE_BLOCK_(\d+)___/g,(e,a)=>{let i=t[parseInt(a,10)]||"";return`<pre><code>${i.trim()}</code></pre>`})})(e.content)}})]}):(0,t.jsx)("div",{className:"p-8 text-zinc-400",children:"Loading Qashu note..."})},f=c("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),v=({isOpen:e,onClose:s,onSelectNote:n})=>{let[r,l]=(0,a.useState)("");if(!e)return null;let o=r.trim()?i.filter(e=>e.title.toLowerCase().includes(r.toLowerCase())||e.content.toLowerCase().includes(r.toLowerCase())):[];return(0,t.jsxs)("div",{className:"fixed inset-0 z-50 flex items-start justify-center pt-20 px-4",children:[(0,t.jsx)("div",{className:"fixed inset-0 bg-black/70 backdrop-blur-sm",onClick:s}),(0,t.jsxs)("div",{className:"relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-10",children:[(0,t.jsxs)("div",{className:"flex items-center px-4 py-3 border-b border-zinc-800",children:[(0,t.jsx)(d,{className:"w-5 h-5 text-zinc-400 mr-3"}),(0,t.jsx)("input",{type:"text",value:r,onChange:e=>l(e.target.value),placeholder:"Search 16 curriculum sections, Qiskit code, or concepts...",className:"w-full bg-transparent text-zinc-100 placeholder-zinc-500 outline-none text-base",autoFocus:!0}),(0,t.jsx)("button",{onClick:s,className:"p-1 text-zinc-400 hover:text-zinc-100",children:(0,t.jsx)(f,{className:"w-5 h-5"})})]}),(0,t.jsx)("div",{className:"max-h-96 overflow-y-auto p-2",children:r.trim()?0===o.length?(0,t.jsxs)("div",{className:"p-6 text-center text-zinc-500 text-sm",children:['No matching notes found for "',r,'"']}):(0,t.jsx)("div",{className:"space-y-1",children:o.map(e=>(0,t.jsxs)("div",{onClick:()=>{n(e.slug),s()},className:"p-3 rounded-lg hover:bg-zinc-800/70 cursor-pointer transition-colors",children:[(0,t.jsx)("div",{className:"font-semibold text-blue-400 text-base",children:e.title}),(0,t.jsx)("div",{className:"text-xs text-zinc-500 mt-0.5",children:e.category||"Vault Note"})]},e.slug))}):(0,t.jsx)("div",{className:"p-6 text-center text-zinc-500 text-sm",children:"Type to search Qashu vault notes..."})})]})]})};e.s(["default",0,function(){let[e,s]=(0,a.useState)("qashu-index"),[n,r]=(0,a.useState)(!1),[l,o]=(0,a.useState)(!0),[c,u]=(0,a.useState)(!0),[d,m]=(0,a.useState)(!0);(0,a.useEffect)(()=>{let e=()=>{let e=window.location.hash.replace(/^#note\//,"").replace(/^#/,"");e&&s(e)};return window.addEventListener("hashchange",e),e(),()=>window.removeEventListener("hashchange",e)},[]);let h=e=>{s(e),window.location.hash=`#note/${e}`},p=i.find(t=>t.slug===e)||i[0];return(0,t.jsxs)("div",{className:"flex min-h-screen relative w-full",children:[(0,t.jsx)("div",{className:"hover-trigger-left fixed top-0 left-0 bottom-0 w-6 z-30"}),(0,t.jsx)(x,{currentSlug:e,onSelectNote:h,onOpenSearch:()=>r(!0),isDarkMode:l,onToggleTheme:()=>o(!l),isPinned:c,onTogglePin:()=>u(!c)}),(0,t.jsx)("div",{className:`center-content ${!c?"left-unpinned":""} ${!d?"right-unpinned":""}`,children:(0,t.jsx)(b,{note:p,onSelectNote:h})}),(0,t.jsx)("div",{className:"hover-trigger-right fixed top-0 right-0 bottom-0 w-6 z-30"}),(0,t.jsx)(g,{currentNote:p,onSelectNote:h,isPinned:d,onTogglePin:()=>m(!d)}),(0,t.jsx)(v,{isOpen:n,onClose:()=>r(!1),onSelectNote:h})]})}],52683)}]);