/**
 * Central visualization panel.
 *
 * Renders the algorithm-specific visualizer for the current execution step.
 * The panel itself is generic -- it reads the discriminated `VisualState.kind`
 * from the step and delegates to the matching visualizer component.
 * An InputEditor is mounted above the visualizer so users can tweak inputs
 * without leaving the visualization view.
 */
import { useAppStore } from "@/store";
import type { VisualState } from "@/types";
import InputEditor from "@/components/input-editor/InputEditor";

import ArrayVisualizer from "./ArrayVisualizer";
import GraphVisualizer from "./GraphVisualizer";
import GridVisualizer from "./GridVisualizer";
import DPTableVisualizer from "./DPTableVisualizer";

/**
 * Dispatches to the correct visualizer based on VisualState's discriminated
 * union `kind` field. Adding a new visualization category requires only a
 * new case here and a matching visualizer component.
 */
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
