/**
 * Storybook stories for the DFS algorithm pipeline.
 * Uses the real step generator with a 6-node directed graph,
 * rendering the GraphVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateDfsSteps } from "./step-generator";
type AdjacencyList = Record<string, string[]>;
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

/** Compute circular layout positions for graph nodes */
function circlePosition(index: number, totalNodes: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / totalNodes - Math.PI / 2;
  return {
    x: Math.round(200 + 150 * Math.cos(angle)),
    y: Math.round(200 + 150 * Math.sin(angle)),
  };
}

const nodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 6) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 6) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 6) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 6) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 6) },
  { id: "F", label: "F", state: "default", position: circlePosition(5, 6) },
];

const edges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "B", target: "D", state: "default" },
  { source: "C", target: "E", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "D", target: "F", state: "default" },
  { source: "E", target: "F", state: "default" },
];

const adjacencyList: AdjacencyList = {
  A: ["B", "C"],
  B: ["D"],
  C: ["E"],
  D: ["E", "F"],
  E: ["F"],
  F: [],
};

const steps = generateDfsSteps({
  adjacencyList,
  startNodeId: "A",
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/DFS",
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

/** Initial state with start node pushed onto the stack */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-traversal with some nodes visited and edges traversed */
export const MidTraversal: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Completed traversal — all reachable nodes visited */
export const TraversalComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
