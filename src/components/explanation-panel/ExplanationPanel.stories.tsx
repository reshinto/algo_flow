/** Storybook stories for the ExplanationPanel component. */
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import { useAppStore } from "@/store";
import type { ExecutionStep } from "@/types";
import ExplanationPanel from "./ExplanationPanel";

/**
 * ExplanationPanel reads steps, currentStepIndex, and definition from the Zustand store.
 * Store state is set via decorators to render each visual variant.
 */

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
  sources: { typescript: "", python: "", java: "" },
};

const initializeStep: ExecutionStep = {
  index: 0,
  type: "initialize",
  description: "Initialize Bubble Sort with array [64, 34, 25, 12, 22, 11, 90]",
  highlightedLines: [],
  variables: { array: [64, 34, 25, 12, 22, 11, 90], outerIndex: 0, innerIndex: 0 },
  visualState: {
    kind: "array",
    elements: [64, 34, 25, 12, 22, 11, 90].map((value) => ({ value, state: "default" as const })),
    pointers: {},
  },
  metrics: {
    comparisons: 0,
    swaps: 0,
    visits: 0,
    cacheHits: 0,
    queueOperations: 0,
    elapsedSteps: 0,
  },
};

const compareStep: ExecutionStep = {
  index: 3,
  type: "compare",
  description: "Compare 64 > 34 at positions 0 and 1 — swap needed",
  highlightedLines: [],
  variables: { array: [64, 34, 25, 12, 22, 11, 90], outerIndex: 0, innerIndex: 0 },
  visualState: {
    kind: "array",
    elements: [64, 34, 25, 12, 22, 11, 90].map((value, elementIndex) => ({
      value,
      state: elementIndex <= 1 ? ("comparing" as const) : ("default" as const),
    })),
    pointers: { outerIndex: 0, innerIndex: 0 },
  },
  metrics: {
    comparisons: 3,
    swaps: 1,
    visits: 0,
    cacheHits: 0,
    queueOperations: 0,
    elapsedSteps: 3,
  },
};

const completeStep: ExecutionStep = {
  index: 20,
  type: "complete",
  description: "Array is fully sorted: [11, 12, 22, 25, 34, 64, 90]",
  highlightedLines: [],
  variables: { array: [11, 12, 22, 25, 34, 64, 90] },
  visualState: {
    kind: "array",
    elements: [11, 12, 22, 25, 34, 64, 90].map((value) => ({ value, state: "sorted" as const })),
    pointers: {},
  },
  metrics: {
    comparisons: 21,
    swaps: 12,
    visits: 0,
    cacheHits: 0,
    queueOperations: 0,
    elapsedSteps: 20,
  },
};

function WithInitializeStep(Story: React.ComponentType) {
  const setState = useAppStore.setState;
  useEffect(() => {
    setState({ definition: sampleDefinition, steps: [initializeStep], currentStepIndex: 0 });
    return () => {
      setState({ definition: null, steps: [], currentStepIndex: 0 });
    };
  }, [setState]);
  return <Story />;
}

function WithCompareStep(Story: React.ComponentType) {
  const setState = useAppStore.setState;
  useEffect(() => {
    setState({
      definition: sampleDefinition,
      steps: [initializeStep, compareStep],
      currentStepIndex: 1,
    });
    return () => {
      setState({ definition: null, steps: [], currentStepIndex: 0 });
    };
  }, [setState]);
  return <Story />;
}

function WithCompleteStep(Story: React.ComponentType) {
  const setState = useAppStore.setState;
  useEffect(() => {
    setState({
      definition: sampleDefinition,
      steps: [initializeStep, completeStep],
      currentStepIndex: 1,
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
    setState({ definition: null, steps: [], currentStepIndex: 0 });
  }, [setState]);
  return <Story />;
}

const meta: Meta<typeof ExplanationPanel> = {
  title: "Explanation Panel/ExplanationPanel",
  component: ExplanationPanel,
  decorators: [
    (Story) => (
      <div style={{ height: 500, width: 320, background: "var(--color-surface-panel)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ExplanationPanel>;

/** Initialization step with zeroed metrics. */
export const InitializeStep: Story = {
  decorators: [WithInitializeStep],
};

/** Mid-execution compare step with active metrics. */
export const CompareStep: Story = {
  decorators: [WithCompareStep],
};

/** Final complete step showing all accumulated metrics. */
export const CompleteStep: Story = {
  decorators: [WithCompleteStep],
};

/** No algorithm selected — shows placeholder message. */
export const NoAlgorithm: Story = {
  decorators: [WithNoAlgorithm],
};
