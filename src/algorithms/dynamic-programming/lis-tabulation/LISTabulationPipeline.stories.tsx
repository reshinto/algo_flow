/**
 * Storybook stories for the LIS (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute the LIS of [10,9,2,5,3,7,101,18],
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateLISTabulationSteps } from "@/algorithms/dynamic-programming/lis-tabulation/step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateLISTabulationSteps({ sequence: [10, 9, 2, 5, 3, 7, 101, 18] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/LIS Tabulation",
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

/** Initial state — all cells filled with 1 (base case: each element alone) */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially updated via scan-back comparisons */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully computed — LIS length of 4 found in dp[6] and dp[7] */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
