import { motion } from "framer-motion";

import type { LinkedListVisualState, LinkedListNodeState } from "@/types";

interface LinkedListVisualizerProps {
  visualState: LinkedListVisualState;
}

const NODE_COLORS: Record<LinkedListNodeState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  processed: "var(--color-viz-sorted)",
  swapping: "var(--color-viz-swapping)",
};

const NODE_WIDTH = 48;
const NODE_HEIGHT = 36;

export default function LinkedListVisualizer({ visualState }: LinkedListVisualizerProps) {
  const { nodes, headId, pointers } = visualState;

  // Build a reverse map: nodeId → pointer names pointing at it
  const nodePointerLabels: Record<string, string[]> = {};
  for (const [name, nodeId] of Object.entries(pointers)) {
    if (nodeId) {
      if (!nodePointerLabels[nodeId]) nodePointerLabels[nodeId] = [];
      nodePointerLabels[nodeId]!.push(name);
    }
  }

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <svg
        viewBox="0 0 420 220"
        className="mx-auto flex-1"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxHeight: "85%", maxWidth: "100%" }}
      >
        <defs>
          <marker id="ll-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--color-border-default)" opacity={0.7} />
          </marker>
        </defs>

        {/* Edges — draw arrows from each node to its next */}
        {nodes.map((node) => {
          if (!node.nextId) return null;
          const targetNode = nodes.find((other) => other.id === node.nextId);
          if (!targetNode) return null;

          const startX = node.position.x + NODE_WIDTH / 2;
          const endX = targetNode.position.x - NODE_WIDTH / 2 - 2;
          const lineY = node.position.y;

          return (
            <line
              key={`edge-${node.id}`}
              x1={startX}
              y1={lineY}
              x2={endX}
              y2={lineY}
              stroke="var(--color-border-default)"
              strokeWidth={1.5}
              markerEnd="url(#ll-arrow)"
              opacity={0.6}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const labels = nodePointerLabels[node.id] ?? [];
          const rectX = node.position.x - NODE_WIDTH / 2;
          const rectY = node.position.y - NODE_HEIGHT / 2;

          return (
            <g key={node.id}>
              {/* Pointer labels above the node */}
              {labels.map((label, labelIdx) => (
                <text
                  key={label}
                  x={node.position.x}
                  y={rectY - 8 - labelIdx * 16}
                  textAnchor="middle"
                  className="select-none font-mono text-xs font-semibold"
                  fill="var(--color-accent-cyan)"
                >
                  {label}
                </text>
              ))}

              <motion.rect
                x={rectX}
                y={rectY}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx={4}
                animate={{ fill: NODE_COLORS[node.state] }}
                transition={{ duration: 0.3 }}
                stroke="var(--color-border-subtle)"
                strokeWidth={1.5}
              />

              <text
                x={node.position.x}
                y={node.position.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="select-none font-mono text-sm font-bold"
                fill="var(--color-text-primary)"
              >
                {node.value}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-[var(--color-text-muted)]">Head:</span>
        <span className="font-mono text-[var(--color-accent-cyan)]">{headId ?? "null"}</span>
      </div>
    </div>
  );
}
