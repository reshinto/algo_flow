/**
 * Storybook stories for the Game of Life algorithm pipeline.
 * Uses the real step generator with the default 4×3 board,
 * rendering the MatrixVisualizer at key simulation states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateGameOfLifeSteps } from "../step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateGameOfLifeSteps({
  board: [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Game of Life",
  component: MatrixVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MatrixVisualizer>;

/** Initial state — board loaded, simulation not started */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** Mid neighbor-counting — cells being scanned and encoded */
export const CountingNeighbors: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.35)]!.visualState as MatrixVisualState,
  },
};

/** Start of decoding phase — encoded values being resolved to final states */
export const DecodingPhase: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.7)]!.visualState as MatrixVisualState,
  },
};

/** Final state — one generation simulated, board updated */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
