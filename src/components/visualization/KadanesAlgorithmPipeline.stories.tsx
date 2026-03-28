/**
 * Storybook stories for Kadane's Algorithm pipeline.
 * Uses the real step generator with the default 9-element mixed array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateKadanesSteps } from "@/algorithms/arrays/kadanes-algorithm/step-generator";
import ArrayVisualizer from "./ArrayVisualizer";

const steps = generateKadanesSteps({
  inputArray: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Kadanes Algorithm",
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

/** Initial state — first element selected as starting subarray */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — extend/restart decisions in progress */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — maximum subarray identified */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
