/**
 * Storybook stories for the Hash-Based Search algorithm pipeline.
 * Uses the real step generator with an unsorted array and target value,
 * rendering the ArrayVisualizer at key search states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateHashSearchSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateHashSearchSteps({
  array: [4, 2, 7, 1, 9, 3, 8, 5],
  targetValue: 9,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Hash-Based Search",
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

/** Initial state before any elements are inserted into the hash map */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-build with several elements already inserted into the hash map */
export const MidSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Search complete — hash map built and lookup performed */
export const SearchComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
