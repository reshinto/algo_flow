/**
 * Storybook stories for the Tribonacci Tabulation DP algorithm pipeline.
 * Uses the real step generator to compute T(10) via tabulation,
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateTribonacciTabulationSteps } from "../step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateTribonacciTabulationSteps({ targetIndex: 10 });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Tribonacci Tabulation",
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

/** Initial table with base cases T(0), T(1), and T(2) filled in */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled from left to right */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — T(10) = 149 computed */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
