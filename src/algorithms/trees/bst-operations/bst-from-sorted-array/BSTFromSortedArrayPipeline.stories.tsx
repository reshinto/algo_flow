import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState } from "@/types";
import { generateBstFromSortedArraySteps } from "./step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const steps = generateBstFromSortedArraySteps({ sortedArray: [1, 2, 3, 4, 5, 6, 7] });

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/BST From Sorted Array",
  component: TreeVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TreeVisualizer>;

export const InitialState: Story = {
  args: { visualState: steps[0]!.visualState as TreeVisualState },
};

export const MidOperation: Story = {
  args: { visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState },
};

export const OperationComplete: Story = {
  args: { visualState: steps[steps.length - 1]!.visualState as TreeVisualState },
};
