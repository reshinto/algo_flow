/**
 * Storybook stories for the Spiral Order algorithm pipeline.
 * Uses the real step generator with the default 4×4 matrix,
 * rendering the MatrixVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateSpiralOrderSteps } from "../step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateSpiralOrderSteps({
  matrix: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Spiral Order",
  component: MatrixVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MatrixVisualizer>;

/** Initial state — all cells default, boundaries set */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** Mid-traversal — outer ring partially collected */
export const OuterRingPartial: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as MatrixVisualState,
  },
};

/** Inner rings — boundaries shrunk, collecting inner elements */
export const InnerRings: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.65)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all elements collected in spiral order */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
