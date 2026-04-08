/**
 * Storybook stories for the Perfect Squares (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute the minimum perfect squares for n=12,
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generatePerfectSquaresSteps } from "../step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generatePerfectSquaresSteps({ targetNumber: 12 });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Perfect Squares Tabulation",
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

/** Initial table with base case S(0) = 0 filled in */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled as perfect square candidates are evaluated */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — S(12) = 3 computed (12 = 4 + 4 + 4) */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
