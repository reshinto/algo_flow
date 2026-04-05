/**
 * Storybook stories for the Flatten Nested List Iterator algorithm pipeline.
 * Uses the real step generator with [[1,[2]],3,[4,[5,6]]], rendering the
 * StackQueueVisualizer at key stack traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateFlattenNestedListIteratorSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/StackQueueVisualizer";

const defaultSteps = generateFlattenNestedListIteratorSteps({
  nestedList: [[1, [2]], 3, [4, [5, 6]]],
});
const simpleSteps = generateFlattenNestedListIteratorSteps({
  nestedList: [
    [1, 2],
    [3, 4],
  ],
});

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Flatten Nested List Iterator",
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

/** Initial state — stack seeded with the top-level items in reverse order */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing — some integers collected, stack being expanded */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Completed — full list flattened to [1,2,3,4,5,6] */
export const Complete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Simple input — [[1,2],[3,4]] flattened to [1,2,3,4] */
export const SimpleInput: Story = {
  args: {
    visualState: simpleSteps[simpleSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
