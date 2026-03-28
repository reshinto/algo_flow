/**
 * Storybook stories for the Prefix Sum (Range Query) algorithm pipeline.
 * Renders the ArrayVisualizer at key states — initialization, build phase,
 * and query phase — demonstrating the secondary prefix array row.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generatePrefixSumSteps } from "@/algorithms/arrays/prefix-sum/step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generatePrefixSumSteps({
  inputArray: [2, 4, 1, 3, 5, 2],
  queries: [
    [1, 3],
    [0, 4],
    [2, 5],
  ],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Prefix Sum",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — input array before prefix array is built */
export const Initialized: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-build — prefix array partially filled as cumulative sums are computed */
export const BuildPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 3)]!.visualState as ArrayVisualState,
  },
};

/** Query phase — range highlighted on the primary array */
export const QueryPhase: Story = {
  args: {
    visualState: steps[Math.floor((steps.length * 2) / 3)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all queries answered */
export const QueriesComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
