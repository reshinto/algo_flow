/**
 * Storybook stories for the Build BST from Level-Order pipeline.
 * Uses the real step generator with a 7-node balanced BST input,
 * rendering the TreeVisualizer at key construction states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState } from "@/types";
import { generateBuildFromLevelOrderSteps } from "./step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const steps = generateBuildFromLevelOrderSteps({
  levelOrder: [4, 2, 6, 1, 3, 5, 7],
});

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/Build BST from Level-Order",
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

/** Initial state — empty BST before any insertions */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as TreeVisualState,
  },
};

/** Mid-construction — BST partially built from level-order values */
export const MidConstruction: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Construction complete — all 7 values inserted into BST */
export const ConstructionComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TreeVisualState,
  },
};
