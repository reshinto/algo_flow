/**
 * Advanced tree tracker — builds execution steps for AVL rotations, Red-Black tree
 * recoloring, segment tree range queries/updates, binary indexed tree prefix sums,
 * and Huffman encoding operations.
 */
import type { TreeNode, TreeNodeState, TreeVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class AdvancedTreeTracker extends BaseTracker {
  private nodes: TreeNode[];
  private rootId: string;
  private visitOrder: string[] = [];
  private currentNodeId: string | null = null;
  private activeQueryRange: [number, number] | null = null;
  private scalarResult: number | null = null;
  private phase: string = "processing";
  private operationLabel: string | null = null;

  constructor(nodes: TreeNode[], rootId: string, lineMap: LineMap) {
    super(lineMap);
    this.nodes = nodes.map((node) => ({ ...node }));
    this.rootId = rootId;
  }

  /** Deep-copy current state for an immutable step snapshot. */
  private snapshot(): TreeVisualState {
    return {
      kind: "tree",
      nodes: this.nodes.map((node) => ({ ...node })),
      rootId: this.rootId,
      visitOrder: [...this.visitOrder],
      currentNodeId: this.currentNodeId,
      queryRange: this.activeQueryRange,
      scalarResult: this.scalarResult,
      phase: this.phase,
      operationLabel: this.operationLabel ?? undefined,
    };
  }

  /** Mutate the visual state of a single node by its ID. */
  private setNodeState(nodeId: string, state: TreeNodeState): void {
    const node = this.nodes.find((candidate) => candidate.id === nodeId);
    if (node) node.state = state;
  }

  /** Replace the internal node list and root (used by incremental-build algorithms). */
  updateNodes(nodes: TreeNode[], rootId: string): void {
    this.nodes = nodes.map((node) => ({ ...node }));
    this.rootId = rootId;
  }

  initialize(label: string, variables: Record<string, unknown>): void {
    this.operationLabel = label;
    this.pushStep({
      type: "initialize",
      description: `Initialize advanced tree operation: ${label}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Perform a left rotation around the given pivot node.
   * The caller is responsible for updating node references after rotation.
   */
  rotateLeft(pivotNodeId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = pivotNodeId;
    this.setNodeState(pivotNodeId, "current");
    this.pushStep({
      type: "rotate-left",
      description: `Rotate left around node ${pivotNodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Perform a right rotation around the given pivot node.
   * The caller is responsible for updating node references after rotation.
   */
  rotateRight(pivotNodeId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = pivotNodeId;
    this.setNodeState(pivotNodeId, "current");
    this.pushStep({
      type: "rotate-right",
      description: `Rotate right around node ${pivotNodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Recolor a node in a Red-Black tree (toggle between red and black).
   * The new color is conveyed via variables and the node is visually highlighted.
   */
  recolorNode(nodeId: string, newColor: "red" | "black", variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, newColor === "red" ? "comparing" : "visited");
    this.pushStep({
      type: "recolor-node",
      description: `Recolor node ${nodeId} to ${newColor}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Update a segment tree node's value for a range update or point update.
   * Marks the node as current during the update.
   */
  updateSegment(nodeId: string, newValue: number, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "current");
    const node = this.nodes.find((candidate) => candidate.id === nodeId);
    if (node) {
      node.value = newValue;
    }
    this.pushStep({
      type: "update-segment",
      description: `Update segment node ${nodeId} to value ${String(newValue)}`,
      variables,
      visualState: this.snapshot(),
    });
    this.setNodeState(nodeId, "visited");
  }

  /**
   * Perform a range query on the segment tree.
   * Records the query bounds and marks nodes being checked during traversal.
   */
  queryRange(
    nodeId: string,
    rangeLow: number,
    rangeHigh: number,
    variables: Record<string, unknown>,
  ): void {
    this.currentNodeId = nodeId;
    this.activeQueryRange = [rangeLow, rangeHigh];
    this.setNodeState(nodeId, "comparing");
    this.pushStep({
      type: "query-range",
      description: `Query range [${String(rangeLow)}, ${String(rangeHigh)}] at node ${nodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Compute a prefix sum in a Binary Indexed Tree (Fenwick Tree).
   * Records the partial sum accumulated so far.
   */
  computePrefix(index: number, partialSum: number, variables: Record<string, unknown>): void {
    this.scalarResult = partialSum;
    this.pushStep({
      type: "compute-prefix",
      description: `Compute prefix sum at index ${String(index)}: partial sum = ${String(partialSum)}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Insert a new node (for AVL/RB incremental build algorithms). */
  insertNode(nodeId: string, value: number, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "current");
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "insert-child",
      description: `Insert node with value ${String(value)}`,
      variables,
      visualState: this.snapshot(),
    });
    this.setNodeState(nodeId, "visited");
  }

  /** Check the balance factor of a node (AVL). */
  checkBalance(nodeId: string, balance: number, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "comparing");
    this.pushStep({
      type: "check-balance",
      description: `Check balance factor at node ${nodeId}: ${String(balance)}`,
      variables,
      visualState: this.snapshot(),
    });
    this.setNodeState(nodeId, "default");
  }

  /** Visit a node (for traversal algorithms). */
  visitNode(nodeId: string, value: number, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.visitOrder.push(nodeId);
    this.setNodeState(nodeId, "visited");
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.pushStep({
      type: "visit",
      description: `Visit node ${nodeId} (value: ${String(value)})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Traverse to the next child in n-ary tree traversal. */
  traverseNext(fromId: string, toId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = fromId;
    this.setNodeState(fromId, "current");
    this.pushStep({
      type: "traverse-next",
      description: `Traverse from node ${fromId} to child ${toId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Build a new segment/BIT/Huffman node. */
  buildNode(nodeId: string, value: number, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "current");
    const existingNode = this.nodes.find((candidate) => candidate.id === nodeId);
    if (existingNode) existingNode.value = value;
    this.pushStep({
      type: "build-node",
      description: `Build node ${nodeId} with value ${String(value)}`,
      variables,
      visualState: this.snapshot(),
    });
    this.setNodeState(nodeId, "visited");
  }

  /** Connect a child to a parent node (Huffman/expression tree construction). */
  connectChild(parentId: string, childId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = parentId;
    this.setNodeState(childId, "current");
    this.pushStep({
      type: "connect-child",
      description: `Connect child ${childId} to parent ${parentId}`,
      variables,
      visualState: this.snapshot(),
    });
    this.setNodeState(childId, "visited");
  }

  /** Mark a character encoding result (Huffman). */
  encodeChar(
    nodeId: string,
    char: string,
    encoding: string,
    variables: Record<string, unknown>,
  ): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "found");
    this.pushStep({
      type: "encode-char",
      description: `Encode character '${char}' as '${encoding}'`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Select the minimum frequency node from the priority queue (Huffman). */
  selectMinFreq(nodeId: string, freq: number, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "comparing");
    this.pushStep({
      type: "select-min-freq",
      description: `Select minimum frequency node ${nodeId} (freq: ${String(freq)})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Check a node for pruning (binary tree pruning). */
  checkNode(nodeId: string, value: number, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "comparing");
    this.pushStep({
      type: "check-balance",
      description: `Check node ${nodeId} (value: ${String(value)}) — should it be pruned?`,
      variables,
      visualState: this.snapshot(),
    });
    this.setNodeState(nodeId, "default");
  }

  /** Detach a node (remove subtree during pruning). */
  detachNode(nodeId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "target");
    this.pushStep({
      type: "detach-node",
      description: `Detach node ${nodeId} (subtree pruned — contains no 1s)`,
      variables,
      visualState: this.snapshot(),
    });
    this.nodes = this.nodes.filter((candidate) => candidate.id !== nodeId);
  }

  /** Mark a node as processed (tree-to-DLL, pruning post-processing). */
  markProcessed(nodeId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "visited");
    this.pushStep({
      type: "visit",
      description: `Mark node ${nodeId} as processed`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    this.currentNodeId = null;
    this.phase = "complete";
    this.pushStep({
      type: "complete",
      description: "Advanced tree operation complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
