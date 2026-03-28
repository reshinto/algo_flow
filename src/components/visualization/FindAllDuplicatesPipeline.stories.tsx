/**
 * Storybook stories for the Find All Duplicates algorithm pipeline.
 * Uses the real step generator with default inputs, rendering the ArrayVisualizer
 * at key phases showing sign-negation marking and duplicate detection.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import { generateFindAllDuplicatesSteps } from "@/algorithms/arrays/find-all-duplicates/step-generator";
import ArrayVisualizer from "./ArrayVisualizer";

const steps = generateFindAllDuplicatesSteps({
  inputArray: [4, 3, 2, 7, 8, 2, 3, 1],
});

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Algorithm Pipelines/Find All Duplicates",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

/** Initial state — original array before any sign-negation marks */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as ArrayVisualState,
  },
};

/** Mid-scan phase — several elements marked, first duplicate may be found */
export const MidScan: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as ArrayVisualState,
  },
};

/** Duplicate detected — element highlighted as found */
export const DuplicateDetected: Story = {
  args: {
    visualState: steps[Math.floor((steps.length * 3) / 4)]!.visualState as ArrayVisualState,
  },
};

/** Final state — all duplicates identified, scan complete */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as ArrayVisualState,
  },
};
