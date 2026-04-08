/**
 * Storybook stories for the Reverse Words in a String algorithm pipeline.
 * Uses the real step generator with "the sky is blue" as the canonical input,
 * rendering the TransformVisualizer at the initialization, mid-reversal, and final states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TransformVisualState } from "@/types";
import { generateReverseWordsSteps } from "../step-generator";
import TransformVisualizer from "@/components/visualization/strings/TransformVisualizer";

const steps = generateReverseWordsSteps({ text: "the sky is blue" });

const meta: Meta<typeof TransformVisualizer> = {
  title: "Algorithm Pipelines/Reverse Words",
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

/** Initial state — input characters loaded, splitting phase about to begin */
export const Initialize: Story = {
  args: {
    visualState: steps[0]!.visualState as TransformVisualState,
  },
};

/** Mid-reversal — words are being swapped from the outer ends inward */
export const MidReversal: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TransformVisualState,
  },
};

/** Final state — all words reversed, output buffer contains "blue is sky the" */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TransformVisualState,
  },
};
