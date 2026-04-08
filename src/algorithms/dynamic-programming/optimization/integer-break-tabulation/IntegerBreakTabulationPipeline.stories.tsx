/**
 * Storybook stories for the Integer Break (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute the maximum product for targetNumber=10,
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateIntegerBreakTabulationSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateIntegerBreakTabulationSteps({ targetNumber: 10 });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Integer Break Tabulation",
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

/** Initial table with base case P(1) = 1 filled in */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled, split evaluations in progress */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — maximum product of 36 computed for targetNumber=10 */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
