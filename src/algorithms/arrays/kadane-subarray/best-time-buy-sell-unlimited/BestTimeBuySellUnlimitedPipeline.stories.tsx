/**
 * Storybook stories for the Best Time Buy/Sell (Unlimited) algorithm pipeline.
 * Uses the real step generator with the default 6-element prices array,
 * rendering the ArrayVisualizer at key greedy execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateBestTimeBuySellUnlimitedSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateBestTimeBuySellUnlimitedSteps({
  prices: [7, 1, 5, 3, 6, 4],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Best Time Buy Sell Unlimited",
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

/** Initial state — prices loaded, no trades made yet */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — greedy scanning in progress, first transaction recorded */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all profitable transactions captured, total profit computed */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
