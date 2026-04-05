/**
 * Storybook stories for the Implement Queue Using Stacks algorithm pipeline.
 * Uses the real step generator with [1, 2, 3, 4, 5], rendering the
 * StackQueueVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateImplementQueueUsingStacksSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/StackQueueVisualizer";

const defaultSteps = generateImplementQueueUsingStacksSteps({ values: [1, 2, 3, 4, 5] });
const smallSteps = generateImplementQueueUsingStacksSteps({ values: [10, 20, 30] });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Implement Queue Using Stacks",
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

/** Initial state — empty stacks, input array ready */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Push phase complete — all values loaded onto the input stack */
export const InputStackLoaded: Story = {
  args: {
    visualState: (() => {
      const pushSteps = defaultSteps.filter((step) => step.type === "push");
      return pushSteps[pushSteps.length - 1]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** Mid-transfer — elements moving from input stack to output stack */
export const MidTransfer: Story = {
  args: {
    visualState: (() => {
      const transferSteps = defaultSteps.filter((step) => step.type === "transfer");
      const midIdx = Math.floor(transferSteps.length / 2);
      return transferSteps[midIdx]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** Dequeue in progress — output stack being consumed in FIFO order */
export const DequeueInProgress: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length * 0.75)]!
      .visualState as StackQueueVisualState,
  },
};

/** Complete — all values dequeued in FIFO order */
export const AllDequeued: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Small input — three values showing the full transfer cycle */
export const SmallInputComplete: Story = {
  args: {
    visualState: smallSteps[smallSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
