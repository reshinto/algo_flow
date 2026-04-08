/**
 * Storybook stories for the K-Combinations algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generateKCombinationsSteps } from "../step-generator";
import SetVisualizer from "@/components/visualization/sets/SetVisualizer";

const steps = generateKCombinationsSteps({ elements: [1, 2, 3, 4, 5], chooseK: 3 });

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/K-Combinations",
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

/** Initial state — empty current subset, ready to generate C(5,3) combinations */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Generating — first few 3-element combinations emitted */
export const Generating: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as SetVisualState,
  },
};

/** Mid Generation — roughly half of all C(5,3) = 10 combinations produced */
export const MidGeneration: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.6)]!.visualState as SetVisualState,
  },
};

/** Complete — all C(5,3) = 10 combinations generated */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
