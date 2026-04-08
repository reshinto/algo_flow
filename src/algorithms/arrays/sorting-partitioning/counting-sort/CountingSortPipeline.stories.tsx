/**
 * Storybook stories for the Counting Sort algorithm pipeline.
 * Uses the real step generator with the default 9-element input,
 * rendering the ArrayVisualizer across counting and reconstruction phases.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateCountingSortSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateCountingSortSteps({
  inputArray: [4, 2, 2, 8, 3, 3, 1, 7, 5],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Counting Sort",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — input array displayed, count array all zeros */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-count phase — frequencies being tallied in the count array */
export const CountingPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 3)]!.visualState as ArrayVisualState,
  },
};

/** Reconstruction phase — sorted values being written back */
export const ReconstructionPhase: Story = {
  args: {
    visualState: steps[Math.floor((steps.length * 2) / 3)]!.visualState as ArrayVisualState,
  },
};

/** Final state — array fully sorted */
export const SortComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
