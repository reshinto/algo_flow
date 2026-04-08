/**
 * Storybook stories for the Floyd-Warshall algorithm pipeline.
 * Uses the real step generator with a 4-node weighted directed graph,
 * rendering the GraphVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateFloydWarshallSteps } from "../step-generator";
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

function circlePosition(index: number, totalNodes: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / totalNodes - Math.PI / 2;
  return {
    x: Math.round(200 + 150 * Math.cos(angle)),
    y: Math.round(200 + 150 * Math.sin(angle)),
  };
}

const nodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 4) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 4) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 4) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 4) },
];

const edges: GraphEdge[] = [
  { source: "A", target: "B", weight: 3, state: "default" },
  { source: "A", target: "C", weight: 8, state: "default" },
  { source: "A", target: "D", weight: -4, state: "default" },
  { source: "B", target: "D", weight: 7, state: "default" },
  { source: "B", target: "C", weight: 4, state: "default" },
  { source: "C", target: "B", weight: -5, state: "default" },
  { source: "D", target: "C", weight: 6, state: "default" },
];

const steps = generateFloydWarshallSteps({
  adjacencyList: {
    A: [
      ["B", 3],
      ["C", 8],
      ["D", -4],
    ],
    B: [
      ["D", 7],
      ["C", 4],
    ],
    C: [["B", -5]],
    D: [["C", 6]],
  },
  nodeIds: ["A", "B", "C", "D"],
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Floyd-Warshall",
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

/** Initial state — distance matrix initialized from direct edges */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-execution — some intermediate nodes processed, distances updated */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — all-pairs shortest distance matrix finalized */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
