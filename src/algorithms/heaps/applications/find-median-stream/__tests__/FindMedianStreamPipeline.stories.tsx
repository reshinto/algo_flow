/**
 * Storybook stories for the Find Median from Stream algorithm pipeline.
 * Uses the real step generator with a 7-element stream,
 * rendering the HeapVisualizer (showing the max-heap / lower half) at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateFindMedianStreamSteps } from "../step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateFindMedianStreamSteps({ stream: [5, 2, 8, 1, 9, 3, 7] });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Find Median from Stream",
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

/** Initial state — both heaps are empty before the stream begins */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-stream — max-heap (lower half) partially built with running median visible */
export const MidStream: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Final state — max-heap holds the lower half; median highlighted at root */
export const FinalMedianHighlighted: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
