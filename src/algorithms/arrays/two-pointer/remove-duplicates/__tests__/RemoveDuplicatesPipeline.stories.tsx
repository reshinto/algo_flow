/**
 * Storybook stories for Remove Duplicates (Sorted) pipeline.
 * Uses the real step generator with the default 8-element sorted array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateRemoveDuplicatesSteps } from "../step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateRemoveDuplicatesSteps({
  sortedArray: [1, 1, 2, 2, 3, 4, 4, 5],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Remove Duplicates",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — sorted array with first element confirmed unique */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — write pointer has advanced, some duplicates skipped */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — unique prefix identified, uniqueCount returned */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
