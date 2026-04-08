/**
 * Storybook stories for the Levenshtein Distance algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the DistanceVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DistanceVisualState } from "@/types";
import { generateLevenshteinDistanceSteps } from "./step-generator";
import DistanceVisualizer from "@/components/visualization/strings/DistanceVisualizer";

const steps = generateLevenshteinDistanceSteps({
  source: "kitten",
  target: "sitting",
});

const meta: Meta<typeof DistanceVisualizer> = {
  title: "Algorithm Pipelines/Levenshtein Distance",
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

/** Base cases filled — row 0 and column 0 populated with insertion/deletion costs */
export const BaseCasesFilled: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.15)]!.visualState as DistanceVisualState,
  },
};

/** Mid computation — DP matrix partially filled during interior cell pass */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.5)]!.visualState as DistanceVisualState,
  },
};

/** Edit path traced — optimal path highlighted from bottom-right to top-left */
export const EditPathTraced: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.9)]!.visualState as DistanceVisualState,
  },
};

/** Final state — edit distance 3 computed, result displayed */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DistanceVisualState,
  },
};
