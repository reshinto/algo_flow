/**
 * Storybook stories for the Wildcard Matching algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the DistanceVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DistanceVisualState } from "@/types";
import { generateWildcardMatchingSteps } from "./step-generator";
import DistanceVisualizer from "@/components/visualization/strings/DistanceVisualizer";

const steps = generateWildcardMatchingSteps({
  text: "adceb",
  pattern: "*a*b",
});

const meta: Meta<typeof DistanceVisualizer> = {
  title: "Algorithm Pipelines/Wildcard Matching",
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

/** Base cases filled — row 0 populated with wildcard star propagation */
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

/** Match path traced — optimal path highlighted from bottom-right to top-left */
export const MatchPathTraced: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.9)]!.visualState as DistanceVisualState,
  },
};

/** Final state — match result computed, result displayed as 1 (true) */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DistanceVisualState,
  },
};
