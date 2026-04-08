/**
 * Storybook pipeline stories for Segment Tree Range Sum.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState } from "@/types";
import { generateSegmentTreeRangeSumSteps } from "../step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const steps = generateSegmentTreeRangeSumSteps({
  array: [1, 3, 5, 7, 9, 11],
  queries: [
    [1, 3],
    [0, 5],
  ],
});

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/Segment Tree Range Sum",
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

/** Initial state — before tree is built */
export const InitialState: Story = {
  args: { visualState: steps[0]!.visualState as TreeVisualState },
};

/** Mid-operation — tree partially built */
export const MidOperation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Operation complete — all queries answered */
export const OperationComplete: Story = {
  args: { visualState: steps[steps.length - 1]!.visualState as TreeVisualState },
};
