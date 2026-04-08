/**
 * Storybook stories for the Number of Recent Calls algorithm pipeline.
 * Uses the real step generator with [1, 100, 3001, 3002], rendering the
 * StackQueueVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateNumberOfRecentCallsSteps } from "../step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateNumberOfRecentCallsSteps({ timestamps: [1, 100, 3001, 3002] });
const burstSteps = generateNumberOfRecentCallsSteps({ timestamps: [100, 200, 300, 400, 500] });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Number of Recent Calls",
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

/** Initial state — empty queue, timestamps ready */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** After first enqueue — timestamp 1 enters the window */
export const FirstEnqueue: Story = {
  args: {
    visualState: (() => {
      const enqueueSteps = defaultSteps.filter((step) => step.type === "enqueue");
      return enqueueSteps[0]!.visualState as StackQueueVisualState;
    })(),
  },
};

/** Window growing — multiple timestamps present, none expired yet */
export const WindowGrowing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Expiry in action — old timestamp dequeued as window slides */
export const ExpiryInAction: Story = {
  args: {
    visualState: (() => {
      const dequeueSteps = defaultSteps.filter((step) => step.type === "dequeue");
      return (dequeueSteps[0]?.visualState ??
        defaultSteps[defaultSteps.length - 1]!.visualState) as StackQueueVisualState;
    })(),
  },
};

/** Final state — all timestamps processed */
export const AllProcessed: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Burst scenario — all calls within window, no expiry */
export const BurstNoExpiry: Story = {
  args: {
    visualState: burstSteps[burstSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
