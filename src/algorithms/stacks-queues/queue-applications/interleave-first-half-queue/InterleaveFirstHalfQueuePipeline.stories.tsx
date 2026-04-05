/**
 * Storybook stories for the Interleave First Half Queue algorithm pipeline.
 * Uses the real step generator with [1, 2, 3, 4, 5, 6], rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateInterleaveFirstHalfQueueSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/StackQueueVisualizer";

const defaultSteps = generateInterleaveFirstHalfQueueSteps({ values: [1, 2, 3, 4, 5, 6] });
const smallSteps = generateInterleaveFirstHalfQueueSteps({ values: [1, 2, 3, 4] });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Interleave First Half Queue",
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

/** Initial state — full queue populated, stack empty */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing — first half moved to stack, queue holds second half */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed — interleaved result [1,4,2,5,3,6] produced */
export const Complete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Small input — [1,2,3,4] interleaved into [1,3,2,4] */
export const SmallInput: Story = {
  args: {
    visualState: smallSteps[smallSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
