import type { SupportedLanguage } from "./algorithm";

export type StepType =
  | "initialize"
  | "compare"
  | "swap"
  | "visit"
  | "enqueue"
  | "dequeue"
  | "found"
  | "eliminate"
  | "open-node"
  | "close-node"
  | "update-cost"
  | "trace-path"
  | "compute-cell"
  | "read-cache"
  | "fill-table"
  | "move-window"
  | "expand-window"
  | "shrink-window"
  | "mark-sorted"
  | "complete";

export interface LineHighlight {
  language: SupportedLanguage;
  lines: number[];
}

export interface StepMetrics {
  comparisons: number;
  swaps: number;
  visits: number;
  cacheHits: number;
  queueOperations: number;
  elapsedSteps: number;
}

export interface ExecutionStep {
  index: number;
  type: StepType;
  description: string;
  highlightedLines: LineHighlight[];
  variables: Record<string, unknown>;
  visualState: VisualState;
  metrics: StepMetrics;
}

/* Discriminated union for category-specific visualization state */

export type VisualState =
  | ArrayVisualState
  | GraphVisualState
  | GridVisualState
  | DPTableVisualState;

export type ArrayElementState =
  | "default"
  | "comparing"
  | "swapping"
  | "sorted"
  | "found"
  | "eliminated"
  | "in-window"
  | "current";

export interface ArrayElement {
  value: number;
  state: ArrayElementState;
}

export interface ArrayVisualState {
  kind: "array";
  elements: ArrayElement[];
  pointers: Record<string, number>;
  windowRange?: [number, number];
}

export type GraphNodeState = "default" | "visiting" | "visited" | "queued" | "current";

export interface GraphNode {
  id: string;
  label: string;
  state: GraphNodeState;
  position: { x: number; y: number };
}

export type GraphEdgeState = "default" | "traversing" | "traversed" | "path";

export interface GraphEdge {
  source: string;
  target: string;
  weight?: number;
  state: GraphEdgeState;
}

export interface GraphVisualState {
  kind: "graph";
  nodes: GraphNode[];
  edges: GraphEdge[];
  queue: string[];
  visited: string[];
}

export type GridCellType = "empty" | "wall" | "start" | "end";
export type GridCellState = "default" | "open" | "closed" | "path" | "current";

export interface GridCell {
  row: number;
  col: number;
  type: GridCellType;
  state: GridCellState;
  gCost?: number;
  hCost?: number;
  fCost?: number;
}

export interface GridVisualState {
  kind: "grid";
  cells: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
  currentPath: [number, number][];
}

export type DPCellState = "default" | "computing" | "computed" | "reading-cache" | "current";

export interface DPCell {
  index: number;
  value: number | null;
  state: DPCellState;
  label: string;
}

export interface DPTableVisualState {
  kind: "dp-table";
  table: DPCell[];
  currentIndex: number;
  callStack?: string[];
}
