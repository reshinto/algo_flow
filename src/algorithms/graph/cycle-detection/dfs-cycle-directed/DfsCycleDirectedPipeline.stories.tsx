/**
 * Storybook stories for the DFS Cycle Detection (Directed) algorithm pipeline.
 * Uses the real step generator with a 5-node directed graph containing a cycle,
 * rendering the GraphVisualizer at key detection states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateDfsCycleDirectedSteps } from "./step-generator";
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
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "D", target: "B", state: "default" },
  { source: "E", target: "A", state: "default" },
];

const steps = generateDfsCycleDirectedSteps({
  adjacencyList: { A: ["B"], B: ["C"], C: ["D"], D: ["B"], E: ["A"] },
  nodeIds: ["A", "B", "C", "D", "E"],
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/DFS Cycle Detection (Directed)",
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

/** Initial state — all nodes white (unvisited) */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-detection — some nodes gray (in-stack) and black (processed) */
export const MidDetection: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Detection complete — back edge found, cycle confirmed */
export const DetectionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
