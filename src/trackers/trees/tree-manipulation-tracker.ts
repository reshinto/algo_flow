/**
 * Tree manipulation tracker — builds execution steps for algorithms that structurally
 * transform or compare trees, such as invert-binary-tree, flatten, same-tree, merge,
 * and lowest-common-ancestor.
 */
import type { TreeNode, TreeNodeState, TreeVisualState } from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class TreeManipulationTracker extends BaseTracker {
  private nodes: TreeNode[];
  private rootId: string;
  private visitOrder: string[] = [];
  private currentNodeId: string | null = null;
  private secondaryTree: { nodes: TreeNode[]; rootId: string } | null = null;
  private phase: string = "processing";
  private booleanResult: boolean | null = null;
  private operationLabel: string | null = null;

  constructor(
    nodes: TreeNode[],
    rootId: string,
    lineMap: LineMap,
    secondaryNodes?: TreeNode[],
    secondaryRootId?: string,
  ) {
    super(lineMap);
    this.nodes = nodes.map((node) => ({ ...node }));
    this.rootId = rootId;
    if (secondaryNodes != null && secondaryRootId != null) {
      this.secondaryTree = {
        nodes: secondaryNodes.map((node) => ({ ...node })),
        rootId: secondaryRootId,
      };
    }
  }

  /** Deep-copy current state for an immutable step snapshot. */
  private snapshot(): TreeVisualState {
    return {
      kind: "tree",
      nodes: this.nodes.map((node) => ({ ...node })),
      rootId: this.rootId,
      visitOrder: [...this.visitOrder],
      currentNodeId: this.currentNodeId,
      secondaryTree:
        this.secondaryTree != null
          ? {
              nodes: this.secondaryTree.nodes.map((node) => ({ ...node })),
              rootId: this.secondaryTree.rootId,
            }
          : null,
      phase: this.phase,
      booleanResult: this.booleanResult,
      operationLabel: this.operationLabel ?? undefined,
    };
  }

  /** Mutate the visual state of a single node in the primary tree. */
  private setNodeState(nodeId: string, state: TreeNodeState): void {
    const node = this.nodes.find((candidate) => candidate.id === nodeId);
    if (node) node.state = state;
  }

  /** Mutate the visual state of a single node in the secondary tree. */
  private setSecondaryNodeState(nodeId: string, state: TreeNodeState): void {
    if (this.secondaryTree == null) return;
    const node = this.secondaryTree.nodes.find((candidate) => candidate.id === nodeId);
    if (node) node.state = state;
  }

  initialize(label: string, variables: Record<string, unknown>): void {
    this.operationLabel = label;
    this.pushStep({
      type: "initialize",
      description: `Initialize tree manipulation: ${label}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Swap the left and right children of a node (used by invert-binary-tree). */
  swapChildren(nodeId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "current");
    const node = this.nodes.find((candidate) => candidate.id === nodeId);
    if (node) {
      const leftId = node.leftChildId;
      node.leftChildId = node.rightChildId;
      node.rightChildId = leftId;
    }
    this.pushStep({
      type: "swap-children",
      description: `Swap children of node ${nodeId}`,
      variables,
      visualState: this.snapshot(),
    });
    this.setNodeState(nodeId, "visited");
  }

  /**
   * Move a node to a new position in the tree
   * (used by flatten-to-linked-list and similar structural transforms).
   */
  moveNode(
    nodeId: string,
    newParentId: string | null,
    side: "left" | "right",
    variables: Record<string, unknown>,
  ): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "current");
    const parentNode =
      newParentId != null
        ? this.nodes.find((candidate) => candidate.id === newParentId)
        : undefined;
    if (parentNode) {
      if (side === "left") {
        parentNode.leftChildId = nodeId;
      } else {
        parentNode.rightChildId = nodeId;
      }
    }
    const movedNode = this.nodes.find((candidate) => candidate.id === nodeId);
    if (movedNode) {
      movedNode.parentId = newParentId;
    }
    this.pushStep({
      type: "connect-child",
      description: `Move node ${nodeId} to ${side} child of ${newParentId ?? "null"}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Compare a node in the primary tree against its counterpart in the secondary tree. */
  compareNodes(
    primaryNodeId: string,
    secondaryNodeId: string,
    variables: Record<string, unknown>,
  ): void {
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };
    this.currentNodeId = primaryNodeId;
    this.setNodeState(primaryNodeId, "comparing");
    this.setSecondaryNodeState(secondaryNodeId, "comparing");
    this.pushStep({
      type: "search-node",
      description: `Compare node ${primaryNodeId} against node ${secondaryNodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Merge values from two nodes into the primary tree node. */
  mergeNodes(
    primaryNodeId: string,
    secondaryNodeId: string,
    mergedValue: number,
    variables: Record<string, unknown>,
  ): void {
    this.currentNodeId = primaryNodeId;
    this.setNodeState(primaryNodeId, "current");
    this.setSecondaryNodeState(secondaryNodeId, "visited");
    const primaryNode = this.nodes.find((candidate) => candidate.id === primaryNodeId);
    if (primaryNode) {
      primaryNode.value = mergedValue;
    }
    this.pushStep({
      type: "merge-node",
      description: `Merge node ${primaryNodeId} and node ${secondaryNodeId} → value ${String(mergedValue)}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Detach a node from the tree by removing its parent reference
   * (used when flattening or restructuring).
   */
  detachNode(nodeId: string, variables: Record<string, unknown>): void {
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "target");
    this.pushStep({
      type: "detach-node",
      description: `Detach node ${nodeId} from parent`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark a node as fully processed in the current manipulation pass. */
  markProcessed(nodeId: string, variables: Record<string, unknown>): void {
    this.setNodeState(nodeId, "visited");
    this.visitOrder.push(nodeId);
    this.pushStep({
      type: "visit",
      description: `Mark node ${nodeId} as processed`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(result: boolean | null, variables: Record<string, unknown>): void {
    this.currentNodeId = null;
    this.booleanResult = result;
    this.phase = "complete";
    this.pushStep({
      type: "complete",
      description: `Tree manipulation complete${result != null ? ` — result: ${String(result)}` : ""}`,
      variables,
      visualState: this.snapshot(),
    });
  }
}
