/** SVG graph visualizer rendering nodes as circles and edges as lines with state-driven color animations. */
import { motion, useReducedMotion } from "framer-motion";

import type { GraphVisualState, GraphNodeState, GraphEdgeState } from "@/types";

interface GraphVisualizerProps {
  visualState: GraphVisualState;
}

const NODE_RADIUS = 24;

const NODE_COLORS: Record<GraphNodeState, string> = {
  default: "var(--color-viz-default)",
  visiting: "var(--color-viz-current)",
  visited: "var(--color-viz-sorted)",
  queued: "var(--color-viz-comparing)",
  current: "var(--color-viz-swapping)",
  "in-stack": "var(--color-accent-amber)",
  processed: "var(--color-viz-sorted)",
  "in-mst": "var(--color-accent-emerald)",
  source: "var(--color-accent-cyan)",
  sink: "var(--color-accent-rose)",
  "color-a": "var(--color-accent-cyan)",
  "color-b": "var(--color-accent-amber)",
  conflict: "var(--color-accent-rose)",
  active: "var(--color-viz-current)",
  matched: "var(--color-accent-violet)",
  free: "var(--color-viz-default)",
  trying: "var(--color-accent-amber)",
  backtracking: "var(--color-accent-rose)",
};

const EDGE_COLORS: Record<GraphEdgeState, string> = {
  default: "var(--color-border-default)",
  traversing: "var(--color-viz-current)",
  traversed: "var(--color-viz-sorted)",
  path: "var(--color-viz-found)",
  relaxed: "var(--color-accent-cyan)",
  rejected: "var(--color-accent-rose)",
  "in-mst": "var(--color-accent-emerald)",
  "back-edge": "var(--color-accent-rose)",
  "cross-edge": "var(--color-accent-amber)",
  "forward-edge": "var(--color-accent-cyan)",
  "tree-edge": "var(--color-accent-emerald)",
  bridge: "var(--color-accent-rose)",
  augmenting: "var(--color-accent-cyan)",
  saturated: "var(--color-accent-rose)",
  residual: "var(--color-accent-amber)",
  matched: "var(--color-accent-violet)",
  used: "var(--color-viz-sorted)",
  candidate: "var(--color-accent-amber)",
  "cycle-edge": "var(--color-accent-rose)",
};

const COMPONENT_COLORS = [
  "var(--color-accent-emerald)",
  "var(--color-accent-cyan)",
  "var(--color-accent-amber)",
  "var(--color-accent-rose)",
  "var(--color-accent-violet)",
  "var(--color-accent-blue)",
];

export default function GraphVisualizer({ visualState }: GraphVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
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

        {edges.map((edge) => {
          const sourceNode = nodes.find((node) => node.id === edge.source);
          const targetNode = nodes.find((node) => node.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const deltaX = targetNode.position.x - sourceNode.position.x;
          const deltaY = targetNode.position.y - sourceNode.position.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          if (distance === 0) return null;

          const offsetRatio = NODE_RADIUS / distance;
          const startX = sourceNode.position.x + deltaX * offsetRatio;
          const startY = sourceNode.position.y + deltaY * offsetRatio;
          const endX = targetNode.position.x - deltaX * offsetRatio;
          const endY = targetNode.position.y - deltaY * offsetRatio;

          return (
            <g key={`${edge.source}-${edge.target}`}>
              <motion.line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                animate={{ stroke: EDGE_COLORS[edge.state] }}
                strokeWidth={edge.state === "default" ? 2 : 3}
                markerEnd={visualState.isDirected !== false ? "url(#arrowhead)" : undefined}
                opacity={edge.state === "default" ? 0.4 : 1}
              />
              {edge.weight !== undefined && (
                <text
                  x={(startX + endX) / 2}
                  y={(startY + endY) / 2 - 8}
                  textAnchor="middle"
                  className="select-none font-mono text-xs"
                  fill="var(--color-text-muted)"
                >
                  {edge.weight}
                </text>
              )}
              {edge.capacity !== undefined && (
                <text
                  x={(startX + endX) / 2}
                  y={(startY + endY) / 2 + 12}
                  textAnchor="middle"
                  className="select-none font-mono text-xs"
                  fill="var(--color-text-muted)"
                >
                  {edge.flow ?? 0}/{edge.capacity}
                </text>
              )}
            </g>
          );
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={node.position.x}
              cy={node.position.y}
              r={NODE_RADIUS}
              animate={{
                fill:
                  node.colorIndex !== undefined
                    ? COMPONENT_COLORS[node.colorIndex % COMPONENT_COLORS.length]!
                    : NODE_COLORS[node.state],
              }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
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

      <div className="flex flex-wrap gap-4 text-xs">
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
        {visualState.stack && visualState.stack.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-text-muted)]">Stack:</span>
            <span className="font-mono text-[var(--color-accent-amber)]">
              [{visualState.stack.join(", ")}]
            </span>
          </div>
        )}
        {visualState.topologicalOrder && visualState.topologicalOrder.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-text-muted)]">Topo Order:</span>
            <span className="font-mono text-[var(--color-accent-cyan)]">
              [{visualState.topologicalOrder.join(", ")}]
            </span>
          </div>
        )}
        {visualState.mstWeight !== undefined && visualState.mstWeight > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-text-muted)]">MST Weight:</span>
            <span className="font-mono text-[var(--color-accent-emerald)]">
              {visualState.mstWeight}
            </span>
          </div>
        )}
        {visualState.currentFlow !== undefined && (
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-text-muted)]">Flow:</span>
            <span className="font-mono text-[var(--color-accent-cyan)]">
              {visualState.currentFlow}
              {visualState.maxFlow !== undefined ? `/${visualState.maxFlow}` : ""}
            </span>
          </div>
        )}
        {visualState.distances && Object.keys(visualState.distances).length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-text-muted)]">Dist:</span>
            <span className="font-mono text-[var(--color-accent-cyan)]">
              {Object.entries(visualState.distances)
                .map(([nodeId, dist]) => `${nodeId}:${dist}`)
                .join(", ")}
            </span>
          </div>
        )}
        {visualState.colorAssignment && Object.keys(visualState.colorAssignment).length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-text-muted)]">Colors:</span>
            <span className="font-mono text-[var(--color-accent-violet)]">
              {Object.entries(visualState.colorAssignment)
                .map(([nodeId, color]) => `${nodeId}:${color}`)
                .join(", ")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
