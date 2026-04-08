/**
 * Storybook stories for the Run-Length Decoding algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the TransformVisualizer at key decoding states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TransformVisualState } from "@/types";
import { generateRunLengthDecodingSteps } from "./step-generator";
import TransformVisualizer from "@/components/visualization/strings/TransformVisualizer";

const steps = generateRunLengthDecodingSteps({ text: "3a2b4c" });

const meta: Meta<typeof TransformVisualizer> = {
  title: "Algorithm Pipelines/Run-Length Decoding",
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

/** Initial state — read pointer at position 0, output buffer empty */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as TransformVisualState,
  },
};

/** Parsing digits — read pointer is accumulating digit characters for the first group */
export const ParsingDigits: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.2)]!.visualState as TransformVisualState,
  },
};

/** Mid-decode — first group fully appended, pointer advancing to the second group */
export const MidDecode: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.55)]!.visualState as TransformVisualState,
  },
};

/** Final state — all groups decoded, full output buffer visible */
export const Decoded: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TransformVisualState,
  },
};
