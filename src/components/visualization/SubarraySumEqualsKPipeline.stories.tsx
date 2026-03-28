/**
 * Storybook stories for the Subarray Sum Equals K algorithm pipeline.
 * Renders the ArrayVisualizer at key states — initialization, scanning
 * with no match, a discovered matching subarray, and final completion.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateSubarraySumEqualsKSteps } from "@/algorithms/arrays/subarray-sum-equals-k/step-generator";
import ArrayVisualizer from "./ArrayVisualizer";

const steps = generateSubarraySumEqualsKSteps({
  inputArray: [1, 2, 3, -1, 1, 2],
  target: 3,
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Subarray Sum Equals K",
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

/** Initial state — array before scanning begins */
export const Initialized: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-scan — running sum accumulating, secondary row showing prefix sums */
export const ScanningPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 3)]!.visualState as ArrayVisualState,
  },
};

/** Match found — element highlighted as a valid subarray endpoint */
export const MatchFound: Story = {
  args: {
    visualState: (() => {
      const matchStep = steps.find(
        (step) =>
          step.type === "compare" &&
          (step.visualState as ArrayVisualState).elements.some((el) => el.state === "found"),
      );
      return (matchStep ?? steps[Math.floor(steps.length / 2)]!).visualState as ArrayVisualState;
    })(),
  },
};

/** Final state — all subarrays counted */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
