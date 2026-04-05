/**
 * Storybook stories for the Hamming Distance algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the StringVisualizer at key execution states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StringVisualState } from "@/types";
import { generateHammingDistanceSteps } from "./step-generator";
import StringVisualizer from "@/components/visualization/StringVisualizer";

const steps = generateHammingDistanceSteps({
  text: "karolin",
  pattern: "kathrin",
});

const meta: Meta<typeof StringVisualizer> = {
  title: "Algorithm Pipelines/Hamming Distance",
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

/** Initial state — both strings displayed, no characters compared yet */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as StringVisualState,
  },
};

/** Mid-execution — partway through comparing character pairs */
export const MidScan: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.4)]!.visualState as StringVisualState,
  },
};

/** Late execution — most pairs compared, some mismatches recorded */
export const LateScan: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.75)]!.visualState as StringVisualState,
  },
};

/** Final state — all positions compared, distance count complete */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as StringVisualState,
  },
};
