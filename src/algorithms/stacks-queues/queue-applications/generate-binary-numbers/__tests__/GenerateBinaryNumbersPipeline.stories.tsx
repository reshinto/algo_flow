/**
 * Storybook stories for the Generate Binary Numbers algorithm pipeline.
 * Uses the real step generator with count = 10, rendering the
 * StackQueueVisualizer at key queue traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateBinaryNumbersSteps } from "../step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateBinaryNumbersSteps({ count: 10 });
const smallSteps = generateBinaryNumbersSteps({ count: 3 });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Generate Binary Numbers",
  component: StackQueueVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StackQueueVisualizer>;

/** Initial state — queue seeded with '1', result empty */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing — several binary numbers generated, queue growing with children */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed — all 10 binary numbers generated */
export const Complete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Small input — count = 3, shows '1', '10', '11' */
export const SmallInput: Story = {
  args: {
    visualState: smallSteps[smallSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
