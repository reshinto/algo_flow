import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import { generateIntegerToRomanSteps } from "./step-generator";
import HashMapVisualizer from "@/components/visualization/HashMapVisualizer";

const steps = generateIntegerToRomanSteps({ number: 1994 });

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Algorithm Pipelines/Integer to Roman",
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

export const InitialState: Story = {
  args: { visualState: steps[0]!.visualState as HashMapVisualState },
};

export const MidExecution: Story = {
  args: { visualState: steps[Math.floor(steps.length / 2)]!.visualState as HashMapVisualState },
};

export const Complete: Story = {
  args: { visualState: steps[steps.length - 1]!.visualState as HashMapVisualState },
};
