/**
 * Storybook stories for the Rotate Array (Cyclic Replacement) algorithm pipeline.
 * Uses the real step generator with default inputs, rendering the ArrayVisualizer
 * at key phases showing cycle-following placement progress.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateRotateArrayCyclicSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateRotateArrayCyclicSteps({
  inputArray: [1, 2, 3, 4, 5, 6],
  rotateCount: 2,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Rotate Array Cyclic",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — array before any cyclic placements */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-cycle phase — first cycle in progress placing elements */
export const MidCycle: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 3)]!.visualState as ArrayVisualState,
  },
};

/** Second cycle phase — second displacement cycle underway */
export const SecondCycle: Story = {
  args: {
    visualState: steps[Math.floor((steps.length * 2) / 3)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all elements placed at their rotated destinations */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
