/**
 * Storybook stories for the K Closest Points to Origin algorithm pipeline.
 * Uses the real step generator with a 7-point input (k=3),
 * rendering the HeapVisualizer at key states of the max-heap.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateKClosestPointsSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/HeapVisualizer";

const steps = generateKClosestPointsSteps({
  points: [
    [3, 3],
    [5, -1],
    [-2, 4],
    [1, 1],
    [0, 2],
    [-1, -1],
    [4, 0],
  ],
  kValue: 3,
});

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/K Closest Points",
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

/** Initial state — empty heap before any points are processed */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-processing — max-heap partially filled as closer points replace farther ones */
export const HeapFilling: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Final state — max-heap contains the k=3 closest points to origin */
export const KClosestFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
