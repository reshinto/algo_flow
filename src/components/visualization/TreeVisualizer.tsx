import { motion } from "framer-motion";

import type { TreeVisualState, TreeNodeState } from "@/types";

interface TreeVisualizerProps {
  visualState: TreeVisualState;
}

const NODE_RADIUS = 22;

const NODE_COLORS: Record<TreeNodeState, string> = {
  default: "var(--color-viz-default)",
  visiting: "var(--color-viz-current)",
  visited: "var(--color-viz-sorted)",
  current: "var(--color-viz-swapping)",
};

export default function TreeVisualizer({ visualState }: TreeVisualizerProps) {
  const { nodes, visitOrder } = visualState;

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <svg
        viewBox="0 0 420 340"
        className="mx-auto flex-1"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxHeight: "85%", maxWidth: "100%" }}
      >
        {/* Edges — draw lines from each node to its children */}
        {nodes.map((node) => {
          const lines: React.ReactNode[] = [];

          if (node.leftChildId) {
            const child = nodes.find((n) => n.id === node.leftChildId);
            if (child) {
              lines.push(
                <line
                  key={`${node.id}-left`}
                  x1={node.position.x}
                  y1={node.position.y}
                  x2={child.position.x}
                  y2={child.position.y}
                  stroke="var(--color-border-default)"
                  strokeWidth={1.5}
                  opacity={0.5}
                />,
              );
            }
          }

          if (node.rightChildId) {
            const child = nodes.find((n) => n.id === node.rightChildId);
            if (child) {
              lines.push(
                <line
                  key={`${node.id}-right`}
                  x1={node.position.x}
                  y1={node.position.y}
                  x2={child.position.x}
                  y2={child.position.y}
                  stroke="var(--color-border-default)"
                  strokeWidth={1.5}
                  opacity={0.5}
                />,
              );
            }
          }

          return lines;
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={node.position.x}
              cy={node.position.y}
              r={NODE_RADIUS}
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
        ))}
      </svg>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-[var(--color-text-muted)]">Visit order:</span>
        <span className="font-mono text-[var(--color-accent-emerald)]">
          {visitOrder.length > 0 ? visitOrder.join(" → ") : "—"}
        </span>
      </div>
    </div>
  );
}
