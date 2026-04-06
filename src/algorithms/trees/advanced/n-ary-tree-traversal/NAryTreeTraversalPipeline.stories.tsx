/**
 * Storybook pipeline stories for N-ary Tree Traversal.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeNode, TreeVisualState } from "@/types";
import { generateNAryTreeTraversalSteps } from "./step-generator";
import TreeVisualizer from "@/components/visualization/TreeVisualizer";

const defaultNodes: TreeNode[] = [
  {
    id: "r",
    value: 1,
    parentId: null,
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["c1", "c2", "c3"],
    state: "default",
    position: { x: 240, y: 40 },
  },
  {
    id: "c1",
    value: 3,
    parentId: "r",
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["g1", "g2"],
    state: "default",
    position: { x: 100, y: 120 },
  },
  {
    id: "c2",
    value: 2,
    parentId: "r",
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["g3", "g4"],
    state: "default",
    position: { x: 240, y: 120 },
  },
  {
    id: "c3",
    value: 4,
    parentId: "r",
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["g5", "g6"],
    state: "default",
    position: { x: 380, y: 120 },
  },
  {
    id: "g1",
    value: 5,
    parentId: "c1",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 50, y: 200 },
  },
  {
    id: "g2",
    value: 6,
    parentId: "c1",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 130, y: 200 },
  },
  {
    id: "g3",
    value: 7,
    parentId: "c2",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 200, y: 200 },
  },
  {
    id: "g4",
    value: 8,
    parentId: "c2",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 280, y: 200 },
  },
  {
    id: "g5",
    value: 9,
    parentId: "c3",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 340, y: 200 },
  },
  {
    id: "g6",
    value: 10,
    parentId: "c3",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 420, y: 200 },
  },
];

const steps = generateNAryTreeTraversalSteps({ nodes: defaultNodes, rootId: "r" });

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/N-ary Tree Traversal",
  component: TreeVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TreeVisualizer>;

/** Initial state — N-ary tree before traversal */
export const InitialState: Story = {
  args: { visualState: steps[0]!.visualState as TreeVisualState },
};

/** Mid-operation — some nodes visited */
export const MidOperation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Operation complete — all nodes visited in preorder */
export const OperationComplete: Story = {
  args: { visualState: steps[steps.length - 1]!.visualState as TreeVisualState },
};
