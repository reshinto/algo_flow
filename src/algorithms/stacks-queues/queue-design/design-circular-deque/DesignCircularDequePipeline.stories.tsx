/**
 * Storybook stories for the Design Circular Deque algorithm pipeline.
 * Uses the real step generator with the default input, rendering the
 * StackQueueVisualizer at key circular buffer states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateDesignCircularDequeSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateDesignCircularDequeSteps({
  operations: ["pushBack 1", "pushFront 2", "popBack", "pushBack 3"],
  capacity: 3,
});

const wrapAroundSteps = generateDesignCircularDequeSteps({
  operations: ["pushBack 1", "pushBack 2", "pushBack 3", "popFront", "pushFront 0"],
  capacity: 3,
});

const fullDequeSteps = generateDesignCircularDequeSteps({
  operations: ["pushBack 10", "pushBack 20", "pushBack 30", "pushFront 5"],
  capacity: 3,
});

const bothEndsSteps = generateDesignCircularDequeSteps({
  operations: ["pushBack 1", "pushFront 2", "pushBack 3", "pushFront 4", "popFront", "popBack"],
  capacity: 4,
});

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Design Circular Deque",
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

/** After first pushBack — front and rear both point to slot 0 */
export const FirstPushBack: Story = {
  args: {
    visualState: (() => {
      const enqueueSteps = defaultSteps.filter((step) => step.type === "enqueue");
      return enqueueSteps[0]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** After pushFront — front pointer retreats to the preceding slot */
export const AfterPushFront: Story = {
  args: {
    visualState: (() => {
      const enqueueFrontSteps = defaultSteps.filter((step) => step.type === "enqueue-front");
      return enqueueFrontSteps[0]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** After popBack — rear pointer retreats, element removed from the rear */
export const AfterPopBack: Story = {
  args: {
    visualState: (() => {
      const dequeueRearSteps = defaultSteps.filter((step) => step.type === "dequeue-rear");
      return dequeueRearSteps[0]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** Complete — all operations processed */
export const AllOperationsComplete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Wrap-around — front pointer wraps to the last slot after pushFront fills the gap */
export const WrapAround: Story = {
  args: {
    visualState: wrapAroundSteps[wrapAroundSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Full deque — pushFront rejected because size equals capacity */
export const DequeFull: Story = {
  args: {
    visualState: (() => {
      const peekSteps = fullDequeSteps.filter((step) => step.type === "peek");
      return peekSteps[0]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** Both ends — interleaved pushFront/pushBack then popFront/popBack */
export const BothEndsInterleaved: Story = {
  args: {
    visualState: bothEndsSteps[bothEndsSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
