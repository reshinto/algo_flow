/** Storybook stories for the PalindromeVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { PalindromeVisualState } from "@/types";
import PalindromeVisualizer from "./PalindromeVisualizer";

const meta: Meta<typeof PalindromeVisualizer> = {
  title: "Visualization/PalindromeVisualizer",
  component: PalindromeVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PalindromeVisualizer>;

const sampleText = "racecar";

function makeChars(
  state: "default" | "current" | "matching" | "matched" | "mismatched" = "default",
) {
  return sampleText.split("").map((value) => ({ value, state }));
}

export const Default: Story = {
  args: {
    visualState: {
      kind: "string-palindrome",
      chars: makeChars(),
      leftPointer: 0,
      rightPointer: 6,
      centerIndex: null,
      expandRadius: 0,
      isPalindrome: null,
      longestStart: 0,
      longestLength: 0,
    } satisfies PalindromeVisualState,
  },
};

export const Expanding: Story = {
  args: {
    visualState: {
      kind: "string-palindrome",
      chars: makeChars().map((char, charIndex) => ({
        ...char,
        state: charIndex >= 2 && charIndex <= 4 ? "matching" : "default",
      })),
      leftPointer: 2,
      rightPointer: 4,
      centerIndex: 3,
      expandRadius: 1,
      isPalindrome: null,
      longestStart: 0,
      longestLength: 1,
    } satisfies PalindromeVisualState,
  },
};

export const PalindromeFound: Story = {
  args: {
    visualState: {
      kind: "string-palindrome",
      chars: makeChars("matched"),
      leftPointer: 0,
      rightPointer: 6,
      centerIndex: 3,
      expandRadius: 3,
      isPalindrome: true,
      longestStart: 0,
      longestLength: 7,
    } satisfies PalindromeVisualState,
  },
};

export const NotPalindrome: Story = {
  args: {
    visualState: {
      kind: "string-palindrome",
      chars: "hello".split("").map((value, charIndex) => ({
        value,
        state: charIndex === 0 || charIndex === 4 ? "mismatched" : "default",
      })),
      leftPointer: 0,
      rightPointer: 4,
      centerIndex: null,
      expandRadius: 0,
      isPalindrome: false,
      longestStart: 0,
      longestLength: 1,
    } satisfies PalindromeVisualState,
  },
};
