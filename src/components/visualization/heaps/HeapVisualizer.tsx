import { motion, useReducedMotion } from "framer-motion";

import type { HeapVisualState, HeapNodeState } from "@/types";

interface HeapVisualizerProps {
  visualState: HeapVisualState;
}

const NODE_RADIUS = 20;

const NODE_COLORS: Record<HeapNodeState, string> = {
  default: "var(--color-viz-default)",
  comparing: "var(--color-viz-comparing)",
  swapping: "var(--color-viz-swapping)",
  settled: "var(--color-viz-sorted)",
  current: "var(--color-viz-current)",
  inserted: "var(--color-viz-visiting)",
  extracted: "var(--color-viz-eliminated)",
  updated: "var(--color-viz-swapping)",
  highlighted: "var(--color-viz-found)",
};

const ARRAY_CELL_COLORS: Record<HeapNodeState, string> = NODE_COLORS;

export default function HeapVisualizer({ visualState }: HeapVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { nodes } = visualState;

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      {/* Tree view */}
      <svg
        viewBox="0 0 420 260"
        className="mx-auto w-full flex-1"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxHeight: "70%" }}
      >
        {/* Edges from each node to its children */}
        {nodes.map((node) => {
          const leftIdx = 2 * node.index + 1;
          const rightIdx = 2 * node.index + 2;
          const edges: React.ReactNode[] = [];

          const leftChild = nodes[leftIdx];
          const rightChild = nodes[rightIdx];

          if (leftChild) {
            edges.push(
              <line
                key={`left-${node.index}`}
                x1={node.position.x}
                y1={node.position.y}
                x2={leftChild.position.x}
                y2={leftChild.position.y}
                stroke="var(--color-border-default)"
                strokeWidth={1.5}
                opacity={0.5}
              />,
            );
          }
          if (rightChild) {
            edges.push(
              <line
                key={`right-${node.index}`}
                x1={node.position.x}
                y1={node.position.y}
                x2={rightChild.position.x}
                y2={rightChild.position.y}
                stroke="var(--color-border-default)"
                strokeWidth={1.5}
                opacity={0.5}
              />,
            );
          }
          return edges;
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.index}>
            <motion.circle
              cx={node.position.x}
              cy={node.position.y}
              r={NODE_RADIUS}
              animate={{ fill: NODE_COLORS[node.state] }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
              stroke="var(--color-border-subtle)"
              strokeWidth={1.5}
            />
            <text
              x={node.position.x}
              y={node.position.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="select-none font-mono text-xs font-bold"
              fill="var(--color-text-primary)"
            >
              {node.value}
            </text>
            {/* Index label below node */}
            <text
              x={node.position.x}
              y={node.position.y + NODE_RADIUS + 11}
              textAnchor="middle"
              className="select-none font-mono text-[9px]"
              fill="var(--color-text-muted)"
            >
              {node.index}
            </text>
          </g>
        ))}
      </svg>

      {/* Array view */}
      <div className="flex flex-wrap justify-center gap-1">
        {nodes.map((node) => (
          <motion.div
            key={node.index}
            className="flex w-10 flex-col items-center"
            animate={{ backgroundColor: ARRAY_CELL_COLORS[node.state] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25 }}
            style={{
              border: "1px solid var(--color-border-subtle)",
              borderRadius: 4,
              padding: "4px 0",
            }}
          >
            <span className="font-mono text-xs font-bold leading-none text-[var(--color-text-primary)]">
              {node.value}
            </span>
            <span className="font-mono text-[9px] leading-none text-[var(--color-text-muted)]">
              [{node.index}]
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
