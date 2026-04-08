/**
 * Storybook stories for the Find All Anagrams algorithm pipeline.
 * Uses the real step generator with the default input text "cbaebabacd", pattern "abc",
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateFindAllAnagramsSteps } from "./step-generator";
import HashMapVisualizer from "@/components/visualization/hash-maps/HashMapVisualizer";

const steps = generateFindAllAnagramsSteps({ text: "cbaebabacd", pattern: "abc" });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Find All Anagrams",
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

/** Initial state — pattern frequency map being built, window not yet started */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — window sliding over text, comparing window and pattern frequency maps */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Complete — all anagram start indices found and recorded */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
