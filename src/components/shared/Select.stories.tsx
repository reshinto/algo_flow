import type { Meta, StoryObj } from "@storybook/react";
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
      { value: "bubble-sort", label: "Bubble Sort", group: "Sorting" },
      { value: "binary-search", label: "Binary Search", group: "Searching" },
      { value: "bfs", label: "BFS", group: "Graph" },
      { value: "dijkstra", label: "Dijkstra", group: "Pathfinding" },
      { value: "fibonacci", label: "Fibonacci", group: "Dynamic Programming" },
      { value: "sliding-window", label: "Sliding Window", group: "Array Techniques" },
    ],
  },
};
