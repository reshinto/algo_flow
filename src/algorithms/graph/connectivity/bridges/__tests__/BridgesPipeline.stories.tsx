/**
 * Storybook stories for the Bridges (Cut Edges) algorithm pipeline.
 * Uses the real step generator with a 7-node undirected graph containing
 * 2 bridge edges, rendering the GraphVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateBridgesSteps } from "../step-generator";
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

function bridgePosition(index: number): { x: number; y: number } {
  const positions = [
    { x: 80, y: 120 },
    { x: 180, y: 60 },
    { x: 180, y: 180 },
    { x: 290, y: 120 },
    { x: 390, y: 60 },
    { x: 390, y: 180 },
    { x: 490, y: 120 },
  ];
  return positions[index] ?? { x: 0, y: 0 };
}

const nodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: bridgePosition(0) },
  { id: "B", label: "B", state: "default", position: bridgePosition(1) },
  { id: "C", label: "C", state: "default", position: bridgePosition(2) },
  { id: "D", label: "D", state: "default", position: bridgePosition(3) },
  { id: "E", label: "E", state: "default", position: bridgePosition(4) },
  { id: "F", label: "F", state: "default", position: bridgePosition(5) },
  { id: "G", label: "G", state: "default", position: bridgePosition(6) },
];

const edges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "A", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "B", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "C", target: "A", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "D", target: "C", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
  { source: "E", target: "F", state: "default" },
  { source: "F", target: "E", state: "default" },
  { source: "F", target: "G", state: "default" },
  { source: "G", target: "F", state: "default" },
  { source: "E", target: "G", state: "default" },
  { source: "G", target: "E", state: "default" },
];

const steps = generateBridgesSteps({
  adjacencyList: {
    A: ["B", "C"],
    B: ["A", "C"],
    C: ["B", "A", "D"],
    D: ["C", "E"],
    E: ["D", "F", "G"],
    F: ["E", "G"],
    G: ["F", "E"],
  },
  nodeIds: ["A", "B", "C", "D", "E", "F", "G"],
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Bridges",
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

/** Initial state — all nodes unvisited, no bridges identified */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-execution — DFS in progress, first bridge discovered */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — both bridge edges highlighted */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
