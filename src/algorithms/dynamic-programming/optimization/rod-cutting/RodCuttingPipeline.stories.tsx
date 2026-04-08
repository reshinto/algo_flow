/**
 * Storybook stories for the Rod Cutting (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute maximum revenue for prices=[1,5,8,9,10,17,17,20],
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateRodCuttingSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateRodCuttingSteps({ prices: [1, 5, 8, 9, 10, 17, 17, 20] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Rod Cutting Tabulation",
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

/** Initial table with base case dp[0]=0, all other cells at 0 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled from left to right */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — maximum revenue 22 found (four pieces of length 2 at $5 each) */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
