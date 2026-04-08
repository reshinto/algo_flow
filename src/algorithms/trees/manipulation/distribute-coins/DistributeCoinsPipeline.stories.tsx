/**
 * Storybook stories for the Distribute Coins algorithm pipeline.
 * Uses the real step generator with a 7-node tree (coin distribution: 4,0,0,3,0,0,0),
 * rendering the TreeVisualizer at key DFS excess-counting states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState, TreeNode } from "@/types";
import { generateDistributeCoinsSteps } from "./step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const defaultNodes: TreeNode[] = [
  {
    id: "n1",
    value: 4,
    parentId: null,
    leftChildId: "n2",
    rightChildId: "n3",
    state: "default",
    position: { x: 200, y: 60 },
  },
  {
    id: "n2",
    value: 0,
    parentId: "n1",
    leftChildId: "n4",
    rightChildId: "n5",
    state: "default",
    position: { x: 100, y: 160 },
  },
  {
    id: "n3",
    value: 0,
    parentId: "n1",
    leftChildId: "n6",
    rightChildId: "n7",
    state: "default",
    position: { x: 300, y: 160 },
  },
  {
    id: "n4",
    value: 3,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 260 },
  },
  {
    id: "n5",
    value: 0,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 260 },
  },
  {
    id: "n6",
    value: 0,
    parentId: "n3",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 260 },
  },
  {
    id: "n7",
    value: 0,
    parentId: "n3",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 260 },
  },
];

const steps = generateDistributeCoinsSteps({ nodes: defaultNodes, rootId: "n1" });

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/Distribute Coins",
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

/** Initial state — tree with coins (4,0,0,3,0,0,0) before distribution counting begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as TreeVisualState,
  },
};

/** Mid-manipulation with some nodes' excess computed during DFS */
export const MidManipulation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Manipulation complete — minimum moves counted */
export const ManipulationComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TreeVisualState,
  },
};
