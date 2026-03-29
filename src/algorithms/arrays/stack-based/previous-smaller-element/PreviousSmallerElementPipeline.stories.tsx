/**
 * Storybook stories for Previous Smaller Element pipeline.
 * Uses the real step generator with the default 8-element array [4,10,5,8,20,15,3,12],
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generatePreviousSmallerElementSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generatePreviousSmallerElementSteps({
  inputArray: [4, 10, 5, 8, 20, 15, 3, 12],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Previous Smaller Element",
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

/** Initial state — array initialized, increasing stack empty, result array filled with -1 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — increasing stack partially built, some previous smaller elements resolved */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all elements processed, previous smaller elements resolved or marked -1 */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
