/**
 * Heap tracker — builds execution steps for heap algorithms.
 * Maintains a mutable array of heap nodes with visual states,
 * updating (comparing, swapping, settled) as the heapify process progresses.
 */
import type { HeapNode, HeapNodeState, HeapVisualState } from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

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
      if (
        node.state === "comparing" ||
        node.state === "swapping" ||
        node.state === "current" ||
        node.state === "inserted" ||
        node.state === "updated" ||
        node.state === "highlighted"
      ) {
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

  /** Mark the start of a sift-up pass from the given index. */
  startSiftUp(idx: number, variables: Record<string, unknown>): void {
    this.resetTransientStates();
    this.activeIndex = idx;
    this.setNodeState(idx, "current");
    this.pushStep({
      type: "sift-up",
      description: `Sift-up from index ${idx} (value ${this.nodes[idx]?.value})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Append a new node at the end of the heap array. */
  addNode(value: number, variables: Record<string, unknown>): void {
    this.resetTransientStates();
    const idx = this.nodes.length;
    this.nodes.push({
      index: idx,
      value,
      state: "inserted",
      position: heapTreePosition(idx, this.nodes.length),
    });
    this.activeIndex = idx;
    this.pushStep({
      type: "heap-insert",
      description: `Insert value ${value} at index ${idx}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Remove the last node from the heap array. */
  removeNode(variables: Record<string, unknown>): void {
    this.resetTransientStates();
    const removed = this.nodes.pop();
    if (removed) {
      this.activeIndex = null;
      this.pushStep({
        type: "heap-extract",
        description: `Remove node at index ${removed.index} (value ${removed.value})`,
        variables,
        visualState: this.snapshot(),
      });
    }
  }

  /** Mark a node as extracted (visually fading out before removal). */
  markExtracted(idx: number, variables: Record<string, unknown>): void {
    this.resetTransientStates();
    this.setNodeState(idx, "extracted");
    this.pushStep({
      type: "heap-extract",
      description: `Extract node at index ${idx} (value ${this.nodes[idx]?.value})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Update a node's value in-place (for decrease-key / increase-key). */
  updateValue(idx: number, newValue: number, variables: Record<string, unknown>): void {
    this.resetTransientStates();
    const node = this.nodes[idx];
    if (node) {
      const oldValue = node.value;
      node.value = newValue;
      node.state = "updated";
      this.pushStep({
        type: "heap-update",
        description: `Update index ${idx} from ${oldValue} to ${newValue}`,
        variables,
        visualState: this.snapshot(),
      });
    }
  }

  /** Highlight a node for emphasis (peek, found result). */
  markHighlighted(idx: number, variables: Record<string, unknown>): void {
    this.resetTransientStates();
    this.setNodeState(idx, "highlighted");
    this.pushStep({
      type: "visit",
      description: `Highlight node at index ${idx} (value ${this.nodes[idx]?.value})`,
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
      description: "Heap operation complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
