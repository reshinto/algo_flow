/**
 * Storybook stories for the Maximum Product Subarray algorithm pipeline.
 * Renders the ArrayVisualizer at key states — initialization, scanning positive elements,
 * negative flip event, and final completion with max product found.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateMaxProductSubarraySteps } from "@/algorithms/arrays/max-product-subarray/step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateMaxProductSubarraySteps({
  inputArray: [2, 3, -2, 4, -1, 2],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Maximum Product Subarray",
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

/** Early scan — tracking currentMax and currentMin over positive elements */
export const EarlyScan: Story = {
  args: {
    visualState: steps[Math.min(2, steps.length - 1)]!.visualState as ArrayVisualState,
  },
};

/** Mid-scan — after encountering the first negative flip */
export const AfterNegativeFlip: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — maximum product subarray identified */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
