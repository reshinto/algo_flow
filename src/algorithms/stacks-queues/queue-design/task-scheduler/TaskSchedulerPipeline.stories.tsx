/**
 * Storybook stories for the Task Scheduler algorithm pipeline.
 * Uses the real step generator with ["A","A","A","B","B","B"] and cooldown 2,
 * rendering the StackQueueVisualizer at key scheduling states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateTaskSchedulerSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/StackQueueVisualizer";

const defaultSteps = generateTaskSchedulerSteps({
  tasks: ["A", "A", "A", "B", "B", "B"],
  cooldown: 2,
});

const zeroCooldownSteps = generateTaskSchedulerSteps({
  tasks: ["A", "A", "A", "B", "B", "B"],
  cooldown: 0,
});

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Task Scheduler",
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

/** Initial state — frequency map computed, no tasks scheduled yet */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-scheduling — some tasks in the cooldown queue, others ready to execute */
export const MidScheduling: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Scheduling complete — all 8 intervals used for the default input */
export const SchedulingComplete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Zero cooldown — tasks run back-to-back with no idle slots */
export const ZeroCooldown: Story = {
  args: {
    visualState: zeroCooldownSteps[zeroCooldownSteps.length - 1]!
      .visualState as StackQueueVisualState,
  },
};
