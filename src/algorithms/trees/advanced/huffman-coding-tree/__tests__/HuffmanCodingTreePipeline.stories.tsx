/**
 * Storybook pipeline stories for Huffman Coding Tree.
 */
import type { Meta, StoryObj } from "@storybook/react";
import type { TreeVisualState } from "@/types";
import { generateHuffmanCodingTreeSteps } from "../step-generator";
import TreeVisualizer from "@/components/visualization/trees/TreeVisualizer";

const steps = generateHuffmanCodingTreeSteps({
  frequencies: [
    { char: "a", freq: 5 },
    { char: "b", freq: 9 },
    { char: "c", freq: 12 },
    { char: "d", freq: 13 },
    { char: "e", freq: 16 },
    { char: "f", freq: 45 },
  ],
});

const meta: Meta<typeof TreeVisualizer> = {
  title: "Algorithm Pipelines/Huffman Coding Tree",
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

/** Initial state — leaf nodes created from frequencies */
export const InitialState: Story = {
  args: { visualState: steps[0]!.visualState as TreeVisualState },
};

/** Mid-operation — tree partially built */
export const MidOperation: Story = {
  args: {
    visualState: steps[Math.floor(steps.length / 2)]!.visualState as TreeVisualState,
  },
};

/** Operation complete — Huffman tree built and codes assigned */
export const OperationComplete: Story = {
  args: { visualState: steps[steps.length - 1]!.visualState as TreeVisualState },
};
