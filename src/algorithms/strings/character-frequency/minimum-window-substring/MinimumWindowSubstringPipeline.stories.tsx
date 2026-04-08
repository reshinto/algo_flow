/**
 * Storybook stories for the Minimum Window Substring algorithm pipeline.
 * Uses the real step generator with varied inputs,
 * rendering the FrequencyVisualizer at key algorithm states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { FrequencyVisualState } from "@/types";
import { generateMinimumWindowSubstringSteps } from "./step-generator";
import FrequencyVisualizer from "@/components/visualization/strings/FrequencyVisualizer";

const defaultSteps = generateMinimumWindowSubstringSteps({
  text: "ADOBECODEBANC",
  pattern: "ABC",
});

const noMatchSteps = generateMinimumWindowSubstringSteps({
  text: "AAABBB",
  pattern: "XYZ",
});

const shortWindowSteps = generateMinimumWindowSubstringSteps({
  text: "a",
  pattern: "a",
});

const meta: Meta<typeof FrequencyVisualizer> = {
  title: "Algorithm Pipelines/Minimum Window Substring",
  component: FrequencyVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)", overflow: "auto" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FrequencyVisualizer>;

/** Initial state — empty frequency map, both strings shown */
export const Initial: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as FrequencyVisualState,
  },
};

/** Expanding phase — right pointer moving through ADOBECODEBANC */
export const WindowExpanding: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length * 0.35)]!
      .visualState as FrequencyVisualState,
  },
};

/** All characters satisfied — beginning to shrink window */
export const AllCharactersSatisfied: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length * 0.65)]!
      .visualState as FrequencyVisualState,
  },
};

/** Final state — minimum window BANC found */
export const MinimumWindowFound: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as FrequencyVisualState,
  },
};

/** No match — pattern characters absent from text */
export const NoMatch: Story = {
  args: {
    visualState: noMatchSteps[noMatchSteps.length - 1]!.visualState as FrequencyVisualState,
  },
};

/** Single character — text and pattern both "a" */
export const SingleCharacterMatch: Story = {
  args: {
    visualState: shortWindowSteps[shortWindowSteps.length - 1]!.visualState as FrequencyVisualState,
  },
};
