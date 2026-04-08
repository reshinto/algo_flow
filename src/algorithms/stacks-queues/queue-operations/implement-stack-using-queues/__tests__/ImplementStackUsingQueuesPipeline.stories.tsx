/**
 * Storybook stories for the Implement Stack Using Queues algorithm pipeline.
 * Uses the real step generator with [1, 2, 3, 4, 5], rendering the
 * StackQueueVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateImplementStackUsingQueuesSteps } from "../step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateImplementStackUsingQueuesSteps({ values: [1, 2, 3, 4, 5] });
const smallSteps = generateImplementStackUsingQueuesSteps({ values: [10, 20, 30] });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Implement Stack Using Queues",
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

/** Initial state — empty queue, input array ready */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** First enqueue complete — value 1 at queue front, no rotations needed */
export const FirstEnqueue: Story = {
  args: {
    visualState: (() => {
      const enqueueSteps = defaultSteps.filter((step) => step.type === "enqueue");
      return enqueueSteps[0]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** Mid-rotation — elements cycling behind the newly pushed value */
export const MidRotation: Story = {
  args: {
    visualState: (() => {
      const transferSteps = defaultSteps.filter((step) => step.type === "transfer");
      const midIdx = Math.floor(transferSteps.length / 2);
      return transferSteps[midIdx]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** All pushes complete — queue front holds the most-recently pushed value */
export const AllPushesComplete: Story = {
  args: {
    visualState: (() => {
      const enqueueSteps = defaultSteps.filter((step) => step.type === "enqueue");
      return enqueueSteps[enqueueSteps.length - 1]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** Pop in progress — dequeuing values in LIFO order */
export const PopInProgress: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length * 0.8)]!
      .visualState as StackQueueVisualState,
  },
};

/** Complete — all values popped in LIFO order */
export const AllPopped: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Small input — three values showing the full rotation and pop cycle */
export const SmallInputComplete: Story = {
  args: {
    visualState: smallSteps[smallSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
