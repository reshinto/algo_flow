/**
 * Storybook stories for the Jewels and Stones algorithm pipeline.
 * Uses the real step generator with default input { jewels: "aA", stones: "aAAbbbb" },
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateJewelsAndStonesSteps } from "./step-generator";
import HashMapVisualizer from "@/components/visualization/hash-maps/HashMapVisualizer";

const steps = generateJewelsAndStonesSteps({ jewels: "aA", stones: "aAAbbbb" });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Jewels And Stones",
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

/** Initial state — empty jewel set, about to insert first jewel character */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — jewel set built, scanning stones for matches */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Complete — 3 jewel-stones found out of 7 stones */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
