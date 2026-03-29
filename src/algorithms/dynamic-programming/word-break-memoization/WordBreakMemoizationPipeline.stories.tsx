/**
 * Storybook stories for the Word Break Memoization DP algorithm pipeline.
 * Uses the real step generator to determine if "leetcode" is segmentable via top-down memoization,
 * rendering the DPTableVisualizer at key cache-hit states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import { generateWordBreakMemoizationSteps } from "@/algorithms/dynamic-programming/word-break-memoization/step-generator";
import DPTableVisualizer from "@/components/visualization/DPTableVisualizer";

const steps = generateWordBreakMemoizationSteps({ text: "leetcode", dictionary: ["leet", "code"] });

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Algorithm Pipelines/Word Break Memoization",
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

/** Initial state with empty cache and no call stack frames */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as DPTableVisualState,
  },
};

/** Mid-computation — some positions cached, call stack partially populated */
export const MidComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as DPTableVisualState,
  },
};

/** All reachable positions cached — W(0) = true for "leetcode" */
export const FullyComputed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as DPTableVisualState,
  },
};
