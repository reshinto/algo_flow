/**
 * Storybook stories for the Min Cost Climbing Stairs Tabulation DP algorithm pipeline.
 * Uses the real step generator to compute the minimum cost for costs = [10, 15, 20, 5, 25, 10],
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateMinCostClimbingStairsTabulationSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateMinCostClimbingStairsTabulationSteps({
  costs: [10, 15, 20, 5, 25, 10],
});

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Min Cost Climbing Stairs Tabulation",
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

/** Initial table with base cases C(0) = 0 and C(1) = 0 filled in */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled showing cost accumulation */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — minimum cost to reach the top computed */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
