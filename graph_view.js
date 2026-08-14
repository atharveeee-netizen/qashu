// Interactive Concept Node Graph Visualizer for Qashu

export class ConceptGraph {
  constructor(canvasId, curriculumData, onNodeClick) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.data = curriculumData;
    this.onNodeClick = onNodeClick;
    this.nodes = [];
    this.links = [];
    this.animId = null;

    this.initGraph();
    this.setupEvents();
    this.startAnimation();
  }

  initGraph() {
    const width = this.canvas.clientWidth || 800;
    const height = 450;
    this.canvas.width = width;
    this.canvas.height = height;

    const totalSections = this.data.length;
    const radius = Math.min(width, height) * 0.35;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create central node
    const centerNode = { id: 'root', label: 'QC Roadmap', x: centerX, y: centerY, r: 24, color: '#00f2fe', isRoot: true };
    this.nodes.push(centerNode);

    // Create section nodes in parametric ring
    this.data.forEach((section, idx) => {
      const angle = (idx / totalSections) * Math.PI * 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      const node = {
        id: section.id,
        label: section.title.replace(/^\d+\.\s*/, ''),
        x: x,
        y: y,
        vx: 0,
        vy: 0,
        r: 16,
        color: idx % 2 === 0 ? '#7f00ff' : '#00e676',
        sectionData: section
      };

      this.nodes.push(node);
      this.links.push({ source: centerNode, target: node });

      // Link consecutive section nodes to form organic outer ring
      if (idx > 0) {
        this.links.push({ source: this.nodes[idx], target: node });
      }
    });
  }

  setupEvents() {
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      for (const node of this.nodes) {
        const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
        if (dist <= node.r + 5 && !node.isRoot && this.onNodeClick) {
          this.onNodeClick(node.id);
          break;
        }
      }
    });

    window.addEventListener('resize', () => {
      if (this.canvas) {
        this.canvas.width = this.canvas.clientWidth || 800;
      }
    });
  }

  startAnimation() {
    let time = 0;
    const animate = () => {
      time += 0.02;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw continuous orbital wave background
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
      this.ctx.lineWidth = 1.5;
      const cx = this.canvas.width / 2;
      const cy = this.canvas.height / 2;
      for (let i = 0; i < Math.PI * 2; i += 0.05) {
        const r = 140 + Math.sin(i * 4 + time) * 12;
        const x = cx + r * Math.cos(i);
        const y = cy + r * Math.sin(i);
        if (i === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.closePath();
      this.ctx.stroke();

      // Draw links
      this.ctx.lineWidth = 1;
      this.links.forEach(link => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        this.ctx.moveTo(link.source.x, link.source.y);
        this.ctx.lineTo(link.target.x, link.target.y);
        this.ctx.stroke();
      });

      // Draw nodes
      this.nodes.forEach(node => {
        // Floating motion effect
        const hoverOffsetY = Math.sin(time + node.x) * 2;
        const ny = node.y + hoverOffsetY;

        this.ctx.beginPath();
        this.ctx.arc(node.x, ny, node.r, 0, Math.PI * 2);
        this.ctx.fillStyle = node.color;
        this.ctx.shadowColor = node.color;
        this.ctx.shadowBlur = 12;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // Label
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '11px "Inter", sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(node.label, node.x, ny + node.r + 14);
      });

      this.animId = requestAnimationFrame(animate);
    };

    animate();
  }
}
