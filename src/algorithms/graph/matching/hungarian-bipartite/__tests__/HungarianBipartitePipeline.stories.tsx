/**
 * Storybook stories for the Hungarian Bipartite Matching algorithm pipeline.
 * Uses the real step generator with a 6-node bipartite graph (3 left + 3 right),
 * rendering the GraphVisualizer at key matching states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateHungarianBipartiteSteps } from "../step-generator";
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

const nodes: GraphNode[] = [
  { id: "L1", label: "L1", state: "default", position: { x: 100, y: 100 } },
  { id: "L2", label: "L2", state: "default", position: { x: 100, y: 200 } },
  { id: "L3", label: "L3", state: "default", position: { x: 100, y: 300 } },
  { id: "R1", label: "R1", state: "default", position: { x: 300, y: 100 } },
  { id: "R2", label: "R2", state: "default", position: { x: 300, y: 200 } },
  { id: "R3", label: "R3", state: "default", position: { x: 300, y: 300 } },
];

const edges: GraphEdge[] = [
  { source: "L1", target: "R1", state: "default" },
  { source: "R1", target: "L1", state: "default" },
  { source: "L1", target: "R2", state: "default" },
  { source: "R2", target: "L1", state: "default" },
  { source: "L2", target: "R2", state: "default" },
  { source: "R2", target: "L2", state: "default" },
  { source: "L2", target: "R3", state: "default" },
  { source: "R3", target: "L2", state: "default" },
  { source: "L3", target: "R1", state: "default" },
  { source: "R1", target: "L3", state: "default" },
  { source: "L3", target: "R3", state: "default" },
  { source: "R3", target: "L3", state: "default" },
];

const steps = generateHungarianBipartiteSteps({
  adjacencyList: {
    L1: ["R1", "R2"],
    L2: ["R2", "R3"],
    L3: ["R1", "R3"],
    R1: ["L1", "L3"],
    R2: ["L1", "L2"],
    R3: ["L2", "L3"],
  },
  leftNodes: ["L1", "L2", "L3"],
  rightNodes: ["R1", "R2", "R3"],
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Hungarian Bipartite Matching",
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

/** Initial state — all nodes unmatched, matching maps empty */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-matching state — some augmenting paths found, partial matching in progress */
export const MidMatching: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Completed state — maximum matching found, all matchable nodes paired */
export const MatchingComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
