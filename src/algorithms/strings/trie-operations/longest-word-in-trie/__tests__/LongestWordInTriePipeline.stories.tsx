/**
 * Storybook stories for the Longest Word in Trie algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the TrieVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TrieVisualState } from "@/types";
import { generateLongestWordInTrieSteps } from "../step-generator";
import TrieVisualizer from "@/components/visualization/strings/TrieVisualizer";

const steps = generateLongestWordInTrieSteps({
  words: ["w", "wo", "wor", "worl", "world"],
});

const meta: Meta<typeof TrieVisualizer> = {
  title: "Algorithm Pipelines/Longest Word in Trie",
  component: TrieVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)", overflow: "auto" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TrieVisualizer>;

/** Initial state — empty trie with root node only */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as TrieVisualState,
  },
};

/** Insert phase — trie partially built with first few words */
export const InsertPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.3)]!.visualState as TrieVisualState,
  },
};

/** Search phase — DFS traversal following only isEnd nodes */
export const SearchPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.8)]!.visualState as TrieVisualState,
  },
};

/** Final state — longest word found, result path highlighted */
export const LongestWordFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TrieVisualState,
  },
};
