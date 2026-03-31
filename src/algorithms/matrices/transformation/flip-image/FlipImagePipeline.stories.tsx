/**
 * Storybook stories for the Flip Image algorithm pipeline.
 * Uses the real step generator with the default 3×3 binary matrix,
 * rendering the MatrixVisualizer at key transformation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateFlipImageSteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/MatrixVisualizer";

const steps = generateFlipImageSteps({
  matrix: [
    [1, 1, 0],
    [1, 0, 1],
    [0, 0, 0],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Flip Image",
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

/** Initial state — binary matrix loaded, no operations performed */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** First row flipped — row 0 has been swapped and inverted */
export const FirstRowFlipped: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.35)]!.visualState as MatrixVisualState,
  },
};

/** Mid-transformation — rows partially processed */
export const MidTransformation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.65)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all rows flipped and inverted */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
