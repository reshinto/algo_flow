/**
 * Storybook stories for the Climbing Stairs Tabulation DP algorithm pipeline.
 * Uses the real step generator to compute ways(7) via tabulation,
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateClimbingStairsTabulationSteps } from "../step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateClimbingStairsTabulationSteps({ numberOfStairs: 7 });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Climbing Stairs Tabulation",
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

/** Initial table with base cases S(0) and S(1) filled in */
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

/** Table fully filled — ways(7) = 21 computed */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
