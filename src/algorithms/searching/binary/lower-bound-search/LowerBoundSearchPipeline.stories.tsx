/**
 * Storybook stories for the Lower Bound Search algorithm pipeline.
 * Uses the real step generator with a sorted array containing duplicates,
 * rendering the ArrayVisualizer at key lower bound search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateLowerBoundSearchSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateLowerBoundSearchSteps({
  sortedArray: [1, 3, 3, 5, 5, 5, 8, 12],
  targetValue: 5,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Lower Bound Search",
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

/** Initial state with full array before any comparisons */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-search showing the algorithm narrowing toward the leftmost occurrence */
export const MidSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Search complete — leftmost valid position identified */
export const SearchComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
