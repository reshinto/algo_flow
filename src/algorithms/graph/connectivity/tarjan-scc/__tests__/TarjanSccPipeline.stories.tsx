/**
 * Storybook stories for the Tarjan's SCC algorithm pipeline.
 * Uses the real step generator with an 8-node directed graph containing
 * 3 strongly connected components, rendering the GraphVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateTarjanSccSteps } from "../step-generator";
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

function sccPosition(index: number): { x: number; y: number } {
  const positions = [
    { x: 100, y: 80 },
    { x: 200, y: 40 },
    { x: 200, y: 140 },
    { x: 350, y: 80 },
    { x: 350, y: 180 },
    { x: 280, y: 300 },
    { x: 370, y: 260 },
    { x: 420, y: 340 },
  ];
  return positions[index] ?? { x: 0, y: 0 };
}

const nodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: sccPosition(0) },
  { id: "B", label: "B", state: "default", position: sccPosition(1) },
  { id: "C", label: "C", state: "default", position: sccPosition(2) },
  { id: "D", label: "D", state: "default", position: sccPosition(3) },
  { id: "E", label: "E", state: "default", position: sccPosition(4) },
  { id: "F", label: "F", state: "default", position: sccPosition(5) },
  { id: "G", label: "G", state: "default", position: sccPosition(6) },
  { id: "H", label: "H", state: "default", position: sccPosition(7) },
];

const edges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "A", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
  { source: "F", target: "G", state: "default" },
  { source: "G", target: "H", state: "default" },
  { source: "H", target: "F", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "E", target: "F", state: "default" },
];

const steps = generateTarjanSccSteps({
  adjacencyList: {
    A: ["B"],
    B: ["C"],
    C: ["A", "D"],
    D: ["E"],
    E: ["D", "F"],
    F: ["G"],
    G: ["H"],
    H: ["F"],
  },
  nodeIds: ["A", "B", "C", "D", "E", "F", "G", "H"],
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Tarjan SCC",
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

/** Initial state — all nodes unvisited, stack empty */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-execution — DFS in progress, some nodes on the SCC stack */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — all three SCCs identified and color-coded */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
