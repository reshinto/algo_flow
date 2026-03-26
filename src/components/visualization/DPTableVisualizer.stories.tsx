import type { Meta, StoryObj } from "@storybook/react";
import type { DPTableVisualState } from "@/types";
import DPTableVisualizer from "./DPTableVisualizer";

const meta: Meta<typeof DPTableVisualizer> = {
  title: "Visualization/DPTableVisualizer",
  component: DPTableVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 300, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DPTableVisualizer>;

export const Initial: Story = {
  args: {
    visualState: {
      kind: "dp-table",
      table: Array.from({ length: 9 }, (_, cellIndex) => ({
        index: cellIndex,
        value: null,
        state: "default" as const,
        label: `F(${cellIndex})`,
      })),
      currentIndex: 0,
      callStack: [],
    } satisfies DPTableVisualState,
  },
};

export const MidComputation: Story = {
  args: {
    visualState: {
      kind: "dp-table",
      table: [
        { index: 0, value: 0, state: "computed" as const, label: "F(0)" },
        { index: 1, value: 1, state: "computed" as const, label: "F(1)" },
        { index: 2, value: 1, state: "computed" as const, label: "F(2)" },
        { index: 3, value: 2, state: "computed" as const, label: "F(3)" },
        { index: 4, value: 3, state: "computing" as const, label: "F(4)" },
        { index: 5, value: null, state: "default" as const, label: "F(5)" },
        { index: 6, value: null, state: "default" as const, label: "F(6)" },
        { index: 7, value: null, state: "default" as const, label: "F(7)" },
        { index: 8, value: null, state: "default" as const, label: "F(8)" },
      ],
      currentIndex: 4,
      callStack: [],
    } satisfies DPTableVisualState,
  },
};

export const ReadingCache: Story = {
  args: {
    visualState: {
      kind: "dp-table",
      table: [
        { index: 0, value: 0, state: "computed" as const, label: "F(0)" },
        { index: 1, value: 1, state: "computed" as const, label: "F(1)" },
        { index: 2, value: 1, state: "computed" as const, label: "F(2)" },
        { index: 3, value: 2, state: "reading-cache" as const, label: "F(3)" },
        { index: 4, value: 3, state: "computed" as const, label: "F(4)" },
        { index: 5, value: null, state: "computing" as const, label: "F(5)" },
        { index: 6, value: null, state: "default" as const, label: "F(6)" },
        { index: 7, value: null, state: "default" as const, label: "F(7)" },
        { index: 8, value: null, state: "default" as const, label: "F(8)" },
      ],
      currentIndex: 5,
      callStack: [],
    } satisfies DPTableVisualState,
  },
};

export const Complete: Story = {
  args: {
    visualState: {
      kind: "dp-table",
      table: [0, 1, 1, 2, 3, 5, 8, 13, 21].map((value, cellIndex) => ({
        index: cellIndex,
        value,
        state: "computed" as const,
        label: `F(${cellIndex})`,
      })),
      currentIndex: 8,
      callStack: [],
    } satisfies DPTableVisualState,
  },
};

export const WithCallStack: Story = {
  args: {
    visualState: {
      kind: "dp-table",
      table: [
        { index: 0, value: 0, state: "computed" as const, label: "F(0)" },
        { index: 1, value: 1, state: "computed" as const, label: "F(1)" },
        { index: 2, value: 1, state: "computed" as const, label: "F(2)" },
        { index: 3, value: null, state: "computing" as const, label: "F(3)" },
        { index: 4, value: null, state: "default" as const, label: "F(4)" },
        { index: 5, value: null, state: "default" as const, label: "F(5)" },
      ],
      currentIndex: 3,
      callStack: ["F(5)", "F(4)", "F(3)"],
    } satisfies DPTableVisualState,
  },
};
