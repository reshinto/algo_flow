/**
 * Storybook stories for the Pascal's Triangle algorithm pipeline.
 * Uses the real step generator with numRows=5,
 * rendering the MatrixVisualizer at key construction states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generatePascalsTriangleSteps } from "./step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generatePascalsTriangleSteps({ numRows: 5 });

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Pascal's Triangle",
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

/** Initial state — empty 5×5 matrix */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** First two rows placed — [1] and [1,1] */
export const FirstTwoRows: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.2)]!.visualState as MatrixVisualState,
  },
};

/** Mid-construction — rows 1-3 complete, computing row 4 */
export const MidConstruction: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.6)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all 5 rows complete */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
