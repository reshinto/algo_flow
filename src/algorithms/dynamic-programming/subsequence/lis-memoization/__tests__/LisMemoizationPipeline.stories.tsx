/**
 * Storybook stories for the LIS Memoization DP algorithm pipeline.
 * Uses the real step generator to compute the LIS length of [10, 9, 2, 5, 3, 7, 101, 18]
 * via top-down memoization, rendering the DPTableVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateLisMemoizationSteps } from "../step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateLisMemoizationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/LIS Memoization",
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

/** Initial state — empty cache, no indices evaluated yet */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — call stack partially populated with recursive frames */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Fully computed — all subproblems cached, LIS length = 4 */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
