/**
 * Storybook stories for the House Robber Memoization DP algorithm pipeline.
 * Uses the real step generator to compute the max loot from [2, 7, 9, 3, 1]
 * via top-down memoization, rendering the DPTableVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateHouseRobberMemoizationSteps } from "../step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateHouseRobberMemoizationSteps({ houses: [2, 7, 9, 3, 1] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/House Robber Memoization",
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

/** Initial state — empty cache, no houses evaluated yet */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — base cases filled, call stack partially populated with recursive frames */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Fully computed — all subproblems cached, max loot = 12 */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
