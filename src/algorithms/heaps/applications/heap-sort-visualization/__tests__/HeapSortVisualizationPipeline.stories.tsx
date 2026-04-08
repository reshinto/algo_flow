/**
 * Storybook stories for the Heap Sort Visualization algorithm pipeline.
 * Uses the real step generator with a 9-element array,
 * rendering the HeapVisualizer at key states of the shrinking max-heap.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateHeapSortVisualizationSteps } from "../step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateHeapSortVisualizationSteps({ array: [9, 5, 7, 1, 3, 8, 2, 6, 4] });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Heap Sort Visualization",
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

/** Initial state — max-heap built from unsorted input, ready for extraction */
export const MaxHeapBuilt: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-sort — heap partially extracted, settled elements at right, heap shrinking */
export const ExtractionInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Final state — all elements extracted and settled, array fully sorted */
export const SortComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
