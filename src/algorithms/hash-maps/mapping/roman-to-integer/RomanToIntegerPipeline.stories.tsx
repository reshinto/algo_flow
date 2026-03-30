/**
 * Storybook stories for the Roman to Integer algorithm pipeline.
 * Uses the real step generator with the default input "MCMXCIV" (1994),
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateRomanToIntegerSteps } from "./step-generator";
import HashMapVisualizer from "@/components/visualization/HashMapVisualizer";

const steps = generateRomanToIntegerSteps({ text: "MCMXCIV" });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Roman to Integer",
  component: HashMapVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HashMapVisualizer>;

/** Initial state — symbol map populated, first character about to be processed */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — several Roman symbols processed, running total accumulating */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Final state — all characters processed, result 1994 set */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
