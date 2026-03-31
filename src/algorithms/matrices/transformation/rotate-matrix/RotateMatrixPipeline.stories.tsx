/**
 * Storybook stories for the Rotate Matrix 90° algorithm pipeline.
 * Uses the real step generator with the default 3×3 matrix,
 * rendering the MatrixVisualizer at key transformation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateRotateMatrixSteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/MatrixVisualizer";

const steps = generateRotateMatrixSteps({
  matrix: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Rotate Matrix 90°",
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

/** Initial state — matrix loaded, no swaps performed yet */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** After transpose — main diagonal reflected, rows-become-columns phase complete */
export const AfterTranspose: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.45)]!.visualState as MatrixVisualState,
  },
};

/** Mid reverse-rows — first rows reversed, remainder in progress */
export const MidReverse: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.7)]!.visualState as MatrixVisualState,
  },
};

/** Final state — matrix fully rotated 90° clockwise */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
