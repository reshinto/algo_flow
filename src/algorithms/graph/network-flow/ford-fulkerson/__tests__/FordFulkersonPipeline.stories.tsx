/**
 * Storybook stories for the Ford-Fulkerson algorithm pipeline.
 * Uses the real step generator with a 6-node directed flow network,
 * rendering the GraphVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateFordFulkersonSteps } from "../step-generator";
import type { FordFulkersonInput } from "../step-generator";
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

const CIRCLE_RADIUS = 150;
const CENTER_X = 220;
const CENTER_Y = 200;

function flowNetworkPosition(index: number, totalNodes: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / totalNodes - Math.PI / 2;
  return {
    x: Math.round(CENTER_X + CIRCLE_RADIUS * Math.cos(angle)),
    y: Math.round(CENTER_Y + CIRCLE_RADIUS * Math.sin(angle)),
  };
}

const nodes: GraphNode[] = [
  { id: "S", label: "S", state: "source", position: flowNetworkPosition(0, 6) },
  { id: "A", label: "A", state: "default", position: flowNetworkPosition(1, 6) },
  { id: "B", label: "B", state: "default", position: flowNetworkPosition(2, 6) },
  { id: "C", label: "C", state: "default", position: flowNetworkPosition(3, 6) },
  { id: "D", label: "D", state: "default", position: flowNetworkPosition(4, 6) },
  { id: "T", label: "T", state: "sink", position: flowNetworkPosition(5, 6) },
];

const edges: GraphEdge[] = [
  { source: "S", target: "A", state: "default", capacity: 10, flow: 0 },
  { source: "S", target: "B", state: "default", capacity: 8, flow: 0 },
  { source: "A", target: "B", state: "default", capacity: 5, flow: 0 },
  { source: "A", target: "C", state: "default", capacity: 7, flow: 0 },
  { source: "B", target: "D", state: "default", capacity: 10, flow: 0 },
  { source: "C", target: "D", state: "default", capacity: 3, flow: 0 },
  { source: "C", target: "T", state: "default", capacity: 8, flow: 0 },
  { source: "D", target: "T", state: "default", capacity: 10, flow: 0 },
];

const adjacencyList: FordFulkersonInput["adjacencyList"] = {
  S: [
    { target: "A", capacity: 10 },
    { target: "B", capacity: 8 },
  ],
  A: [
    { target: "B", capacity: 5 },
    { target: "C", capacity: 7 },
  ],
  B: [{ target: "D", capacity: 10 }],
  C: [
    { target: "D", capacity: 3 },
    { target: "T", capacity: 8 },
  ],
  D: [{ target: "T", capacity: 10 }],
  T: [],
};

const steps = generateFordFulkersonSteps({
  adjacencyList,
  sourceNodeId: "S",
  sinkNodeId: "T",
  nodes,
  edges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/Ford-Fulkerson",
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

/** Initial state — flow network before any augmentation */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-execution — first augmenting path found and flow being pushed */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — max flow reached, no more augmenting paths */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
