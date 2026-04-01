/**
 * Storybook stories for the Jump Search algorithm pipeline.
 * Uses the real step generator with a sorted array and target value,
 * rendering the ArrayVisualizer at key search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateJumpSearchSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateJumpSearchSteps({
  sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
  targetValue: 56,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Jump Search",
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

/** Initial state with full array and block size calculated */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-search with some blocks jumped over and eliminated */
export const MidSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Search complete — target found or exhausted */
export const SearchComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
