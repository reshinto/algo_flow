/**
 * Set generation tracker — builds execution steps for set generation algorithms:
 * power-set, cartesian-product, k-combinations, set-permutations.
 */
import type { SetElement, SetElementState, SetPhase, SetVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class SetGenerationTracker extends BaseTracker {
  private elements: SetElement[];
  private generatedSets: number[][] = [];
  private currentSubset: number[] = [];
  private generationDepth: number = 0;
  private totalExpected: number = 0;
  private currentElement: number | null = null;
  private phase: SetPhase = "generating";

  constructor(elements: number[], lineMap: LineMap) {
    super(lineMap);
    this.elements = elements.map((value) => ({ value, state: "default" as SetElementState }));
  }

  private snapshot(): SetVisualState {
    return {
      kind: "set",
      setA: this.elements.map((element) => ({ ...element })),
      setB: [],
      hashSet: [],
      result: [],
      currentElement: this.currentElement,
      phase: this.phase,
      generatedSets: this.generatedSets.map((subset) => [...subset]),
      currentSubset: [...this.currentSubset],
      generationDepth: this.generationDepth,
      totalExpected: this.totalExpected,
    };
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize generation state and prepare element list",
      variables,
      visualState: this.snapshot(),
    });
  }

  startGeneration(variables: Record<string, unknown>): void {
    this.phase = "generating";
    this.pushStep({
      type: "visit",
      description: "Begin generating all subsets/combinations",
      variables,
      visualState: this.snapshot(),
    });
  }

  addToSubset(value: number, variables: Record<string, unknown>): void {
    this.currentElement = value;
    this.currentSubset.push(value);
    this.generationDepth = this.currentSubset.length;

    const element = this.elements.find((elem) => elem.value === value);
    if (element) element.state = "generated";

    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "visit",
      description: `Include ${value} in current subset (depth ${this.generationDepth})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  removeFromSubset(value: number, variables: Record<string, unknown>): void {
    this.currentElement = value;
    this.currentSubset = this.currentSubset.filter((elem) => elem !== value);
    this.generationDepth = this.currentSubset.length;

    const element = this.elements.find((elem) => elem.value === value);
    if (element) element.state = "default";

    this.pushStep({
      type: "backtrack",
      description: `Backtrack — remove ${value} from current subset`,
      variables,
      visualState: this.snapshot(),
    });
  }

  emitSubset(subset: number[], variables: Record<string, unknown>): void {
    this.generatedSets.push([...subset]);
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "generate-subset",
      description: `Emit subset: [${subset.join(", ")}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  generatePair(elemA: number, elemB: number, variables: Record<string, unknown>): void {
    this.currentElement = elemA;
    this.generatedSets.push([elemA, elemB]);
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "generate-pair",
      description: `Generate cartesian pair (${elemA}, ${elemB})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  generatePermutation(permutation: number[], variables: Record<string, unknown>): void {
    this.generatedSets.push([...permutation]);
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "generate-permutation",
      description: `Emit permutation: [${permutation.join(", ")}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    this.phase = "complete";
    this.currentElement = null;
    this.pushStep({
      type: "complete",
      description: `Generation complete — ${this.generatedSets.length} result${this.generatedSets.length !== 1 ? "s" : ""} produced`,
      variables,
      visualState: this.snapshot(),
    });
  }
}
