/**
 * Storybook stories for the Merge Binary Trees Iterative algorithm pipeline.
 * Uses the real step generator with two 7-node trees,
 * rendering the TreeVisualizer at key stack-based merging states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState, TreeNode } from "@/types";
import { generateMergeBinaryTreesIterativeSteps } from "../step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const treeANodes: TreeNode[] = [
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

const treeBNodes: TreeNode[] = [
  {
    id: "m4",
    value: 40,
    parentId: null,
    leftChildId: "m2",
    rightChildId: "m6",
    state: "default",
    position: { x: 200, y: 60 },
  },
  {
    id: "m2",
    value: 20,
    parentId: "m4",
    leftChildId: "m1",
    rightChildId: "m3",
    state: "default",
    position: { x: 100, y: 160 },
  },
  {
    id: "m6",
    value: 60,
    parentId: "m4",
    leftChildId: "m5",
    rightChildId: "m7",
    state: "default",
    position: { x: 300, y: 160 },
  },
  {
    id: "m1",
    value: 10,
    parentId: "m2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 260 },
  },
  {
    id: "m3",
    value: 30,
    parentId: "m2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 260 },
  },
  {
    id: "m5",
    value: 50,
    parentId: "m6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 260 },
  },
  {
    id: "m7",
    value: 70,
    parentId: "m6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 260 },
  },
];

const steps = generateMergeBinaryTreesIterativeSteps({
  nodes: treeANodes,
  rootId: "n4",
  secondaryNodes: treeBNodes,
  secondaryRootId: "m4",
});

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/Merge Binary Trees Iterative",
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

/** Initial state — both trees before stack-based merging begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as TreeVisualState,
  },
};

/** Mid-manipulation with some node pairs popped and merged */
export const MidManipulation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Manipulation complete — all overlapping nodes merged iteratively */
export const ManipulationComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TreeVisualState,
  },
};
