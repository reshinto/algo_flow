import { motion, useReducedMotion } from "framer-motion";

import type { LinkedListVisualState, LinkedListNodeState } from "@/types";

interface LinkedListVisualizerProps {
  visualState: LinkedListVisualState;
}

const NODE_COLORS: Record<LinkedListNodeState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  processed: "var(--color-viz-sorted)",
  swapping: "var(--color-viz-swapping)",
  "in-cycle": "var(--color-viz-warning)",
  deleted: "var(--color-viz-error)",
  inserted: "var(--color-viz-success)",
  highlighted: "var(--color-viz-highlight)",
  found: "var(--color-viz-success)",
};

const NODE_WIDTH = 48;
const NODE_HEIGHT = 36;
const CYCLE_ARC_OFFSET = 40;

function computeViewBox(visualState: LinkedListVisualState): string {
  const { nodes, secondaryHeadId, cycleEdge } = visualState;
  if (nodes.length === 0) return "0 0 420 220";

  let maxX = 0;
  let maxY = 0;
  for (const node of nodes) {
    const nodeRight = node.position.x + NODE_WIDTH / 2;
    const nodeBottom = node.position.y + NODE_HEIGHT / 2;
    if (nodeRight > maxX) maxX = nodeRight;
    if (nodeBottom > maxY) maxY = nodeBottom;
  }

  const paddingX = 40;
  let paddingY = 60;
  if (secondaryHeadId) paddingY = 80;
  if (cycleEdge) paddingY = Math.max(paddingY, CYCLE_ARC_OFFSET + 40);

  const width = Math.max(420, maxX + paddingX);
  const height = Math.max(220, maxY + paddingY);
  return `0 0 ${width} ${height}`;
}

export default function LinkedListVisualizer({ visualState }: LinkedListVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { nodes, headId, secondaryHeadId, pointers, cycleEdge } = visualState;

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
        viewBox={computeViewBox(visualState)}
        className="mx-auto flex-1"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxHeight: "85%", maxWidth: "100%" }}
      >
        <defs>
          <marker id="ll-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--color-border-default)" opacity={0.7} />
          </marker>
          <marker
            id="ll-arrow-back"
            markerWidth="8"
            markerHeight="6"
            refX="1"
            refY="3"
            orient="auto"
          >
            <polygon points="8 0, 0 3, 8 6" fill="var(--color-border-default)" opacity={0.5} />
          </marker>
          <marker
            id="ll-arrow-cycle"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 8 3, 0 6" fill="var(--color-viz-warning)" opacity={0.8} />
          </marker>
        </defs>

        {/* Forward edges — draw arrows from each node to its next */}
        {nodes.map((node) => {
          if (!node.nextId) return null;
          // Skip the cycle-closing edge (rendered separately as arc)
          if (cycleEdge && node.id === cycleEdge.fromId && node.nextId === cycleEdge.toId) {
            return null;
          }
          const targetNode = nodes.find((other) => other.id === node.nextId);
          if (!targetNode) return null;

          const startX = node.position.x + NODE_WIDTH / 2;
          const endX = targetNode.position.x - NODE_WIDTH / 2 - 2;
          const startY = node.position.y;
          const endY = targetNode.position.y;

          return (
            <line
              key={`edge-${node.id}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="var(--color-border-default)"
              strokeWidth={1.5}
              markerEnd="url(#ll-arrow)"
              opacity={0.6}
            />
          );
        })}

        {/* Backward edges for doubly-linked lists */}
        {nodes.map((node) => {
          if (node.prevId === undefined || node.prevId === null) return null;
          const targetNode = nodes.find((other) => other.id === node.prevId);
          if (!targetNode) return null;

          const startX = node.position.x - NODE_WIDTH / 2;
          const endX = targetNode.position.x + NODE_WIDTH / 2 + 2;
          const lineY = node.position.y + 12;

          return (
            <line
              key={`back-edge-${node.id}`}
              x1={startX}
              y1={lineY}
              x2={endX}
              y2={lineY}
              stroke="var(--color-border-default)"
              strokeWidth={1}
              strokeDasharray="4 2"
              markerEnd="url(#ll-arrow-back)"
              opacity={0.4}
            />
          );
        })}

        {/* Cycle-closing edge — rendered as a curved arc */}
        {cycleEdge &&
          (() => {
            const fromNode = nodes.find((node) => node.id === cycleEdge.fromId);
            const toNode = nodes.find((node) => node.id === cycleEdge.toId);
            if (!fromNode || !toNode) return null;

            const startX = fromNode.position.x;
            const startY = fromNode.position.y + NODE_HEIGHT / 2;
            const endX = toNode.position.x;
            const endY = toNode.position.y + NODE_HEIGHT / 2;
            const midX = (startX + endX) / 2;
            const controlY = Math.max(startY, endY) + CYCLE_ARC_OFFSET;

            return (
              <path
                key="cycle-edge"
                d={`M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`}
                fill="none"
                stroke="var(--color-viz-warning)"
                strokeWidth={1.5}
                strokeDasharray="6 3"
                markerEnd="url(#ll-arrow-cycle)"
                opacity={0.7}
              />
            );
          })()}

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
                {node.value}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex items-center gap-2 text-xs">
        <span className="text-[var(--color-text-muted)]">Head:</span>
        <span className="font-mono text-[var(--color-accent-cyan)]">{headId ?? "null"}</span>
        {secondaryHeadId !== undefined && secondaryHeadId !== null && (
          <>
            <span className="ml-2 text-[var(--color-text-muted)]">Head 2:</span>
            <span className="font-mono text-[var(--color-accent-cyan)]">{secondaryHeadId}</span>
          </>
        )}
        {visualState.phase && (
          <>
            <span className="ml-2 text-[var(--color-text-muted)]">Phase:</span>
            <span className="font-mono text-[var(--color-accent-violet)]">{visualState.phase}</span>
          </>
        )}
      </div>
    </div>
  );
}
