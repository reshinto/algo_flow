/** Storybook stories for the SetVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { SetVisualState } from "@/types";
import SetVisualizer from "./SetVisualizer";

const meta: Meta<typeof SetVisualizer> = {
  title: "Visualization/SetVisualizer",
  component: SetVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SetVisualizer>;

export const Default: Story = {
  args: {
    visualState: {
      kind: "set",
      setA: [1, 2, 3, 4, 5].map((value) => ({ value, state: "default" })),
      setB: [3, 4, 5, 6, 7].map((value) => ({ value, state: "default" })),
      hashSet: [],
      result: [],
      currentElement: null,
      phase: "building",
    } satisfies SetVisualState,
  },
};

export const BuildingHashSet: Story = {
  args: {
    visualState: {
      kind: "set",
      setA: [1, 2, 3, 4, 5].map((value, elementIndex) => ({
        value,
        state: elementIndex < 3 ? "added" : elementIndex === 3 ? "current" : "default",
      })),
      setB: [3, 4, 5, 6, 7].map((value) => ({ value, state: "default" })),
      hashSet: [1, 2, 3].map((value) => ({ value, state: "added" })),
      result: [],
      currentElement: 4,
      phase: "building",
    } satisfies SetVisualState,
  },
};

export const CheckingMembership: Story = {
  args: {
    visualState: {
      kind: "set",
      setA: [1, 2, 3, 4, 5].map((value) => ({ value, state: "added" })),
      setB: [3, 4, 5, 6, 7].map((value, elementIndex) => ({
        value,
        state: elementIndex < 2 ? "found" : elementIndex === 2 ? "checking" : "default",
      })),
      hashSet: [1, 2, 3, 4, 5].map((value) => ({ value, state: "default" })),
      result: [3, 4],
      currentElement: 5,
      phase: "checking",
    } satisfies SetVisualState,
  },
};

export const Completed: Story = {
  args: {
    visualState: {
      kind: "set",
      setA: [1, 2, 3, 4, 5].map((value) => ({ value, state: "added" })),
      setB: [3, 4, 5, 6, 7].map((value) => ({
        value,
        state: [3, 4, 5].includes(value) ? "found" : ("not-found" as const),
      })),
      hashSet: [1, 2, 3, 4, 5].map((value) => ({ value, state: "default" })),
      result: [3, 4, 5],
      currentElement: null,
      phase: "checking",
    } satisfies SetVisualState,
  },
};
