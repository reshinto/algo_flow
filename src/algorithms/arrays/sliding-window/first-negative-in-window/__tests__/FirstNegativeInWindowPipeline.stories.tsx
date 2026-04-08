/**
 * Storybook stories for the First Negative in Window algorithm pipeline.
 * Renders the ArrayVisualizer at key states — initialization, initial window,
 * deque holding negatives, a window with no negative, and final completion.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateFirstNegativeInWindowSteps } from "../step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateFirstNegativeInWindowSteps({
  inputArray: [12, -1, -7, 8, -15, 30, 16, 28],
  windowSize: 3,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/First Negative in Window",
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

/** Initial state — array before scanning begins */
export const Initialized: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Initial window — first window of size K processed */
export const InitialWindow: Story = {
  args: {
    visualState: steps[Math.min(2, steps.length - 1)]!.visualState as ArrayVisualState,
  },
};

/** Mid-scan — window sliding with deque tracking negatives */
export const SlidingPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all window results computed */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
