/**
 * Storybook stories for the Last Stone Weight algorithm pipeline.
 * Uses the real step generator with stones [2, 7, 4, 1, 8, 1],
 * rendering the HeapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateLastStoneWeightSteps } from "../step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateLastStoneWeightSteps({ array: [2, 7, 4, 1, 8, 1] });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Last Stone Weight",
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

/** Initial state — max-heap built from all stones before smashing begins */
export const InitialHeap: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-smashing — some stones have been destroyed or reinserted */
export const SmashingInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Final state — last stone remaining (or empty heap returning 0) */
export const FinalResult: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
