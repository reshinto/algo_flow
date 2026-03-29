/**
 * Storybook stories for the Product of Array Except Self algorithm pipeline.
 * Uses the real step generator with a five-element array,
 * rendering the ArrayVisualizer at key prefix/suffix pass states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateProductExceptSelfSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateProductExceptSelfSteps({
  inputArray: [1, 2, 3, 4, 5],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Product Except Self",
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

/** Initial state — array before any products are computed */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — partway through the prefix or suffix pass */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all result values finalized */
export const ResultFinalized: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
