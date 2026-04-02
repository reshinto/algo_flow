/**
 * Storybook stories for the Cartesian Product algorithm pipeline.
 * Uses the real step generator with the default input,
 * rendering the SetVisualizer at key states.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import { generateCartesianProductSteps } from "./step-generator";
import SetVisualizer from "@/components/visualization/SetVisualizer";

const steps = generateCartesianProductSteps({
  setA: [1, 2, 3],
  setB: [4, 5],
});

const meta: Meta<typeof SetVisualizer> = {
  title: "Algorithm Pipelines/Cartesian Product",
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

/** Initial state — empty result, inputs loaded */
export const Initial: Story = {
  args: {
    visualState: steps[0]!.visualState as SetVisualState,
  },
};

/** Generation started — first pairs being produced */
export const GenerationStarted: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.3)]!.visualState as SetVisualState,
  },
};

/** Mid-generation — pairs from multiple setA elements produced */
export const MidGeneration: Story = {
  args: {
    visualState: steps[Math.floor(steps.length * 0.65)]!.visualState as SetVisualState,
  },
};

/** Final state — all n×m pairs generated */
export const Complete: Story = {
  args: {
    visualState: steps[steps.length - 1]!.visualState as SetVisualState,
  },
};
