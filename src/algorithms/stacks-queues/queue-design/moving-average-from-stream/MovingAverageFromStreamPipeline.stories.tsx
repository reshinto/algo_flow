/**
 * Storybook stories for the Moving Average from Stream algorithm pipeline.
 * Uses the real step generator with the default input, rendering the
 * StackQueueVisualizer at key sliding-window states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateMovingAverageFromStreamSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateMovingAverageFromStreamSteps({
  values: [1, 10, 3, 5],
  windowSize: 3,
});

const smallWindowSteps = generateMovingAverageFromStreamSteps({
  values: [4, 7, 2, 9, 1],
  windowSize: 2,
});

const noEvictionSteps = generateMovingAverageFromStreamSteps({
  values: [2, 4, 6],
  windowSize: 5,
});

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Moving Average from Stream",
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

/** Initial state — empty queue, no values processed */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Window filling — queue has fewer than k elements, no eviction yet */
export const WindowFilling: Story = {
  args: {
    visualState: (() => {
      const enqueueSteps = defaultSteps.filter((step) => step.type === "enqueue");
      return enqueueSteps[1]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** Window full — k elements in the queue, sliding is about to begin */
export const WindowFull: Story = {
  args: {
    visualState: (() => {
      const enqueueSteps = defaultSteps.filter((step) => step.type === "enqueue");
      return enqueueSteps[2]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** After eviction — oldest element removed to maintain window size k */
export const AfterEviction: Story = {
  args: {
    visualState: (() => {
      const dequeueSteps = defaultSteps.filter((step) => step.type === "dequeue");
      return dequeueSteps[0]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** Complete — all values processed, averages computed */
export const AllValuesProcessed: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Small window (k=2) — frequent evictions with many values */
export const SmallWindow: Story = {
  args: {
    visualState: smallWindowSteps[smallWindowSteps.length - 1]!
      .visualState as StackQueueVisualState,
  },
};

/** No eviction — stream shorter than window, queue grows freely */
export const NoEviction: Story = {
  args: {
    visualState: noEvictionSteps[noEvictionSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
