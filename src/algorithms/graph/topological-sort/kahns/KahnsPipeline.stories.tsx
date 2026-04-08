/**
 * Storybook stories for Kahn's Algorithm pipeline.
 * Uses the real step generator with a 6-node DAG,
 * rendering the GraphVisualizer at key processing states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateKahnsSteps } from "./step-generator";
import type { KahnsInput } from "./step-generator";
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

type AdjacencyList = Record<string, string[]>;

/** Layered left-to-right positions for a DAG with 6 nodes */
const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  A: { x: 50, y: 200 },
  B: { x: 175, y: 100 },
  C: { x: 175, y: 300 },
  D: { x: 300, y: 100 },
  E: { x: 300, y: 300 },
  F: { x: 425, y: 200 },
};

const nodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: NODE_POSITIONS.A! },
  { id: "B", label: "B", state: "default", position: NODE_POSITIONS.B! },
  { id: "C", label: "C", state: "default", position: NODE_POSITIONS.C! },
  { id: "D", label: "D", state: "default", position: NODE_POSITIONS.D! },
  { id: "E", label: "E", state: "default", position: NODE_POSITIONS.E! },
  { id: "F", label: "F", state: "default", position: NODE_POSITIONS.F! },
];

const edges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "B", target: "D", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "C", target: "E", state: "default" },
  { source: "D", target: "F", state: "default" },
  { source: "E", target: "F", state: "default" },
];

const adjacencyList: AdjacencyList = {
  A: ["B", "C"],
  B: ["D"],
  C: ["D", "E"],
  D: ["F"],
  E: ["F"],
  F: [],
};

const defaultInput: KahnsInput = {
  adjacencyList,
  nodeIds: ["A", "B", "C", "D", "E", "F"],
  nodes,
  edges,
};

const steps = generateKahnsSteps(defaultInput);

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Kahn's Algorithm",
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

/** Initial state with in-degrees computed and zero-in-degree nodes queued */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-sort with some nodes processed and edges removed */
export const MidSort: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Completed sort — all nodes in topological order */
export const SortComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
