/** Storybook stories for the DistanceVisualizer component. */
import type { Meta, StoryObj } from "@storybook/react";
import type { DistanceVisualState } from "@/types";
import DistanceVisualizer from "./DistanceVisualizer";

const meta: Meta<typeof DistanceVisualizer> = {
  title: "Visualization/DistanceVisualizer",
  component: DistanceVisualizer,
  decorators: [
    (Story) => (
      <div style={{ height: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DistanceVisualizer>;

function makeChars(
  text: string,
  state: "default" | "current" | "matching" | "matched" | "mismatched" = "default",
) {
  return text.split("").map((value) => ({ value, state }));
}

function makeEmptyMatrix(
  rows: number,
  cols: number,
): { value: number; state: "default" | "current" | "computed" | "path" | "computing" }[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ value: 0, state: "default" as const })),
  );
}

export const Default: Story = {
  args: {
    visualState: {
      kind: "string-distance",
      sourceChars: makeChars("kitten"),
      targetChars: makeChars("sitting"),
      matrix: makeEmptyMatrix(7, 8),
      currentRow: 0,
      currentCol: 0,
      operations: [],
      result: null,
    } satisfies DistanceVisualState,
  },
};

export const Computing: Story = {
  args: {
    visualState: {
      kind: "string-distance",
      sourceChars: makeChars("cat"),
      targetChars: makeChars("cut"),
      matrix: [
        [
          { value: 0, state: "computed" },
          { value: 1, state: "computed" },
          { value: 2, state: "computed" },
          { value: 3, state: "computed" },
        ],
        [
          { value: 1, state: "computed" },
          { value: 0, state: "computed" },
          { value: 1, state: "computed" },
          { value: 2, state: "computed" },
        ],
        [
          { value: 2, state: "computed" },
          { value: 1, state: "current" },
          { value: 0, state: "default" },
          { value: 0, state: "default" },
        ],
        [
          { value: 3, state: "default" },
          { value: 0, state: "default" },
          { value: 0, state: "default" },
          { value: 0, state: "default" },
        ],
      ],
      currentRow: 2,
      currentCol: 1,
      operations: [],
      result: null,
    } satisfies DistanceVisualState,
  },
};

export const Complete: Story = {
  args: {
    visualState: {
      kind: "string-distance",
      sourceChars: makeChars("cat"),
      targetChars: makeChars("cut"),
      matrix: [
        [
          { value: 0, state: "path" },
          { value: 1, state: "computed" },
          { value: 2, state: "computed" },
          { value: 3, state: "computed" },
        ],
        [
          { value: 1, state: "computed" },
          { value: 0, state: "path" },
          { value: 1, state: "computed" },
          { value: 2, state: "computed" },
        ],
        [
          { value: 2, state: "computed" },
          { value: 1, state: "computed" },
          { value: 1, state: "path" },
          { value: 2, state: "computed" },
        ],
        [
          { value: 3, state: "computed" },
          { value: 2, state: "computed" },
          { value: 2, state: "computed" },
          { value: 1, state: "path" },
        ],
      ],
      currentRow: 3,
      currentCol: 3,
      operations: [
        { type: "match", sourceIdx: 0, targetIdx: 0 },
        { type: "replace", sourceIdx: 1, targetIdx: 1 },
        { type: "match", sourceIdx: 2, targetIdx: 2 },
      ],
      result: 1,
    } satisfies DistanceVisualState,
  },
};
