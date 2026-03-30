/**
 * Storybook stories for the First Unique Character algorithm pipeline.
 * Uses the real step generator with the default input "leetcode",
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateFirstUniqueCharacterSteps } from "./step-generator";
import HashMapVisualizer from "@/components/visualization/HashMapVisualizer";

const steps = generateFirstUniqueCharacterSteps({ text: "leetcode" });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/First Unique Character",
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

/** Initial state — empty hash map, about to build frequency counts */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — frequency map partially built */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Complete — first unique character found and highlighted */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
