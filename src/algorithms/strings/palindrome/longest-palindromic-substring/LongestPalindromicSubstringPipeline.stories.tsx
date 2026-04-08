/**
 * Storybook stories for the Longest Palindromic Substring algorithm pipeline.
 * Uses the real step generator with multiple input variants,
 * rendering the PalindromeVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { PalindromeVisualState } from "@/types";
import { generateLongestPalindromicSubstringSteps } from "./step-generator";
import PalindromeVisualizer from "@/components/visualization/strings/PalindromeVisualizer";

const defaultSteps = generateLongestPalindromicSubstringSteps({ text: "babad" });
const racecarSteps = generateLongestPalindromicSubstringSteps({ text: "racecar" });
const cbbdSteps = generateLongestPalindromicSubstringSteps({ text: "cbbd" });

const meta: Meta<typeof PalindromeVisualizer> = {
  title: "Algorithm Pipelines/Longest Palindromic Substring",
  component: PalindromeVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)", overflow: "auto" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PalindromeVisualizer>;

/** Initial state — algorithm has just initialized on "babad", no centers explored yet */
export const Initial: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as PalindromeVisualState,
  },
};

/** Mid-execution — center expansion in progress, some palindromes found */
export const MidExpansion: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length * 0.45)]!
      .visualState as PalindromeVisualState,
  },
};

/** Full palindrome input — "racecar" fully confirmed at final state */
export const FullPalindromeComplete: Story = {
  args: {
    visualState: racecarSteps[racecarSteps.length - 1]!.visualState as PalindromeVisualState,
  },
};

/** Even-length result — "cbbd" finishes with "bb" as the longest palindrome */
export const EvenLengthComplete: Story = {
  args: {
    visualState: cbbdSteps[cbbdSteps.length - 1]!.visualState as PalindromeVisualState,
  },
};
