/**
 * Storybook stories for the Longest Repeated Substring algorithm pipeline.
 * Uses the real step generator with the default input ("banana"),
 * rendering the DistanceVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DistanceVisualState } from "@/types";
import { generateLongestRepeatedSubstringSteps } from "./step-generator";
import DistanceVisualizer from "@/components/visualization/DistanceVisualizer";

const steps = generateLongestRepeatedSubstringSteps({
  text: "banana",
});

const meta: Meta<typeof DistanceVisualizer> = {
  title: "Algorithm Pipelines/Longest Repeated Substring",
  component: DistanceVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 600, background: "var(--color-surface-panel)", overflow: "auto" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DistanceVisualizer>;

/** Initial state — empty DP matrix before any cells are filled */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as DistanceVisualState,
  },
};

/** Early computation — first cells being compared and computed */
export const EarlyComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.15)]!.visualState as DistanceVisualState,
  },
};

/** Mid computation — DP matrix partially filled during cell traversal */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.5)]!.visualState as DistanceVisualState,
  },
};

/** Path traced — longest repeated substring highlighted in the matrix */
export const PathTraced: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.9)]!.visualState as DistanceVisualState,
  },
};

/** Final state — longest repeated substring "ana" found in "banana" */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DistanceVisualState,
  },
};
