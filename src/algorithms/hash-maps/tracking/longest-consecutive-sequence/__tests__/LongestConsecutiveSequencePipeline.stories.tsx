/**
 * Storybook stories for the Longest Consecutive Sequence algorithm pipeline.
 * Uses the real step generator with the default input [100, 4, 200, 1, 3, 2],
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateLongestConsecutiveSequenceSteps } from "../step-generator";
import HashMapVisualizer from "@/components/visualization/hash-maps/HashMapVisualizer";

const steps = generateLongestConsecutiveSequenceSteps({ numbers: [100, 4, 200, 1, 3, 2] });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Longest Consecutive Sequence",
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

/** Initial state — empty hash set, about to insert first element */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — set fully built, scanning for sequence starts */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Complete — longest sequence of length 4 identified */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
