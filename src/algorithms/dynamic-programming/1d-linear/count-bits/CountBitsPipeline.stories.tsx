/**
 * Storybook stories for the Count Bits (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute bit counts for 0..15,
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateCountBitsSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateCountBitsSteps({ targetNumber: 15 });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Count Bits Tabulation",
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

/** Initial table with base case B(0) = 0 filled in */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled with bit counts */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — all popcounts for 0..15 computed */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
