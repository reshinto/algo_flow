import type { Meta, StoryObj } from "@storybook/react";
import type { GraphVisualState } from "@/types";
import GraphVisualizer from "./GraphVisualizer";

const meta: Meta<typeof GraphVisualizer> = {
  title: "Visualization/GraphVisualizer",
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

const defaultNodes = [
  { id: "A", label: "A", state: "default" as const, position: { x: 200, y: 50 } },
  { id: "B", label: "B", state: "default" as const, position: { x: 100, y: 200 } },
  { id: "C", label: "C", state: "default" as const, position: { x: 300, y: 200 } },
  { id: "D", label: "D", state: "default" as const, position: { x: 50, y: 350 } },
  { id: "E", label: "E", state: "default" as const, position: { x: 200, y: 350 } },
  { id: "F", label: "F", state: "default" as const, position: { x: 350, y: 350 } },
];

const defaultEdges = [
  { source: "A", target: "B", state: "default" as const },
  { source: "A", target: "C", state: "default" as const },
  { source: "B", target: "D", state: "default" as const },
  { source: "C", target: "E", state: "default" as const },
  { source: "D", target: "E", state: "default" as const },
  { source: "D", target: "F", state: "default" as const },
  { source: "E", target: "F", state: "default" as const },
];

export const Initial: Story = {
  args: {
    visualState: {
      kind: "graph",
      nodes: defaultNodes,
      edges: defaultEdges,
      queue: [],
      visited: [],
    } satisfies GraphVisualState,
  },
};

export const MidTraversal: Story = {
  args: {
    visualState: {
      kind: "graph",
      nodes: defaultNodes.map((node) => ({
        ...node,
        state:
          node.id === "A"
            ? ("visited" as const)
            : node.id === "B"
              ? ("current" as const)
              : node.id === "C"
                ? ("queued" as const)
                : ("default" as const),
      })),
      edges: defaultEdges.map((edge) => ({
        ...edge,
        state:
          edge.source === "A" && edge.target === "B"
            ? ("traversed" as const)
            : edge.source === "A" && edge.target === "C"
              ? ("traversing" as const)
              : ("default" as const),
      })),
      queue: ["C"],
      visited: ["A", "B"],
    } satisfies GraphVisualState,
  },
};

export const Complete: Story = {
  args: {
    visualState: {
      kind: "graph",
      nodes: defaultNodes.map((node) => ({ ...node, state: "visited" as const })),
      edges: defaultEdges.map((edge) => ({ ...edge, state: "traversed" as const })),
      queue: [],
      visited: ["A", "B", "C", "D", "E", "F"],
    } satisfies GraphVisualState,
  },
};
