/**
 * Storybook stories for the Pascal's Triangle Row (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute row 8 via in-place tabulation,
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generatePascalsTriangleRowSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generatePascalsTriangleRowSteps({ rowIndex: 8 });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Pascal's Triangle Row",
  component: DPTableVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DPTableVisualizer>;

/** Initial table with all cells initialized to 1 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially updated right-to-left */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully computed — row 8 = [1, 8, 28, 56, 70, 56, 28, 8, 1] */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
