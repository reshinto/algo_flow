/**
 * Storybook stories for the Integer Break Memoization DP algorithm pipeline.
 * Uses the real step generator to compute the max product from breaking 10
 * via top-down memoization, rendering the DPTableVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateIntegerBreakMemoizationSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateIntegerBreakMemoizationSteps({ targetNumber: 10 });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Integer Break Memoization",
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

/** Initial state — empty cache, no integers evaluated yet */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — base case filled, call stack partially populated with recursive frames */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Fully computed — all subproblems cached, max product for 10 = 36 */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
