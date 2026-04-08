/**
 * Storybook stories for the Two Sum algorithm pipeline.
 * Uses the real step generator with the default input [2, 7, 11, 15], target 9,
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateTwoSumSteps } from "./step-generator";
import HashMapVisualizer from "@/components/visualization/hash-maps/HashMapVisualizer";

const steps = generateTwoSumSteps({ numbers: [2, 7, 11, 15], target: 9 });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Two Sum",
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

/** Initial state — empty hash map, first element about to be processed */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — first element inserted into the map, looking up complement */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Final state — complement found, result pair highlighted */
export const PairFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
