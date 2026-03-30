/**
 * Storybook stories for the DAG Shortest Path algorithm pipeline.
 * Uses the real step generator with a 6-node weighted directed acyclic graph,
 * rendering the GraphVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateDagShortestPathSteps } from "./step-generator";
import GraphVisualizer from "@/components/visualization/GraphVisualizer";

/** Left-to-right layout positions for a 6-node DAG */
const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  A: { x: 50, y: 200 },
  B: { x: 150, y: 100 },
  C: { x: 150, y: 300 },
  D: { x: 250, y: 100 },
  E: { x: 250, y: 300 },
  F: { x: 350, y: 200 },
};

const storyNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: NODE_POSITIONS["A"]! },
  { id: "B", label: "B", state: "default", position: NODE_POSITIONS["B"]! },
  { id: "C", label: "C", state: "default", position: NODE_POSITIONS["C"]! },
  { id: "D", label: "D", state: "default", position: NODE_POSITIONS["D"]! },
  { id: "E", label: "E", state: "default", position: NODE_POSITIONS["E"]! },
  { id: "F", label: "F", state: "default", position: NODE_POSITIONS["F"]! },
];

const storyEdges: GraphEdge[] = [
  { source: "A", target: "B", weight: 2, state: "default" },
  { source: "A", target: "C", weight: 6, state: "default" },
  { source: "B", target: "D", weight: 1, state: "default" },
  { source: "B", target: "E", weight: 4, state: "default" },
  { source: "C", target: "E", weight: 2, state: "default" },
  { source: "D", target: "F", weight: 5, state: "default" },
  { source: "E", target: "F", weight: 1, state: "default" },
];

const steps = generateDagShortestPathSteps({
  adjacencyList: {
    A: [
      ["B", 2],
      ["C", 6],
    ],
    B: [
      ["D", 1],
      ["E", 4],
    ],
    C: [["E", 2]],
    D: [["F", 5]],
    E: [["F", 1]],
    F: [],
  },
  startNodeId: "A",
  nodeIds: ["A", "B", "C", "D", "E", "F"],
  nodes: storyNodes,
  edges: storyEdges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/DAG Shortest Path",
  component: GraphVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GraphVisualizer>;

/** Initial state — all distances Infinity except source node A at 0 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Topological sort phase — nodes being added to processing order */
export const TopologicalSortPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 3)]!.visualState as GraphVisualState,
  },
};

/** Relaxation phase — edges being relaxed in topological order */
export const RelaxationPhase: Story = {
  args: {
    visualState: steps[Math.floor((steps.length * 2) / 3)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — all reachable nodes have final shortest distances */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
