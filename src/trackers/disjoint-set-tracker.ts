/**
 * Disjoint set tracker — builds execution steps for union-find algorithms.
 */
import type { SetElement, SetElementState, SetPhase, SetVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class DisjointSetTracker extends BaseTracker {
  private elements: SetElement[];
  private parentArray: SetElement[];
  private rankArray: number[];
  private treeEdges: [number, number][] = [];
  private components: number[][];
  private currentElement: number | null = null;
  private phase: SetPhase = "building";

  constructor(elementCount: number, lineMap: LineMap) {
    super(lineMap);
    this.elements = Array.from({ length: elementCount }, (_, elementIndex) => ({
      value: elementIndex,
      state: "default" as SetElementState,
    }));
    this.parentArray = Array.from({ length: elementCount }, (_, elementIndex) => ({
      value: elementIndex,
      state: "default" as SetElementState,
    }));
    this.rankArray = Array.from({ length: elementCount }, () => 0);
    this.components = Array.from({ length: elementCount }, (_, elementIndex) => [elementIndex]);
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
      parentArray: this.parentArray.map((element) => ({ ...element })),
      rankArray: [...this.rankArray],
      treeEdges: this.treeEdges.map((edge) => [edge[0], edge[1]]),
      components: this.components.map((component) => [...component]),
    };
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize disjoint sets — each element is its own component",
      variables,
      visualState: this.snapshot(),
    });
  }

  findRoot(element: number, path: number[], variables: Record<string, unknown>): void {
    this.currentElement = element;
    this.phase = "finding";

    for (const pathElement of path) {
      const parentEntry = this.parentArray[pathElement];
      if (parentEntry) parentEntry.state = "current";
    }

    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "find-root",
      description: `Find root of ${element} — traversal path: [${path.join(" → ")}]`,
      variables,
      visualState: this.snapshot(),
    });
  }

  pathCompress(element: number, root: number, variables: Record<string, unknown>): void {
    this.currentElement = element;
    const parentEntry = this.parentArray[element];
    if (parentEntry) {
      parentEntry.value = root;
      parentEntry.state = "compressed";
    }

    const elementEntry = this.elements[element];
    if (elementEntry) elementEntry.state = "compressed";

    this.metrics = { ...this.metrics, swaps: this.metrics.swaps + 1 };
    this.pushStep({
      type: "visit",
      description: `Path compress — point ${element} directly to root ${root}`,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "path-compress",
    });
  }

  unionSets(rootA: number, rootB: number, variables: Record<string, unknown>): void {
    this.phase = "union";
    this.currentElement = rootA;

    const rankA = this.rankArray[rootA] ?? 0;
    const rankB = this.rankArray[rootB] ?? 0;

    // Attach lower-rank root under higher-rank root
    if (rankA >= rankB) {
      const parentEntry = this.parentArray[rootB];
      if (parentEntry) {
        parentEntry.value = rootA;
        parentEntry.state = "root";
      }
      this.treeEdges.push([rootB, rootA]);
      if (rankA === rankB) {
        this.rankArray[rootA] = rankA + 1;
      }
    } else {
      const parentEntry = this.parentArray[rootA];
      if (parentEntry) {
        parentEntry.value = rootB;
        parentEntry.state = "root";
      }
      this.treeEdges.push([rootA, rootB]);
    }

    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.pushStep({
      type: "union-sets",
      description: `Union components rooted at ${rootA} and ${rootB}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  updateComponents(newComponents: number[][], variables: Record<string, unknown>): void {
    this.components = newComponents.map((component) => [...component]);
    this.pushStep({
      type: "visit",
      description: `Recalculate component groupings — ${this.components.length} component${this.components.length !== 1 ? "s" : ""}`,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "update-components",
    });
  }

  complete(variables: Record<string, unknown>): void {
    this.currentElement = null;
    this.pushStep({
      type: "complete",
      description: `Union-Find complete — ${this.components.length} disjoint component${this.components.length !== 1 ? "s" : ""}`,
      variables,
      visualState: this.snapshot(),
    });
  }
}
