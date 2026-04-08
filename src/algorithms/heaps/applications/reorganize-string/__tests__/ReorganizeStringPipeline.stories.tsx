/**
 * Storybook stories for the Reorganize String algorithm pipeline.
 * Uses the real step generator with text "aabbc",
 * rendering the HeapVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState } from "@/types";
import { generateReorganizeStringSteps } from "../step-generator";
import HeapVisualizer from "@/components/visualization/heaps/HeapVisualizer";

const steps = generateReorganizeStringSteps({ text: "aabbc" });

const meta: Meta<typeof HeapVisualizer> = {
  title: "Algorithm Pipelines/Reorganize String",
  component: HeapVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeapVisualizer>;

/** Initial state — max-heap built from character frequencies before any placement */
export const InitialFrequencyHeap: Story = {
  args: {
    visualState: steps[0]!.visualState as HeapVisualState,
  },
};

/** Mid-assembly — some characters placed, frequency heap partially drained */
export const AssemblyInProgress: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as HeapVisualState,
  },
};

/** Final state — all characters placed with no adjacent duplicates */
export const FinalReorganizedString: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as HeapVisualState,
  },
};
