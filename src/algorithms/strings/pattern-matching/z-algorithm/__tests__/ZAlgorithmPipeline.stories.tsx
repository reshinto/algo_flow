/**
 * Storybook stories for the Z-Algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the StringVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StringVisualState } from "@/types";
import { generateZAlgorithmSteps } from "../step-generator";
import StringVisualizer from "@/components/visualization/strings/StringVisualizer";

const steps = generateZAlgorithmSteps({
  text: "AABXAABXCAABXAABXAY",
  pattern: "AABXAAB",
});

const meta: Meta<typeof StringVisualizer> = {
  title: "Algorithm Pipelines/Z-Algorithm",
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

/** Initial state — combined string formed, Z-array not yet computed */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as StringVisualState,
  },
};

/** Mid-execution — Z-array partially built for the text region */
export const ZArrayBuilding: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.35)]!.visualState as StringVisualState,
  },
};

/** Search phase — Z-value matching the pattern length detected */
export const MatchDetected: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.7)]!.visualState as StringVisualState,
  },
};

/** Final state — pattern found, matched characters highlighted */
export const PatternFound: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as StringVisualState,
  },
};
