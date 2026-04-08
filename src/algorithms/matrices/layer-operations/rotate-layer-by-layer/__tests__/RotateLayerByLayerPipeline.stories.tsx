/**
 * Storybook stories for the Rotate Layer by Layer algorithm pipeline.
 * Uses the real step generator with the default 4×4 matrix,
 * rendering the MatrixVisualizer at key rotation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateRotateLayerByLayerSteps } from "../step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateRotateLayerByLayerSteps({
  matrix: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Rotate Layer by Layer",
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

/** Initial state — all cells default, layers not yet selected */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** Outer layer selected — layer 0 ring highlighted */
export const OuterLayerSelected: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.15)]!.visualState as MatrixVisualState,
  },
};

/** Mid-rotation — outer layer partially swapped, inner layer active */
export const InnerLayerActive: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.6)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all layers rotated 90° clockwise */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
