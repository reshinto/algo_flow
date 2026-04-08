/**
 * Storybook stories for the Power Set algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generatePowerSetSteps } from "../step-generator";
import SetVisualizer from "@/components/visualization/sets/SetVisualizer";

const steps = generatePowerSetSteps({ elements: [1, 2, 3, 4] });

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/Power Set",
  component: SetVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SetVisualizer>;

/** Initial state — empty current subset, generation not yet started */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Generating — first few subsets emitted, backtracking in progress */
export const Generating: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as SetVisualState,
  },
};

/** Mid Generation — roughly half of all subsets produced */
export const MidGeneration: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.6)]!.visualState as SetVisualState,
  },
};

/** Complete — all 2^4 = 16 subsets generated */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
