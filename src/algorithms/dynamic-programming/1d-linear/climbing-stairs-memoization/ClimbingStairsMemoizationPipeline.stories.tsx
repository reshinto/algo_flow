/**
 * Storybook stories for the Climbing Stairs Memoization DP algorithm pipeline.
 * Uses the real step generator to compute S(7) via top-down memoization,
 * rendering the DPTableVisualizer at key cache-hit states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateClimbingStairsMemoizationSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/dynamic-programming/DPTableVisualizer";

const steps = generateClimbingStairsMemoizationSteps({ numberOfStairs: 7 });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Climbing Stairs Memoization",
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

/** Initial state with empty cache */
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

/** All subproblems cached — S(7) = 21 computed */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
