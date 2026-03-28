/**
 * Storybook stories for Find Missing Number (XOR) pipeline.
 * Uses the real step generator with the default 3-element array [3,0,1],
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateFindMissingNumberSteps } from "@/algorithms/arrays/find-missing-number/step-generator";
import ArrayVisualizer from "./ArrayVisualizer";

const steps = generateFindMissingNumberSteps({
  inputArray: [3, 0, 1],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Find Missing Number",
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

/** Mid-execution — range XOR pass in progress */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — missing number revealed after all pairs cancelled */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
