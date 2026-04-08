/**
 * Storybook stories for the Subtree of Another Tree algorithm pipeline.
 * Uses the real step generator with a 7-node main tree and a 3-node subtree,
 * rendering the TreeVisualizer at key comparison states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState, TreeNode } from "@/types";
import { generateSubtreeOfAnotherTreeSteps } from "../step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const mainTreeNodes: TreeNode[] = [
  {
    id: "n4",
    value: 4,
    parentId: null,
    leftChildId: "n2",
    rightChildId: "n6",
    state: "default",
    position: { x: 200, y: 60 },
  },
  {
    id: "n2",
    value: 2,
    parentId: "n4",
    leftChildId: "n1",
    rightChildId: "n3",
    state: "default",
    position: { x: 100, y: 160 },
  },
  {
    id: "n6",
    value: 6,
    parentId: "n4",
    leftChildId: "n5",
    rightChildId: "n7",
    state: "default",
    position: { x: 300, y: 160 },
  },
  {
    id: "n1",
    value: 1,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 260 },
  },
  {
    id: "n3",
    value: 3,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 260 },
  },
  {
    id: "n5",
    value: 5,
    parentId: "n6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 260 },
  },
  {
    id: "n7",
    value: 7,
    parentId: "n6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 260 },
  },
];

const subTreeNodes: TreeNode[] = [
  {
    id: "s2",
    value: 2,
    parentId: null,
    leftChildId: "s1",
    rightChildId: "s3",
    state: "default",
    position: { x: 100, y: 60 },
  },
  {
    id: "s1",
    value: 1,
    parentId: "s2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 160 },
  },
  {
    id: "s3",
    value: 3,
    parentId: "s2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 160 },
  },
];

const steps = generateSubtreeOfAnotherTreeSteps({
  nodes: mainTreeNodes,
  rootId: "n4",
  secondaryNodes: subTreeNodes,
  secondaryRootId: "s2",
});

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/Subtree of Another Tree",
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

/** Initial state — main tree and subtree before search begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as TreeVisualState,
  },
};

/** Mid-manipulation with some main tree nodes checked against subtree */
export const MidManipulation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Manipulation complete — subtree found (or not found) in main tree */
export const ManipulationComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TreeVisualState,
  },
};
