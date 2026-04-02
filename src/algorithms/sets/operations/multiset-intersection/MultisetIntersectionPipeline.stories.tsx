/**
 * Storybook stories for the Multiset Intersection algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generateMultisetIntersectionSteps } from "./step-generator";
import SetVisualizer from "@/components/visualization/SetVisualizer";

const steps = generateMultisetIntersectionSteps({
  arrayA: [1, 1, 2, 3, 3, 3],
  arrayB: [1, 1, 1, 2, 2, 3],
});

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/Multiset Intersection",
  component: SetVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SetVisualizer>;

/** Initial state — empty frequency maps */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Phase 1 mid — counting frequencies in array A */
export const CountingArrayA: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as SetVisualState,
  },
};

/** Phase 2 — counting frequencies in array B */
export const CountingArrayB: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.6)]!.visualState as SetVisualState,
  },
};

/** Final state — multiset intersection result complete */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
