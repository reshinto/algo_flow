/**
 * Storybook stories for the Build Heap Top-Down algorithm pipeline.
 * Uses the real step generator with a 9-element array,
 * rendering the HeapVisualizer at key insertion states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateBuildHeapTopDownSteps } from "./step-generator";
import HeapVisualizer from "@/components/visualization/HeapVisualizer";

const steps = generateBuildHeapTopDownSteps({ array: [9, 5, 7, 1, 3, 8, 2, 6, 4] });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Build Heap Top-Down",
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

/** Initial state — empty heap before any insertions */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-insertion with several elements inserted and sift-up in progress */
export const MidInsertion: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Completed heap — all elements inserted and heap property satisfied */
export const HeapComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
