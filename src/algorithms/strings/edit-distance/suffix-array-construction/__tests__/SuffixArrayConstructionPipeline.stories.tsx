/**
 * Storybook stories for the Suffix Array Construction algorithm pipeline.
 * Uses the real step generator with the default input ("banana"),
 * rendering the DistanceVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DistanceVisualState } from "@/types";
import { generateSuffixArrayConstructionSteps } from "../step-generator";
import DistanceVisualizer from "@/components/visualization/strings/DistanceVisualizer";

const steps = generateSuffixArrayConstructionSteps({ text: "banana" });

const meta: Meta<typeof DistanceVisualizer> = {
  title: "Algorithm Pipelines/Suffix Array Construction",
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

/** Initial state — suffix indices initialized before any sorting */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as DistanceVisualState,
  },
};

/** Suffix indices filled — all starting positions recorded in the matrix */
export const SuffixIndicesFilled: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.2)]!.visualState as DistanceVisualState,
  },
};

/** Comparisons in progress — suffix pairs being compared lexicographically */
export const ComparisonsInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.5)]!.visualState as DistanceVisualState,
  },
};

/** Sorted order traced — final suffix array path highlighted in the matrix */
export const SortedOrderTraced: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.85)]!.visualState as DistanceVisualState,
  },
};

/** Final state — suffix array [5,3,1,0,4,2] for "banana" fully constructed */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DistanceVisualState,
  },
};
