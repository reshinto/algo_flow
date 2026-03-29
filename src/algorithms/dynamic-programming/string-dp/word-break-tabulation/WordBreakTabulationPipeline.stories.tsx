/**
 * Storybook stories for the Word Break (Tabulation) DP algorithm pipeline.
 * Uses the real step generator to compute segmentability for "leetcode",
 * rendering the DPTableVisualizer at key computation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateWordBreakTabulationSteps } from "./step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateWordBreakTabulationSteps({ text: "leetcode", dictionary: ["leet", "code"] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Word Break Tabulation",
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

/** Initial table with base case W(0)=1 filled in — all other cells are 0 */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — table partially filled, word matching checks in progress */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** Table fully filled — W(8)=1 confirming 'leetcode' is segmentable */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
