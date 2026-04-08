/**
 * Storybook stories for the Boyer-Moore Search algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the StringVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StringVisualState } from "@/types";
import { generateBoyerMooreSearchSteps } from "../step-generator";
import StringVisualizer from "@/components/visualization/strings/StringVisualizer";

const steps = generateBoyerMooreSearchSteps({
  text: "ABAAABCD",
  pattern: "ABC",
});

const meta: Meta<typeof StringVisualizer> = {
  title: "Algorithm Pipelines/Boyer-Moore Search",
  component: StringVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)", overflow: "auto" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StringVisualizer>;

/** Initial state — bad character table not yet built, pattern at offset 0 */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as StringVisualState,
  },
};

/** Table building — bad character table partially filled */
export const BadCharTableBuilding: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as StringVisualState,
  },
};

/** Search phase — pattern aligned partway through the text after a shift */
export const SearchPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.6)]!.visualState as StringVisualState,
  },
};

/** Final state — pattern found, matched characters highlighted */
export const PatternFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as StringVisualState,
  },
};
