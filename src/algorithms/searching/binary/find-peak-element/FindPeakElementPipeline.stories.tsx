/**
 * Storybook stories for the Find Peak Element algorithm pipeline.
 * Uses the real step generator with an unsorted array,
 * rendering the ArrayVisualizer at key search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateFindPeakElementSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateFindPeakElementSteps({
  array: [1, 3, 20, 4, 1, 0],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Find Peak Element",
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

/** Initial state showing the full array with search boundaries */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-search with slope direction determined and elements eliminated */
export const MidSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Peak element found — local maximum highlighted */
export const PeakFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
