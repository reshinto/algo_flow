/**
 * Storybook pipeline stories for Red-Black Tree Insert.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState } from "@/types";
import { generateRedBlackInsertSteps } from "../step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const steps = generateRedBlackInsertSteps({ values: [7, 3, 18, 10, 22, 8, 11, 26] });

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/Red-Black Insert",
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

/** Initial state — before insertions begin */
export const InitialState: Story = {
  args: { visualState: steps[0]!.visualState as TreeVisualState },
};

/** Mid-operation — some nodes inserted with color fixes */
export const MidOperation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Operation complete — fully balanced Red-Black tree */
export const OperationComplete: Story = {
  args: { visualState: steps[steps.length - 1]!.visualState as TreeVisualState },
};
