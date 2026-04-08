/**
 * Storybook stories for the Max Subarray Kadane DP algorithm pipeline.
 * Uses the real step generator to compute the maximum subarray of [-2,1,-3,4,-1,2,1,-5,4],
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateMaxSubarrayKadaneSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateMaxSubarrayKadaneSteps({ array: [-2, 1, -3, 4, -1, 2, 1, -5, 4] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Max Subarray Kadane",
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

/** Initial table with base case M(0) = -2 filled in */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled, extend-or-restart decisions in progress */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — global maximum of 6 identified */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
