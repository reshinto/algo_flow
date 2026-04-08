/** Storybook stories for the TransformVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { TransformVisualState } from "@/types";
import TransformVisualizer from "./TransformVisualizer";

const meta: Meta<typeof TransformVisualizer> = {
  title: "Visualization/TransformVisualizer",
  component: TransformVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TransformVisualizer>;

function makeChars(
  text: string,
  state: "default" | "current" | "matching" | "matched" | "mismatched" = "default",
) {
  return text.split("").map((value) => ({ value, state }));
}

export const Default: Story = {
  args: {
    visualState: {
      kind: "string-transform",
      inputChars: makeChars("aabcccccaaa"),
      outputChars: [],
      readPointer: 0,
      writePointer: 0,
      phase: "Scanning",
      auxiliaryData: null,
    } satisfies TransformVisualState,
  },
};

export const MidTransform: Story = {
  args: {
    visualState: {
      kind: "string-transform",
      inputChars: makeChars("aabcccccaaa").map((char, charIndex) => ({
        ...char,
        state: charIndex <= 4 ? "matched" : charIndex === 5 ? "current" : "default",
      })),
      outputChars: makeChars("a2b1c"),
      readPointer: 5,
      writePointer: 5,
      phase: "Compressing",
      auxiliaryData: "count: 5",
    } satisfies TransformVisualState,
  },
};

export const Complete: Story = {
  args: {
    visualState: {
      kind: "string-transform",
      inputChars: makeChars("aabcccccaaa", "matched"),
      outputChars: makeChars("a2b1c5a3", "matched"),
      readPointer: 11,
      writePointer: 8,
      phase: "Complete",
      auxiliaryData: null,
    } satisfies TransformVisualState,
  },
};
