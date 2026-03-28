/**
 * Storybook stories for the XOR Range Query algorithm pipeline.
 * Uses the real step generator with default inputs, rendering the ArrayVisualizer
 * at key phases showing both the prefix XOR array and query resolution.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateXorRangeQuerySteps } from "@/algorithms/arrays/xor-range-query/step-generator";
import ArrayVisualizer from "@/components/visualization/ArrayVisualizer";

const steps = generateXorRangeQuerySteps({
  inputArray: [3, 5, 2, 7, 1, 4],
  queries: [
    [0, 2],
    [1, 4],
    [2, 5],
  ],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/XOR Range Query",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — input array before prefix XOR build */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Build phase — prefix XOR array partially populated */
export const BuildPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 3)]!.visualState as ArrayVisualState,
  },
};

/** Query phase — range highlighted for XOR lookup */
export const QueryPhase: Story = {
  args: {
    visualState: steps[Math.floor((steps.length * 2) / 3)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all queries answered, prefix XOR array complete */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
