/**
 * Storybook stories for the Set Cover algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generateSetCoverSteps } from "../step-generator";
import SetVisualizer from "@/components/visualization/sets/SetVisualizer";

const steps = generateSetCoverSteps({
  universe: [1, 2, 3, 4, 5, 6, 7, 8],
  sets: [
    [1, 2, 3],
    [2, 4],
    [3, 4, 5],
    [5, 6, 7],
    [6, 7, 8],
  ],
});

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/Set Cover",
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

/** Initial state — all universe elements uncovered, no sets selected */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Evaluating sets — first round of set evaluation in progress */
export const EvaluatingSets: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as SetVisualState,
  },
};

/** Mid-progress — some sets selected, universe partially covered */
export const PartialCoverage: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.6)]!.visualState as SetVisualState,
  },
};

/** Final state — all universe elements covered, greedy selection complete */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
