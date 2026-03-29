/**
 * Storybook stories for the Decode Ways Memoization DP algorithm pipeline.
 * Uses the real step generator to compute decode ways for "12321" via top-down memoization,
 * rendering the DPTableVisualizer at key cache-hit states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateDecodeWaysMemoizationSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateDecodeWaysMemoizationSteps({ digits: "12321" });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Decode Ways Memoization",
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

/** Initial state with empty cache and no call stack frames */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — some subproblems cached, call stack partially populated */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** All subproblems cached — D(5) = 6 computed for "12321" */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
