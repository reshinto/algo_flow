/** Storybook stories for the InputEditor component. */
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { useAppStore } from "@/store";
import InputEditor from "./InputEditor";

/**
 * InputEditor reads definition, input, and setInput from the Zustand store.
 * It dispatches to category-specific sub-editors based on definition.meta.category.
 * We set store state via decorators to render each variant.
 */

const sortingDefinition = {
  meta: {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "sorting",
    description: "A simple comparison-based sorting algorithm",
    timeComplexity: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)" },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript" as const, "python" as const, "java" as const],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  educational: {
    overview: "",
    howItWorks: "",
    timeAndSpaceComplexity: "",
    bestAndWorstCase: "",
    realWorldUses: [],
    strengthsAndLimitations: { strengths: [], limitations: [] },
    whenToUseIt: "",
  },
  execute: () => [],
  generateSteps: () => [],
  sources: { typescript: "", python: "", java: "" },
};

function WithSortingAlgorithm(Story: React.ComponentType) {
  const setState = useAppStore.setState;

  useEffect(() => {
    setState({
      definition: sortingDefinition,
      input: [64, 34, 25, 12, 22, 11, 90],
    });
    return () => {
      setState({ definition: null, input: null });
    };
  }, [setState]);

  return <Story />;
}

function WithSearchingAlgorithm(Story: React.ComponentType) {
  const setState = useAppStore.setState;

  useEffect(() => {
    setState({
      definition: {
        ...sortingDefinition,
        meta: {
          ...sortingDefinition.meta,
          id: "binary-search",
          name: "Binary Search",
          category: "searching",
        },
      },
      input: { sortedArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], targetValue: 23 },
    });
    return () => {
      setState({ definition: null, input: null });
    };
  }, [setState]);

  return <Story />;
}

function WithNoAlgorithm(Story: React.ComponentType) {
  const setState = useAppStore.setState;

  useEffect(() => {
    setState({ definition: null, input: null });
  }, [setState]);

  return <Story />;
}

const meta: Meta<typeof InputEditor> = {
  title: "Input Editor/InputEditor",
  component: InputEditor,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InputEditor>;

/** Sorting category — renders ArrayInputEditor. */
export const SortingInput: Story = {
  decorators: [WithSortingAlgorithm],
};

/** Searching category — renders search-specific inputs (array + target). */
export const SearchingInput: Story = {
  decorators: [WithSearchingAlgorithm],
};

/** No algorithm selected — renders nothing. */
export const NoAlgorithm: Story = {
  decorators: [WithNoAlgorithm],
};
