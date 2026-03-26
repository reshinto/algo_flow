import type {
  GraphEdge,
  GraphEdgeState,
  GraphNode,
  GraphNodeState,
  GraphVisualState,
} from "@/types";

import { BaseTracker } from "./base-tracker";
import type { LineMap } from "./base-tracker";

export class GraphTracker extends BaseTracker {
  private nodes: GraphNode[];
  private edges: GraphEdge[];
  private queueState: string[] = [];
  private visitedState: string[] = [];

  constructor(nodes: GraphNode[], edges: GraphEdge[], lineMap: LineMap) {
    super(lineMap);
    this.nodes = nodes.map((node) => ({ ...node }));
    this.edges = edges.map((edge) => ({ ...edge }));
  }

  private snapshot(): GraphVisualState {
    return {
      kind: "graph",
      nodes: this.nodes.map((node) => ({ ...node })),
      edges: this.edges.map((edge) => ({ ...edge })),
      queue: [...this.queueState],
      visited: [...this.visitedState],
    };
  }

  private setNodeState(nodeId: string, state: GraphNodeState): void {
    const node = this.nodes.find((existingNode) => existingNode.id === nodeId);
    if (node) node.state = state;
  }

  private setEdgeState(sourceId: string, targetId: string, state: GraphEdgeState): void {
    const edge = this.edges.find(
      (existingEdge) => existingEdge.source === sourceId && existingEdge.target === targetId,
    );
    if (edge) edge.state = state;
  }

  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize graph traversal",
      variables,
      visualState: this.snapshot(),
    });
  }

  enqueue(nodeId: string, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.queueState.push(nodeId);
    this.setNodeState(nodeId, "queued");
    this.pushStep({
      type: "enqueue",
      description: `Add node ${nodeId} to the queue`,
      variables,
      visualState: this.snapshot(),
    });
  }

  dequeue(nodeId: string, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.queueState = this.queueState.filter((id) => id !== nodeId);
    this.setNodeState(nodeId, "current");
    this.pushStep({
      type: "dequeue",
      description: `Remove node ${nodeId} from the queue`,
      variables,
      visualState: this.snapshot(),
    });
  }

  visitNode(nodeId: string, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, visits: this.metrics.visits + 1 };
    this.visitedState.push(nodeId);
    this.setNodeState(nodeId, "visited");
    this.pushStep({
      type: "visit",
      description: `Visit node ${nodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  visitEdge(sourceId: string, targetId: string, variables: Record<string, unknown>): void {
    this.setEdgeState(sourceId, targetId, "traversing");
    this.pushStep({
      type: "visit",
      description: `Traverse edge ${sourceId} → ${targetId}`,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "visit-edge",
    });
    this.setEdgeState(sourceId, targetId, "traversed");
  }

  complete(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "complete",
      description: "Graph traversal complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
