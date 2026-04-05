/** React component that renders a trie data structure as an SVG tree diagram. */

import { motion, useReducedMotion } from "framer-motion";

import type { TrieVisualState, TrieNodeState, TrieEdgeState, StringCharState } from "@/types";
import { computeTrieLayout } from "@/components/visualization/trie-visualizer-utils";

interface TrieVisualizerProps {
  visualState: TrieVisualState;
}

const NODE_RADIUS = 18;
const LEVEL_HEIGHT = 60;
const CHAR_CELL_SIZE = 32;
const END_RING_OFFSET = 4;

const NODE_COLORS: Record<TrieNodeState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  matched: "var(--color-accent-emerald)",
  path: "var(--color-accent-amber)",
  inserted: "var(--color-accent-cyan)",
};

const EDGE_COLORS: Record<TrieEdgeState, string> = {
  default: "var(--color-border-subtle)",
  highlighted: "var(--color-accent-amber)",
  traversed: "var(--color-accent-emerald)",
};

const CHAR_COLORS: Record<StringCharState, string> = {
  default: "var(--color-viz-default)",
  current: "var(--color-viz-current)",
  matching: "var(--color-accent-amber)",
  matched: "var(--color-accent-emerald)",
  mismatched: "var(--color-accent-rose)",
};

export default function TrieVisualizer({ visualState }: TrieVisualizerProps) {
  const shouldReduceMotion = useReducedMotion();
  const { nodes, edges, searchWord, suggestions, matchResult } = visualState;

  // Compute SVG dimensions based on node levels
  const levelCount = computeLevelCount(nodes, edges);
  const svgHeight = Math.max(levelCount * LEVEL_HEIGHT + LEVEL_HEIGHT / 2, LEVEL_HEIGHT * 2);

  return (
    <div className="flex h-full flex-col gap-4 overflow-x-auto overflow-y-hidden p-4">
      <div className="flex min-h-0 min-w-max flex-1 flex-col items-center justify-start gap-4">
        {/* Search word row */}
        {searchWord.length > 0 && (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[var(--color-text-muted)]">Search / Insert word</span>
            <div className="flex gap-1">
              {searchWord.map((char, charIndex) => (
                <motion.div
                  key={charIndex}
                  className="flex items-center justify-center rounded font-mono text-sm font-bold"
                  style={{
                    width: CHAR_CELL_SIZE,
                    height: CHAR_CELL_SIZE,
                    border: "1px solid var(--color-border-subtle)",
                    color: "var(--color-text-primary)",
                    flexShrink: 0,
                  }}
                  animate={{ backgroundColor: CHAR_COLORS[char.state] }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
                >
                  {char.value}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SVG trie tree */}
        <TrieSvgTree
          nodes={nodes}
          edges={edges}
          svgHeight={svgHeight}
          shouldReduceMotion={shouldReduceMotion ?? false}
        />

        {/* Suggestions list */}
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1"
          >
            <span className="text-xs text-[var(--color-text-muted)]">Suggestions</span>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, suggestionIndex) => (
                <span
                  key={suggestionIndex}
                  className="rounded px-2 py-0.5 font-mono text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--color-surface-tertiary)",
                    border: "1px solid var(--color-border-subtle)",
                    color: "var(--color-accent-cyan)",
                  }}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Match result banner */}
        {matchResult !== null && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm font-semibold"
            style={{
              color: matchResult ? "var(--color-accent-emerald)" : "var(--color-accent-rose)",
            }}
          >
            {matchResult ? "Word found ✓" : "Word not found ✗"}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            SVG Sub-component                                */
/* -------------------------------------------------------------------------- */

interface TrieSvgTreeProps {
  nodes: TrieVisualState["nodes"];
  edges: TrieVisualState["edges"];
  svgHeight: number;
  shouldReduceMotion: boolean;
}

function TrieSvgTree({ nodes, edges, svgHeight, shouldReduceMotion }: TrieSvgTreeProps) {
  // Use a fixed canvas width for layout; SVG stretches to container via viewBox
  const canvasWidth = Math.max(nodes.length * 50, 400);
  const layout = computeTrieLayout(nodes, edges, canvasWidth, LEVEL_HEIGHT);
  const positionMap = new Map(layout.map((entry) => [entry.id, entry]));

  return (
    <svg
      viewBox={`0 0 ${canvasWidth} ${svgHeight}`}
      style={{ width: "100%", maxWidth: canvasWidth, height: svgHeight }}
      aria-label="Trie tree diagram"
    >
      {/* Edges — rendered first so nodes appear on top */}
      {edges.map((edge) => {
        const fromPos = positionMap.get(edge.from);
        const toPos = positionMap.get(edge.to);
        if (fromPos === undefined || toPos === undefined) return null;

        const edgeColor = EDGE_COLORS[edge.state];
        // Midpoint for edge label
        const midX = (fromPos.x + toPos.x) / 2;
        const midY = (fromPos.y + toPos.y) / 2;

        return (
          <g key={`edge-${edge.from}-${edge.to}`}>
            <line
              x1={fromPos.x}
              y1={fromPos.y}
              x2={toPos.x}
              y2={toPos.y}
              stroke={edgeColor}
              strokeWidth={2}
              strokeLinecap="round"
            />
            {/* Edge char label */}
            <text
              x={midX}
              y={midY - 4}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={10}
              fontFamily="monospace"
              fill="var(--color-text-muted)"
            >
              {edge.char}
            </text>
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const pos = positionMap.get(node.id);
        if (pos === undefined) return null;

        const fillColor = NODE_COLORS[node.state];

        return (
          <g key={`node-${node.id}`}>
            {/* End-of-word double circle */}
            {node.isEnd && (
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_RADIUS + END_RING_OFFSET}
                fill="none"
                stroke={fillColor}
                strokeWidth={1.5}
                opacity={0.6}
              />
            )}

            {/* Main node circle — animated fill */}
            <TrieNodeCircle
              cx={pos.x}
              cy={pos.y}
              radius={NODE_RADIUS}
              fillColor={fillColor}
              shouldReduceMotion={shouldReduceMotion}
            />

            {/* Char label */}
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={12}
              fontWeight="bold"
              fontFamily="monospace"
              fill="var(--color-text-primary)"
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {node.char === "" ? "·" : node.char}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                          Animated Node Circle                               */
/* -------------------------------------------------------------------------- */

interface TrieNodeCircleProps {
  cx: number;
  cy: number;
  radius: number;
  fillColor: string;
  shouldReduceMotion: boolean;
}

function TrieNodeCircle({ cx, cy, radius, fillColor, shouldReduceMotion }: TrieNodeCircleProps) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={radius}
      stroke="var(--color-border-subtle)"
      strokeWidth={1.5}
      animate={{ fill: fillColor }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                               Helper Functions                              */
/* -------------------------------------------------------------------------- */

/** Count the number of levels in the trie via BFS from the root node. */
function computeLevelCount(
  nodes: TrieVisualState["nodes"],
  edges: TrieVisualState["edges"],
): number {
  if (nodes.length === 0) return 0;

  const childrenMap = new Map<number, number[]>();
  for (const node of nodes) {
    childrenMap.set(node.id, []);
  }
  for (const edge of edges) {
    const children = childrenMap.get(edge.from);
    if (children !== undefined) {
      children.push(edge.to);
    }
  }

  const visited = new Set<number>();
  const queue: number[] = [0];
  visited.add(0);
  let levelCount = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    levelCount++;

    for (let levelIndex = 0; levelIndex < levelSize; levelIndex++) {
      const nodeId = queue.shift();
      if (nodeId === undefined) break;

      const children = childrenMap.get(nodeId) ?? [];
      for (const childId of children) {
        if (!visited.has(childId)) {
          visited.add(childId);
          queue.push(childId);
        }
      }
    }
  }

  return levelCount;
}
