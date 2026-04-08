/**
 * Storybook stories for Boyer-Moore Voting Algorithm pipeline.
 * Uses the real step generator with the default 7-element array,
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateBoyerMooreVotingSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateBoyerMooreVotingSteps({
  inputArray: [2, 2, 1, 1, 1, 2, 2],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Boyer Moore Voting",
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

/** Initial state — array loaded, candidate initialized to first element */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — cancellation votes in progress */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — majority candidate identified after full cancellation pass */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
