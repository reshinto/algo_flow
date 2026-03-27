/**
 * Linked list tracker — builds execution steps for linked list algorithms.
 * Maintains mutable copies of nodes and pointer positions, updating visual
 * states (current, swapping, processed) as the algorithm progresses.
 */
import type { LinkedListNode, LinkedListNodeState, LinkedListVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class LinkedListTracker extends BaseTracker {
  private nodes: LinkedListNode[];
  private headId: string | null;
  private pointers: Record<string, string | null> = {};

  constructor(nodes: LinkedListNode[], headId: string | null, lineMap: LineMap) {
    super(lineMap);
    this.nodes = nodes.map((node) => ({ ...node }));
    this.headId = headId;
  }

  private snapshot(): LinkedListVisualState {
    return {
      kind: "linked-list",
      nodes: this.nodes.map((node) => ({ ...node })),
      headId: this.headId,
      pointers: { ...this.pointers },
    };
  }

  private setNodeState(nodeId: string | null, state: LinkedListNodeState): void {
    if (!nodeId) return;
    const node = this.nodes.find((existingNode) => existingNode.id === nodeId);
    if (node) node.state = state;
  }

  /** Update the nextId of a node to reflect a reversed pointer. */
  private setNextId(nodeId: string, newNextId: string | null): void {
    const node = this.nodes.find((existingNode) => existingNode.id === nodeId);
    if (node) node.nextId = newNextId;
  }

  /** Update a named pointer (e.g. "prev", "current", "next"). Does not emit a step. */
  setPointer(name: string, nodeId: string | null): void {
    this.pointers[name] = nodeId;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize: prev = null, current = head",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Advance the current pointer to the next node. */
  traverseNext(nodeId: string, variables: Record<string, unknown>): void {
    this.setNodeState(nodeId, "current");
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "traverse-next",
      description: `Save next pointer, advance current to node ${nodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Reverse the next pointer of a node from its original target to prevId. */
  reversePointer(
    nodeId: string,
    newNextId: string | null,
    variables: Record<string, unknown>,
  ): void {
    this.setNodeState(nodeId, "swapping");
    this.setNextId(nodeId, newNextId);
    this.pushStep({
      type: "reverse-pointer",
      description: `Reverse pointer: node ${nodeId}.next → ${newNextId ?? "null"}`,
      variables,
      visualState: this.snapshot(),
    });
    this.setNodeState(nodeId, "processed");
  }

  complete(newHeadId: string | null, variables: Record<string, unknown>): void {
    this.headId = newHeadId;
    for (const node of this.nodes) {
      if (node.state !== "processed") node.state = "processed";
    }
    this.pointers = {};
    this.pushStep({
      type: "complete",
      description: "Linked list reversed — prev is the new head",
      variables,
      visualState: this.snapshot(),
    });
  }
}
