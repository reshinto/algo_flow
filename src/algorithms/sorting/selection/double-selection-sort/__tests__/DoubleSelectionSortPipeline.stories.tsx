/**
 * Storybook stories for the Double Selection Sort algorithm pipeline.
 * Uses the real step generator to produce execution steps, then renders
 * the ArrayVisualizer at initial, mid-execution, and fully-sorted states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateDoubleSelectionSortSteps } from "../step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateDoubleSelectionSortSteps([64, 34, 25, 12, 22, 11, 90]);

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Double Selection Sort",
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

/** Initial state before any comparisons occur */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution with active bidirectional sorting */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state with all elements fully sorted */
export const FullySorted: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
