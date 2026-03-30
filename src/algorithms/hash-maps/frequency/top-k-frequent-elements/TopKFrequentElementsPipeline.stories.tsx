/**
 * Storybook stories for the Top K Frequent Elements algorithm pipeline.
 * Uses the real step generator with the default input [1, 1, 1, 2, 2, 3], topK 2,
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateTopKFrequentElementsSteps } from "./step-generator";
import HashMapVisualizer from "@/components/visualization/HashMapVisualizer";

const steps = generateTopKFrequentElementsSteps({ numbers: [1, 1, 1, 2, 2, 3], topK: 2 });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Top K Frequent Elements",
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

/** Initial state — empty frequency map, about to scan input */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — frequency map partially built, still counting elements */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Complete — top k elements highlighted and result collected */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
