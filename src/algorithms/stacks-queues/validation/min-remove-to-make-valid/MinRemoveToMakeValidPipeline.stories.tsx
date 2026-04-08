/**
 * Storybook stories for the Min Remove to Make Valid algorithm pipeline.
 * Uses the real step generator with "a(b(c)d" (unbalanced) and "(a(b)c)" (balanced),
 * rendering the StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateMinRemoveToMakeValidSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/stacks-queues/StackQueueVisualizer";

const balancedSteps = generateMinRemoveToMakeValidSteps({ inputString: "(a(b)c)" });
const unbalancedSteps = generateMinRemoveToMakeValidSteps({ inputString: "a(b(c)d" });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Min Remove to Make Valid",
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
    visualState: balancedSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing with some characters visited and brackets on the stack */
export const MidProcessing: Story = {
  args: {
    visualState: balancedSteps[Math.floor(balancedSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed valid string — no brackets removed, all matched */
export const ValidComplete: Story = {
  args: {
    visualState: balancedSteps[balancedSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Unbalanced input — unmatched bracket removed to produce valid result */
export const InvalidRemoval: Story = {
  args: {
    visualState: unbalancedSteps[unbalancedSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
