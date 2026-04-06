/**
 * Tree construction tracker — builds execution steps for algorithms that construct
 * a binary tree from serialized input (preorder+inorder arrays, level-order, serialized string).
 * Tracks element selection, node creation, child linking, and array partitioning.
 */
import type { TreeNode, TreeNodeState, TreeVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class TreeConstructionTracker extends BaseTracker {
  private nodes: TreeNode[];
  private rootId: string;
  private visitOrder: string[] = [];
  private currentNodeId: string | null = null;
  private phase: string = "building";

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
      phase: this.phase,
    };
  }

  /** Mutate the visual state of a single node by its ID. */
  private setNodeState(nodeId: string, state: TreeNodeState): void {
    const node = this.nodes.find((candidate) => candidate.id === nodeId);
    if (node) node.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize tree construction",
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Highlight an element being selected from the input array
   * as the root/value for the next node to be created.
   */
  selectElement(elementValue: number, variables: Record<string, unknown>): void {
    this.pushStep({
      type: "search-node",
      description: `Select element ${String(elementValue)} from input array`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Add a newly created node to the tree and mark it as current. */
  buildNode(nodeId: string, nodeValue: number, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.currentNodeId = nodeId;
    const existingNode = this.nodes.find((candidate) => candidate.id === nodeId);
    if (existingNode) {
      existingNode.state = "current";
    } else {
      // Node doesn't exist yet — add it (construction algorithms may add nodes incrementally)
      this.nodes.push({
        id: nodeId,
        value: nodeValue,
        parentId: null,
        leftChildId: null,
        rightChildId: null,
        state: "current",
        position: { x: 0, y: 0 },
      });
    }
    this.pushStep({
      type: "build-node",
      description: `Build node ${nodeId} with value ${String(nodeValue)}`,
      variables,
      visualState: this.snapshot(),
    });
    this.setNodeState(nodeId, "visiting");
  }

  /** Link a newly built node to its parent as left or right child. */
  connectChild(
    parentId: string,
    childId: string,
    side: "left" | "right",
    variables: Record<string, unknown>,
  ): void {
    const parentNode = this.nodes.find((candidate) => candidate.id === parentId);
    if (parentNode) {
      if (side === "left") {
        parentNode.leftChildId = childId;
      } else {
        parentNode.rightChildId = childId;
      }
    }
    const childNode = this.nodes.find((candidate) => candidate.id === childId);
    if (childNode) {
      childNode.parentId = parentId;
    }
    this.pushStep({
      type: "connect-child",
      description: `Connect node ${childId} as ${side} child of ${parentId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Record an array partition step — used when splitting inorder/preorder arrays
   * into left and right sub-arrays during recursive construction.
   */
  partitionArray(
    leftBound: number,
    rightBound: number,
    pivotIndex: number,
    variables: Record<string, unknown>,
  ): void {
    this.pushStep({
      type: "partition-array",
      description: `Partition array [${String(leftBound)}..${String(rightBound)}] at pivot index ${String(pivotIndex)}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark a node as fully built (all children connected). */
  markBuilt(nodeId: string, variables: Record<string, unknown>): void {
    this.setNodeState(nodeId, "visited");
    this.visitOrder.push(nodeId);
    this.pushStep({
      type: "visit",
      description: `Node ${nodeId} fully constructed`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    this.currentNodeId = null;
    this.phase = "complete";
    this.pushStep({
      type: "complete",
      description: "Tree construction complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
