/**
 * Storybook pipeline stories for Binary Indexed Tree (Fenwick Tree).
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState } from "@/types";
import { generateBinaryIndexedTreeSteps } from "../step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const steps = generateBinaryIndexedTreeSteps({
  array: [3, 2, 4, 5, 1, 1, 5, 3],
  queries: [
    [0, 4],
    [2, 6],
  ],
});

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/Binary Indexed Tree",
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

/** Initial state — BIT array before population */
export const InitialState: Story = {
  args: { visualState: steps[0]!.visualState as TreeVisualState },
};

/** Mid-operation — BIT partially built */
export const MidOperation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Operation complete — all queries answered */
export const OperationComplete: Story = {
  args: { visualState: steps[steps.length - 1]!.visualState as TreeVisualState },
};
