/**
 * Storybook stories for the Valid Palindrome algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the PalindromeVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { PalindromeVisualState } from "@/types";
import { generateValidPalindromeSteps } from "./step-generator";
import PalindromeVisualizer from "@/components/visualization/strings/PalindromeVisualizer";

const steps = generateValidPalindromeSteps({ text: "A man, a plan, a canal: Panama" });

const meta: Meta<typeof PalindromeVisualizer> = {
  title: "Algorithm Pipelines/Valid Palindrome",
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

/** Initial state — pointers placed at both ends of the string before any skipping */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as PalindromeVisualState,
  },
};

/** Skipping — left or right pointer advancing past a non-alphanumeric character */
export const SkippingNonAlphanumeric: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.2)]!.visualState as PalindromeVisualState,
  },
};

/** Mid-execution — pointers comparing alphanumeric characters toward the center */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.5)]!.visualState as PalindromeVisualState,
  },
};

/** Final state — all alphanumeric characters matched, palindrome confirmed */
export const PalindromeConfirmed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as PalindromeVisualState,
  },
};
