/** Storybook stories for the StringVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { StringVisualState } from "@/types";
import StringVisualizer from "./StringVisualizer";

const meta: Meta<typeof StringVisualizer> = {
  title: "Visualization/StringVisualizer",
  component: StringVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StringVisualizer>;

const textString = "ABABDABACDABABCABAB";
const patternString = "ABABCABAB";

function makeTextChars(
  state: "default" | "current" | "matching" | "matched" | "mismatched" = "default",
) {
  return textString.split("").map((char) => ({ value: char, state }));
}

function makePatternChars(
  state: "default" | "current" | "matching" | "matched" | "mismatched" = "default",
) {
  return patternString.split("").map((char) => ({ value: char, state }));
}

const emptyFailureTable = patternString.split("").map((_, charIndex) => ({
  index: charIndex,
  value: 0,
  state: "default" as const,
}));

const computedFailureTable = [0, 0, 1, 2, 0, 1, 2, 3, 4].map((value, charIndex) => ({
  index: charIndex,
  value,
  state: "computed" as const,
}));

export const Default: Story = {
  args: {
    visualState: {
      kind: "string",
      textChars: makeTextChars(),
      patternChars: makePatternChars(),
      failureTable: emptyFailureTable,
      patternOffset: 0,
      textIndex: 0,
      patternIndex: 0,
      matchFound: null,
    } satisfies StringVisualState,
  },
};

export const BuildingFailureTable: Story = {
  args: {
    visualState: {
      kind: "string",
      textChars: makeTextChars(),
      patternChars: makePatternChars().map((char, charIndex) => ({
        ...char,
        state: charIndex <= 4 ? "matching" : "default",
      })),
      failureTable: computedFailureTable.map((entry, entryIndex) => ({
        ...entry,
        state: entryIndex <= 4 ? "computed" : "computing",
      })),
      patternOffset: 0,
      textIndex: 0,
      patternIndex: 0,
      matchFound: null,
    } satisfies StringVisualState,
  },
};

export const Matching: Story = {
  args: {
    visualState: {
      kind: "string",
      textChars: makeTextChars().map((char, charIndex) => ({
        ...char,
        state: charIndex >= 10 && charIndex <= 13 ? "matching" : "default",
      })),
      patternChars: makePatternChars().map((char, charIndex) => ({
        ...char,
        state: charIndex <= 3 ? "matching" : "default",
      })),
      failureTable: computedFailureTable,
      patternOffset: 10,
      textIndex: 13,
      patternIndex: 3,
      matchFound: null,
    } satisfies StringVisualState,
  },
};

export const PatternFound: Story = {
  args: {
    visualState: {
      kind: "string",
      textChars: makeTextChars().map((char, charIndex) => ({
        ...char,
        state: charIndex >= 9 && charIndex <= 17 ? "matched" : "default",
      })),
      patternChars: makePatternChars().map((char) => ({ ...char, state: "matched" })),
      failureTable: computedFailureTable,
      patternOffset: 9,
      textIndex: 17,
      patternIndex: 8,
      matchFound: true,
    } satisfies StringVisualState,
  },
};

export const PatternNotFound: Story = {
  args: {
    visualState: {
      kind: "string",
      textChars: "ABCDEF".split("").map((char) => ({ value: char, state: "default" as const })),
      patternChars: "XYZ".split("").map((char) => ({ value: char, state: "default" as const })),
      failureTable: [0, 0, 0].map((value, charIndex) => ({
        index: charIndex,
        value,
        state: "computed" as const,
      })),
      patternOffset: 4,
      textIndex: 5,
      patternIndex: 0,
      matchFound: false,
    } satisfies StringVisualState,
  },
};
