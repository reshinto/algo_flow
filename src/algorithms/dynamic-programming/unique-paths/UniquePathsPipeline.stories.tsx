/**
 * Storybook stories for the Unique Paths (Tabulation) DP algorithm pipeline.
 * Uses the real step generator with rows=3, columns=7 (default input),
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateUniquePathsSteps } from "@/algorithms/dynamic-programming/unique-paths/step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateUniquePathsSteps({ rows: 3, columns: 7 });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Unique Paths",
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

/** Initial table with all cells set to 1 (base row — only rightward moves possible) */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially updated as rows are processed */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully computed — P(6) = 28 unique paths in a 3×7 grid */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
