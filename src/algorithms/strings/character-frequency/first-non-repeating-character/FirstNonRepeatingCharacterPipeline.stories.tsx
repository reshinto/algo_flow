/**
 * Storybook stories for the First Non-Repeating Character algorithm pipeline.
 * Uses the real step generator with varied inputs,
 * rendering the FrequencyVisualizer at key algorithm states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { FrequencyVisualState } from "@/types";
import { generateFirstNonRepeatingCharacterSteps } from "./step-generator";
import FrequencyVisualizer from "@/components/visualization/strings/FrequencyVisualizer";

const defaultSteps = generateFirstNonRepeatingCharacterSteps({
  text: "leetcode",
});

const allRepeatingSteps = generateFirstNonRepeatingCharacterSteps({
  text: "aabb",
});

const midResultSteps = generateFirstNonRepeatingCharacterSteps({
  text: "loveleetcode",
});

const meta: Meta<typeof FrequencyVisualizer> = {
  title: "Algorithm Pipelines/First Non-Repeating Character",
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

/** Initial state — empty frequency map, input string shown */
export const Initial: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as FrequencyVisualState,
  },
};

/** Mid-build — frequency map partially populated from first pass */
export const FrequencyMapBuilding: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length * 0.4)]!
      .visualState as FrequencyVisualState,
  },
};

/** Scan phase — comparing frequencies to find first count-1 character */
export const ScanPhase: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length * 0.75)]!
      .visualState as FrequencyVisualState,
  },
};

/** Result found — "l" at index 0 confirmed as first non-repeating character */
export const ResultFound: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as FrequencyVisualState,
  },
};

/** No result — "aabb" has no non-repeating character, returns -1 */
export const NoResult: Story = {
  args: {
    visualState: allRepeatingSteps[allRepeatingSteps.length - 1]!
      .visualState as FrequencyVisualState,
  },
};

/** Mid-string result — "loveleetcode" returns index 2 (v) */
export const MidStringResult: Story = {
  args: {
    visualState: midResultSteps[midResultSteps.length - 1]!.visualState as FrequencyVisualState,
  },
};
