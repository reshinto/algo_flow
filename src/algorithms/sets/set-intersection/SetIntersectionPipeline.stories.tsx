/**
 * Storybook stories for the Set Intersection algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generateSetIntersectionSteps } from "@/algorithms/sets/set-intersection/step-generator";
import SetVisualizer from "@/components/visualization/SetVisualizer";

const steps = generateSetIntersectionSteps({
  arrayA: [1, 2, 3, 4, 5, 8],
  arrayB: [2, 4, 6, 8, 10],
});

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/Set Intersection",
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

/** Initial state — empty hash set, phase: building */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Phase 1 mid — hash set partially populated from array A */
export const BuildingHashSet: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.3)]!.visualState as SetVisualState,
  },
};

/** Phase 2 — checking array B for membership */
export const CheckingMembership: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.65)]!.visualState as SetVisualState,
  },
};

/** Final state — intersection result complete */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
