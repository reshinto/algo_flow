/**
 * Storybook stories for the Four Sum II algorithm pipeline.
 * Uses the real step generator with the default input numsA=[1,2], numsB=[-2,-1],
 * numsC=[-1,2], numsD=[0,2], rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateFourSumIISteps } from "./step-generator";
import HashMapVisualizer from "@/components/visualization/hash-maps/HashMapVisualizer";

const steps = generateFourSumIISteps({
  numsA: [1, 2],
  numsB: [-2, -1],
  numsC: [-1, 2],
  numsD: [0, 2],
});

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Four Sum II",
  component: HashMapVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HashMapVisualizer>;

/** Initial state — empty hash map, about to process first A+B pair */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Phase 1 complete — A+B pair sums fully built in the map */
export const Phase1Complete: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Final state — all C+D pairs checked, tuple count computed */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
