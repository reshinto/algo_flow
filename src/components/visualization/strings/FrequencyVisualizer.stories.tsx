/** Storybook stories for the FrequencyVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { FrequencyVisualState } from "@/types";
import FrequencyVisualizer from "./FrequencyVisualizer";

const meta: Meta<typeof FrequencyVisualizer> = {
  title: "Visualization/FrequencyVisualizer",
  component: FrequencyVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FrequencyVisualizer>;

function makeChars(
  text: string,
  state: "default" | "current" | "matching" | "matched" | "mismatched" = "default",
) {
  return text.split("").map((value) => ({ value, state }));
}

export const Default: Story = {
  args: {
    visualState: {
      kind: "string-frequency",
      primaryChars: makeChars("ADOBECODEBANC"),
      secondaryChars: makeChars("ABC"),
      frequencyMap: [
        { char: "A", count: 0, targetCount: 1, state: "default" },
        { char: "B", count: 0, targetCount: 1, state: "default" },
        { char: "C", count: 0, targetCount: 1, state: "default" },
      ],
      windowStart: 0,
      windowEnd: 0,
      matchCount: 0,
      resultIndices: [],
    } satisfies FrequencyVisualState,
  },
};

export const WindowSliding: Story = {
  args: {
    visualState: {
      kind: "string-frequency",
      primaryChars: makeChars("ADOBECODEBANC").map((char, charIndex) => ({
        ...char,
        state: charIndex >= 5 && charIndex <= 10 ? "current" : "default",
      })),
      secondaryChars: makeChars("ABC"),
      frequencyMap: [
        { char: "A", count: 1, targetCount: 1, state: "satisfied" },
        { char: "B", count: 1, targetCount: 1, state: "satisfied" },
        { char: "C", count: 0, targetCount: 1, state: "partial" },
      ],
      windowStart: 5,
      windowEnd: 10,
      matchCount: 0,
      resultIndices: [],
    } satisfies FrequencyVisualState,
  },
};

export const MatchFound: Story = {
  args: {
    visualState: {
      kind: "string-frequency",
      primaryChars: makeChars("ADOBECODEBANC").map((char, charIndex) => ({
        ...char,
        state: charIndex >= 9 && charIndex <= 12 ? "matched" : "default",
      })),
      secondaryChars: makeChars("ABC", "matched"),
      frequencyMap: [
        { char: "A", count: 1, targetCount: 1, state: "satisfied" },
        { char: "B", count: 1, targetCount: 1, state: "satisfied" },
        { char: "C", count: 1, targetCount: 1, state: "satisfied" },
      ],
      windowStart: 9,
      windowEnd: 12,
      matchCount: 1,
      resultIndices: [9],
    } satisfies FrequencyVisualState,
  },
};
