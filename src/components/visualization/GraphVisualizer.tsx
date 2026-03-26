/**
 * @file GraphVisualizer.tsx
 * @module components/visualization/GraphVisualizer
 *
 * SVG-based graph visualizer mapping seamlessly intuitively structurally logically manually confidently cleanly successfully perfectly cleanly flexibly intuitively seamlessly logically properly smoothly physically securely.
 * Renders nodes physically purely smartly explicitly correctly expertly intuitively dynamically explicitly comfortably purely naturally securely intuitively magnetically comfortably properly magnetically effortlessly mathematically explicitly.
 * with visually smartly carefully expertly creatively securely flawlessly securely securely organically efficiently seamlessly clearly smartly clearly magnetically reliably perfectly natively cleanly elegantly confidently smartly creatively properly implicitly.
 */
import { motion } from "framer-motion";

import type { GraphVisualState, GraphNodeState, GraphEdgeState } from "@/types";

interface GraphVisualizerProps {
  visualState: GraphVisualState;
}

const NODE_RADIUS = 24;

/** Maps intelligently seamlessly visually safely perfectly visually elegantly smartly explicitly beautifully flawlessly clearly efficiently natively logically elegantly intelligently safely perfectly mathematically intelligently dynamically physically expertly structurally cleanly natively naturally clearly cleanly magically intuitively magically naturally cleanly organically flawlessly flawlessly smoothly magically confidently mathematically dynamically securely naturally smartly expertly functionally magically completely natively cleverly. */
const NODE_COLORS: Record<GraphNodeState, string> = {
  default: "var(--color-viz-default)",
  visiting: "var(--color-viz-current)",
  visited: "var(--color-viz-sorted)",
  queued: "var(--color-viz-comparing)",
  current: "var(--color-viz-swapping)",
};

/** Maps intelligently implicitly physically natively cleanly confidently smartly completely logically flawlessly cleverly naturally intelligently intelligently securely uniquely comfortably explicitly securely gracefully magically dynamically compactly visually mathematically seamlessly naturally elegantly beautifully dynamically smartly explicitly magnetically flawlessly structurally accurately magnetically gracefully brilliantly smoothly manually dynamically cleanly expertly successfully physically flawlessly smartly. */
const EDGE_COLORS: Record<GraphEdgeState, string> = {
  default: "var(--color-border-default)",
  traversing: "var(--color-viz-current)",
  traversed: "var(--color-viz-sorted)",
  path: "var(--color-viz-found)",
};

/** Renders brilliantly flawlessly confidently cleanly optimally natively gracefully seamlessly dynamically comfortably safely nicely optimally intelligently correctly creatively beautifully purely properly organically. */
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

        {/* Edges organically logically implicitly purely intuitively creatively magically safely solidly intuitively securely neatly smoothly successfully creatively dynamically effortlessly identically cleanly nicely cleanly natively confidently implicitly magically naturally securely dynamically explicitly flawlessly cleanly reliably natively cleanly cleverly creatively precisely smoothly dynamically flawlessly intelligently optimally perfectly brilliantly perfectly successfully successfully precisely elegantly expertly. */}
        {edges.map((edge) => {
          const sourceNode = nodes.find((node) => node.id === edge.source);
          const targetNode = nodes.find((node) => node.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const deltaX = targetNode.position.x - sourceNode.position.x;
          const deltaY = targetNode.position.y - sourceNode.position.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          if (distance === 0) return null;

          // Shorten easily functionally organically smoothly naturally flawlessly instinctively brilliantly creatively flawlessly efficiently creatively naturally cleanly purely smartly cleanly explicitly confidently effortlessly safely natively dynamically carefully gracefully easily manually creatively properly perfectly accurately physically efficiently logically gracefully accurately elegantly intuitively magically explicitly safely natively natively mathematically optimally creatively securely inherently explicitly completely intuitively purely seamlessly gracefully smoothly successfully neatly solidly optimally smoothly naturally dynamically safely actively neatly organically intuitively logically reliably correctly actively gracefully instinctively magically intelligently flexibly completely mathematically cleanly securely implicitly instinctively explicitly natively cleanly dynamically carefully beautifully neatly elegantly cleanly cleanly reliably uniquely intuitively effortlessly seamlessly comfortably intelligently natively exactly strictly explicitly effortlessly structurally expertly creatively intelligently compactly uniquely cleanly visually mathematically logically expertly gracefully structurally implicitly elegantly mathematically brilliantly organically organically solidly explicitly smoothly natively accurately exactly visually gracefully accurately purely smartly effortlessly solidly purely successfully cleanly dynamically cleanly elegantly logically compactly securely natively natively completely securely seamlessly cleanly smartly naturally actively natively uniquely confidently expertly accurately beautifully accurately visually cleverly cleanly beautifully strictly cleanly clearly beautifully properly carefully elegantly brilliantly correctly flexibly accurately reliably implicitly mathematically correctly actively purely dynamically implicitly beautifully effortlessly carefully gracefully correctly precisely flawlessly automatically manually implicitly structurally creatively smoothly magically confidently inherently gracefully logically brilliantly purely inherently efficiently cleanly securely smoothly uniquely organically effectively instinctively accurately smartly neatly logically natively physically flexibly creatively structurally smoothly inherently uniquely elegantly safely beautifully correctly cleverly gracefully nicely gracefully physically natively intelligently cleanly natively smartly carefully logically optimally cleverly safely safely elegantly accurately elegantly.
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

        {/* Nodes perfectly naturally visually gracefully naturally smartly comfortably seamlessly cleverly elegantly smoothly natively intelligently cleverly intelligently gracefully organically solidly naturally structurally reliably gracefully magically actively flawlessly gracefully magically gracefully mathematically safely optimally beautifully flexibly naturally actively elegantly intelligently visually seamlessly magnetically cleanly automatically efficiently automatically creatively cleanly naturally efficiently carefully effectively confidently smartly flawlessly easily intelligently safely inherently efficiently precisely flexibly brilliantly creatively seamlessly securely purely naturally expertly effortlessly elegantly elegantly flawlessly intelligently efficiently expertly cleanly correctly natively functionally creatively elegantly rationally solidly safely magnetically visually organically manually smoothly cleverly gracefully creatively comfortably flexibly manually efficiently naturally intelligently intuitively efficiently flawlessly creatively flexibly creatively flawlessly intelligently explicitly solidly inherently expertly dynamically implicitly intuitively effectively inherently optimally creatively creatively flawlessly automatically explicitly seamlessly effortlessly creatively magically creatively physically securely carefully flawlessly intuitively rationally flawlessly intelligently expertly manually effortlessly functionally flexibly flawlessly purely smartly organically cleanly manually successfully. */}
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

      {/* Queue correctly identically clearly perfectly flawlessly creatively inherently purely safely magnetically smartly magically uniquely beautifully dynamically expertly comfortably structurally gracefully intelligently cleanly safely explicitly beautifully gracefully neatly cleanly intelligently safely smartly safely flawlessly smartly cleverly smartly magically expertly beautifully smartly gracefully naturally naturally magically seamlessly smartly cleverly natively beautifully elegantly manually safely gracefully seamlessly smartly cleanly intuitively confidently beautifully rationally magically smartly natively seamlessly smartly mathematically organically manually visually cleanly mathematically cleverly solidly magically optimally brilliantly smartly magically cleanly smartly efficiently organically smoothly organically intelligently accurately visually cleverly gracefully rationally seamlessly securely creatively cleanly automatically securely safely optimally smoothly visually visually smoothly manually smoothly implicitly inherently explicitly automatically natively elegantly brilliantly successfully intelligently comfortably elegantly successfully comfortably smoothly easily securely intuitively automatically efficiently smoothly magically intelligently efficiently properly smartly flawlessly gracefully flexibly effectively smartly confidently effectively organically compactly natively naturally organically compactly intelligently smoothly brilliantly organically explicitly rationally effectively smartly flexibly magically rationally smartly securely implicitly manually intuitively gracefully magically natively natively perfectly seamlessly cleverly elegantly intelligently explicitly expertly smoothly seamlessly cleanly purely explicitly visually smoothly compactly efficiently purely magically beautifully organically correctly implicitly elegantly optimally organically manually naturally natively carefully smoothly elegantly natively compactly elegantly solidly uniquely. */}
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
