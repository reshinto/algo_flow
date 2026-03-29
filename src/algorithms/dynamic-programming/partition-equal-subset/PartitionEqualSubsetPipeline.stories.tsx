/**
 * Storybook stories for the Partition Equal Subset Sum (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute partitionability for [1, 5, 11, 5],
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generatePartitionEqualSubsetSteps } from "@/algorithms/dynamic-programming/partition-equal-subset/step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generatePartitionEqualSubsetSteps({ numbers: [1, 5, 11, 5] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Partition Equal Subset Sum Tabulation",
  component: DPTableVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DPTableVisualizer>;

/** Initial table with base case dp[0]=1, all others 0 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled as numbers are processed */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — dp[11]=1 confirming equal partition exists */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
