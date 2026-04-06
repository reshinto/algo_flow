import { motion, useReducedMotion } from "framer-motion";

import type { TreeVisualState, TreeNodeState, TreeNode } from "@/types";

interface TreeVisualizerProps {
  visualState: TreeVisualState;
}

const NODE_RADIUS = 22;

/** Horizontal offset applied to secondary trees so they render to the right of the primary. */
const SECONDARY_TREE_X_OFFSET = 440;

const NODE_COLORS: Record<TreeNodeState, string> = {
  default: "var(--color-viz-default)",
  visiting: "var(--color-viz-current)",
  visited: "var(--color-viz-sorted)",
  current: "var(--color-viz-swapping)",
  found: "var(--color-viz-found)",
  comparing: "var(--color-viz-comparing)",
  target: "var(--color-viz-current)",
  highlighted: "var(--color-viz-visiting)",
};

/** Renders edges and nodes for a single tree (primary or secondary). */
function TreeGroup({
  nodes,
  xOffset,
  shouldReduceMotion,
}: {
  nodes: TreeNode[];
  xOffset: number;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <>
      {/* Edges — draw lines from each node to its children */}
      {nodes.map((node) => {
        const edges: React.ReactNode[] = [];

        if (node.leftChildId) {
          const child = nodes.find((candidate) => candidate.id === node.leftChildId);
          if (child) {
            edges.push(
              <line
                key={`${node.id}-left`}
                x1={node.position.x + xOffset}
                y1={node.position.y}
                x2={child.position.x + xOffset}
                y2={child.position.y}
                stroke="var(--color-border-default)"
                strokeWidth={1.5}
                opacity={0.5}
              />,
            );
          }
        }

        if (node.rightChildId) {
          const child = nodes.find((candidate) => candidate.id === node.rightChildId);
          if (child) {
            edges.push(
              <line
                key={`${node.id}-right`}
                x1={node.position.x + xOffset}
                y1={node.position.y}
                x2={child.position.x + xOffset}
                y2={child.position.y}
                stroke="var(--color-border-default)"
                strokeWidth={1.5}
                opacity={0.5}
              />,
            );
          }
        }

        // N-ary tree edges: render edges to all children when childrenIds is present
        if (node.childrenIds) {
          node.childrenIds.forEach((childId) => {
            const child = nodes.find((candidate) => candidate.id === childId);
            if (child) {
              edges.push(
                <line
                  key={`${node.id}-child-${childId}`}
                  x1={node.position.x + xOffset}
                  y1={node.position.y}
                  x2={child.position.x + xOffset}
                  y2={child.position.y}
                  stroke="var(--color-border-default)"
                  strokeWidth={1.5}
                  opacity={0.5}
                />,
              );
            }
          });
        }

        return edges;
      })}

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.id}>
          <motion.circle
            cx={node.position.x + xOffset}
            cy={node.position.y}
            r={NODE_RADIUS}
            animate={{ fill: NODE_COLORS[node.state] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
            stroke="var(--color-border-subtle)"
            strokeWidth={1.5}
          />
          <text
            x={node.position.x + xOffset}
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
    </>
  );
}

export default function TreeVisualizer({ visualState }: TreeVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { nodes, visitOrder, operationLabel, secondaryTree } = visualState;

  const hasSecondaryTree = secondaryTree != null;
  const viewBoxWidth = hasSecondaryTree ? 860 : 420;

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      {/* Operation label rendered above the tree when present */}
      {operationLabel != null && operationLabel.length > 0 && (
        <div className="text-center text-xs font-semibold text-[var(--color-text-muted)]">
          {operationLabel}
        </div>
      )}

      <svg
        viewBox={`0 0 ${String(viewBoxWidth)} 340`}
        className="mx-auto flex-1"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxHeight: "85%", maxWidth: "100%" }}
      >
        <TreeGroup nodes={nodes} xOffset={0} shouldReduceMotion={shouldReduceMotion ?? false} />

        {/* Secondary tree rendered offset to the right for dual-tree algorithms */}
        {hasSecondaryTree && (
          <TreeGroup
            nodes={secondaryTree.nodes}
            xOffset={SECONDARY_TREE_X_OFFSET}
            shouldReduceMotion={shouldReduceMotion ?? false}
          />
        )}
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
