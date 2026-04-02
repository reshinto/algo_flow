/**
 * Storybook stories for the Cuckoo Filter algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generateCuckooFilterSteps } from "./step-generator";
import SetVisualizer from "@/components/visualization/SetVisualizer";

const steps = generateCuckooFilterSteps({
  elements: [3, 7, 11, 15],
  queries: [3, 5, 7, 9],
  bucketCount: 8,
});

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/Cuckoo Filter",
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

/** Initial state — empty buckets, before any insertions */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Mid-insert phase — some fingerprints placed in buckets */
export const Inserting: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.3)]!.visualState as SetVisualState,
  },
};

/** Query phase — checking membership for query elements */
export const Querying: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.75)]!.visualState as SetVisualState,
  },
};

/** Final state — all queries resolved */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
