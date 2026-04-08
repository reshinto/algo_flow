/**
 * Storybook stories for the Group Anagrams algorithm pipeline.
 * Uses the real step generator with the default input ["eat","tea","tan","ate","nat","bat"],
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateGroupAnagramsSteps } from "../step-generator";
import HashMapVisualizer from "@/components/visualization/hash-maps/HashMapVisualizer";

const steps = generateGroupAnagramsSteps({ words: ["eat", "tea", "tan", "ate", "nat", "bat"] });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Group Anagrams",
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

/** Initial state — empty hash map, first word about to be processed */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — some anagram groups formed, more words to process */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Final state — all words grouped by anagram key */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
