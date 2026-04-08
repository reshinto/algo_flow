/**
 * Storybook stories for Max Consecutive Ones III pipeline.
 * Uses the real step generator with the default 10-element binary array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateMaxConsecutiveOnesSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateMaxConsecutiveOnesSteps({
  inputArray: [1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
  maxFlips: 2,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Max Consecutive Ones III",
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

/** Initial state — window begins at the first element */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — window spanning zeros within the flip budget */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — longest window of flippable consecutive ones identified */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
