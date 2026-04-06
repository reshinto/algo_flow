/**
 * Tree property tracker — builds execution steps for property-checking algorithms such as
 * maximum depth, is-balanced, is-symmetric, path-sum, and diameter.
 * Tracks node validation, depth/height updates, path tracing, and scalar/boolean results.
 */
import type { TreeNode, TreeNodeState, TreeVisualState } from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class TreePropertyTracker extends BaseTracker {
  private nodes: TreeNode[];
  private rootId: string;
  private visitOrder: string[] = [];
  private currentNodeId: string | null = null;
  private currentPath: string[] = [];
  private scalarResult: number | null = null;
  private booleanResult: boolean | null = null;
  private phase: string = "checking";

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
      currentPath: [...this.currentPath],
      scalarResult: this.scalarResult,
      booleanResult: this.booleanResult,
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
      description: "Initialize tree property check",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark the given node as currently being checked. */
  checkNode(nodeId: string, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.currentNodeId = nodeId;
    this.setNodeState(nodeId, "visiting");
    this.currentPath.push(nodeId);
    this.pushStep({
      type: "visit",
      description: `Check node ${nodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Record a depth value update at the given node. */
  updateDepth(nodeId: string, depth: number, variables: Record<string, unknown>): void {
    this.scalarResult = depth;
    this.setNodeState(nodeId, "current");
    this.pushStep({
      type: "update-height",
      description: `Update depth at node ${nodeId} to ${String(depth)}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Record a height value update at the given node. */
  updateHeight(nodeId: string, height: number, variables: Record<string, unknown>): void {
    this.scalarResult = height;
    this.setNodeState(nodeId, "current");
    this.pushStep({
      type: "update-height",
      description: `Update height at node ${nodeId} to ${String(height)}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark the node as passing its property check. */
  markValid(nodeId: string, variables: Record<string, unknown>): void {
    this.booleanResult = true;
    this.setNodeState(nodeId, "visited");
    this.pushStep({
      type: "check-balance",
      description: `Node ${nodeId} passes property check`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark the node as failing its property check. */
  markInvalid(nodeId: string, variables: Record<string, unknown>): void {
    this.booleanResult = false;
    this.setNodeState(nodeId, "target");
    this.pushStep({
      type: "check-balance",
      description: `Node ${nodeId} fails property check`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Update the tracked path of node IDs (e.g. root-to-leaf path for path-sum). */
  trackPath(pathNodeIds: string[], variables: Record<string, unknown>): void {
    this.currentPath = [...pathNodeIds];
    pathNodeIds.forEach((nodeId) => this.setNodeState(nodeId, "highlighted"));
    this.pushStep({
      type: "traverse-left",
      description: `Track path: ${pathNodeIds.join(" → ")}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Record the final scalar result (e.g. max depth, diameter, path sum). */
  recordResult(result: number | boolean, variables: Record<string, unknown>): void {
    if (typeof result === "boolean") {
      this.booleanResult = result;
    } else {
      this.scalarResult = result;
    }
    this.pushStep({
      type: "add-to-result",
      description: `Record result: ${String(result)}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  complete(variables: Record<string, unknown>): void {
    this.currentNodeId = null;
    this.phase = "complete";
    this.pushStep({
      type: "complete",
      description: "Tree property check complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
