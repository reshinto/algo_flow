/**
 * Storybook stories for the Set Permutations algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generateSetPermutationsSteps } from "./step-generator";
import SetVisualizer from "@/components/visualization/sets/SetVisualizer";

const steps = generateSetPermutationsSteps({
  elements: [1, 2, 3],
});

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/Set Permutations",
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

/** Initial state — working array loaded, no permutations yet */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Early recursion — first element fixed, exploring remaining positions */
export const EarlyRecursion: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as SetVisualState,
  },
};

/** Mid-backtracking — several permutations emitted, backtracking in progress */
export const MidBacktracking: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.6)]!.visualState as SetVisualState,
  },
};

/** Final state — all 6 permutations of [1, 2, 3] generated */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
