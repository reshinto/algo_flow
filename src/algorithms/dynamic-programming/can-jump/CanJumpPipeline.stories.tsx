/**
 * Storybook stories for the Can Jump (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute reachability for [2, 3, 1, 1, 4],
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateCanJumpSteps } from "@/algorithms/dynamic-programming/can-jump/step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateCanJumpSteps({ nums: [2, 3, 1, 1, 4] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Can Jump Tabulation",
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

/** Initial table with base case R(0) = 1 filled in */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled showing reachability so far */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — last index confirmed reachable */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};

/** Unreachable input [3, 2, 1, 0, 4] — last index marked 0 */
const unreachableSteps = generateCanJumpSteps({ nums: [3, 2, 1, 0, 4] });
export const UnreachableResult: Story = {
  args: {
    visualState: unreachableSteps[unreachableSteps.length - 1]!.visualState as DPTableVisualState,
  },
};
