/**
 * Set cover tracker — builds execution steps for greedy set cover algorithms.
 */
import type { SetElement, SetElementState, SetPhase, SetVisualState } from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class SetCoverTracker extends BaseTracker {
  private universe: SetElement[];
  private availableSets: { elements: number[]; state: SetElementState }[];
  private uncoveredElements: SetElement[];
  private chosenSets: number[][] = [];
  private currentElement: number | null = null;
  private phase: SetPhase = "selecting";

  constructor(universe: number[], sets: number[][], lineMap: LineMap) {
    super(lineMap);
    this.universe = universe.map((value) => ({ value, state: "default" as SetElementState }));
    this.availableSets = sets.map((elements) => ({
      elements: [...elements],
      state: "default" as SetElementState,
    }));
    this.uncoveredElements = universe.map((value) => ({
      value,
      state: "default" as SetElementState,
    }));
  }

  private snapshot(): SetVisualState {
    return {
      kind: "set",
      setA: [],
      setB: [],
      hashSet: [],
      result: [],
      currentElement: this.currentElement,
      phase: this.phase,
      availableSets: this.availableSets.map((candidateSet) => ({
        elements: [...candidateSet.elements],
        state: candidateSet.state,
      })),
      uncoveredElements: this.uncoveredElements.map((element) => ({ ...element })),
      chosenSets: this.chosenSets.map((chosenSet) => [...chosenSet]),
    };
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: `Initialize greedy set cover — universe has ${this.universe.length} element${this.universe.length !== 1 ? "s" : ""}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  evaluateSet(setIdx: number, coverage: number, variables: Record<string, unknown>): void {
    const candidateSet = this.availableSets[setIdx];
    if (candidateSet) candidateSet.state = "checking";

    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "visit",
      description: `Evaluate set ${setIdx} — covers ${coverage} uncovered element${coverage !== 1 ? "s" : ""}`,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "evaluate-set",
    });

    // Reset checking state after evaluation step is recorded
    if (candidateSet && candidateSet.state === "checking") {
      candidateSet.state = "default";
    }
  }

  selectSet(setIdx: number, selectedElements: number[], variables: Record<string, unknown>): void {
    const candidateSet = this.availableSets[setIdx];
    if (candidateSet) candidateSet.state = "selected";

    this.currentElement = selectedElements[0] ?? null;
    this.chosenSets.push([...selectedElements]);

    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "select-set",
      description: `Greedily select set ${setIdx} covering [${selectedElements.join(", ")}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  coverElements(elements: number[], variables: Record<string, unknown>): void {
    for (const value of elements) {
      const uncoveredEntry = this.uncoveredElements.find((element) => element.value === value);
      if (uncoveredEntry) uncoveredEntry.state = "found";
    }

    this.metrics = { ...this.metrics, visits: this.metrics.visits + elements.length };
    this.pushStep({
      type: "visit",
      description: `Mark ${elements.length} element${elements.length !== 1 ? "s" : ""} as covered: [${elements.join(", ")}]`,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "cover-elements",
    });

    // Remove newly covered elements from uncovered list
    this.uncoveredElements = this.uncoveredElements.filter((element) => element.state !== "found");
  }

  complete(variables: Record<string, unknown>): void {
    this.currentElement = null;
    this.pushStep({
      type: "complete",
      description: `Set cover complete — ${this.chosenSets.length} set${this.chosenSets.length !== 1 ? "s" : ""} selected to cover universe`,
      variables,
      visualState: this.snapshot(),
    });
  }
}
