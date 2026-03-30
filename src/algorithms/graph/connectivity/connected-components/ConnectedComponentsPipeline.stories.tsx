/**
 * Storybook stories for the Connected Components algorithm pipeline.
 * Uses the real step generator with an 8-node undirected graph containing
 * 3 disconnected components, rendering the GraphVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateConnectedComponentsSteps } from "./step-generator";
import GraphVisualizer from "@/components/visualization/GraphVisualizer";

function rowPosition(index: number): { x: number; y: number } {
  const nodesPerRow = 4;
  const rowIndex = Math.floor(index / nodesPerRow);
  const colIndex = index % nodesPerRow;
  return { x: 80 + colIndex * 110, y: 100 + rowIndex * 160 };
}

const nodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: rowPosition(0) },
  { id: "B", label: "B", state: "default", position: rowPosition(1) },
  { id: "C", label: "C", state: "default", position: rowPosition(2) },
  { id: "D", label: "D", state: "default", position: rowPosition(4) },
  { id: "E", label: "E", state: "default", position: rowPosition(5) },
  { id: "F", label: "F", state: "default", position: rowPosition(6) },
  { id: "G", label: "G", state: "default", position: rowPosition(7) },
  { id: "H", label: "H", state: "default", position: { x: 415, y: 260 } },
];

const edges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "A", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "B", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
  { source: "F", target: "G", state: "default" },
  { source: "G", target: "F", state: "default" },
  { source: "G", target: "H", state: "default" },
  { source: "H", target: "G", state: "default" },
];

const steps = generateConnectedComponentsSteps({
  adjacencyList: {
    A: ["B"],
    B: ["A", "C"],
    C: ["B"],
    D: ["E"],
    E: ["D"],
    F: ["G"],
    G: ["F", "H"],
    H: ["G"],
  },
  nodeIds: ["A", "B", "C", "D", "E", "F", "G", "H"],
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Connected Components",
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

/** Initial state — all nodes unvisited, no components assigned */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-execution — first component discovered, second in progress */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — all three components identified and color-coded */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
