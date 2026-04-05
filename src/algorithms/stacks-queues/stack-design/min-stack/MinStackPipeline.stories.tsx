/**
 * Storybook stories for the Min Stack algorithm pipeline.
 * Uses the real step generator with [5, 3, 7, 1, 8], rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateMinStackSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/StackQueueVisualizer";

const defaultSteps = generateMinStackSteps({ values: [5, 3, 7, 1, 8] });
const ascendingSteps = generateMinStackSteps({ values: [1, 2, 3] });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Min Stack",
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

/** Initial state — both stacks empty before any elements are pushed */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing — auxiliary min stack diverges from main stack */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Complete — all values pushed, minimum tracked in auxiliary stack */
export const Complete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Ascending input — min stays constant (1) throughout */
export const AscendingInput: Story = {
  args: {
    visualState: ascendingSteps[ascendingSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
