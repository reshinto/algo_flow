/**
 * Storybook stories for the Bellman-Ford algorithm pipeline.
 * Uses the real step generator with a 5-node weighted directed graph including negative edges,
 * rendering the GraphVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateBellmanFordSteps } from "../step-generator";
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

function circlePosition(index: number, totalNodes: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / totalNodes - Math.PI / 2;
  return {
    x: Math.round(200 + 150 * Math.cos(angle)),
    y: Math.round(200 + 150 * Math.sin(angle)),
  };
}

const nodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 5) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 5) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 5) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 5) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 5) },
];

const edges: GraphEdge[] = [
  { source: "A", target: "B", weight: 6, state: "default" },
  { source: "A", target: "C", weight: 7, state: "default" },
  { source: "B", target: "C", weight: 8, state: "default" },
  { source: "B", target: "D", weight: 5, state: "default" },
  { source: "B", target: "E", weight: -4, state: "default" },
  { source: "C", target: "D", weight: -3, state: "default" },
  { source: "C", target: "E", weight: 9, state: "default" },
  { source: "D", target: "B", weight: -2, state: "default" },
  { source: "E", target: "D", weight: 7, state: "default" },
];

const steps = generateBellmanFordSteps({
  adjacencyList: {
    A: [
      ["B", 6],
      ["C", 7],
    ],
    B: [
      ["C", 8],
      ["D", 5],
      ["E", -4],
    ],
    C: [
      ["D", -3],
      ["E", 9],
    ],
    D: [["B", -2]],
    E: [["D", 7]],
  },
  startNodeId: "A",
  nodeIds: ["A", "B", "C", "D", "E"],
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Bellman-Ford",
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

/** Mid-execution — several edge relaxation passes completed */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — final shortest distances computed */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
