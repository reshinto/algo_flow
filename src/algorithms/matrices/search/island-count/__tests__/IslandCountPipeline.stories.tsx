/**
 * Storybook stories for the Island Count algorithm pipeline.
 * Uses the real step generator with the default 4×5 grid,
 * rendering the MatrixVisualizer at key DFS flood-fill states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { MatrixVisualState } from "@/types";
import { generateIslandCountSteps } from "../step-generator";
import MatrixVisualizer from "@/components/visualization/matrices/MatrixVisualizer";

const steps = generateIslandCountSteps({
  grid: [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1],
  ],
});

const meta: Meta<typeof MatrixVisualizer> = {
  title: "Algorithm Pipelines/Island Count",
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

/** Initial state — grid loaded, scan not yet started */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as MatrixVisualState,
  },
};

/** First island discovered — DFS flood fill in progress */
export const FirstIsland: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.25)]!.visualState as MatrixVisualState,
  },
};

/** Second island found — scanning continues */
export const SecondIsland: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.65)]!.visualState as MatrixVisualState,
  },
};

/** Final state — all islands discovered and marked */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as MatrixVisualState,
  },
};
