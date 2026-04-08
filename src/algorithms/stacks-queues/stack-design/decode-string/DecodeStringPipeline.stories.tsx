/**
 * Storybook stories for the Decode String algorithm pipeline.
 * Uses the real step generator with "3[a2[c]]", rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateDecodeStringSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const defaultSteps = generateDecodeStringSteps({ inputString: "3[a2[c]]" });
const multiGroupSteps = generateDecodeStringSteps({ inputString: "2[abc]3[cd]ef" });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Decode String",
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

/** Initial state — full input unprocessed, empty stack */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing with nested context pushed onto the stack */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed decode — all brackets unwound, final string assembled */
export const DecodedComplete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Multiple top-level groups with trailing letters */
export const MultiGroupDecode: Story = {
  args: {
    visualState: multiGroupSteps[multiGroupSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
