/**
 * Storybook stories for the Trie Prefix Count algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the TrieVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TrieVisualState } from "@/types";
import { generateTriePrefixCountSteps } from "../step-generator";
import TrieVisualizer from "@/components/visualization/strings/TrieVisualizer";

const steps = generateTriePrefixCountSteps({
  words: ["apple", "app", "apricot", "ape"],
  prefix: "ap",
});

const meta: Meta<typeof TrieVisualizer> = {
  title: "Algorithm Pipelines/Trie Prefix Count",
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

/** Search phase — traversing the trie for the prefix */
export const SearchPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.8)]!.visualState as TrieVisualState,
  },
};

/** Final state — prefix found, matched path highlighted with count */
export const PrefixFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as TrieVisualState,
  },
};
