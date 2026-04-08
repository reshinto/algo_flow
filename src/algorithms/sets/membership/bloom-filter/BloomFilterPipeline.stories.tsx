/**
 * Storybook stories for the Bloom Filter algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states across the insert and query phases.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generateBloomFilterSteps } from "./step-generator";
import SetVisualizer from "@/components/visualization/sets/SetVisualizer";

const steps = generateBloomFilterSteps({
  elements: [3, 7, 11, 15],
  queries: [3, 5, 7, 9, 11],
  size: 16,
  hashCount: 3,
});

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/Bloom Filter",
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

/** Initial state — empty bit array, phase: building */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Insert phase — bit array partially populated after hashing first few elements */
export const InsertingElements: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.3)]!.visualState as SetVisualState,
  },
};

/** Query phase — checking membership for a query value */
export const QueryingMembership: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.65)]!.visualState as SetVisualState,
  },
};

/** Final state — all inserts and queries complete */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
