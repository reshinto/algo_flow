/**
 * Tree traversal tracker — builds execution steps for BST and tree algorithms.
 * Maintains mutable copies of tree nodes, updating their visual states
 * (current, visiting, visited) as the traversal progresses.
 */
import type { TreeNode, TreeNodeState, TreeVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class TreeTracker extends BaseTracker {
  private nodes: TreeNode[];
  private rootId: string;
  private visitOrder: string[] = [];
  private currentNodeId: string | null = null;

  constructor(nodes: TreeNode[], rootId: string, lineMap: LineMap) {
    super(lineMap);
    this.nodes = nodes.map((node) => ({ ...node }));
    this.rootId = rootId;
  }

  /** Deep-copy the current node array for an immutable step snapshot. */
  private snapshot(): TreeVisualState {
    return {
      kind: "tree",
      nodes: this.nodes.map((node) => ({ ...node })),
      rootId: this.rootId,
      visitOrder: [...this.visitOrder],
      currentNodeId: this.currentNodeId,
    };
  }

  /** Mutate the visual state of a single node by its ID. */
  private setNodeState(nodeId: string, state: TreeNodeState): void {
    const node = this.nodes.find((existingNode) => existingNode.id === nodeId);
    if (node) node.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize BST in-order traversal",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Move focus to a node's left subtree. */
  traverseLeft(nodeId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "current");
    this.pushStep({
      type: "traverse-left",
      description: `Traverse left subtree of node ${nodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Move focus to a node's right subtree. */
  traverseRight(nodeId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "current");
    this.pushStep({
      type: "traverse-right",
      description: `Traverse right subtree of node ${nodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Visit a node — records its value into the result and marks it visited. */
  visitNode(nodeId: string, value: number, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "visiting");
    this.visitOrder.push(nodeId);
    this.pushStep({
      type: "visit",
      description: `Visit node ${nodeId} (value: ${value}) — add to result`,
      variables,
      visualState: this.snapshot(),
    });
    // Mark permanently visited after recording
    this.setNodeState(nodeId, "visited");
  }

  complete(variables: Record<string, unknown>): void {
    this.currentNodeId = null;
    this.pushStep({
      type: "complete",
      description: "In-order traversal complete — result is sorted",
      variables,
      visualState: this.snapshot(),
    });
  }
}
