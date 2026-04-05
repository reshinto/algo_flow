/**
 * Storybook stories for the Longest Common Prefix algorithm pipeline.
 * Uses the real step generator with ["flower","flow","flight"],
 * rendering the TransformVisualizer at key scanning states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TransformVisualState } from "@/types";
import { generateLongestCommonPrefixSteps } from "./step-generator";
import TransformVisualizer from "@/components/visualization/TransformVisualizer";

const steps = generateLongestCommonPrefixSteps({
  words: ["flower", "flow", "flight"],
});

const meta: Meta<typeof TransformVisualizer> = {
  title: "Algorithm Pipelines/Longest Common Prefix",
  component: TransformVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TransformVisualizer>;

/** Initial state — input characters loaded, no column scanned yet */
export const Initialize: Story = {
  args: {
    visualState: steps[0]!.visualState as TransformVisualState,
  },
};

/** Mid-scan — first column comparison in progress */
export const MidScan: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TransformVisualState,
  },
};

/** Final state — common prefix "fl" written to output */
export const PrefixFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TransformVisualState,
  },
};
