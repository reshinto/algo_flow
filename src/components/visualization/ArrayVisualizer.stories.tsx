import type { Meta, StoryObj } from "@storybook/react";
import type { ArrayVisualState } from "@/types";
import ArrayVisualizer from "./ArrayVisualizer";

const meta: Meta<typeof ArrayVisualizer> = {
  title: "Visualization/ArrayVisualizer",
  component: ArrayVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArrayVisualizer>;

const defaultElements = [64, 34, 25, 12, 22, 11, 90].map((value) => ({
  value,
  state: "default" as const,
}));

export const Default: Story = {
  args: {
    visualState: {
      kind: "array",
      elements: defaultElements,
      pointers: {},
    } satisfies ArrayVisualState,
  },
};

export const Comparing: Story = {
  args: {
    visualState: {
      kind: "array",
      elements: defaultElements.map((element, elementIndex) => ({
        ...element,
        state: elementIndex === 1 || elementIndex === 2 ? "comparing" : "default",
      })),
      pointers: { outerIndex: 1, innerIndex: 2 },
    } satisfies ArrayVisualState,
  },
};

export const PartiallySorted: Story = {
  args: {
    visualState: {
      kind: "array",
      elements: [11, 12, 22, 25, 34, 64, 90].map((value, elementIndex) => ({
        value,
        state: elementIndex >= 4 ? ("sorted" as const) : ("default" as const),
      })),
      pointers: {},
    } satisfies ArrayVisualState,
  },
};

export const WithWindowRange: Story = {
  args: {
    visualState: {
      kind: "array",
      elements: [2, 1, 5, 1, 3, 2, 8, 4].map((value, elementIndex) => ({
        value,
        state:
          elementIndex >= 2 && elementIndex <= 4 ? ("in-window" as const) : ("default" as const),
      })),
      pointers: { windowStart: 2, windowEnd: 4 },
      windowRange: [2, 4],
    } satisfies ArrayVisualState,
  },
};

export const BinarySearchEliminated: Story = {
  args: {
    visualState: {
      kind: "array",
      elements: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91].map((value, elementIndex) => ({
        value,
        state:
          elementIndex < 3
            ? ("eliminated" as const)
            : elementIndex === 5
              ? ("found" as const)
              : ("default" as const),
      })),
      pointers: { low: 3, mid: 5, high: 9 },
    } satisfies ArrayVisualState,
  },
};
