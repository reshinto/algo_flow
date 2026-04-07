/** Storybook stories for the CodePanel component. */
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { useAppStore } from "@/store";
import type { ExecutionStep } from "@/types";
import CodePanel from "./CodePanel";

/**
 * CodePanel reads definition, activeLanguage, steps, and currentStepIndex from the Zustand store.
 * It renders a Monaco Editor with synchronized line highlighting.
 * Store state is set via decorators to provide source code and step data.
 */

const sampleTypeScriptSource = `function bubbleSort(array: number[]): number[] {
  const result = [...array];
  const length = result.length;

  for (let outerIndex = 0; outerIndex < length - 1; outerIndex++) {
    for (let innerIndex = 0; innerIndex < length - outerIndex - 1; innerIndex++) {
      if (result[innerIndex]! > result[innerIndex + 1]!) {
        [result[innerIndex], result[innerIndex + 1]] = [result[innerIndex + 1]!, result[innerIndex]!];
      }
    }
  }

  return result;
}`;

const samplePythonSource = `def bubble_sort(array: list[int]) -> list[int]:
    result = array.copy()
    length = len(result)

    for outer_index in range(length - 1):
        for inner_index in range(length - outer_index - 1):
            if result[inner_index] > result[inner_index + 1]:
                result[inner_index], result[inner_index + 1] = result[inner_index + 1], result[inner_index]

    return result`;

const sampleStep: ExecutionStep = {
  index: 0,
  type: "compare",
  description: "Compare elements at positions 0 and 1",
  highlightedLines: [
    { language: "typescript", lines: [6, 7] },
    { language: "python", lines: [6, 7] },
    { language: "java", lines: [7, 8] },
  ],
  variables: { outerIndex: 0, innerIndex: 0 },
  visualState: { kind: "array", elements: [], pointers: {} },
  metrics: {
    comparisons: 1,
    swaps: 0,
    visits: 0,
    cacheHits: 0,
    queueOperations: 0,
    elapsedSteps: 1,
  },
};

const sampleDefinition = {
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
  sources: {
    typescript: sampleTypeScriptSource,
    python: samplePythonSource,
    java: "// Java source placeholder",
    rust: "// rs",
    cpp: "// cpp",
    go: "// go",
  },
};

function WithCodePanelState(Story: React.ComponentType) {
  const setState = useAppStore.setState;

  useEffect(() => {
    setState({
      definition: sampleDefinition,
      activeLanguage: "typescript",
      steps: [sampleStep],
      currentStepIndex: 0,
    });
    return () => {
      setState({ definition: null, steps: [], currentStepIndex: 0 });
    };
  }, [setState]);

  return <Story />;
}

function WithNoAlgorithm(Story: React.ComponentType) {
  const setState = useAppStore.setState;

  useEffect(() => {
    setState({ definition: null });
  }, [setState]);

  return <Story />;
}

const meta: Meta<typeof CodePanel> = {
  title: "Code Panel/CodePanel",
  component: CodePanel,
  decorators: [
    (Story) => (
      <div style={{ height: 500, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CodePanel>;

/** Code panel with TypeScript source and highlighted lines. */
export const WithTypeScriptSource: Story = {
  decorators: [WithCodePanelState],
};

/** No algorithm selected — shows placeholder message. */
export const NoAlgorithm: Story = {
  decorators: [WithNoAlgorithm],
};
