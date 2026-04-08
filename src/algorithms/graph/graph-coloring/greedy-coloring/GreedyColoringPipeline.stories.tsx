/**
 * Storybook stories for the Greedy Graph Coloring algorithm pipeline.
 * Uses the real step generator with a 6-node undirected graph requiring 3 colors,
 * rendering the GraphVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateGreedyColoringSteps } from "./step-generator";
import type { GreedyColoringInput } from "./step-generator";
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

const CIRCLE_RADIUS = 150;
const CENTER_X = 200;
const CENTER_Y = 200;

function circlePosition(index: number, totalNodes: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / totalNodes - Math.PI / 2;
  return {
    x: Math.round(CENTER_X + CIRCLE_RADIUS * Math.cos(angle)),
    y: Math.round(CENTER_Y + CIRCLE_RADIUS * Math.sin(angle)),
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
  { source: "B", target: "A", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "C", target: "A", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "B", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "D", target: "C", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
  { source: "D", target: "F", state: "default" },
  { source: "F", target: "D", state: "default" },
  { source: "E", target: "F", state: "default" },
  { source: "F", target: "E", state: "default" },
];

const adjacencyList: GreedyColoringInput["adjacencyList"] = {
  A: ["B", "C"],
  B: ["A", "C"],
  C: ["A", "B", "D"],
  D: ["C", "E", "F"],
  E: ["D", "F"],
  F: ["D", "E"],
};

const steps = generateGreedyColoringSteps({
  adjacencyList,
  nodeIds: ["A", "B", "C", "D", "E", "F"],
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Greedy Coloring",
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

/** Initial state — uncolored graph before processing */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-execution — some nodes colored, others still unprocessed */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — all nodes assigned colors with no conflicts */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
