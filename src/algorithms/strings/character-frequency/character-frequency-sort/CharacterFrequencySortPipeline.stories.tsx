/**
 * Storybook stories for the Character Frequency Sort algorithm pipeline.
 * Uses the real step generator with varied inputs,
 * rendering the FrequencyVisualizer at key algorithm states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { FrequencyVisualState } from "@/types";
import { generateCharacterFrequencySortSteps } from "./step-generator";
import FrequencyVisualizer from "@/components/visualization/FrequencyVisualizer";

const defaultSteps = generateCharacterFrequencySortSteps({ text: "tree" });

const longerSteps = generateCharacterFrequencySortSteps({ text: "programming" });

const tiedFrequencySteps = generateCharacterFrequencySortSteps({ text: "cccaaa" });

const meta: Meta<typeof FrequencyVisualizer> = {
  title: "Algorithm Pipelines/Character Frequency Sort",
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

/** Mid-count — frequency map partially populated from input */
export const FrequencyMapBuilding: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length * 0.4)]!
      .visualState as FrequencyVisualState,
  },
};

/** Sort phase — all frequencies counted, buckets assigned */
export const SortPhase: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length * 0.65)]!
      .visualState as FrequencyVisualState,
  },
};

/** Complete — output fully built from high-frequency to low-frequency */
export const Complete: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as FrequencyVisualState,
  },
};

/** Longer input — "programming" with multiple repeated characters */
export const LongerInput: Story = {
  args: {
    visualState: longerSteps[longerSteps.length - 1]!.visualState as FrequencyVisualState,
  },
};

/** Tied frequencies — "cccaaa" where both characters appear 3 times */
export const TiedFrequencies: Story = {
  args: {
    visualState: tiedFrequencySteps[tiedFrequencySteps.length - 1]!
      .visualState as FrequencyVisualState,
  },
};
