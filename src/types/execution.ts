/**
 * @file execution.ts
 * @module types/execution
 *
 * Defines the core structure of the offline simulation engine timeline array formatting.
 * `ExecutionStep` maps identically to exactly one physical logic "tick" inside a Playback environment.
 */
import type { SupportedLanguage } from "./algorithm";

/**
 * Enumerated execution markers binding generic logic iterations to exact physical UI highlights.
 * Triggers distinct color transitions mapping generically to arrays, graphs, or matrices inherently.
 */
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

/** Points back to the raw source Code strings highlighting the matching Line Numbers exactly */
export interface LineHighlight {
  language: SupportedLanguage;
  lines: number[];
}

/** Live accumulating meta trackers displayed actively underneath the visual code panels */
export interface StepMetrics {
  comparisons: number;
  swaps: number;
  visits: number;
  cacheHits: number;
  queueOperations: number;
  elapsedSteps: number;
}

/**
 * A universally atomic frozen clone of memory variables representing a specific discrete algorithmic sequence.
 *
 * A 50-step algorithm maps to exactly 50 ExecutionStep clones sitting inside an array,
 * decoupling DOM visualization bounds completely from runtime CPU limitations.
 */
export interface ExecutionStep {
  /** Order in the global Playback timeline array (e.g., 0 to N-1) */
  index: number;
  type: StepType;
  /** Verbose description natively piped to the Explanation HUD */
  description: string;
  highlightedLines: LineHighlight[];
  /** Frozen primitive map tracking localized runtime constraints purely for debug HUD output */
  variables: Record<string, unknown>;
  /**
   * Fully localized cloned payload tracking graph, list, and matrix bounds inherently.
   * Allows bidirectional scrubbing (Reverse or Forward) safely because state is purely static memory here!
   */
  visualState: VisualState;
  metrics: StepMetrics;
}

/**
 * Discriminated union identifying the fundamental canvas structural rendering topology natively required by the step configuration.
 */
export type VisualState =
  | ArrayVisualState
  | GraphVisualState
  | GridVisualState
  | DPTableVisualState;

/* -------------------------------------------------------------------------- */
/*                               Array Structure                              */
/* -------------------------------------------------------------------------- */

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
  /** Map strings directly indicating sliding indices natively overlayed directly on Array cells */
  pointers: Record<string, number>;
  /** Dual tracking tuple dictating Sliding Window algorithmic sub-sets specifically */
  windowRange?: [number, number];
}

/* -------------------------------------------------------------------------- */
/*                               Graph Structure                              */
/* -------------------------------------------------------------------------- */

export type GraphNodeState = "default" | "visiting" | "visited" | "queued" | "current";

export interface GraphNode {
  id: string;
  label: string;
  state: GraphNodeState;
  /** Explicit relative rendering coordinates required for exact native SVG visualization spacing */
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

/* -------------------------------------------------------------------------- */
/*                              Matrix (Grid) Form                            */
/* -------------------------------------------------------------------------- */

export type GridCellType = "empty" | "wall" | "start" | "end";
export type GridCellState = "default" | "open" | "closed" | "path" | "current";

export interface GridCell {
  row: number;
  col: number;
  type: GridCellType;
  state: GridCellState;
  // A* heuristics
  gCost?: number;
  hCost?: number;
  fCost?: number;
}

export interface GridVisualState {
  kind: "grid";
  // Tuple Matrix defining precise row and column limits mapped natively
  cells: GridCell[][];
  startPosition: [number, number];
  endPosition: [number, number];
  currentPath: [number, number][];
}

/* -------------------------------------------------------------------------- */
/*                          Dynamic Programming Bounds                        */
/* -------------------------------------------------------------------------- */

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
