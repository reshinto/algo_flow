/**
 * Storybook stories for the Min Cost Climbing Stairs (Memoization) DP algorithm pipeline.
 * Uses the real step generator to compute the minimum cost via top-down memoization,
 * rendering the DPTableVisualizer at key states: empty table, mid-recursion, and fully cached.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateMinCostClimbingStairsMemoizationSteps } from "@/algorithms/dynamic-programming/min-cost-climbing-stairs-memoization/step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateMinCostClimbingStairsMemoizationSteps({
  costs: [10, 15, 20, 5, 25, 10],
});

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Min Cost Climbing Stairs Memoization",
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

/** Initial state — DP table empty, memo cache clear */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — some subproblems cached, call stack partially populated */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** All subproblems cached — minimum cost fully resolved */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
