/** Storybook stories for the AlgorithmSelectorModal component. */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AlgorithmSelectorModal from "./AlgorithmSelectorModal";

const sampleOptions = [
  { value: "bubble-sort", label: "Bubble Sort", group: "Sorting" },
  { value: "merge-sort", label: "Merge Sort", group: "Sorting" },
  { value: "quick-sort", label: "Quick Sort", group: "Sorting" },
  { value: "binary-search", label: "Binary Search", group: "Searching" },
  { value: "linear-search", label: "Linear Search", group: "Searching" },
  { value: "bfs", label: "Breadth-First Search", group: "Graph Traversal" },
  { value: "dijkstra", label: "Dijkstra's Algorithm", group: "Pathfinding" },
  { value: "fibonacci-memo", label: "Fibonacci (Memoization)", group: "Dynamic Programming" },
];

const meta: Meta<typeof AlgorithmSelectorModal> = {
  title: "Layout/AlgorithmSelectorModal",
  component: AlgorithmSelectorModal,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AlgorithmSelectorModal>;

export const Open: Story = {
  args: {
    isOpen: true,
    options: sampleOptions,
    selectedId: "bubble-sort",
    onClose: () => {},
    onSelect: () => {},
  },
};

export const NoSelection: Story = {
  args: {
    isOpen: true,
    options: sampleOptions,
    selectedId: null,
    onClose: () => {},
    onSelect: () => {},
  },
};

export const EmptyResults: Story = {
  args: {
    isOpen: true,
    options: [],
    selectedId: null,
    onClose: () => {},
    onSelect: () => {},
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    options: sampleOptions,
    selectedId: "bubble-sort",
    onClose: () => {},
    onSelect: () => {},
  },
};

/** Interactive story demonstrating open/close and selection behavior. */
export const Interactive: Story = {
  render: function InteractiveModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedId, setSelectedId] = useState<string | null>("binary-search");

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          style={{ color: "white", padding: "8px 16px", cursor: "pointer" }}
        >
          Open Modal
        </button>
        <AlgorithmSelectorModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          options={sampleOptions}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    );
  },
};
