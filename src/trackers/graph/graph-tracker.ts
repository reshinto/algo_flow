/**
 * Graph traversal tracker — builds execution steps for BFS/DFS algorithms.
 * Maintains mutable copies of node and edge arrays, updating their visual
 * states (queued, current, visited, traversing) as the algorithm progresses.
 */
import type {
  GraphEdge,
  GraphEdgeState,
  GraphNode,
  GraphNodeState,
  GraphVisualState,
} from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class GraphTracker extends BaseTracker {
  private nodes: GraphNode[];
  private edges: GraphEdge[];
  private undirected: boolean;
  private queueState: string[] = [];
  private visitedState: string[] = [];
  private stackState: string[] = [];
  private distancesState: Record<string, number | string> = {};
  private componentsState: string[][] = [];
  private topologicalOrderState: string[] = [];
  private mstWeightState = 0;
  private currentFlowState = 0;
  private maxFlowState = 0;
  private inDegreeState: Record<string, number> = {};
  private colorAssignmentState: Record<string, number> = {};

  constructor(
    nodes: GraphNode[],
    edges: GraphEdge[],
    lineMap: LineMap,
    options?: { undirected?: boolean },
  ) {
    super(lineMap);
    this.nodes = nodes.map((node) => ({ ...node }));
    this.edges = edges.map((edge) => ({ ...edge }));
    this.undirected = options?.undirected ?? false;
  }

  /** Deep-copy the current node/edge state for an immutable step snapshot. */
  private snapshot(): GraphVisualState {
    const state: GraphVisualState = {
      kind: "graph",
      nodes: this.nodes.map((node) => ({ ...node })),
      edges: this.edges.map((edge) => ({ ...edge })),
      queue: [...this.queueState],
      visited: [...this.visitedState],
    };
    if (this.stackState.length > 0) state.stack = [...this.stackState];
    if (Object.keys(this.distancesState).length > 0) state.distances = { ...this.distancesState };
    if (this.componentsState.length > 0)
      state.components = this.componentsState.map((component) => [...component]);
    if (this.topologicalOrderState.length > 0)
      state.topologicalOrder = [...this.topologicalOrderState];
    if (this.mstWeightState > 0) state.mstWeight = this.mstWeightState;
    if (this.currentFlowState > 0) state.currentFlow = this.currentFlowState;
    if (this.maxFlowState > 0) state.maxFlow = this.maxFlowState;
    if (Object.keys(this.inDegreeState).length > 0) state.inDegree = { ...this.inDegreeState };
    if (Object.keys(this.colorAssignmentState).length > 0)
      state.colorAssignment = { ...this.colorAssignmentState };
    return state;
  }

  /** Mutate the visual state of a single node by its ID. */
  private setNodeState(nodeId: string, state: GraphNodeState): void {
    const node = this.nodes.find((existingNode) => existingNode.id === nodeId);
    if (node) node.state = state;
  }

  /** Mutate the visual state of a directed edge between two nodes. */
  private setEdgeState(sourceId: string, targetId: string, state: GraphEdgeState): void {
    const edge = this.edges.find(
      (existingEdge) => existingEdge.source === sourceId && existingEdge.target === targetId,
    );
    if (edge) edge.state = state;
    if (this.undirected) {
      const reverseEdge = this.edges.find(
        (existingEdge) => existingEdge.source === targetId && existingEdge.target === sourceId,
      );
      if (reverseEdge) reverseEdge.state = state;
    }
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

  /* ---- Stack-based (DFS family) ---- */

  pushToStack(nodeId: string, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.stackState.push(nodeId);
    this.setNodeState(nodeId, "in-stack");
    this.pushStep({
      type: "push-stack",
      description: `Push node ${nodeId} onto the stack`,
      variables,
      visualState: this.snapshot(),
    });
  }

  popFromStack(nodeId: string, variables: Record<string, unknown>): void {
    this.metrics = { ...this.metrics, queueOperations: this.metrics.queueOperations + 1 };
    this.stackState = this.stackState.filter((id) => id !== nodeId);
    this.setNodeState(nodeId, "current");
    this.pushStep({
      type: "pop-stack",
      description: `Pop node ${nodeId} from the stack`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /* ---- Shortest path ---- */

  relaxEdge(sourceId: string, targetId: string, variables: Record<string, unknown>): void {
    this.setEdgeState(sourceId, targetId, "relaxed");
    this.pushStep({
      type: "relax-edge",
      description: `Relax edge ${sourceId} → ${targetId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  updateDistance(
    nodeId: string,
    distance: number | string,
    variables: Record<string, unknown>,
  ): void {
    this.distancesState[nodeId] = distance;
    this.pushStep({
      type: "update-distance",
      description: `Update distance of node ${nodeId} to ${distance}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /* ---- MST ---- */

  addToMST(sourceId: string, targetId: string, variables: Record<string, unknown>): void {
    this.setEdgeState(sourceId, targetId, "in-mst");
    this.setNodeState(sourceId, "in-mst");
    this.setNodeState(targetId, "in-mst");
    const edge = this.edges.find(
      (existingEdge) =>
        (existingEdge.source === sourceId && existingEdge.target === targetId) ||
        (this.undirected && existingEdge.source === targetId && existingEdge.target === sourceId),
    );
    if (edge?.weight) this.mstWeightState += edge.weight;
    this.pushStep({
      type: "add-to-mst",
      description: `Add edge ${sourceId} — ${targetId} to MST`,
      variables,
      visualState: this.snapshot(),
    });
  }

  rejectEdge(sourceId: string, targetId: string, variables: Record<string, unknown>): void {
    this.setEdgeState(sourceId, targetId, "rejected");
    this.pushStep({
      type: "reject-edge",
      description: `Reject edge ${sourceId} — ${targetId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /* ---- Edge classification ---- */

  classifyEdge(
    sourceId: string,
    targetId: string,
    classification: "tree-edge" | "back-edge" | "cross-edge" | "forward-edge" | "cycle-edge",
    variables: Record<string, unknown>,
  ): void {
    this.setEdgeState(sourceId, targetId, classification);
    this.pushStep({
      type: "classify-edge",
      description: `Classify edge ${sourceId} → ${targetId} as ${classification}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /* ---- Node processing ---- */

  processNode(nodeId: string, variables: Record<string, unknown>): void {
    this.setNodeState(nodeId, "processed");
    this.pushStep({
      type: "process-node",
      description: `Mark node ${nodeId} as fully processed`,
      variables,
      visualState: this.snapshot(),
    });
  }

  backtrackNode(nodeId: string, variables: Record<string, unknown>): void {
    this.setNodeState(nodeId, "backtracking");
    this.pushStep({
      type: "backtrack",
      description: `Backtrack from node ${nodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /* ---- Topological sort ---- */

  addToOrder(nodeId: string, variables: Record<string, unknown>): void {
    this.topologicalOrderState.push(nodeId);
    this.pushStep({
      type: "add-to-order",
      description: `Add node ${nodeId} to topological order`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /* ---- Connectivity ---- */

  assignComponent(nodeId: string, componentId: number, variables: Record<string, unknown>): void {
    while (this.componentsState.length <= componentId) {
      this.componentsState.push([]);
    }
    this.componentsState[componentId]!.push(nodeId);
    const node = this.nodes.find((existingNode) => existingNode.id === nodeId);
    if (node) node.colorIndex = componentId;
    this.pushStep({
      type: "assign-component",
      description: `Assign node ${nodeId} to component ${componentId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  markBridge(sourceId: string, targetId: string, variables: Record<string, unknown>): void {
    this.setEdgeState(sourceId, targetId, "bridge");
    this.pushStep({
      type: "mark-bridge",
      description: `Mark edge ${sourceId} — ${targetId} as a bridge`,
      variables,
      visualState: this.snapshot(),
    });
  }

  markArticulationPoint(nodeId: string, variables: Record<string, unknown>): void {
    this.setNodeState(nodeId, "visiting");
    this.pushStep({
      type: "mark-articulation",
      description: `Mark node ${nodeId} as an articulation point`,
      variables,
      visualState: this.snapshot(),
    });
  }

  mergeComponents(nodeIdA: string, nodeIdB: string, variables: Record<string, unknown>): void {
    this.pushStep({
      type: "merge-components",
      description: `Merge components containing ${nodeIdA} and ${nodeIdB}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /* ---- Network flow ---- */

  augmentFlow(sourceId: string, targetId: string, variables: Record<string, unknown>): void {
    this.setEdgeState(sourceId, targetId, "augmenting");
    this.pushStep({
      type: "augment-flow",
      description: `Augment flow along edge ${sourceId} → ${targetId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  saturateEdge(sourceId: string, targetId: string, variables: Record<string, unknown>): void {
    this.setEdgeState(sourceId, targetId, "saturated");
    this.pushStep({
      type: "augment-flow",
      description: `Edge ${sourceId} → ${targetId} is now saturated`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Set the initial distances state without emitting a step (used to seed start-node distance). */
  setDistances(distances: Record<string, number | string>): void {
    this.distancesState = { ...distances };
  }

  setFlowState(currentFlow: number, maxFlow: number): void {
    this.currentFlowState = currentFlow;
    this.maxFlowState = maxFlow;
  }

  /* ---- Graph coloring ---- */

  assignColor(nodeId: string, colorIndex: number, variables: Record<string, unknown>): void {
    this.colorAssignmentState[nodeId] = colorIndex;
    const node = this.nodes.find((existingNode) => existingNode.id === nodeId);
    if (node) node.colorIndex = colorIndex;
    this.pushStep({
      type: "assign-color",
      description: `Assign color ${colorIndex} to node ${nodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  markConflict(nodeId: string, variables: Record<string, unknown>): void {
    this.setNodeState(nodeId, "conflict");
    this.pushStep({
      type: "check-bipartite",
      description: `Conflict detected at node ${nodeId} — graph is not bipartite`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /* ---- Eulerian ---- */

  useEdge(sourceId: string, targetId: string, variables: Record<string, unknown>): void {
    this.setEdgeState(sourceId, targetId, "used");
    this.pushStep({
      type: "use-edge",
      description: `Use edge ${sourceId} → ${targetId} in circuit`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /* ---- Matching ---- */

  matchEdge(sourceId: string, targetId: string, variables: Record<string, unknown>): void {
    this.setEdgeState(sourceId, targetId, "matched");
    this.setNodeState(sourceId, "matched");
    this.setNodeState(targetId, "matched");
    this.pushStep({
      type: "visit",
      description: `Match edge ${sourceId} — ${targetId}`,
      variables,
      visualState: this.snapshot(),
      lineMapKey: "match-edge",
    });
  }

  /* ---- In-degree management ---- */

  setInDegree(inDegree: Record<string, number>): void {
    this.inDegreeState = { ...inDegree };
  }
}
