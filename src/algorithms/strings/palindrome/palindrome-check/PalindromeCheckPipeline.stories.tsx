/**
 * Storybook stories for the Palindrome Check algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the PalindromeVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { PalindromeVisualState } from "@/types";
import { generatePalindromeCheckSteps } from "./step-generator";
import PalindromeVisualizer from "@/components/visualization/PalindromeVisualizer";

const steps = generatePalindromeCheckSteps({ text: "racecar" });

const meta: Meta<typeof PalindromeVisualizer> = {
  title: "Algorithm Pipelines/Palindrome Check",
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

/** Initial state — pointers placed at both ends of the string */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as PalindromeVisualState,
  },
};

/** Mid-execution — pointers moving inward, some pairs already matched */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.4)]!.visualState as PalindromeVisualState,
  },
};

/** Pointers converging — final pair about to be compared */
export const Converging: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.75)]!.visualState as PalindromeVisualState,
  },
};

/** Final state — all characters matched, palindrome confirmed */
export const PalindromeConfirmed: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as PalindromeVisualState,
  },
};
