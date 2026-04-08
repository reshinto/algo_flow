/**
 * Storybook stories for the Aho-Corasick Search algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the TrieVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TrieVisualState } from "@/types";
import { generateAhoCorasickSearchSteps } from "./step-generator";
import TrieVisualizer from "@/components/visualization/strings/TrieVisualizer";

const steps = generateAhoCorasickSearchSteps({
  text: "ahishers",
  patterns: ["he", "she", "his", "hers"],
});

const meta: Meta<typeof TrieVisualizer> = {
  title: "Algorithm Pipelines/Aho-Corasick Search",
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

/** Insert phase — patterns partially inserted into the trie */
export const InsertPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as TrieVisualState,
  },
};

/** Failure links phase — BFS building failure and output links */
export const FailureLinksPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.5)]!.visualState as TrieVisualState,
  },
};

/** Search phase — scanning the text character by character */
export const SearchPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.8)]!.visualState as TrieVisualState,
  },
};

/** Final state — all matched patterns collected */
export const SearchComplete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TrieVisualState,
  },
};
