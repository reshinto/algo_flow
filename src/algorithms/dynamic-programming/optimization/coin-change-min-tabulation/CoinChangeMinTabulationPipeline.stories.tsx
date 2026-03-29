/**
 * Storybook stories for the Coin Change — Minimum (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute minimum coins for amount=11 with [1,5,10,25],
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateCoinChangeMinTabulationSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateCoinChangeMinTabulationSteps({ amount: 11, coins: [1, 5, 10, 25] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Coin Change Min Tabulation",
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

/** Initial table with base case dp[0]=0 filled in, all others at Infinity */
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

/** Table fully filled — minimum 3 coins found for amount 11 (10+1 or 5+5+1) */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
