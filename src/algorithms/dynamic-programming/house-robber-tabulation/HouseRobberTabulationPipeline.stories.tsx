/**
 * Storybook stories for the House Robber (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute the optimal robbery for [2, 7, 9, 3, 1],
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateHouseRobberTabulationSteps } from "@/algorithms/dynamic-programming/house-robber-tabulation/step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateHouseRobberTabulationSteps({ houses: [2, 7, 9, 3, 1] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/House Robber Tabulation",
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

/** Initial table with base cases H(0) and H(1) filled in */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled, rob-or-skip decisions in progress */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — maximum haul of 12 computed for [2, 7, 9, 3, 1] */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
