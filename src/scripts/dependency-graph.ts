interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  status: string;
}

interface Edge {
  from: string;
  to: string;
}

const canvas = document.getElementById('dep-graph') as HTMLCanvasElement;
const tooltip = document.getElementById('graph-tooltip') as HTMLElement;
if (!canvas || !tooltip) throw new Error('Graph elements not found');

const ctx = canvas.getContext('2d')!;

function resize() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
}

// Gray for PLANNED — matches the card status colors
const nodeData: Omit<Node, 'x' | 'y'>[] = [
  { id: 'behave', label: 'behave', color: '#555555', status: 'PLANNED' },
  { id: 'fault', label: 'fault', color: '#555555', status: 'PLANNED' },
];

const edges: Edge[] = [
  { from: 'behave', to: 'fault' },
];

function layoutNodes(): Node[] {
  const rect = canvas.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const spacing = Math.min(rect.width * 0.25, 200);

  return [
    { ...nodeData[0], x: cx - spacing, y: cy },
    { ...nodeData[1], x: cx + spacing, y: cy },
  ];
}

let nodes: Node[] = [];
let hoveredNode: Node | null = null;
let dashOffset = 0;

function draw() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);

  // Draw edge
  edges.forEach((edge) => {
    const from = nodes.find((n) => n.id === edge.from);
    const to = nodes.find((n) => n.id === edge.to);
    if (!from || !to) return;

    const isHighlighted = !!hoveredNode;

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = isHighlighted ? '#00FF88' : '#333';
    ctx.lineWidth = isHighlighted ? 1.5 : 1;
    ctx.setLineDash([4, 4]);
    ctx.lineDashOffset = -dashOffset;
    ctx.stroke();
    ctx.setLineDash([]);
  });

  // Draw nodes
  nodes.forEach((node) => {
    const isHovered = hoveredNode?.id === node.id;

    // Outer ring
    ctx.beginPath();
    ctx.arc(node.x, node.y, isHovered ? 12 : 8, 0, Math.PI * 2);
    ctx.strokeStyle = node.color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Inner dot
    ctx.beginPath();
    ctx.arc(node.x, node.y, isHovered ? 6 : 4, 0, Math.PI * 2);
    ctx.fillStyle = node.color;
    ctx.fill();

    // Label
    ctx.font = '12px "Space Mono", monospace';
    ctx.fillStyle = node.color;
    ctx.textAlign = 'center';
    ctx.fillText(node.label, node.x, node.y + 28);
  });

  dashOffset += 0.3;
  requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  hoveredNode = null;
  for (const node of nodes) {
    const dx = mx - node.x;
    const dy = my - node.y;
    if (Math.sqrt(dx * dx + dy * dy) < 24) {
      hoveredNode = node;
      break;
    }
  }

  if (hoveredNode) {
    tooltip.textContent = `${hoveredNode.label} [${hoveredNode.status}]`;
    tooltip.style.left = `${e.clientX - rect.left + 12}px`;
    tooltip.style.top = `${e.clientY - rect.top - 8}px`;
    tooltip.classList.add('visible');
  } else {
    tooltip.classList.remove('visible');
  }
});

canvas.addEventListener('mouseleave', () => {
  hoveredNode = null;
  tooltip.classList.remove('visible');
});

function init() {
  resize();
  nodes = layoutNodes();
  draw();
}

window.addEventListener('resize', () => {
  resize();
  nodes = layoutNodes();
});

init();
