/**
 * Storybook stories for the Sort Characters by Frequency algorithm pipeline.
 * Uses the real step generator with the default input "tree",
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateSortCharactersByFrequencySteps } from "./step-generator";
import HashMapVisualizer from "@/components/visualization/HashMapVisualizer";

const steps = generateSortCharactersByFrequencySteps({ text: "tree" });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Sort Characters by Frequency",
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

/** Initial state — empty frequency map, about to scan input characters */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — frequency map partially built while scanning characters */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Complete — all characters sorted by frequency, result string assembled */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
