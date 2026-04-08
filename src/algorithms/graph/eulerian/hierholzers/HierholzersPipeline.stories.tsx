/**
 * Storybook stories for the Hierholzer's Algorithm pipeline.
 * Uses the real step generator with a 5-node undirected graph where all
 * vertices have even degree, rendering the GraphVisualizer at key circuit states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateHierholzersSteps } from "./step-generator";
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
  { id: "A", label: "A", state: "default", position: circlePosition(0, 5) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 5) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 5) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 5) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 5) },
];

const edges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "A", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "B", state: "default" },
  { source: "C", target: "A", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "A", target: "D", state: "default" },
  { source: "D", target: "A", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
  { source: "E", target: "A", state: "default" },
  { source: "A", target: "E", state: "default" },
];

const adjacencyList: AdjacencyList = {
  A: ["B", "C", "D", "E"],
  B: ["A", "C"],
  C: ["B", "A"],
  D: ["A", "E"],
  E: ["D", "A"],
};

const steps = generateHierholzersSteps({
  adjacencyList,
  startNodeId: "A",
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Hierholzers",
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

/** Mid-circuit with some edges used and nodes on the stack */
export const MidCircuit: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Completed circuit — all edges used, stack empty, circuit built */
export const CircuitComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
