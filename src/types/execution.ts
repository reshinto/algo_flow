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
  | "traverse-left"
  | "traverse-right"
  | "traverse-next"
  | "reverse-pointer"
  | "sift-down"
  | "heap-swap"
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

export type HeapNodeState = "default" | "comparing" | "swapping" | "settled" | "current";

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

export type HashMapEntryState = "default" | "inserting" | "looking-up" | "found";
export type HashMapInputElementState = "default" | "current" | "processed" | "found";

export interface HashMapEntry {
  key: string;
  value: string;
  state: HashMapEntryState;
}

export interface HashMapInputElement {
  value: number;
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
