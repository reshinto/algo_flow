/**
 * Storybook stories for the Coin Change Ways (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to count ways to make amount=5 with coins [1,2,5],
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateCoinChangeWaysSteps } from "../step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateCoinChangeWaysSteps({ amount: 5, coins: [1, 2, 5] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Coin Change Ways",
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

/** Initial table with base case W(0)=1 filled in, all other cells at 0 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially updated after processing some coins */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully computed — W(5) = 4 ways using coins [1, 2, 5] */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
