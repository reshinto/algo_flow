/**
 * Storybook stories for the Linear Search algorithm pipeline.
 * Uses the real step generator with an unsorted array and target value,
 * rendering the ArrayVisualizer at key search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateLinearSearchSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateLinearSearchSteps({
  array: [4, 2, 7, 1, 9, 3, 8, 5],
  targetValue: 7,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Linear Search",
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

/** Initial state showing the full unsorted array before scanning begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-search with some elements already visited and current element being compared */
export const MidSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Search complete — target element highlighted as found */
export const SearchComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
