/**
 * Storybook stories for the Union-Find algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states across initialization, union, and completion phases.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generateUnionFindSteps } from "./step-generator";
import SetVisualizer from "@/components/visualization/sets/SetVisualizer";

const steps = generateUnionFindSteps({
  elementCount: 8,
  operations: [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [0, 2],
    [4, 6],
    [0, 4],
  ],
});

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/Union-Find",
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

/** Initial state — each element is its own disjoint set */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Mid-point — several unions applied, multiple components visible */
export const UnioningComponents: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.4)]!.visualState as SetVisualState,
  },
};

/** Late state — most elements merged into a few components */
export const NearlyMerged: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.75)]!.visualState as SetVisualState,
  },
};

/** Final state — all elements merged into one disjoint set */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
