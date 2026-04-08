/**
 * Storybook stories for the Minimum Jumps (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute the minimum jumps for [2, 3, 1, 1, 4],
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateMinimumJumpsSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateMinimumJumpsSteps({ jumps: [2, 3, 1, 1, 4] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Minimum Jumps Tabulation",
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

/** Initial table with base case J(0) = 0 filled in */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled, lookback reads in progress */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — minimum 2 jumps computed for [2, 3, 1, 1, 4] */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
