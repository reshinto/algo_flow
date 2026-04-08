/**
 * Storybook stories for the Task Scheduler Heap algorithm pipeline.
 * Uses the real step generator with tasks [A,A,A,B,B,B] and cooldown=2,
 * rendering the HeapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateTaskSchedulerHeapSteps } from "../step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateTaskSchedulerHeapSteps({
  tasks: ["A", "A", "A", "B", "B", "B"],
  cooldown: 2,
});

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Task Scheduler Heap",
  component: HeapVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeapVisualizer>;

/** Initial state — max-heap built from task frequencies before scheduling begins */
export const InitialFrequencyHeap: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-scheduling — first round complete, heap shows remaining task frequencies */
export const SchedulingInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Final state — all tasks scheduled, heap empty */
export const AllTasksScheduled: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
