/**
 * Storybook stories for the String to Integer (atoi) algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the TransformVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TransformVisualState } from "@/types";
import { generateStringToIntegerSteps } from "./step-generator";
import TransformVisualizer from "@/components/visualization/strings/TransformVisualizer";

const steps = generateStringToIntegerSteps({ text: "   -42" });

const meta: Meta<typeof TransformVisualizer> = {
  title: "Algorithm Pipelines/String to Integer",
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

/** Initial state — pointer at index 0, no characters consumed */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as TransformVisualState,
  },
};

/** Skip-whitespace phase — pointer advancing past leading spaces */
export const SkippingWhitespace: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.2)]!.visualState as TransformVisualState,
  },
};

/** Read-sign phase — sign character consumed, digits about to be processed */
export const ReadingSign: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.45)]!.visualState as TransformVisualState,
  },
};

/** Read-digits phase — digits accumulated, output buffer building up */
export const ReadingDigits: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.75)]!.visualState as TransformVisualState,
  },
};

/** Final state — all digits consumed, integer result computed */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TransformVisualState,
  },
};
