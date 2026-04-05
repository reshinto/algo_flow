/**
 * Storybook stories for the Rabin-Karp Search algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the StringVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StringVisualState } from "@/types";
import { generateRabinKarpSearchSteps } from "./step-generator";
import StringVisualizer from "@/components/visualization/StringVisualizer";

const steps = generateRabinKarpSearchSteps({
  text: "GEEKS FOR GEEKS",
  pattern: "GEEK",
});

const meta: Meta<typeof StringVisualizer> = {
  title: "Algorithm Pipelines/Rabin-Karp Search",
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

/** Initial state — hashes not yet computed, pattern aligned at offset 0 */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as StringVisualState,
  },
};

/** Hash computation phase — rolling hash values being built for pattern and first window */
export const HashComputation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as StringVisualState,
  },
};

/** Search phase — window sliding across text, hashes being compared */
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
