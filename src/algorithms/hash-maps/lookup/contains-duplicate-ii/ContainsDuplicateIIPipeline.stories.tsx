/**
 * Storybook stories for the Contains Duplicate II algorithm pipeline.
 * Uses the real step generator with the default input [1, 2, 3, 1], maxDistance 3,
 * rendering the HashMapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateContainsDuplicateIISteps } from "./step-generator";
import HashMapVisualizer from "@/components/visualization/hash-maps/HashMapVisualizer";

const steps = generateContainsDuplicateIISteps({ numbers: [1, 2, 3, 1], maxDistance: 3 });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Contains Duplicate II",
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

/** Initial state — empty map, first element about to be processed */
export const InitialState: Story = {
  args: {
    visualState: steps[0]!.visualState as HashMapVisualState,
  },
};

/** Mid-execution — several elements stored, checking distance constraint */
export const MidExecution: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState,
  },
};

/** Final state — qualifying duplicate pair found within distance */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HashMapVisualState,
  },
};
