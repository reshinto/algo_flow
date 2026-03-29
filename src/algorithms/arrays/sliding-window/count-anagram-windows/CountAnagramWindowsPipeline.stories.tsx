/**
 * Storybook stories for the Count Anagram Windows algorithm pipeline.
 * Renders the ArrayVisualizer at key states — initialization, initial window,
 * sliding phase, and final completion with all positions found.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateCountAnagramWindowsSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateCountAnagramWindowsSteps({
  text: [1, 2, 3, 1, 2, 1, 3, 2, 1],
  pattern: [1, 2, 3],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Count Anagram Windows",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — text array before processing begins */
export const Initialized: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** First window built — initial pattern-length window ready for comparison */
export const InitialWindowBuilt: Story = {
  args: {
    visualState: steps[Math.min(2, steps.length - 1)]!.visualState as ArrayVisualState,
  },
};

/** Sliding phase — window in the middle of traversal */
export const SlidingPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all anagram windows identified */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
