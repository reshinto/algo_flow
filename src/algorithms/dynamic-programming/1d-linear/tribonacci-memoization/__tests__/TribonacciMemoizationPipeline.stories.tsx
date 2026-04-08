/**
 * Storybook stories for the Tribonacci Memoization DP algorithm pipeline.
 * Uses the real step generator to compute T(10) via top-down memoization,
 * rendering the DPTableVisualizer at key cache-hit states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateTribonacciMemoizationSteps } from "../step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateTribonacciMemoizationSteps({ targetIndex: 10 });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Tribonacci Memoization",
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

/** Initial state with empty cache and no call stack entries */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — call stack partially populated, some subproblems cached */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** All subproblems cached — T(10) = 149 computed */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
