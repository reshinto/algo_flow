/**
 * Storybook stories for the Square Root via Binary Search algorithm pipeline.
 * Uses the real step generator with a target value,
 * rendering the ArrayVisualizer over the virtual answer-space array.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateSqrtBinarySearchSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateSqrtBinarySearchSteps({ targetValue: 49 });

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Sqrt Binary Search",
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

/** Initial state showing the virtual answer-space array [0..49] */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-search with answer space narrowed via midSquared comparisons */
export const MidSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Exact square root found — result highlighted in the answer space */
export const RootFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
