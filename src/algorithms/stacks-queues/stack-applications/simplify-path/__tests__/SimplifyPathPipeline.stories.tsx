/**
 * Storybook stories for the Simplify Path algorithm pipeline.
 * Uses the real step generator with "/a/./b/../../c/", rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateSimplifyPathSteps } from "../step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateSimplifyPathSteps({ inputString: "/a/./b/../../c/" });
const deepSteps = generateSimplifyPathSteps({ inputString: "/home/user/docs/../downloads" });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Simplify Path",
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

/** Initial state — full input path unprocessed, empty stack */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing with some directories pushed onto the stack */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed — stack contains only the canonical path segments */
export const Completed: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Deeper path with a parent-directory pop mid-traversal */
export const DeepPathWithPop: Story = {
  args: {
    visualState: deepSteps[Math.floor(deepSteps.length / 2)]!.visualState as StackQueueVisualState,
  },
};
