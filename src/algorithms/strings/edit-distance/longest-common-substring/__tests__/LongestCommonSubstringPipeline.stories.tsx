/**
 * Storybook stories for the Longest Common Substring algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the DistanceVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DistanceVisualState } from "@/types";
import { generateLongestCommonSubstringSteps } from "../step-generator";
import DistanceVisualizer from "@/components/visualization/strings/DistanceVisualizer";

const steps = generateLongestCommonSubstringSteps({
  source: "ABABC",
  target: "BABCBA",
});

const meta: Meta<typeof DistanceVisualizer> = {
  title: "Algorithm Pipelines/Longest Common Substring",
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

/** Initial state — empty DP matrix before computation begins */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as DistanceVisualState,
  },
};

/** Mid computation — matrix partially filled with substring lengths */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.5)]!.visualState as DistanceVisualState,
  },
};

/** Substring path traced — diagonal path highlighting the longest common substring */
export const SubstringPathTraced: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.9)]!.visualState as DistanceVisualState,
  },
};

/** Final state — longest common substring length computed */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DistanceVisualState,
  },
};
