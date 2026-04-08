/** Storybook stories for the HashMapVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { HashMapVisualState } from "@/types";
import HashMapVisualizer from "./HashMapVisualizer";

const meta: Meta<typeof HashMapVisualizer> = {
  title: "Visualization/HashMapVisualizer",
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

const inputArray = [2, 7, 11, 15];

function makeInputElements(
  stateOverrides?: Partial<Record<number, "default" | "current" | "processed" | "found">>,
) {
  return inputArray.map((value, elementIndex) => ({
    value,
    index: elementIndex,
    state: stateOverrides?.[elementIndex] ?? ("default" as const),
  }));
}

export const Default: Story = {
  args: {
    visualState: {
      kind: "hash-map",
      entries: [],
      inputElements: makeInputElements(),
      inputIndex: 0,
      lookupKey: null,
      resultPair: null,
    } satisfies HashMapVisualState,
  },
};

export const Inserting: Story = {
  args: {
    visualState: {
      kind: "hash-map",
      entries: [{ key: "2", value: "0", state: "default" }],
      inputElements: makeInputElements({ 0: "processed", 1: "current" }),
      inputIndex: 1,
      lookupKey: "2",
      resultPair: null,
    } satisfies HashMapVisualState,
  },
};

export const LookingUp: Story = {
  args: {
    visualState: {
      kind: "hash-map",
      entries: [
        { key: "2", value: "0", state: "looking-up" },
        { key: "7", value: "1", state: "default" },
        { key: "11", value: "2", state: "default" },
      ],
      inputElements: makeInputElements({
        0: "processed",
        1: "processed",
        2: "processed",
        3: "current",
      }),
      inputIndex: 3,
      lookupKey: "-6",
      resultPair: null,
    } satisfies HashMapVisualState,
  },
};

export const PairFound: Story = {
  args: {
    visualState: {
      kind: "hash-map",
      entries: [
        { key: "2", value: "0", state: "found" },
        { key: "7", value: "1", state: "default" },
      ],
      inputElements: makeInputElements({ 0: "found", 1: "found", 2: "processed", 3: "processed" }),
      inputIndex: 1,
      lookupKey: null,
      resultPair: [0, 1],
    } satisfies HashMapVisualState,
  },
};
