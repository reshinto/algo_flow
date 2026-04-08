/** Storybook stories for the HeapVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { HeapVisualState, HeapNode } from "@/types";
import HeapVisualizer from "./HeapVisualizer";

const meta: Meta<typeof HeapVisualizer> = {
  title: "Visualization/HeapVisualizer",
  component: HeapVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeapVisualizer>;

/** Compute tree layout positions for a heap array of given size. */
function computeHeapPositions(count: number): Array<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = [];
  for (let nodeIndex = 0; nodeIndex < count; nodeIndex++) {
    const depth = Math.floor(Math.log2(nodeIndex + 1));
    const nodesAtDepth = Math.pow(2, depth);
    const positionInRow = nodeIndex - (nodesAtDepth - 1);
    const spacingX = 420 / (nodesAtDepth + 1);
    positions.push({
      x: spacingX * (positionInRow + 1),
      y: 30 + depth * 60,
    });
  }
  return positions;
}

function buildHeapNodes(
  values: number[],
  stateOverrides?: Partial<Record<number, HeapNode["state"]>>,
): HeapNode[] {
  const positions = computeHeapPositions(values.length);
  return values.map((value, nodeIndex) => ({
    index: nodeIndex,
    value,
    state: stateOverrides?.[nodeIndex] ?? "default",
    position: positions[nodeIndex]!,
  }));
}

export const Default: Story = {
  args: {
    visualState: {
      kind: "heap",
      nodes: buildHeapNodes([90, 64, 34, 25, 22, 12, 11]),
      activeIndex: null,
      compareIndices: null,
    } satisfies HeapVisualState,
  },
};

export const Comparing: Story = {
  args: {
    visualState: {
      kind: "heap",
      nodes: buildHeapNodes([64, 25, 34, 12, 22, 90, 11], {
        0: "current",
        1: "comparing",
        2: "comparing",
      }),
      activeIndex: 0,
      compareIndices: [1, 2],
    } satisfies HeapVisualState,
  },
};

export const Swapping: Story = {
  args: {
    visualState: {
      kind: "heap",
      nodes: buildHeapNodes([25, 64, 34, 12, 22, 90, 11], { 0: "swapping", 1: "swapping" }),
      activeIndex: 0,
      compareIndices: null,
    } satisfies HeapVisualState,
  },
};

export const FullySettled: Story = {
  args: {
    visualState: {
      kind: "heap",
      nodes: buildHeapNodes([90, 64, 34, 25, 22, 12, 11], {
        0: "settled",
        1: "settled",
        2: "settled",
        3: "settled",
        4: "settled",
        5: "settled",
        6: "settled",
      }),
      activeIndex: null,
      compareIndices: null,
    } satisfies HeapVisualState,
  },
};
