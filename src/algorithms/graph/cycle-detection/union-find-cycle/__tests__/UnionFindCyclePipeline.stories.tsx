/**
 * Storybook stories for the Union-Find Cycle Detection algorithm pipeline.
 * Uses the real step generator with a 5-node undirected graph containing a cycle,
 * rendering the GraphVisualizer at key detection states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateUnionFindCycleSteps } from "../step-generator";
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

const graphEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "A", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "B", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "D", target: "C", state: "default" },
  { source: "D", target: "A", state: "default" },
  { source: "A", target: "D", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
];

const steps = generateUnionFindCycleSteps({
  edges: [
    { source: "A", target: "B" },
    { source: "B", target: "C" },
    { source: "C", target: "D" },
    { source: "D", target: "A" },
    { source: "D", target: "E" },
  ],
  nodeIds: ["A", "B", "C", "D", "E"],
  nodes,
  graphEdges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Union-Find Cycle Detection",
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

/** Initial state — all nodes in separate components */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-detection — some components merged, edges being processed */
export const MidDetection: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Detection complete — same-component edge found, cycle confirmed */
export const DetectionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
