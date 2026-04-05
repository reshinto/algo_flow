/**
 * Storybook stories for the Online Stock Span algorithm pipeline.
 * Uses the real step generator with [100, 80, 60, 70, 60, 75, 85], rendering the
 * StackQueueVisualizer at key traversal states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { StackQueueVisualState } from "@/types";
import { generateOnlineStockSpanSteps } from "./step-generator";
import StackQueueVisualizer from "@/components/visualization/StackQueueVisualizer";

const defaultSteps = generateOnlineStockSpanSteps({ prices: [100, 80, 60, 70, 60, 75, 85] });
const increasingSteps = generateOnlineStockSpanSteps({ prices: [10, 20, 30, 40, 50] });

const meta: Meta<typeof StackQueueVisualizer> = {
  title: "Algorithm Pipelines/Online Stock Span",
  component: StackQueueVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StackQueueVisualizer>;

/** Initial state — full price array unprocessed, empty stack */
export const InitialState: Story = {
  args: {
    visualState: defaultSteps[0]!.visualState as StackQueueVisualState,
  },
};

/** Mid-processing with some prices on the monotonic stack */
export const MidProcessing: Story = {
  args: {
    visualState: defaultSteps[Math.floor(defaultSteps.length / 2)]!
      .visualState as StackQueueVisualState,
  },
};

/** Final state — all prices processed, spans resolved */
export const AllSpansResolved: Story = {
  args: {
    visualState: defaultSteps[defaultSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};

/** Increasing prices — every new price pops all previous entries, spans grow to full length */
export const IncreasingPrices: Story = {
  args: {
    visualState: increasingSteps[increasingSteps.length - 1]!.visualState as StackQueueVisualState,
  },
};
