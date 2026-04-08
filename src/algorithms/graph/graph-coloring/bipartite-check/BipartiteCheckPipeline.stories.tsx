/**
 * Storybook stories for the Bipartite Check algorithm pipeline.
 * Uses the real step generator with a 6-node bipartite graph (3 nodes per side),
 * rendering the GraphVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateBipartiteCheckSteps } from "./step-generator";
import type { BipartiteCheckInput } from "./step-generator";
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

const LEFT_X = 100;
const RIGHT_X = 320;
const TOP_Y = 80;
const ROW_SPACING = 120;

const nodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: { x: LEFT_X, y: TOP_Y } },
  { id: "B", label: "B", state: "default", position: { x: LEFT_X, y: TOP_Y + ROW_SPACING } },
  { id: "C", label: "C", state: "default", position: { x: LEFT_X, y: TOP_Y + 2 * ROW_SPACING } },
  { id: "D", label: "D", state: "default", position: { x: RIGHT_X, y: TOP_Y } },
  { id: "E", label: "E", state: "default", position: { x: RIGHT_X, y: TOP_Y + ROW_SPACING } },
  { id: "F", label: "F", state: "default", position: { x: RIGHT_X, y: TOP_Y + 2 * ROW_SPACING } },
];

const edges: GraphEdge[] = [
  { source: "A", target: "D", state: "default" },
  { source: "D", target: "A", state: "default" },
  { source: "A", target: "E", state: "default" },
  { source: "E", target: "A", state: "default" },
  { source: "B", target: "D", state: "default" },
  { source: "D", target: "B", state: "default" },
  { source: "B", target: "F", state: "default" },
  { source: "F", target: "B", state: "default" },
  { source: "C", target: "E", state: "default" },
  { source: "E", target: "C", state: "default" },
  { source: "C", target: "F", state: "default" },
  { source: "F", target: "C", state: "default" },
];

const adjacencyList: BipartiteCheckInput["adjacencyList"] = {
  A: ["D", "E"],
  B: ["D", "F"],
  C: ["E", "F"],
  D: ["A", "B"],
  E: ["A", "C"],
  F: ["B", "C"],
};

const steps = generateBipartiteCheckSteps({
  adjacencyList,
  nodeIds: ["A", "B", "C", "D", "E", "F"],
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Bipartite Check",
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

/** Initial state — uncolored bipartite graph before BFS starts */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-execution — BFS coloring in progress, some nodes assigned to each partition */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — graph confirmed bipartite, two-coloring shown */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
