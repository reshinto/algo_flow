/**
 * Storybook stories for the String Rotation Check algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the TransformVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TransformVisualState } from "@/types";
import { generateStringRotationCheckSteps } from "./step-generator";
import TransformVisualizer from "@/components/visualization/TransformVisualizer";

const steps = generateStringRotationCheckSteps({ text: "waterbottle", pattern: "erbottlewat" });

const meta: Meta<typeof TransformVisualizer> = {
  title: "Algorithm Pipelines/String Rotation Check",
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

/** Initial state — lengths validated, no concatenation yet */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as TransformVisualState,
  },
};

/** Concatenation phase — text+text has been written to the output buffer */
export const Concatenated: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.3)]!.visualState as TransformVisualState,
  },
};

/** Search phase — scanning through the concatenated string */
export const Searching: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.65)]!.visualState as TransformVisualState,
  },
};

/** Final state — pattern found and marked as converted */
export const Found: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TransformVisualState,
  },
};
