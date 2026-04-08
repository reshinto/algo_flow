/**
 * Storybook stories for the Max Frequency Stack algorithm pipeline.
 * Uses the real step generator with [5, 7, 5, 7, 4, 5], rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateMaxFrequencyStackSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateMaxFrequencyStackSteps({ values: [5, 7, 5, 7, 4, 5] });
const uniformSteps = generateMaxFrequencyStackSteps({ values: [3, 3, 3] });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Max Frequency Stack",
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

/** Initial state — empty frequency structures before any elements are pushed */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing — frequency stacks partially filled during push phase */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Complete — all elements popped in most-frequent-first order */
export const Complete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Uniform input — single element repeated, all pops from a single frequency level */
export const UniformInput: Story = {
  args: {
    visualState: uniformSteps[uniformSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
