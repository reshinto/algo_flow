/**
 * Storybook stories for the Jaro-Winkler Similarity algorithm pipeline.
 * Uses the real step generator with the default input ("martha" / "marhta"),
 * rendering the DistanceVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DistanceVisualState } from "@/types";
import { generateJaroWinklerSimilaritySteps } from "./step-generator";
import DistanceVisualizer from "@/components/visualization/strings/DistanceVisualizer";

const steps = generateJaroWinklerSimilaritySteps({
  source: "martha",
  target: "marhta",
});

const meta: Meta<typeof DistanceVisualizer> = {
  title: "Algorithm Pipelines/Jaro-Winkler Similarity",
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

/** Initial state — empty match matrix before any characters are compared */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as DistanceVisualState,
  },
};

/** Base cases filled — row 0 and column 0 populated with zeros */
export const BaseCasesFilled: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.15)]!.visualState as DistanceVisualState,
  },
};

/** Mid matching — some source characters matched against target window */
export const MidMatching: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.5)]!.visualState as DistanceVisualState,
  },
};

/** Matches highlighted — all matched pairs traced in the matrix */
export const MatchesHighlighted: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.85)]!.visualState as DistanceVisualState,
  },
};

/** Final state — similarity score 0.9611 computed and displayed */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DistanceVisualState,
  },
};
