/**
 * Storybook stories for the Build Tree from Preorder + Inorder (Iterative) pipeline.
 * Uses the real step generator with a 7-node balanced BST,
 * rendering the TreeVisualizer at key construction states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState } from "@/types";
import { generateBuildFromPreorderInorderIterativeSteps } from "./step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const steps = generateBuildFromPreorderInorderIterativeSteps({
  preorder: [4, 2, 1, 3, 6, 5, 7],
  inorder: [1, 2, 3, 4, 5, 6, 7],
});

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/Build Tree: Preorder + Inorder (Iterative)",
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

/** Initial state — before iterative construction begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as TreeVisualState,
  },
};

/** Mid-construction — stack-based progress through preorder array */
export const MidConstruction: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Construction complete — all 7 nodes placed */
export const ConstructionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TreeVisualState,
  },
};
