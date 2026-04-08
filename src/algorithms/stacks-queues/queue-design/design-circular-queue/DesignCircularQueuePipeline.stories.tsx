/**
 * Storybook stories for the Design Circular Queue algorithm pipeline.
 * Uses the real step generator with the default input, rendering the
 * StackQueueVisualizer at key circular buffer states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateDesignCircularQueueSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateDesignCircularQueueSteps({
  operations: ["enqueue 1", "enqueue 2", "dequeue", "enqueue 3"],
  capacity: 3,
});

const wrapAroundSteps = generateDesignCircularQueueSteps({
  operations: ["enqueue 1", "enqueue 2", "enqueue 3", "dequeue", "enqueue 4"],
  capacity: 3,
});

const fullQueueSteps = generateDesignCircularQueueSteps({
  operations: ["enqueue 10", "enqueue 20", "enqueue 30", "enqueue 40"],
  capacity: 3,
});

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Design Circular Queue",
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

/** Initial state — empty ring buffer with capacity 3 */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** After first enqueue — front and rear both point to slot 0 */
export const FirstEnqueue: Story = {
  args: {
    visualState: (() => {
      const enqueueSteps = defaultSteps.filter((step) => step.type === "enqueue");
      return enqueueSteps[0]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** After dequeue — slot cleared, front pointer advances */
export const AfterDequeue: Story = {
  args: {
    visualState: (() => {
      const dequeueSteps = defaultSteps.filter((step) => step.type === "dequeue");
      return dequeueSteps[0]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** Complete — all operations processed */
export const AllOperationsComplete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Wrap-around — rear pointer wraps back to slot 0 after reaching capacity */
export const WrapAround: Story = {
  args: {
    visualState: wrapAroundSteps[wrapAroundSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Full queue — enqueue rejected because size equals capacity */
export const QueueFull: Story = {
  args: {
    visualState: (() => {
      const peekSteps = fullQueueSteps.filter((step) => step.type === "peek");
      return peekSteps[0]!.visualState as StackQueueVisualState;
    })(),
  },
};
