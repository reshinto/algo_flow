/**
 * Heap tracker — builds execution steps for heap algorithms.
 * Maintains a mutable array of heap nodes with visual states,
 * updating (comparing, swapping, settled) as the heapify process progresses.
 */
import type { HeapNode, HeapNodeState, HeapVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

/** Pre-compute the SVG tree position for a node at the given index. */
function heapTreePosition(idx: number, _totalNodes: number): { x: number; y: number } {
  const level = Math.floor(Math.log2(idx + 1));
  const posInLevel = idx - (Math.pow(2, level) - 1);
  const nodesInLevel = Math.pow(2, level);
  return {
    x: Math.round(((posInLevel + 0.5) / nodesInLevel) * 400 + 10),
    y: 30 + level * 65,
  };
}

export class HeapTracker extends BaseTracker {
  private nodes: HeapNode[];
  private activeIndex: number | null = null;
  private compareIndices: [number, number] | null = null;

  constructor(values: number[], lineMap: LineMap) {
    super(lineMap);
    this.nodes = values.map((value, idx) => ({
      index: idx,
      value,
      state: "default" as HeapNodeState,
      position: heapTreePosition(idx, values.length),
    }));
  }

  private snapshot(): HeapVisualState {
    return {
      kind: "heap",
      nodes: this.nodes.map((node) => ({ ...node })),
      activeIndex: this.activeIndex,
      compareIndices: this.compareIndices ? [this.compareIndices[0], this.compareIndices[1]] : null,
    };
  }

  private setNodeState(idx: number, state: HeapNodeState): void {
    const node = this.nodes[idx];
    if (node) node.state = state;
  }

  /** Reset non-settled nodes back to default before the next comparison. */
  private resetTransientStates(): void {
    for (const node of this.nodes) {
      if (node.state === "comparing" || node.state === "swapping" || node.state === "current") {
        node.state = "default";
      }
    }
    this.compareIndices = null;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Copy input array and locate last non-leaf node to start heapify",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark the start of a sift-down pass from the given index. */
  startSiftDown(idx: number, variables: Record<string, unknown>): void {
    this.resetTransientStates();
    this.activeIndex = idx;
    this.setNodeState(idx, "current");
    this.pushStep({
      type: "sift-down",
      description: `Sift-down from index ${idx} (value ${this.nodes[idx]?.value})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Compare two nodes — both are highlighted as "comparing". */
  compare(idxA: number, idxB: number, variables: Record<string, unknown>): void {
    this.resetTransientStates();
    this.compareIndices = [idxA, idxB];
    this.setNodeState(idxA, "comparing");
    this.setNodeState(idxB, "comparing");
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "compare",
      description: `Compare index ${idxA} (${this.nodes[idxA]?.value}) with index ${idxB} (${this.nodes[idxB]?.value})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Swap two nodes' values and emit a heap-swap step. */
  heapSwap(idxA: number, idxB: number, variables: Record<string, unknown>): void {
    const nodeA = this.nodes[idxA];
    const nodeB = this.nodes[idxB];
    if (!nodeA || !nodeB) return;

    const valA = nodeA.value;
    const valB = nodeB.value;

    this.resetTransientStates();
    nodeA.value = valB;
    nodeB.value = valA;
    nodeA.state = "swapping";
    nodeB.state = "swapping";
    this.compareIndices = [idxA, idxB];
    this.metrics = { ...this.metrics, swaps: this.metrics.swaps + 1 };

    this.pushStep({
      type: "heap-swap",
      description: `Swap index ${idxA} (${valA}) ↔ index ${idxB} (${valB})`,
      variables,
      visualState: this.snapshot(),
    });

    // The sift continues from idxB (where the larger value moved down)
    nodeA.state = "default";
    nodeB.state = "current";
    this.activeIndex = idxB;
  }

  /** Mark a node as settled — heap property is satisfied at this position. */
  markSettled(idx: number, variables: Record<string, unknown>): void {
    this.resetTransientStates();
    this.setNodeState(idx, "settled");
    this.activeIndex = null;
    this.pushStep({
      type: "sift-down",
      description: `Heap property satisfied at index ${idx} — node settled`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    for (const node of this.nodes) {
      node.state = "settled";
    }
    this.activeIndex = null;
    this.compareIndices = null;
    this.pushStep({
      type: "complete",
      description: "Min-heap constructed — every parent is smaller than its children",
      variables,
      visualState: this.snapshot(),
    });
  }
}
