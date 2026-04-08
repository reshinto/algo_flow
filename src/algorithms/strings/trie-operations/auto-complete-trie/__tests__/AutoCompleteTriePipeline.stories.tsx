/**
 * Storybook stories for the Auto-Complete with Trie algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the TrieVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TrieVisualState } from "@/types";
import { generateAutoCompleteTrieSteps } from "../step-generator";
import TrieVisualizer from "@/components/visualization/strings/TrieVisualizer";

const steps = generateAutoCompleteTrieSteps({
  words: ["apple", "app", "apricot", "banana", "bat"],
  prefix: "ap",
});

const meta: Meta<typeof TrieVisualizer> = {
  title: "Algorithm Pipelines/Auto-Complete with Trie",
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

/** Insert phase — trie partially built with first word */
export const InsertPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.3)]!.visualState as TrieVisualState,
  },
};

/** Search phase — navigating to the prefix end node */
export const SearchPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.75)]!.visualState as TrieVisualState,
  },
};

/** Collect phase — DFS collecting suggestions under the prefix node */
export const CollectPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.9)]!.visualState as TrieVisualState,
  },
};

/** Final state — all matching suggestions collected */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TrieVisualState,
  },
};
