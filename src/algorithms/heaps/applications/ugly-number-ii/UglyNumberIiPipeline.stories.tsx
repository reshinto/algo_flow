/**
 * Storybook stories for the Ugly Number II algorithm pipeline.
 * Uses the real step generator with nthPosition=10 (12th ugly number = 12),
 * rendering the HeapVisualizer at key states of the min-heap.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateUglyNumberIiSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/HeapVisualizer";

const steps = generateUglyNumberIiSteps({ nthPosition: 10 });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Ugly Number II",
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

/** Initial state — min-heap seeded with [1] */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-generation — heap contains a mix of candidates as ugly numbers are extracted */
export const HeapGrowing: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Final state — 10th ugly number (12) extracted, heap contains remaining candidates */
export const NthUglyFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
