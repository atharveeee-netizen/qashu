module.exports=[40777,a=>{"use strict";var b=a.i(87924),c=a.i(72131);let d=[{slug:"qashu-index",title:"Qashu",category:"Map of Content",tags:["qc/moc"],date:"Jul 27, 2026",readTime:"16 min read",content:`
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

This is a point on the surface of a unit sphere — the Bloch sphere.
`},{slug:"absolute-basics/measurement-and-collapse",title:"Measurement and Collapse",category:"Absolute Basics",tags:["qc/basics","qc/math"],date:"Jul 27, 2026",content:`
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
`}],e=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim(),f=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)};var g={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let h=(0,c.createContext)({}),i=(0,c.forwardRef)(({color:a,size:b,strokeWidth:d,absoluteStrokeWidth:f,className:i="",children:j,iconNode:k,...l},m)=>{let{size:n=24,strokeWidth:o=2,absoluteStrokeWidth:p=!1,color:q="currentColor",className:r=""}=(0,c.useContext)(h)??{},s=f??p?24*Number(d??o)/Number(b??n):d??o;return(0,c.createElement)("svg",{ref:m,...g,width:b??n??g.width,height:b??n??g.height,stroke:a??q,strokeWidth:s,className:e("lucide",r,i),...!j&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0;return!1})(l)&&{"aria-hidden":"true"},...l},[...k.map(([a,b])=>(0,c.createElement)(a,b)),...Array.isArray(j)?j:[j]])}),j=(a,b)=>{let d=(0,c.forwardRef)(({className:d,...g},h)=>(0,c.createElement)(i,{ref:h,iconNode:b,className:e(`lucide-${f(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,d),...g}));return d.displayName=f(a),d},k=j("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),l=j("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]),m=j("moon",[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]),n=j("sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]),o=j("pin",[["path",{d:"M12 17v5",key:"bb1du9"}],["path",{d:"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",key:"1nkz8b"}]]),p=({currentSlug:a,onSelectNote:e,onOpenSearch:f,isDarkMode:g,onToggleTheme:h,isPinned:i,onTogglePin:j})=>{let[p,q]=(0,c.useState)({"Map of Content":!0,"Absolute Basics":!0}),r={};d.forEach(a=>{let b=a.category||"Map of Content";r[b]||(r[b]=[]),r[b].push(a)});let s=Object.keys(r).sort((a,b)=>"Map of Content"===a?-1:"Map of Content"===b?1:a.localeCompare(b));return(0,b.jsxs)("aside",{className:`left-sidebar ${i?"pinned":"unpinned"}`,children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,b.jsx)("h1",{className:"text-2xl font-bold tracking-tight text-zinc-100 cursor-pointer",onClick:()=>e("qashu-index"),children:"Qashu"}),(0,b.jsx)("button",{onClick:j,title:"Pin / Unpin Sidebar",className:"p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors",children:(0,b.jsx)(o,{className:"w-4 h-4"})})]}),(0,b.jsxs)("div",{className:"flex items-center gap-2 mb-6",children:[(0,b.jsxs)("button",{onClick:f,className:"flex-1 flex items-center gap-2 px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors",children:[(0,b.jsx)(l,{className:"w-4 h-4"}),(0,b.jsx)("span",{children:"Search"})]}),(0,b.jsx)("button",{onClick:h,className:"p-2 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors",children:g?(0,b.jsx)(n,{className:"w-4 h-4"}):(0,b.jsx)(m,{className:"w-4 h-4"})})]}),(0,b.jsxs)("div",{className:"explorer-tree overflow-y-auto pr-1",children:[(0,b.jsx)("h2",{className:"text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3",children:"Explorer"}),(0,b.jsx)("div",{className:"space-y-1",children:s.map(c=>{let d=r[c],f=!!p[c];return(0,b.jsxs)("div",{className:"category-folder",children:[(0,b.jsxs)("div",{onClick:()=>{q(a=>({...a,[c]:!a[c]}))},className:"flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/60 rounded-md cursor-pointer select-none transition-colors",children:[(0,b.jsx)(k,{className:`w-3.5 h-3.5 text-zinc-400 transition-transform ${f?"rotate-90":""}`}),(0,b.jsx)("span",{children:c})]}),f&&(0,b.jsx)("div",{className:"pl-4 mt-0.5 space-y-0.5",children:d.map(c=>{let d=c.slug===a;return(0,b.jsx)("button",{onClick:()=>e(c.slug),className:`w-full text-left px-2 py-1 text-sm rounded-md transition-colors ${d?"bg-zinc-800 text-blue-400 font-medium":"text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"}`,children:c.title},c.slug)})})]},c)})})]})]})},q=({currentNote:a,onSelectNote:e,isPinned:f,onTogglePin:g})=>{let h=(0,c.useRef)(null);(0,c.useEffect)(()=>{let a=h.current;if(!a)return;let b=a.getContext("2d");if(!b)return;let c=a.width=240,e=a.height=150,f=d.slice(0,12).map((a,b)=>({x:30+Math.random()*(c-60),y:20+Math.random()*(e-40),radius:0===b?5:3,isMain:0===b}));b.clearRect(0,0,c,e),b.strokeStyle="rgba(138, 180, 248, 0.2)",b.lineWidth=1;for(let a=0;a<f.length;a++)for(let c=a+1;c<f.length;c++)65>Math.hypot(f[a].x-f[c].x,f[a].y-f[c].y)&&(b.beginPath(),b.moveTo(f[a].x,f[a].y),b.lineTo(f[c].x,f[c].y),b.stroke());f.forEach(a=>{b.beginPath(),b.arc(a.x,a.y,a.radius,0,2*Math.PI),b.fillStyle=a.isMain?"#60a5fa":"#9ca3af",b.fill()})},[a]);let i=d.filter(b=>b.slug!==a.slug&&(b.content.includes(a.slug)||b.content.includes(a.title)));return(0,b.jsxs)("aside",{className:`right-sidebar ${f?"pinned":"unpinned"}`,children:[(0,b.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,b.jsx)("h2",{className:"text-xs font-semibold text-zinc-400 uppercase tracking-wider",children:"Graph View"}),(0,b.jsx)("button",{onClick:g,title:"Pin / Unpin Right Sidebar",className:"p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors",children:(0,b.jsx)(o,{className:"w-4 h-4"})})]}),(0,b.jsx)("div",{className:"bg-zinc-900 border border-zinc-800 rounded-lg p-2 mb-6",children:(0,b.jsx)("canvas",{ref:h,className:"w-full rounded"})}),(0,b.jsxs)("div",{className:"mb-6",children:[(0,b.jsx)("h3",{className:"text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2",children:"Table of Contents"}),(0,b.jsxs)("ul",{className:"space-y-1 text-sm text-zinc-400",children:[(0,b.jsx)("li",{className:"hover:text-blue-400 cursor-pointer",children:a.title}),(0,b.jsx)("li",{className:"pl-3 hover:text-blue-400 cursor-pointer",children:"Concept Overview"}),(0,b.jsx)("li",{className:"pl-3 hover:text-blue-400 cursor-pointer",children:"Code Implementation"})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2",children:"Backlinks"}),0===i.length?(0,b.jsx)("p",{className:"text-xs text-zinc-500",children:"No backlinks found"}):(0,b.jsx)("ul",{className:"space-y-1 text-sm",children:i.slice(0,5).map(a=>(0,b.jsx)("li",{children:(0,b.jsx)("button",{onClick:()=>e(a.slug),className:"text-zinc-400 hover:text-blue-400 text-left line-clamp-1 transition-colors",children:a.title})},a.slug))})]})]})},r=({note:a,onSelectNote:d})=>{let[e,f]=(0,c.useState)(!1);return((0,c.useEffect)(()=>{f(!0)},[]),e)?(0,b.jsxs)("main",{className:"center-content",children:[(0,b.jsxs)("div",{className:"mb-6 border-b border-zinc-800 pb-4",children:[(0,b.jsxs)("div",{className:"flex items-center gap-2 text-sm text-zinc-400 mb-2",children:[(0,b.jsx)("button",{onClick:()=>d("qashu-index"),className:"hover:text-blue-400 transition-colors",children:"Home"}),(0,b.jsx)("span",{children:"❯"}),(0,b.jsx)("span",{className:"text-zinc-200 font-medium",children:a.title})]}),(0,b.jsx)("h1",{className:"text-4xl font-extrabold text-zinc-100 tracking-tight mb-2",children:a.title}),(0,b.jsxs)("div",{className:"text-xs text-zinc-400",children:[(0,b.jsx)("span",{children:a.date||"Jul 27, 2026"}),(0,b.jsx)("span",{className:"mx-2",children:"•"}),(0,b.jsx)("span",{children:a.readTime||"16 min read"})]})]}),(0,b.jsx)("div",{className:"markdown-content text-zinc-200 text-lg leading-relaxed space-y-4",dangerouslySetInnerHTML:{__html:(a=>{if(!a)return"";let b=[],c=a.replace(/```([\s\S]*?)```/g,(a,c)=>(b.push(c),`___CODE_BLOCK_${b.length-1}___`)),d=(c=(c=c.replace(/\[([^\]]+)\]\(\.\/([^)]+)\)/g,'<a href="#note/$2">$1</a>')).replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="#note/$2">$1</a>')).split(/\n\n+/).map(a=>{let b=a.trim();if(b.startsWith("# "))return`<h1>${b.substring(2)}</h1>`;if(b.startsWith("## "))return`<h2>${b.substring(3)}</h2>`;if(b.startsWith("### "))return`<h3>${b.substring(4)}</h3>`;if((b=(b=(b=b.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")).replace(/\*(.*?)\*/g,"<em>$1</em>")).replace(/`([^`]+)`/g,"<code>$1</code>")).includes("- ")){let a=b.split("\n").filter(a=>a.trim().startsWith("- "));if(a.length>0){let b=a.map(a=>`<li>${a.trim().substring(2)}</li>`).join("");return`<ul>${b}</ul>`}}return`<p>${b.replace(/\n/g,"<br>")}</p>`}).join("\n");return d.replace(/___CODE_BLOCK_(\d+)___/g,(a,c)=>{let d=b[parseInt(c,10)]||"";return`<pre><code>${d.trim()}</code></pre>`})})(a.content)}})]}):(0,b.jsx)("div",{className:"p-8 text-zinc-400",children:"Loading Qashu note..."})},s=j("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),t=({isOpen:a,onClose:e,onSelectNote:f})=>{let[g,h]=(0,c.useState)("");if(!a)return null;let i=g.trim()?d.filter(a=>a.title.toLowerCase().includes(g.toLowerCase())||a.content.toLowerCase().includes(g.toLowerCase())):[];return(0,b.jsxs)("div",{className:"fixed inset-0 z-50 flex items-start justify-center pt-20 px-4",children:[(0,b.jsx)("div",{className:"fixed inset-0 bg-black/70 backdrop-blur-sm",onClick:e}),(0,b.jsxs)("div",{className:"relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-10",children:[(0,b.jsxs)("div",{className:"flex items-center px-4 py-3 border-b border-zinc-800",children:[(0,b.jsx)(l,{className:"w-5 h-5 text-zinc-400 mr-3"}),(0,b.jsx)("input",{type:"text",value:g,onChange:a=>h(a.target.value),placeholder:"Search 16 curriculum sections, Qiskit code, or concepts...",className:"w-full bg-transparent text-zinc-100 placeholder-zinc-500 outline-none text-base",autoFocus:!0}),(0,b.jsx)("button",{onClick:e,className:"p-1 text-zinc-400 hover:text-zinc-100",children:(0,b.jsx)(s,{className:"w-5 h-5"})})]}),(0,b.jsx)("div",{className:"max-h-96 overflow-y-auto p-2",children:g.trim()?0===i.length?(0,b.jsxs)("div",{className:"p-6 text-center text-zinc-500 text-sm",children:['No matching notes found for "',g,'"']}):(0,b.jsx)("div",{className:"space-y-1",children:i.map(a=>(0,b.jsxs)("div",{onClick:()=>{f(a.slug),e()},className:"p-3 rounded-lg hover:bg-zinc-800/70 cursor-pointer transition-colors",children:[(0,b.jsx)("div",{className:"font-semibold text-blue-400 text-base",children:a.title}),(0,b.jsx)("div",{className:"text-xs text-zinc-500 mt-0.5",children:a.category||"Vault Note"})]},a.slug))}):(0,b.jsx)("div",{className:"p-6 text-center text-zinc-500 text-sm",children:"Type to search Qashu vault notes..."})})]})]})};a.s(["default",0,function(){let[a,e]=(0,c.useState)("qashu-index"),[f,g]=(0,c.useState)(!1),[h,i]=(0,c.useState)(!0),[j,k]=(0,c.useState)(!0),[l,m]=(0,c.useState)(!0);(0,c.useEffect)(()=>{let a=()=>{let a=window.location.hash.replace(/^#note\//,"").replace(/^#/,"");a&&e(a)};return window.addEventListener("hashchange",a),a(),()=>window.removeEventListener("hashchange",a)},[]);let n=a=>{e(a),window.location.hash=`#note/${a}`},o=d.find(b=>b.slug===a)||d[0];return(0,b.jsxs)("div",{className:"flex min-h-screen relative w-full",children:[(0,b.jsx)("div",{className:"hover-trigger-left fixed top-0 left-0 bottom-0 w-6 z-30"}),(0,b.jsx)(p,{currentSlug:a,onSelectNote:n,onOpenSearch:()=>g(!0),isDarkMode:h,onToggleTheme:()=>i(!h),isPinned:j,onTogglePin:()=>k(!j)}),(0,b.jsx)("div",{className:`center-content ${!j?"left-unpinned":""} ${!l?"right-unpinned":""}`,children:(0,b.jsx)(r,{note:o,onSelectNote:n})}),(0,b.jsx)("div",{className:"hover-trigger-right fixed top-0 right-0 bottom-0 w-6 z-30"}),(0,b.jsx)(q,{currentNote:o,onSelectNote:n,isPinned:l,onTogglePin:()=>m(!l)}),(0,b.jsx)(t,{isOpen:f,onClose:()=>g(!1),onSelectNote:n})]})}],40777)}];

//# sourceMappingURL=src_app_page_tsx_1chiuah._.js.map