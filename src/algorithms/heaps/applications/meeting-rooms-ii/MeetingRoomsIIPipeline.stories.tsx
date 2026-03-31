/**
 * Storybook stories for the Meeting Rooms II algorithm pipeline.
 * Uses the real step generator with 4 meetings, rendering the HeapVisualizer
 * at key allocation states showing end times in the min-heap.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateMeetingRoomsIISteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/HeapVisualizer";

const steps = generateMeetingRoomsIISteps({
  intervals: [
    [0, 30],
    [5, 10],
    [15, 20],
    [2, 7],
  ],
});

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Meeting Rooms II",
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

/** Initial state — empty heap before any meeting is processed */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-execution — heap tracks end times of rooms currently in use */
export const HeapInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Final state — heap size shows the minimum number of rooms required */
export const AllMeetingsScheduled: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
