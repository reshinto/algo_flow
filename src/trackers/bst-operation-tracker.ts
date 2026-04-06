/**
 * BST operation tracker — builds execution steps for BST search, insert, delete,
 * and related operations. Tracks comparisons, path traversal, and structural mutations.
 */
import type { TreeNode, TreeNodeState, TreeVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class BSTOperationTracker extends BaseTracker {
  private nodes: TreeNode[];
  private rootId: string;
  private visitOrder: string[] = [];
  private currentNodeId: string | null = null;
  private currentPath: string[] = [];
  private targetValue: number | null = null;
  private phase: string = "searching";

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
      currentPath: [...this.currentPath],
      targetValue: this.targetValue,
      phase: this.phase,
    };
  }

  /** Mutate the visual state of a single node by its ID. */
  private setNodeState(nodeId: string, state: TreeNodeState): void {
    const node = this.nodes.find((candidate) => candidate.id === nodeId);
    if (node) node.state = state;
  }

  initialize(targetVal: number | null, variables: Record<string, unknown>): void {
    this.targetValue = targetVal;
    this.pushStep({
      type: "initialize",
      description: "Initialize BST operation",
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Compare the target value against the current node's value, deciding
   * whether to go left, go right, or declare a match.
   */
  compareNode(nodeId: string, nodeValue: number, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "comparing");
    this.currentPath.push(nodeId);
    this.pushStep({
      type: "search-node",
      description: `Compare target with node ${nodeId} (value: ${String(nodeValue)})`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark the node at which the search target was found. */
  searchFound(nodeId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "found");
    this.visitOrder.push(nodeId);
    this.pushStep({
      type: "found",
      description: `Found target at node ${nodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Insert a new node as a child of an existing node. */
  insertNode(parentId: string | null, newNodeId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = newNodeId;
    const newNode = this.nodes.find((candidate) => candidate.id === newNodeId);
    if (newNode) {
      newNode.state = "current";
    }
    this.pushStep({
      type: "insert-child",
      description:
        parentId != null
          ? `Insert node ${newNodeId} as child of ${parentId}`
          : `Insert node ${newNodeId} as new root`,
      variables,
      visualState: this.snapshot(),
    });
    if (newNode) {
      newNode.state = "visited";
    }
  }

  /** Mark a node as deleted and detach it from the tree. */
  deleteNode(nodeId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "target");
    this.pushStep({
      type: "delete-child",
      description: `Delete node ${nodeId} from BST`,
      variables,
      visualState: this.snapshot(),
    });
    this.nodes = this.nodes.filter((candidate) => candidate.id !== nodeId);
  }

  /** Highlight the in-order successor node used during BST deletion. */
  findSuccessor(successorId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = successorId;
    this.setNodeState(successorId, "found");
    this.pushStep({
      type: "search-node",
      description: `Find in-order successor: node ${successorId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Highlight all nodes along the current traversal path. */
  markPath(pathNodeIds: string[], variables: Record<string, unknown>): void {
    this.currentPath = [...pathNodeIds];
    pathNodeIds.forEach((nodeId) => {
      this.setNodeState(nodeId, "visiting");
    });
    this.pushStep({
      type: "traverse-left",
      description: `Mark traversal path: ${pathNodeIds.join(" → ")}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    this.currentNodeId = null;
    this.phase = "complete";
    this.pushStep({
      type: "complete",
      description: "BST operation complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
