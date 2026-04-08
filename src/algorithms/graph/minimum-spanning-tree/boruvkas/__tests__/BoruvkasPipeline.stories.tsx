/**
 * Storybook stories for the Borůvka's algorithm pipeline.
 * Uses the real step generator with a 6-node weighted undirected graph,
 * rendering the GraphVisualizer at key round-based merge states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateBoruvkasSteps } from "../step-generator";
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

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

const graphEdges: GraphEdge[] = [
  { source: "A", target: "B", weight: 4, state: "default" },
  { source: "B", target: "A", weight: 4, state: "default" },
  { source: "A", target: "C", weight: 2, state: "default" },
  { source: "C", target: "A", weight: 2, state: "default" },
  { source: "B", target: "C", weight: 1, state: "default" },
  { source: "C", target: "B", weight: 1, state: "default" },
  { source: "B", target: "D", weight: 5, state: "default" },
  { source: "D", target: "B", weight: 5, state: "default" },
  { source: "C", target: "D", weight: 8, state: "default" },
  { source: "D", target: "C", weight: 8, state: "default" },
  { source: "C", target: "E", weight: 10, state: "default" },
  { source: "E", target: "C", weight: 10, state: "default" },
  { source: "D", target: "E", weight: 2, state: "default" },
  { source: "E", target: "D", weight: 2, state: "default" },
  { source: "D", target: "F", weight: 6, state: "default" },
  { source: "F", target: "D", weight: 6, state: "default" },
  { source: "E", target: "F", weight: 3, state: "default" },
  { source: "F", target: "E", weight: 3, state: "default" },
];

const edges = [
  { source: "A", target: "B", weight: 4 },
  { source: "A", target: "C", weight: 2 },
  { source: "B", target: "C", weight: 1 },
  { source: "B", target: "D", weight: 5 },
  { source: "C", target: "D", weight: 8 },
  { source: "C", target: "E", weight: 10 },
  { source: "D", target: "E", weight: 2 },
  { source: "D", target: "F", weight: 6 },
  { source: "E", target: "F", weight: 3 },
];

const steps = generateBoruvkasSteps({
  edges,
  nodeIds: ["A", "B", "C", "D", "E", "F"],
  nodes,
  graphEdges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Borůvka's",
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

/** Initial state — all 6 nodes are isolated components */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-execution — first round of component merges in progress */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — all components merged into a single MST */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
