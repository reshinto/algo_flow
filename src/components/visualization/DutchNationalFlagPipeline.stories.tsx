/**
 * Storybook stories for Dutch National Flag pipeline.
 * Uses the real step generator with the default 9-element array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateDutchNationalFlagSteps } from "@/algorithms/arrays/dutch-national-flag/step-generator";
import ArrayVisualizer from "./ArrayVisualizer";

const steps = generateDutchNationalFlagSteps({
  inputArray: [2, 0, 1, 2, 1, 0, 0, 2, 1],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Dutch National Flag",
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

/** Initial state — array loaded, all three pointers at starting positions */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — partitioning in progress with regions taking shape */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — array fully partitioned into 0s, 1s, and 2s */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
