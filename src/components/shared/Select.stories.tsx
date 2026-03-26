/** Storybook stories for the Select component. */
import type { Meta, StoryObj } from "@storybook/react";
import { ALGORITHM_ID } from "@/utils/constants";
import Select from "./Select";

const meta: Meta<typeof Select> = {
  title: "Shared/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const SimpleOptions: Story = {
  args: {
    label: "Speed",
    options: [
      { value: "0.5", label: "0.5x" },
      { value: "1", label: "1x" },
      { value: "2", label: "2x" },
    ],
  },
};

export const GroupedOptions: Story = {
  args: {
    label: "Algorithm",
    options: [
      { value: ALGORITHM_ID.BUBBLE_SORT!, label: "Bubble Sort", group: "Sorting" },
      { value: ALGORITHM_ID.BINARY_SEARCH!, label: "Binary Search", group: "Searching" },
      { value: ALGORITHM_ID.BFS!, label: "BFS", group: "Graph" },
      { value: ALGORITHM_ID.DIJKSTRA!, label: "Dijkstra", group: "Pathfinding" },
      { value: ALGORITHM_ID.FIBONACCI!, label: "Fibonacci", group: "Dynamic Programming" },
      { value: ALGORITHM_ID.SLIDING_WINDOW!, label: "Sliding Window", group: "Array Techniques" },
    ],
  },
};
