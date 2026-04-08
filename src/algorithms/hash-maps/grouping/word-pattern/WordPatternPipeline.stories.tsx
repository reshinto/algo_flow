/**
 * Storybook stories for the Word Pattern algorithm pipeline.
 * Uses the real step generator with the default input pattern="abba", sentence="dog cat cat dog",
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateWordPatternSteps } from "./step-generator";
import HashMapVisualizer from "@/components/visualization/hash-maps/HashMapVisualizer";

const steps = generateWordPatternSteps({ pattern: "abba", sentence: "dog cat cat dog" });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Word Pattern",
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

/** Initial state — empty bidirectional maps, first character about to be processed */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — partial mappings built for first two unique characters */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Final state — all characters matched, pattern confirmed */
export const PatternMatched: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
