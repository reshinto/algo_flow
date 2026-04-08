/**
 * Storybook pipeline stories for AVL Insert Rotation.
 * Shows the tree at initialization, mid-rotation, and completion.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState } from "@/types";
import { generateAvlInsertRotationSteps } from "./step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const steps = generateAvlInsertRotationSteps({ values: [10, 20, 30, 25, 28, 27] });

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/AVL Insert Rotation",
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

/** Initial state — empty tree before insertions */
export const InitialState: Story = {
  args: { visualState: steps[0]!.visualState as TreeVisualState },
};

/** Mid-operation — tree after some insertions with rotations in progress */
export const MidOperation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Operation complete — fully balanced AVL tree */
export const OperationComplete: Story = {
  args: { visualState: steps[steps.length - 1]!.visualState as TreeVisualState },
};
