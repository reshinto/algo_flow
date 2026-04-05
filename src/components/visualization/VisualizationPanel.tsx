/** Dispatches the current step's visual state to the correct visualizer component. */
import { useAppStore } from "@/store";
import type { VisualState } from "@/types";
import InputEditor from "@/components/input-editor/InputEditor";

import ArrayVisualizer from "./ArrayVisualizer";
import GraphVisualizer from "./GraphVisualizer";
import GridVisualizer from "./GridVisualizer";
import DPTableVisualizer from "./DPTableVisualizer";
import TreeVisualizer from "./TreeVisualizer";
import LinkedListVisualizer from "./LinkedListVisualizer";
import HeapVisualizer from "./HeapVisualizer";
import StackQueueVisualizer from "./StackQueueVisualizer";
import HashMapVisualizer from "./HashMapVisualizer";
import StringVisualizer from "./StringVisualizer";
import PalindromeVisualizer from "./PalindromeVisualizer";
import FrequencyVisualizer from "./FrequencyVisualizer";
import TransformVisualizer from "./TransformVisualizer";
import TrieVisualizer from "./TrieVisualizer";
import DistanceVisualizer from "./DistanceVisualizer";
import MatrixVisualizer from "./MatrixVisualizer";
import SetVisualizer from "./SetVisualizer";

function renderVisualizer(visualState: VisualState) {
  switch (visualState.kind) {
    case "array":
      return <ArrayVisualizer visualState={visualState} />;
    case "graph":
      return <GraphVisualizer visualState={visualState} />;
    case "grid":
      return <GridVisualizer visualState={visualState} />;
    case "dp-table":
      return <DPTableVisualizer visualState={visualState} />;
    case "tree":
      return <TreeVisualizer visualState={visualState} />;
    case "linked-list":
      return <LinkedListVisualizer visualState={visualState} />;
    case "heap":
      return <HeapVisualizer visualState={visualState} />;
    case "stack-queue":
      return <StackQueueVisualizer visualState={visualState} />;
    case "hash-map":
      return <HashMapVisualizer visualState={visualState} />;
    case "string":
      return <StringVisualizer visualState={visualState} />;
    case "string-palindrome":
      return <PalindromeVisualizer visualState={visualState} />;
    case "string-frequency":
      return <FrequencyVisualizer visualState={visualState} />;
    case "string-transform":
      return <TransformVisualizer visualState={visualState} />;
    case "string-trie":
      return <TrieVisualizer visualState={visualState} />;
    case "string-distance":
      return <DistanceVisualizer visualState={visualState} />;
    case "matrix":
      return <MatrixVisualizer visualState={visualState} />;
    case "set":
      return <SetVisualizer visualState={visualState} />;
  }
}

export default function VisualizationPanel() {
  const steps = useAppStore((state) => state.steps);
  const currentStepIndex = useAppStore((state) => state.currentStepIndex);
  const definition = useAppStore((state) => state.definition);

  const currentStep = steps[currentStepIndex];

  if (!definition || !currentStep) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-[var(--color-text-muted)]">
          Select an algorithm to begin visualization
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <InputEditor />
      <div className="min-h-0 flex-1">{renderVisualizer(currentStep.visualState)}</div>
    </div>
  );
}
