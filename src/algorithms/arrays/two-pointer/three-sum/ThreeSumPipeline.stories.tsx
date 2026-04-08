/**
 * Storybook stories for the Three Sum algorithm pipeline.
 * Uses the real step generator with the default six-element input,
 * rendering the ArrayVisualizer at key anchor/two-pointer states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateThreeSumSteps } from "./step-generator";
import ArrayVisualizer from "@/components/visualization/arrays/ArrayVisualizer";

const steps = generateThreeSumSteps({
  inputArray: [-1, 0, 1, 2, -1, -4],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Three Sum",
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

/** Initial state — sorted array before any anchor is fixed */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-execution — two-pointer searching from a fixed anchor */
export const TwoPointerSearch: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all unique triplets discovered */
export const TripletsFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
