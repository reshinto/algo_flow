/**
 * SVG-based graph visualizer for BFS, DFS, and similar traversal algorithms.
 * Renders nodes as circles and edges as directed lines within a fixed viewBox,
 * with animated color transitions reflecting traversal state.
 */
import { motion } from "framer-motion";

import type { GraphVisualState, GraphNodeState, GraphEdgeState } from "@/types";

interface GraphVisualizerProps {
  visualState: GraphVisualState;
}

const NODE_RADIUS = 24;

/** Maps each node traversal state to its CSS color variable. */
const NODE_COLORS: Record<GraphNodeState, string> = {
  default: "var(--color-viz-default)",
  visiting: "var(--color-viz-current)",
  visited: "var(--color-viz-sorted)",
  queued: "var(--color-viz-comparing)",
  current: "var(--color-viz-swapping)",
};

/** Maps each edge traversal state to its CSS color variable. */
const EDGE_COLORS: Record<GraphEdgeState, string> = {
  default: "var(--color-border-default)",
  traversing: "var(--color-viz-current)",
  traversed: "var(--color-viz-sorted)",
  path: "var(--color-viz-found)",
};

/** Renders a directed graph with animated node/edge state and queue/visited indicators. */
export default function GraphVisualizer({ visualState }: GraphVisualizerProps) {
  const { nodes, edges, queue, visited } = visualState;

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <svg
        viewBox="0 0 400 400"
        className="mx-auto flex-1"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-border-default)" opacity={0.6} />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map((edge) => {
          const sourceNode = nodes.find((node) => node.id === edge.source);
          const targetNode = nodes.find((node) => node.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const deltaX = targetNode.position.x - sourceNode.position.x;
          const deltaY = targetNode.position.y - sourceNode.position.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          if (distance === 0) return null;

          // Shorten each end by NODE_RADIUS so edges start/end at circle borders
          const offsetRatio = NODE_RADIUS / distance;
          const startX = sourceNode.position.x + deltaX * offsetRatio;
          const startY = sourceNode.position.y + deltaY * offsetRatio;
          const endX = targetNode.position.x - deltaX * offsetRatio;
          const endY = targetNode.position.y - deltaY * offsetRatio;

          return (
            <motion.line
              key={`${edge.source}-${edge.target}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              animate={{ stroke: EDGE_COLORS[edge.state] }}
              strokeWidth={edge.state === "default" ? 2 : 3}
              markerEnd="url(#arrowhead)"
              opacity={edge.state === "default" ? 0.4 : 1}
            />
          );
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
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Queue and Visited indicators */}
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <span className="text-[var(--color-text-muted)]">Queue:</span>
          <span className="font-mono text-[var(--color-accent-cyan)]">
            {queue.length > 0 ? `[${queue.join(", ")}]` : "empty"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[var(--color-text-muted)]">Visited:</span>
          <span className="font-mono text-[var(--color-accent-emerald)]">
            {visited.length > 0 ? `{${visited.join(", ")}}` : "none"}
          </span>
        </div>
      </div>
    </div>
  );
}
