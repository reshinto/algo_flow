/**
 * Storybook stories for the Spiral Matrix II algorithm pipeline.
 * Uses the real step generator with the default 4×4 matrix size,
 * rendering the MatrixVisualizer at key construction states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateSpiralMatrixIISteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/MatrixVisualizer";

const steps = generateSpiralMatrixIISteps({ matrixSize: 4 });

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Spiral Matrix II",
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

/** Initial state — empty 4×4 matrix, boundaries set */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** Outer ring partial — top row and part of right column filled */
export const OuterRingPartial: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as MatrixVisualState,
  },
};

/** Inner ring — outer ring complete, filling inner cells */
export const InnerRing: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.65)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all 16 cells filled in spiral order */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
