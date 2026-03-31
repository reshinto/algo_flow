/**
 * Linked list tracker — builds execution steps for linked list algorithms.
 * Maintains mutable copies of nodes and pointer positions, updating visual
 * states (current, swapping, processed) as the algorithm progresses.
 *
 * Supports singly-linked, doubly-linked, cycle detection, two-list merge,
 * and node insertion/deletion patterns.
 */
import type { LinkedListNode, LinkedListNodeState, LinkedListVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class LinkedListTracker extends BaseTracker {
  private nodes: LinkedListNode[];
  private headId: string | null;
  private pointers: Record<string, string | null> = {};
  private secondaryHeadId: string | null = null;
  private cycleEdge: { fromId: string; toId: string } | undefined = undefined;
  private phase: string | undefined = undefined;

  constructor(nodes: LinkedListNode[], headId: string | null, lineMap: LineMap) {
    super(lineMap);
    this.nodes = nodes.map((node) => ({ ...node }));
    this.headId = headId;
  }

  /** Returns the current node list. Use to append nodes during initialization. */
  getNodes(): LinkedListNode[] {
    return this.nodes;
  }

  /** Replaces the internal node list. Use to set up multi-list scenarios. */
  setNodes(nodes: LinkedListNode[]): void {
    this.nodes = nodes;
  }

  private snapshot(): LinkedListVisualState {
    const state: LinkedListVisualState = {
      kind: "linked-list",
      nodes: this.nodes.map((node) => ({ ...node })),
      headId: this.headId,
      pointers: { ...this.pointers },
    };
    if (this.secondaryHeadId !== null) state.secondaryHeadId = this.secondaryHeadId;
    if (this.cycleEdge !== undefined) state.cycleEdge = { ...this.cycleEdge };
    if (this.phase !== undefined) state.phase = this.phase;
    return state;
  }

  private findNode(nodeId: string): LinkedListNode | undefined {
    return this.nodes.find((existingNode) => existingNode.id === nodeId);
  }

  private setNodeState(nodeId: string | null, state: LinkedListNodeState): void {
    if (!nodeId) return;
    const node = this.findNode(nodeId);
    if (node) node.state = state;
  }

  /** Update the nextId of a node. */
  private setNextId(nodeId: string, newNextId: string | null): void {
    const node = this.findNode(nodeId);
    if (node) node.nextId = newNextId;
  }

  /** Update the prevId of a node (doubly-linked). */
  private setPrevId(nodeId: string, newPrevId: string | null): void {
    const node = this.findNode(nodeId);
    if (node) node.prevId = newPrevId;
  }

  /* ----------------------------- Silent setters ----------------------------- */

  /** Update a named pointer (e.g. "prev", "current", "next"). Does not emit a step. */
  setPointer(name: string, nodeId: string | null): void {
    this.pointers[name] = nodeId;
  }

  /** Set the secondary head for two-list algorithms. Does not emit a step. */
  setSecondaryHead(headId: string | null): void {
    this.secondaryHeadId = headId;
  }

  /** Record a cycle-closing edge for visualization. Does not emit a step. */
  setCycleEdge(fromId: string, toId: string): void {
    this.cycleEdge = { fromId, toId };
  }

  /** Clear the cycle edge. Does not emit a step. */
  clearCycleEdge(): void {
    this.cycleEdge = undefined;
  }

  /** Set the current algorithm phase label. Does not emit a step. */
  setPhase(phase: string): void {
    this.phase = phase;
  }

  /* ----------------------------- Step emitters ----------------------------- */

  /** Record the initial state of the algorithm. */
  initialize(description: string, variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description,
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

  /** Advance a pointer to a node with a custom description. */
  visit(nodeId: string, description: string, variables: Record<string, unknown>): void {
    this.setNodeState(nodeId, "current");
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "traverse-next",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Compare two nodes and emit a comparison step. */
  compare(
    nodeIdA: string,
    nodeIdB: string,
    description: string,
    variables: Record<string, unknown>,
  ): void {
    this.setNodeState(nodeIdA, "current");
    this.setNodeState(nodeIdB, "highlighted");
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.pushStep({
      type: "compare",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Reverse the next pointer of a node from its original target to newNextId. */
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

  /** Delete a node from the list by updating predecessor's nextId. */
  deleteNode(
    nodeId: string,
    predecessorId: string | null,
    description: string,
    variables: Record<string, unknown>,
  ): void {
    const deletedNode = this.findNode(nodeId);
    if (!deletedNode) return;

    this.setNodeState(nodeId, "deleted");

    if (predecessorId) {
      this.setNextId(predecessorId, deletedNode.nextId);
    }

    this.pushStep({
      type: "delete-node",
      description,
      variables,
      visualState: this.snapshot(),
    });

    this.nodes = this.nodes.filter((node) => node.id !== nodeId);
  }

  /** Insert a new node after predecessorId (or at head if null). */
  insertNode(
    newNode: LinkedListNode,
    predecessorId: string | null,
    description: string,
    variables: Record<string, unknown>,
  ): void {
    const insertedNode = { ...newNode, state: "inserted" as const };

    if (predecessorId) {
      const predecessor = this.findNode(predecessorId);
      if (predecessor) {
        insertedNode.nextId = predecessor.nextId;
        predecessor.nextId = insertedNode.id;
      }
    } else {
      insertedNode.nextId = this.headId;
      this.headId = insertedNode.id;
    }

    this.nodes.push(insertedNode);

    this.pushStep({
      type: "insert-node",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Update the head pointer and emit a step. */
  updateHead(
    newHeadId: string | null,
    description: string,
    variables: Record<string, unknown>,
  ): void {
    this.headId = newHeadId;
    this.pushStep({
      type: "update-head",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark nodes as part of a cycle and set the cycle-closing edge. */
  markCycle(
    fromId: string,
    toId: string,
    cycleNodeIds: string[],
    description: string,
    variables: Record<string, unknown>,
  ): void {
    this.cycleEdge = { fromId, toId };
    for (const nodeId of cycleNodeIds) {
      this.setNodeState(nodeId, "in-cycle");
    }
    this.pushStep({
      type: "mark-cycle",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Set both next and prev links for doubly-linked operations. */
  linkDoubly(
    nodeId: string,
    nextId: string | null,
    prevId: string | null,
    description: string,
    variables: Record<string, unknown>,
  ): void {
    this.setNextId(nodeId, nextId);
    this.setPrevId(nodeId, prevId);
    this.setNodeState(nodeId, "current");
    this.pushStep({
      type: "link-doubly",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Swap the positions/links of two nodes. */
  swapNodes(
    nodeIdA: string,
    nodeIdB: string,
    description: string,
    variables: Record<string, unknown>,
  ): void {
    this.setNodeState(nodeIdA, "swapping");
    this.setNodeState(nodeIdB, "swapping");
    this.metrics = { ...this.metrics, swaps: this.metrics.swaps + 1 };
    this.pushStep({
      type: "swap",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark a node as found during a search. */
  found(nodeId: string, description: string, variables: Record<string, unknown>): void {
    this.setNodeState(nodeId, "found");
    this.pushStep({
      type: "found",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark algorithm completion with a custom description. */
  complete(
    newHeadId: string | null,
    description: string,
    variables: Record<string, unknown>,
  ): void {
    this.headId = newHeadId;
    for (const node of this.nodes) {
      if (node.state !== "processed") node.state = "processed";
    }
    this.pointers = {};
    this.pushStep({
      type: "complete",
      description,
      variables,
      visualState: this.snapshot(),
    });
  }
}
