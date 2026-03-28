/**
 * Storybook stories for Single Number (XOR) pipeline.
 * Uses the real step generator with the default 5-element array [4,1,2,1,2],
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateSingleNumberSteps } from "@/algorithms/arrays/single-number/step-generator";
import ArrayVisualizer from "./ArrayVisualizer";

const steps = generateSingleNumberSteps({
  inputArray: [4, 1, 2, 1, 2],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Single Number",
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

/** Initial state — array initialized, XOR accumulator set to 0 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — XOR pass in progress, duplicate pairs partially cancelled */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — unique element revealed after all duplicate pairs cancelled */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
