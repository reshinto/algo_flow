/**
 * Storybook pipeline stories for Binary Tree Pruning.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeNode, TreeVisualState } from "@/types";
import { generateBinaryTreePruningSteps } from "../step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const defaultNodes: TreeNode[] = [
  {
    id: "n1",
    value: 1,
    parentId: null,
    leftChildId: "n0a",
    rightChildId: "n1b",
    state: "default",
    position: { x: 200, y: 40 },
  },
  {
    id: "n0a",
    value: 0,
    parentId: "n1",
    leftChildId: "n0c",
    rightChildId: "n0d",
    state: "default",
    position: { x: 100, y: 120 },
  },
  {
    id: "n1b",
    value: 1,
    parentId: "n1",
    leftChildId: "n0e",
    rightChildId: "n1f",
    state: "default",
    position: { x: 300, y: 120 },
  },
  {
    id: "n0c",
    value: 0,
    parentId: "n0a",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 200 },
  },
  {
    id: "n0d",
    value: 0,
    parentId: "n0a",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 200 },
  },
  {
    id: "n0e",
    value: 0,
    parentId: "n1b",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 200 },
  },
  {
    id: "n1f",
    value: 1,
    parentId: "n1b",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 200 },
  },
];

const steps = generateBinaryTreePruningSteps({ nodes: defaultNodes, rootId: "n1" });

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/Binary Tree Pruning",
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

/** Initial state — full tree before pruning */
export const InitialState: Story = {
  args: { visualState: steps[0]!.visualState as TreeVisualState },
};

/** Mid-operation — some subtrees pruned */
export const MidOperation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Operation complete — pruned tree */
export const OperationComplete: Story = {
  args: { visualState: steps[steps.length - 1]!.visualState as TreeVisualState },
};
