/**
 * Storybook stories for the Articulation Points algorithm pipeline.
 * Uses the real step generator with a 7-node undirected graph containing
 * 2 articulation points (C and D), rendering the GraphVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateArticulationPointsSteps } from "./step-generator";
import GraphVisualizer from "@/components/visualization/GraphVisualizer";

function apPosition(index: number): { x: number; y: number } {
  const positions = [
    { x: 80, y: 80 },
    { x: 80, y: 200 },
    { x: 210, y: 140 },
    { x: 330, y: 140 },
    { x: 460, y: 80 },
    { x: 460, y: 200 },
    { x: 540, y: 140 },
  ];
  return positions[index] ?? { x: 0, y: 0 };
}

const nodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: apPosition(0) },
  { id: "B", label: "B", state: "default", position: apPosition(1) },
  { id: "C", label: "C", state: "default", position: apPosition(2) },
  { id: "D", label: "D", state: "default", position: apPosition(3) },
  { id: "E", label: "E", state: "default", position: apPosition(4) },
  { id: "F", label: "F", state: "default", position: apPosition(5) },
  { id: "G", label: "G", state: "default", position: apPosition(6) },
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
  { source: "E", target: "G", state: "default" },
  { source: "G", target: "E", state: "default" },
  { source: "F", target: "G", state: "default" },
  { source: "G", target: "F", state: "default" },
];

const steps = generateArticulationPointsSteps({
  adjacencyList: {
    A: ["B", "C"],
    B: ["A", "C"],
    C: ["A", "B", "D"],
    D: ["C", "E", "F"],
    E: ["D", "G"],
    F: ["D", "G"],
    G: ["E", "F"],
  },
  nodeIds: ["A", "B", "C", "D", "E", "F", "G"],
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Articulation Points",
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

/** Initial state — all nodes unvisited, no articulation points identified */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-execution — DFS in progress, first articulation point discovered */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — both articulation points C and D highlighted */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
