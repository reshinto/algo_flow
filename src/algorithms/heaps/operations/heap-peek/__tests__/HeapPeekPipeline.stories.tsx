/**
 * Storybook stories for the Heap Peek algorithm pipeline.
 * Uses the real step generator with a 7-element min-heap,
 * rendering the HeapVisualizer at each of the three steps.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateHeapPeekSteps } from "../step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateHeapPeekSteps({ array: [1, 3, 5, 7, 9, 8, 6] });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Heap Peek",
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

/** Initial state — min-heap ready for peek inspection */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Root highlighted — showing the minimum element at index 0 */
export const RootHighlighted: Story = {
  args: {
    visualState: steps[1]!.visualState as HeapVisualState,
  },
};

/** Peek complete — minimum identified, heap unchanged */
export const PeekComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
