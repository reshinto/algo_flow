/**
 * Storybook stories for the Subarray Sum Equals K algorithm pipeline.
 * Uses the real step generator with the default input [1, 1, 1], target 2,
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateSubarraySumEqualsKSteps } from "../step-generator";
import HashMapVisualizer from "@/components/visualization/hash-maps/HashMapVisualizer";

const steps = generateSubarraySumEqualsKSteps({ numbers: [1, 1, 1], target: 2 });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Subarray Sum Equals K (Hash Map)",
  component: HashMapVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HashMapVisualizer>;

/** Initial state — map seeded with {0: 1}, first element about to be processed */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — some prefix sums stored, actively checking for a match */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Final state — all subarrays counted, result displayed */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
