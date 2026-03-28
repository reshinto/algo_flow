/**
 * Storybook stories for Best Time to Buy and Sell Stock pipeline.
 * Uses the real step generator with the default 6-element price array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateBestTimeBuySellSteps } from "@/algorithms/arrays/best-time-buy-sell/step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateBestTimeBuySellSteps({
  prices: [7, 1, 5, 3, 6, 4],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Best Time Buy Sell",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — day 0 price established as the starting minimum */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — scanning days to find best buy/sell opportunity */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — maximum profit transaction identified */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
