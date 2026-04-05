/**
 * Storybook stories for the Reverse String algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the TransformVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TransformVisualState } from "@/types";
import { generateReverseStringSteps } from "./step-generator";
import TransformVisualizer from "@/components/visualization/TransformVisualizer";

const steps = generateReverseStringSteps({ text: "hello" });

const meta: Meta<typeof TransformVisualizer> = {
  title: "Algorithm Pipelines/Reverse String",
  component: TransformVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)", overflow: "auto" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TransformVisualizer>;

/** Initial state — both pointers at the ends, no swaps yet */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as TransformVisualState,
  },
};

/** First read — left pointer has read its character */
export const ReadingChars: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as TransformVisualState,
  },
};

/** Mid-execution — first swap complete, pointers advancing inward */
export const SwapInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.55)]!.visualState as TransformVisualState,
  },
};

/** Final state — all swaps complete, string fully reversed */
export const Reversed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TransformVisualState,
  },
};
