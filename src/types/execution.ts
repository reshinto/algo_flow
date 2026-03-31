/**
 * @file execution.ts
 * @module types/execution
 *
 * Core execution types for the step-based visualization timeline.
 */
import type { SupportedLanguage } from "./algorithm";

/**
 * Categorizes each execution step for line-map resolution and UI state transitions.
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
  | "traverse-left"
  | "traverse-right"
  | "traverse-next"
  | "reverse-pointer"
  | "sift-down"
  | "sift-up"
  | "heap-swap"
  | "heap-insert"
  | "heap-extract"
  | "heap-update"
  | "push"
  | "pop"
  | "match"
  | "mismatch"
  | "insert-key"
  | "lookup-key"
  | "key-found"
  | "key-not-found"
  | "build-failure"
  | "pattern-shift"
  | "char-match"
  | "char-mismatch"
  | "collect-element"
  | "move-direction"
  | "shrink-boundary"
  | "add-to-set"
  | "check-membership"
  | "member-found"
  | "member-not-found"
  | "push-call"
  | "pop-call"
  | "push-stack"
  | "pop-stack"
  | "relax-edge"
  | "reject-edge"
  | "add-to-mst"
  | "classify-edge"
  | "detect-cycle"
  | "assign-component"
  | "process-node"
  | "update-distance"
  | "add-to-order"
  | "augment-flow"
  | "assign-color"
  | "merge-components"
  | "check-bipartite"
  | "use-edge"
  | "mark-bridge"
  | "mark-articulation"
  | "backtrack"
  | "increment-count"
  | "decrement-count"
  | "update-value"
  | "delete-key"
  | "check-duplicate"
  | "check-prefix"
  | "prefix-found"
  | "complete";

/** Maps a language to the source lines highlighted for this step. */
export interface LineHighlight {
  language: SupportedLanguage;
  lines: number[];
}

/** Cumulative operation counts displayed in the metrics panel. */
export interface StepMetrics {
  comparisons: number;
  swaps: number;
  visits: number;
  cacheHits: number;
  queueOperations: number;
  elapsedSteps: number;
}

/**
 * Immutable snapshot of one algorithm tick, enabling bidirectional playback scrubbing.
 */
export interface ExecutionStep {
  index: number;
  type: StepType;
  /** Human-readable description shown in the explanation panel. */
  description: string;
  highlightedLines: LineHighlight[];
  /** Snapshot of runtime variables at this step. */
  variables: Record<string, unknown>;
  /** Visual state consumed by the visualizer for this step. */
  visualState: VisualState;
  metrics: StepMetrics;
}

/** Discriminated union of all visualization types. */
export type VisualState =
  | ArrayVisualState
  | GraphVisualState
  | GridVisualState
  | DPTableVisualState
  | TreeVisualState
  | LinkedListVisualState
  | HeapVisualState
  | StackQueueVisualState
  | HashMapVisualState
  | StringVisualState
  | MatrixVisualState
  | SetVisualState;

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
  pointers: Record<string, number>;
  windowRange?: [number, number];
  /** Optional secondary array for dual-array algorithms (prefix sum, merge, count) */
  secondaryElements?: ArrayElement[];
  /** Label for the secondary array row (e.g., "Prefix Sum", "Count Array") */
  secondaryLabel?: string;
}

/* -------------------------------------------------------------------------- */
/*                               Graph Structure                              */
/* -------------------------------------------------------------------------- */

export type GraphNodeState =
  | "default"
  | "visiting"
  | "visited"
  | "queued"
  | "current"
  | "in-stack"
  | "processed"
  | "in-mst"
  | "source"
  | "sink"
  | "color-a"
  | "color-b"
  | "conflict"
  | "active"
  | "matched"
  | "free"
  | "trying"
  | "backtracking";

export interface GraphNode {
  id: string;
  label: string;
  state: GraphNodeState;
  /** Relative coordinates for SVG layout. */
  position: { x: number; y: number };
  colorIndex?: number;
}

export type GraphEdgeState =
  | "default"
  | "traversing"
  | "traversed"
  | "path"
  | "relaxed"
  | "rejected"
  | "in-mst"
  | "back-edge"
  | "cross-edge"
  | "forward-edge"
  | "tree-edge"
  | "bridge"
  | "augmenting"
  | "saturated"
  | "residual"
  | "matched"
  | "used"
  | "candidate"
  | "cycle-edge";

export interface GraphEdge {
  source: string;
  target: string;
  weight?: number;
  capacity?: number;
  flow?: number;
  state: GraphEdgeState;
}

export interface GraphVisualState {
  kind: "graph";
  nodes: GraphNode[];
  edges: GraphEdge[];
  queue: string[];
  visited: string[];
  stack?: string[];
  distances?: Record<string, number | string>;
  components?: string[][];
  topologicalOrder?: string[];
  mstWeight?: number;
  currentFlow?: number;
  maxFlow?: number;
  inDegree?: Record<string, number>;
  colorAssignment?: Record<string, number>;
  isDirected?: boolean;
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
  /** Present only during A* — g(actual), h(heuristic), f(total) path costs */
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

/* -------------------------------------------------------------------------- */
/*                               Tree Structure                               */
/* -------------------------------------------------------------------------- */

export type TreeNodeState = "default" | "visiting" | "visited" | "current";

export interface TreeNode {
  id: string;
  value: number;
  parentId: string | null;
  leftChildId: string | null;
  rightChildId: string | null;
  state: TreeNodeState;
  /** Pre-computed position for SVG rendering (level-based hierarchical layout) */
  position: { x: number; y: number };
}

export interface TreeVisualState {
  kind: "tree";
  nodes: TreeNode[];
  /** ID of the root node */
  rootId: string;
  /** Node IDs in the order they were visited (in-order result so far) */
  visitOrder: string[];
  /** ID of the node currently being processed */
  currentNodeId: string | null;
}

/* -------------------------------------------------------------------------- */
/*                            Linked List Structure                            */
/* -------------------------------------------------------------------------- */

export type LinkedListNodeState = "default" | "current" | "processed" | "swapping";

export interface LinkedListNode {
  id: string;
  value: number;
  nextId: string | null;
  state: LinkedListNodeState;
  position: { x: number; y: number };
}

export interface LinkedListVisualState {
  kind: "linked-list";
  nodes: LinkedListNode[];
  /** ID of the current head node */
  headId: string | null;
  /** Named pointer positions: "prev", "current", "next" → node ID or null */
  pointers: Record<string, string | null>;
}

/* -------------------------------------------------------------------------- */
/*                               Heap Structure                               */
/* -------------------------------------------------------------------------- */

export type HeapNodeState =
  | "default"
  | "comparing"
  | "swapping"
  | "settled"
  | "current"
  | "inserted"
  | "extracted"
  | "updated"
  | "highlighted";

export interface HeapNode {
  /** 0-based index in the underlying array */
  index: number;
  value: number;
  state: HeapNodeState;
  /** Pre-computed SVG position for tree rendering */
  position: { x: number; y: number };
}

export interface HeapVisualState {
  kind: "heap";
  nodes: HeapNode[];
  /** Index currently being sifted down, or null */
  activeIndex: number | null;
  /** Pair of indices being compared, or null */
  compareIndices: [number, number] | null;
}

/* -------------------------------------------------------------------------- */
/*                          Stack / Queue Structure                            */
/* -------------------------------------------------------------------------- */

export type StackElementState = "default" | "pushing" | "popping" | "matched" | "mismatched";
export type InputCharState = "default" | "current" | "processed" | "matched" | "mismatched";

export interface StackElement {
  value: string;
  state: StackElementState;
}

export interface InputChar {
  value: string;
  state: InputCharState;
}

export interface StackQueueVisualState {
  kind: "stack-queue";
  /** Current stack contents, bottom to top */
  stackElements: StackElement[];
  /** Every character of the input string with its processing state */
  inputChars: InputChar[];
  /** Index of the character currently being processed */
  inputIndex: number;
  /** Human-readable status shown below the visualizer */
  statusMessage: string | null;
}

/* -------------------------------------------------------------------------- */
/*                             Hash Map Structure                              */
/* -------------------------------------------------------------------------- */

export type HashMapEntryState =
  | "default"
  | "inserting"
  | "looking-up"
  | "found"
  | "updating"
  | "deleting"
  | "counting"
  | "highlighted";
export type HashMapInputElementState =
  | "default"
  | "current"
  | "processed"
  | "found"
  | "matched"
  | "mismatched"
  | "in-window";

export interface HashMapEntry {
  key: string;
  value: string;
  state: HashMapEntryState;
}

export interface HashMapInputElement {
  value: number | string;
  index: number;
  state: HashMapInputElementState;
}

export interface HashMapVisualState {
  kind: "hash-map";
  /** Current entries in insertion order */
  entries: HashMapEntry[];
  /** Every element of the input array with its state */
  inputElements: HashMapInputElement[];
  /** Index currently being processed */
  inputIndex: number;
  /** The complement key currently being looked up, or null */
  lookupKey: string | null;
  /** The result pair [indexA, indexB] once found, or null */
  resultPair: [number, number] | null;
  /** Current algorithm phase label (e.g., "building", "checking", "scanning") */
  phase?: string;
  /** Secondary input row for dual-input algorithms (e.g., Valid Anagram, Ransom Note) */
  secondaryInputElements?: HashMapInputElement[];
  /** Generalized result for algorithms returning diverse types */
  result?: string | string[] | number | number[] | boolean | string[][] | null;
  /** Grouped result for Group Anagrams-style output */
  groupResult?: Record<string, string[]>;
  /** Sliding window start index over input elements */
  windowStart?: number;
  /** Sliding window end index over input elements */
  windowEnd?: number;
  /** Running prefix sum value for prefix-sum algorithms */
  prefixSum?: number;
}

/* -------------------------------------------------------------------------- */
/*                              String Structure                               */
/* -------------------------------------------------------------------------- */

export type StringCharState = "default" | "current" | "matching" | "matched" | "mismatched";
export type FailureTableEntryState = "default" | "computing" | "computed";

export interface StringChar {
  value: string;
  state: StringCharState;
}

export interface FailureTableEntry {
  index: number;
  value: number;
  state: FailureTableEntryState;
}

export interface StringVisualState {
  kind: "string";
  /** Characters of the text being searched */
  textChars: StringChar[];
  /** Characters of the pattern being searched for */
  patternChars: StringChar[];
  /** Failure/prefix table entries (built during phase 1) */
  failureTable: FailureTableEntry[];
  /** How many characters into text the pattern is currently aligned */
  patternOffset: number;
  /** Current index in text */
  textIndex: number;
  /** Current index in pattern */
  patternIndex: number;
  /** null = searching, true = found, false = not found */
  matchFound: boolean | null;
}

/* -------------------------------------------------------------------------- */
/*                              Matrix Structure                               */
/* -------------------------------------------------------------------------- */

export type MatrixCellState = "default" | "current" | "collected" | "boundary";
export type SpiralDirection = "right" | "down" | "left" | "up";

export interface MatrixCell {
  row: number;
  col: number;
  value: number;
  state: MatrixCellState;
}

export interface MatrixBoundaries {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface MatrixVisualState {
  kind: "matrix";
  /** 2D array of cells — rows × cols */
  cells: MatrixCell[][];
  /** Elements collected in spiral order so far */
  collectedOrder: number[];
  /** Currently active cell position, or null */
  currentPosition: [number, number] | null;
  /** Active traversal direction */
  direction: SpiralDirection | null;
  /** Current shrinking boundaries */
  boundaries: MatrixBoundaries;
}

/* -------------------------------------------------------------------------- */
/*                               Set Structure                                 */
/* -------------------------------------------------------------------------- */

export type SetElementState = "default" | "current" | "checking" | "found" | "not-found" | "added";
export type SetPhase = "building" | "checking";

export interface SetElement {
  value: number;
  state: SetElementState;
}

export interface SetVisualState {
  kind: "set";
  /** Elements of set A (input array A) */
  setA: SetElement[];
  /** Elements of set B (input array B) */
  setB: SetElement[];
  /** The hash set built from array A */
  hashSet: SetElement[];
  /** Elements found in both sets */
  result: number[];
  /** The element currently being processed, or null */
  currentElement: number | null;
  /** "building" = populating hash set from A, "checking" = iterating B */
  phase: SetPhase;
}
