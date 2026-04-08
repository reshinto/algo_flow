/**
 * Storybook stories for the A* Search algorithm pipeline.
 * Uses the real step generator with a 6-node weighted directed graph,
 * rendering the GraphVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateAStarSteps } from "../step-generator";
import GraphVisualizer from "@/components/visualization/graph/GraphVisualizer";

/** Compute circular layout positions for graph nodes */
function circlePosition(index: number, totalNodes: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / totalNodes - Math.PI / 2;
  return {
    x: Math.round(200 + 150 * Math.cos(angle)),
    y: Math.round(200 + 150 * Math.sin(angle)),
  };
}

/** Euclidean distance between two positions, rounded to nearest integer */
function euclideanDistance(posA: { x: number; y: number }, posB: { x: number; y: number }): number {
  return Math.round(Math.sqrt(Math.pow(posA.x - posB.x, 2) + Math.pow(posA.y - posB.y, 2)));
}

const storyNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 6) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 6) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 6) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 6) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 6) },
  { id: "F", label: "F", state: "default", position: circlePosition(5, 6) },
];

const targetNodeId = "F";
const targetPosition = storyNodes.find((node) => node.id === targetNodeId)!.position;
const storyHeuristic: Record<string, number> = Object.fromEntries(
  storyNodes.map((node) => [node.id, euclideanDistance(node.position, targetPosition)]),
);

const storyEdges: GraphEdge[] = [
  { source: "A", target: "B", weight: 4, state: "default" },
  { source: "A", target: "C", weight: 2, state: "default" },
  { source: "B", target: "D", weight: 5, state: "default" },
  { source: "C", target: "B", weight: 1, state: "default" },
  { source: "C", target: "E", weight: 10, state: "default" },
  { source: "D", target: "F", weight: 2, state: "default" },
  { source: "E", target: "F", weight: 3, state: "default" },
];

const steps = generateAStarSteps({
  adjacencyList: {
    A: [
      ["B", 4],
      ["C", 2],
    ],
    B: [["D", 5]],
    C: [
      ["B", 1],
      ["E", 10],
    ],
    D: [["F", 2]],
    E: [["F", 3]],
    F: [],
  },
  startNodeId: "A",
  targetNodeId,
  heuristic: storyHeuristic,
  nodes: storyNodes,
  edges: storyEdges,
});

const meta: Meta<typeof GraphVisualizer> = {
  title: "Algorithm Pipelines/A* Search",
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

/** Initial state — start node queued with f = h(start) */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as GraphVisualState,
  },
};

/** Mid-execution — some edges relaxed and g-costs updated */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as GraphVisualState,
  },
};

/** Execution complete — shortest path to target found */
export const ExecutionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as GraphVisualState,
  },
};
