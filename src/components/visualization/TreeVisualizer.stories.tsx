/** Storybook stories for the TreeVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState, TreeNode } from "@/types";
import TreeVisualizer from "./TreeVisualizer";

const meta: Meta<typeof TreeVisualizer> = {
  title: "Visualization/TreeVisualizer",
  component: TreeVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TreeVisualizer>;

const defaultNodes: TreeNode[] = [
  {
    id: "root",
    value: 4,
    parentId: null,
    leftChildId: "left",
    rightChildId: "right",
    state: "default",
    position: { x: 210, y: 40 },
  },
  {
    id: "left",
    value: 2,
    parentId: "root",
    leftChildId: "ll",
    rightChildId: "lr",
    state: "default",
    position: { x: 110, y: 120 },
  },
  {
    id: "right",
    value: 6,
    parentId: "root",
    leftChildId: "rl",
    rightChildId: "rr",
    state: "default",
    position: { x: 310, y: 120 },
  },
  {
    id: "ll",
    value: 1,
    parentId: "left",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 60, y: 200 },
  },
  {
    id: "lr",
    value: 3,
    parentId: "left",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 160, y: 200 },
  },
  {
    id: "rl",
    value: 5,
    parentId: "right",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 260, y: 200 },
  },
  {
    id: "rr",
    value: 7,
    parentId: "right",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 360, y: 200 },
  },
];

export const Default: Story = {
  args: {
    visualState: {
      kind: "tree",
      nodes: defaultNodes,
      rootId: "root",
      visitOrder: [],
      currentNodeId: null,
    } satisfies TreeVisualState,
  },
};

export const MidTraversal: Story = {
  args: {
    visualState: {
      kind: "tree",
      nodes: defaultNodes.map((node) => ({
        ...node,
        state:
          node.id === "lr"
            ? "visiting"
            : node.id === "ll" || node.id === "left"
              ? "visited"
              : "default",
      })),
      rootId: "root",
      visitOrder: ["ll", "left", "lr"],
      currentNodeId: "lr",
    } satisfies TreeVisualState,
  },
};

export const FullyTraversed: Story = {
  args: {
    visualState: {
      kind: "tree",
      nodes: defaultNodes.map((node) => ({ ...node, state: "visited" as const })),
      rootId: "root",
      visitOrder: ["ll", "left", "lr", "root", "rl", "right", "rr"],
      currentNodeId: null,
    } satisfies TreeVisualState,
  },
};
