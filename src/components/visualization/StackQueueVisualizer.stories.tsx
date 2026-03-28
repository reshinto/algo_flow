/** Storybook stories for the StackQueueVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import StackQueueVisualizer from "./StackQueueVisualizer";

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Visualization/StackQueueVisualizer",
  component: StackQueueVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StackQueueVisualizer>;

const bracketInput = "({[]})";

function makeInputChars(
  stateOverrides?: Partial<
    Record<number, "default" | "current" | "processed" | "matched" | "mismatched">
  >,
) {
  return bracketInput.split("").map((char, charIndex) => ({
    value: char,
    state: stateOverrides?.[charIndex] ?? ("default" as const),
  }));
}

export const Default: Story = {
  args: {
    visualState: {
      kind: "stack-queue",
      stackElements: [],
      inputChars: makeInputChars(),
      inputIndex: 0,
      statusMessage: null,
    } satisfies StackQueueVisualState,
  },
};

export const PushingToStack: Story = {
  args: {
    visualState: {
      kind: "stack-queue",
      stackElements: [
        { value: "(", state: "default" },
        { value: "{", state: "default" },
        { value: "[", state: "pushing" },
      ],
      inputChars: makeInputChars({ 0: "processed", 1: "processed", 2: "current" }),
      inputIndex: 2,
      statusMessage: null,
    } satisfies StackQueueVisualState,
  },
};

export const PoppingFromStack: Story = {
  args: {
    visualState: {
      kind: "stack-queue",
      stackElements: [
        { value: "(", state: "default" },
        { value: "{", state: "popping" },
      ],
      inputChars: makeInputChars({ 0: "processed", 1: "processed", 2: "matched", 3: "current" }),
      inputIndex: 3,
      statusMessage: null,
    } satisfies StackQueueVisualState,
  },
};

export const MatchedBracket: Story = {
  args: {
    visualState: {
      kind: "stack-queue",
      stackElements: [
        { value: "(", state: "default" },
        { value: "{", state: "matched" },
      ],
      inputChars: makeInputChars({
        0: "processed",
        1: "processed",
        2: "matched",
        3: "matched",
        4: "current",
      }),
      inputIndex: 4,
      statusMessage: null,
    } satisfies StackQueueVisualState,
  },
};

export const ValidResult: Story = {
  args: {
    visualState: {
      kind: "stack-queue",
      stackElements: [],
      inputChars: bracketInput.split("").map((char) => ({
        value: char,
        state: "matched" as const,
      })),
      inputIndex: 5,
      statusMessage: "Valid brackets \u2713",
    } satisfies StackQueueVisualState,
  },
};

export const InvalidResult: Story = {
  args: {
    visualState: {
      kind: "stack-queue",
      stackElements: [{ value: "(", state: "mismatched" }],
      inputChars: "({[})".split("").map((char, charIndex) => ({
        value: char,
        state: charIndex === 3 ? ("mismatched" as const) : ("processed" as const),
      })),
      inputIndex: 3,
      statusMessage: "Mismatched bracket \u2717",
    } satisfies StackQueueVisualState,
  },
};
