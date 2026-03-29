/**
 * Storybook stories for the Coin Change Minimum Memoization DP algorithm pipeline.
 * Uses the real step generator to compute the minimum coins for amount=11 with [1,5,10,25]
 * via top-down memoization, rendering the DPTableVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateCoinChangeMinMemoizationSteps } from "@/algorithms/dynamic-programming/coin-change-min-memoization/step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateCoinChangeMinMemoizationSteps({ amount: 11, coins: [1, 5, 10, 25] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Coin Change Min Memoization",
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

/** Initial state — empty cache, amount=11 not yet evaluated */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — some sub-amounts cached, call stack partially populated with recursive frames */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Fully computed — all reachable sub-amounts cached, minimum coins for $11 = 2 */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
