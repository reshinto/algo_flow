/**
 * Storybook stories for the 0/1 Knapsack (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute max value for weights=[2,3,4,5], values=[3,4,5,6], capacity=8,
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateKnapsack01Steps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateKnapsack01Steps({
  weights: [2, 3, 4, 5],
  values: [3, 4, 5, 6],
  capacity: 8,
});

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Knapsack 01",
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

/** Initial table with base case dp[0]=0 filled in, all other cells at 0 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially updated after processing some items */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully computed — dp[8]=10 (items with weight 3+5, value 4+6) */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
