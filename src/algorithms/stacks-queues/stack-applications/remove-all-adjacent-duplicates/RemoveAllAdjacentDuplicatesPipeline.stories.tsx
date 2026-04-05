/**
 * Storybook stories for the Remove All Adjacent Duplicates algorithm pipeline.
 * Uses the real step generator with "abbaca", rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateRemoveAllAdjacentDuplicatesSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/StackQueueVisualizer";

const defaultSteps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "abbaca" });
const cascadeSteps = generateRemoveAllAdjacentDuplicatesSteps({ inputString: "azxxzy" });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Remove All Adjacent Duplicates",
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

/** Initial state — full input string unprocessed, empty stack */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing with some characters pushed onto the stack */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed — result string 'ca' remains after all duplicate pairs removed */
export const Completed: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Cascading removals — 'azxxzy' collapses to 'ay' via two separate pair removals */
export const CascadingRemovals: Story = {
  args: {
    visualState: cascadeSteps[cascadeSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
