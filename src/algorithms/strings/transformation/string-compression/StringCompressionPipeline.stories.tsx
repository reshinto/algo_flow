/**
 * Storybook stories for the String Compression algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the TransformVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TransformVisualState } from "@/types";
import { generateStringCompressionSteps } from "./step-generator";
import TransformVisualizer from "@/components/visualization/TransformVisualizer";

const steps = generateStringCompressionSteps({ text: "aabcccccaaa" });

const meta: Meta<typeof TransformVisualizer> = {
  title: "Algorithm Pipelines/String Compression",
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

/** Initial state — no characters read yet, buffers empty */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as TransformVisualState,
  },
};

/** Reading first run — pointer on first character, count starting */
export const ReadingFirstRun: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.2)]!.visualState as TransformVisualState,
  },
};

/** Mid-execution — first two runs written to output, scanning third run */
export const MidCompression: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.55)]!.visualState as TransformVisualState,
  },
};

/** Final state — all runs processed, compressed string in output buffer */
export const Compressed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TransformVisualState,
  },
};
