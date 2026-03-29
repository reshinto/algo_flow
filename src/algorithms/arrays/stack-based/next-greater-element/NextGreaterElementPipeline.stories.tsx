/**
 * Storybook stories for Next Greater Element pipeline.
 * Uses the real step generator with the default 7-element array [4,5,2,10,8,1,3],
 * rendering the ArrayVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateNextGreaterElementSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateNextGreaterElementSteps({
  inputArray: [4, 5, 2, 10, 8, 1, 3],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Next Greater Element",
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

/** Initial state — array initialized, stack empty, result array filled with -1 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — monotonic stack partially built, some elements resolved */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all resolvable elements answered, remaining stack marked -1 */
export const FinalState: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
