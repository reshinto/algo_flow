/** Storybook stories for the AlgorithmSelectorModal component. */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { registry } from "@/registry";
import { CATEGORY_LABELS, TECHNIQUE_LABELS } from "@/utils/constants";
import AlgorithmSelectorModal from "./AlgorithmSelectorModal";

const registryOptions = registry.getAll().map((def) => {
  const categoryLabel = CATEGORY_LABELS[def.meta.category] ?? def.meta.category;
  const techniqueLabel = def.meta.technique ? TECHNIQUE_LABELS[def.meta.technique] : undefined;
  return {
    value: def.meta.id,
    label: def.meta.name,
    group: techniqueLabel ? `${categoryLabel} › ${techniqueLabel}` : categoryLabel,
  };
});

const meta: Meta<typeof AlgorithmSelectorModal> = {
  title: "Layout/AlgorithmSelectorModal",
  component: AlgorithmSelectorModal,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AlgorithmSelectorModal>;

/** All categories shown, no filter active. */
export const Default: Story = {
  args: {
    isOpen: true,
    options: registryOptions,
    selectedId: registryOptions[0]?.value ?? null,
    onClose: () => {},
    onSelect: () => {},
  },
};

/** Category pill pre-selected via play function. */
export const WithCategoryFilter: Story = {
  args: {
    isOpen: true,
    options: registryOptions,
    selectedId: null,
    onClose: () => {},
    onSelect: () => {},
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // Click the first non-"All" category pill
    const pillGroup = canvas.getByRole("group", { name: "Filter by category" });
    const pills = within(pillGroup).getAllByRole("button");
    // pills[0] is "All", pills[1] is the first real category
    const firstCategoryPill = pills[1];
    if (firstCategoryPill) {
      await userEvent.click(firstCategoryPill);
    }
  },
};

/** Shows search filtering narrowing results. */
export const WithSearch: Story = {
  args: {
    isOpen: true,
    options: registryOptions,
    selectedId: null,
    onClose: () => {},
    onSelect: () => {},
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Search algorithms...");
    await userEvent.type(searchInput, "sort");
  },
};

/** Highlights the nested category/technique two-level hierarchy rendering. */
export const TwoLevelHierarchy: Story = {
  args: {
    isOpen: true,
    options: [
      { value: "bubble-sort", label: "Bubble Sort", group: "Sorting › Comparison" },
      { value: "merge-sort", label: "Merge Sort", group: "Sorting › Divide & Conquer" },
      { value: "quick-sort", label: "Quick Sort", group: "Sorting › Divide & Conquer" },
      { value: "binary-search", label: "Binary Search", group: "Searching › Divide & Conquer" },
      { value: "linear-search", label: "Linear Search", group: "Searching" },
      { value: "bfs", label: "Breadth-First Search", group: "Graph › Traversal" },
      { value: "dijkstra", label: "Dijkstra's Algorithm", group: "Pathfinding" },
      {
        value: "fibonacci-memo",
        label: "Fibonacci (Memoization)",
        group: "Dynamic Programming › 1D Linear",
      },
      {
        value: "fibonacci-tab",
        label: "Fibonacci (Tabulation)",
        group: "Dynamic Programming › 1D Linear",
      },
    ],
    selectedId: "merge-sort",
    onClose: () => {},
    onSelect: () => {},
  },
};

/** Search that returns zero results — shows the contextual empty state message. */
export const EmptyState: Story = {
  args: {
    isOpen: true,
    options: registryOptions,
    selectedId: null,
    onClose: () => {},
    onSelect: () => {},
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText("Search algorithms...");
    await userEvent.type(searchInput, "xyznonexistent");
  },
};

/** Interactive story demonstrating open/close, category filter, and selection behavior. */
export const Interactive: Story = {
  render: function InteractiveModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedId, setSelectedId] = useState<string | null>(registryOptions[0]?.value ?? null);

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
          options={registryOptions}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    );
  },
};
