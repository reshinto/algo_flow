/**
 * Storybook stories for the Count-Min Sketch algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generateCountMinSketchSteps } from "../step-generator";
import SetVisualizer from "@/components/visualization/sets/SetVisualizer";

const steps = generateCountMinSketchSteps({
  elements: [3, 3, 7, 7, 7, 11],
  queries: [3, 7, 11, 5],
  width: 8,
  depth: 3,
});

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/Count-Min Sketch",
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

/** Initial state — empty d×w counter matrix, phase: building */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Insert phase mid — sketch matrix partially populated */
export const InsertingElements: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.35)]!.visualState as SetVisualState,
  },
};

/** Query phase — checking membership and estimating frequencies */
export const QueryingElements: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.75)]!.visualState as SetVisualState,
  },
};

/** Final state — all queries resolved with estimated counts */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
