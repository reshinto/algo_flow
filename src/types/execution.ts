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
  | "delete-node"
  | "insert-node"
  | "update-head"
  | "mark-cycle"
  | "link-doubly"
  | "swap-cells"
  | "mark-cell"
  | "zero-cell"
  | "flip-cell"
  | "compare-cell"
  | "mark-found"
  | "eliminate-region"
  | "place-value"
  | "compute-value"
  | "verify-cell"
  | "select-layer"
  | "process-layer"
  | "accumulate"
  | "carve-cell"
  | "merge-cells"
  | "add-to-result"
  | "skip-element"
  | "check-subset"
  | "subset-pass"
  | "subset-fail"
  | "count-element"
  | "compare-count"
  | "generate-subset"
  | "generate-pair"
  | "generate-permutation"
  | "hash-element"
  | "set-bit"
  | "check-bit"
  | "insert-bucket"
  | "evict-element"
  | "union-sets"
  | "find-root"
  | "select-set"
  | "peek"
  | "evaluate"
  | "output"
  | "maintain-monotonic"
  | "enqueue-front"
  | "dequeue-rear"
  | "transfer"
  | "resolve"
  | "expand-center"
  | "check-palindrome"
  | "update-frequency"
  | "window-match"
  | "read-char"
  | "write-char"
  | "swap-pointers"
  | "insert-trie"
  | "traverse-trie"
  | "mark-end-word"
  | "compute-distance"
  | "trace-edit-path"
  | "build-suffix"
  | "hash-compute"
  | "hash-match"
  | "skip-char"
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
  | SetVisualState
  | PalindromeVisualState
  | FrequencyVisualState
  | TransformVisualState
  | TrieVisualState
  | DistanceVisualState;

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
export type GridCellState =
  | "default"
  | "open"
  | "closed"
  | "path"
  | "current"
  | "open-reverse"
  | "closed-reverse"
  | "jump-point"
  | "carved"
  | "generating";

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
  /** For bidirectional search: the reverse frontier's reconstructed path */
  reversePath?: [number, number][];
  /** For maze generation: total cells carved so far */
  carvedCount?: number;
  /** General-purpose phase label (e.g., "forward", "backward", "generating") */
  phase?: string;
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

export type LinkedListNodeState =
  | "default"
  | "current"
  | "processed"
  | "swapping"
  | "in-cycle"
  | "deleted"
  | "inserted"
  | "highlighted"
  | "found";

export interface LinkedListNode {
  id: string;
  value: number;
  nextId: string | null;
  /** Backward pointer for doubly-linked list algorithms. Omitted for singly-linked. */
  prevId?: string | null;
  state: LinkedListNodeState;
  position: { x: number; y: number };
}

export interface LinkedListVisualState {
  kind: "linked-list";
  nodes: LinkedListNode[];
  /** ID of the current head node */
  headId: string | null;
  /** Second head for two-list algorithms (merge, intersection, add-two-numbers) */
  secondaryHeadId?: string | null;
  /** Named pointer positions: "prev", "current", "next" → node ID or null */
  pointers: Record<string, string | null>;
  /** Edge that closes a cycle, rendered as a curved arc */
  cycleEdge?: { fromId: string; toId: string };
  /** Current algorithm phase label (e.g. "detecting", "merging") */
  phase?: string;
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

export type NumericInputState = "default" | "current" | "processed" | "result-pending" | "resolved";

export interface NumericInputElement {
  value: number;
  index: number;
  state: NumericInputState;
}

export type OutputElementState = "default" | "new" | "computed";

export interface OutputElement {
  value: string;
  state: OutputElementState;
}

export type ResultElementState = "default" | "pending" | "resolved";

export interface ResultElement {
  value: number | null;
  index: number;
  state: ResultElementState;
}

export interface CircularBufferState {
  elements: (string | number | null)[];
  frontIndex: number;
  rearIndex: number;
  capacity: number;
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
  /** Numeric input array for number-based problems */
  inputArray?: NumericInputElement[];
  /** Queue contents (front to back) for queue-based problems */
  queueElements?: StackElement[];
  /** Secondary/auxiliary stack (e.g., min-stack's min tracker) */
  auxiliaryStack?: StackElement[];
  /** Output/result tokens for expression evaluation */
  outputElements?: OutputElement[];
  /** Result array for problems producing numeric output */
  resultArray?: ResultElement[];
  /** Monotonic ordering indicator */
  monotonicOrder?: "increasing" | "decreasing" | null;
  /** Circular buffer state for circular queue/deque */
  circularBuffer?: CircularBufferState;
  /** Phase label for multi-phase algorithms */
  phase?: string;
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
/*                           Palindrome Structure                              */
/* -------------------------------------------------------------------------- */

/** Visual state for palindrome checking algorithms with two-pointer or center expansion. */
export interface PalindromeVisualState {
  kind: "string-palindrome";
  /** Characters of the string being analyzed */
  chars: StringChar[];
  /** Left pointer position */
  leftPointer: number;
  /** Right pointer position */
  rightPointer: number;
  /** Center index for expand-around-center approach, null if not applicable */
  centerIndex: number | null;
  /** Current expansion radius from center */
  expandRadius: number;
  /** null = checking, true = is palindrome, false = not palindrome */
  isPalindrome: boolean | null;
  /** Start index of the longest palindrome found so far */
  longestStart: number;
  /** Length of the longest palindrome found so far */
  longestLength: number;
}

/* -------------------------------------------------------------------------- */
/*                        Character Frequency Structure                         */
/* -------------------------------------------------------------------------- */

export type FrequencyEntryState = "default" | "partial" | "satisfied" | "excess";

/** A single entry in the character frequency map visualization. */
export interface FrequencyEntry {
  char: string;
  count: number;
  targetCount: number;
  state: FrequencyEntryState;
}

/** Visual state for algorithms that compare character frequencies or use sliding windows. */
export interface FrequencyVisualState {
  kind: "string-frequency";
  /** Primary string characters */
  primaryChars: StringChar[];
  /** Secondary string characters (empty array if single-string algorithm) */
  secondaryChars: StringChar[];
  /** Character frequency map entries */
  frequencyMap: FrequencyEntry[];
  /** Sliding window start index */
  windowStart: number;
  /** Sliding window end index */
  windowEnd: number;
  /** Number of matches found so far */
  matchCount: number;
  /** Indices where matches were found */
  resultIndices: number[];
}

/* -------------------------------------------------------------------------- */
/*                        String Transform Structure                           */
/* -------------------------------------------------------------------------- */

/** Visual state for string transformation algorithms (reverse, compress, convert). */
export interface TransformVisualState {
  kind: "string-transform";
  /** Input string characters */
  inputChars: StringChar[];
  /** Output string characters built during transformation */
  outputChars: StringChar[];
  /** Read pointer position in the input */
  readPointer: number;
  /** Write pointer position in the output */
  writePointer: number;
  /** Current transformation phase label */
  phase: string;
  /** Auxiliary data for display (e.g., running count, Roman numeral value) */
  auxiliaryData: string | null;
}

/* -------------------------------------------------------------------------- */
/*                              Trie Structure                                 */
/* -------------------------------------------------------------------------- */

export type TrieNodeState = "default" | "current" | "matched" | "path" | "inserted";
export type TrieEdgeState = "default" | "highlighted" | "traversed";

/** A node in the trie tree visualization. */
export interface TrieNode {
  id: number;
  char: string;
  isEnd: boolean;
  state: TrieNodeState;
}

/** An edge in the trie tree visualization connecting parent to child. */
export interface TrieEdge {
  from: number;
  to: number;
  char: string;
  state: TrieEdgeState;
}

/** Visual state for trie-based algorithms with tree structure and path highlighting. */
export interface TrieVisualState {
  kind: "string-trie";
  /** All trie nodes */
  nodes: TrieNode[];
  /** All trie edges */
  edges: TrieEdge[];
  /** Node IDs forming the currently active path */
  currentPath: number[];
  /** Characters of the word being searched/inserted */
  searchWord: StringChar[];
  /** Node IDs that should be highlighted */
  highlightedNodes: number[];
  /** null = searching, true = found, false = not found */
  matchResult: boolean | null;
  /** Auto-complete suggestions collected so far */
  suggestions: string[];
}

/* -------------------------------------------------------------------------- */
/*                         Edit Distance Structure                             */
/* -------------------------------------------------------------------------- */

export type DistanceCellState = "default" | "computing" | "computed" | "path" | "current";

/** A cell in the edit distance DP matrix. */
export interface DistanceCell {
  value: number;
  state: DistanceCellState;
}

/** Describes a single edit operation in the optimal edit path. */
export interface EditOperation {
  type: "insert" | "delete" | "replace" | "match";
  sourceIdx: number;
  targetIdx: number;
}

/** Visual state for edit distance and string similarity algorithms using DP matrices. */
export interface DistanceVisualState {
  kind: "string-distance";
  /** Source string characters */
  sourceChars: StringChar[];
  /** Target string characters */
  targetChars: StringChar[];
  /** DP matrix (rows = source+1, cols = target+1) */
  matrix: DistanceCell[][];
  /** Current row being computed */
  currentRow: number;
  /** Current column being computed */
  currentCol: number;
  /** Edit operations in the optimal path */
  operations: EditOperation[];
  /** Final distance/similarity result, null while computing */
  result: number | null;
}

/* -------------------------------------------------------------------------- */
/*                              Matrix Structure                               */
/* -------------------------------------------------------------------------- */

export type MatrixCellState =
  | "default"
  | "current"
  | "collected"
  | "boundary"
  | "swapping"
  | "swapped"
  | "zeroed"
  | "marked"
  | "flipped"
  | "comparing"
  | "found"
  | "searching"
  | "eliminated"
  | "placed"
  | "computing"
  | "layer-active"
  | "layer-processed";

export type SpiralDirection = "right" | "down" | "left" | "up";

export type MatrixTraversalDirection =
  | SpiralDirection
  | "diagonal-down"
  | "diagonal-up"
  | "zigzag-left"
  | "zigzag-right";

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

export interface MatrixSearchRegion {
  topRow: number;
  bottomRow: number;
  leftCol: number;
  rightCol: number;
}

export interface MatrixVisualState {
  kind: "matrix";
  /** 2D array of cells — rows × cols */
  cells: MatrixCell[][];
  /** Elements collected in traversal order so far */
  collectedOrder: number[];
  /** Currently active cell position, or null */
  currentPosition: [number, number] | null;
  /** Active traversal direction */
  direction: MatrixTraversalDirection | null;
  /** Current shrinking boundaries */
  boundaries: MatrixBoundaries;
  /** Active operation label for status bar (e.g., "Rotating", "Searching") */
  operationLabel?: string;
  /** For transform: source cell of an in-progress swap */
  swapSource?: [number, number] | null;
  /** For transform: target cell of an in-progress swap */
  swapTarget?: [number, number] | null;
  /** For search: the region currently under consideration */
  searchRegion?: MatrixSearchRegion | null;
  /** For search: value being searched for */
  searchTarget?: number | null;
  /** For construction: order in which cells were filled */
  fillOrder?: number[];
  /** For layer: which layer (0-based ring index) is currently active */
  activeLayer?: number | null;
  /** For layer: total number of layers */
  totalLayers?: number;
  /** General-purpose phase label */
  phase?: string;
  /** Result value for algorithms returning a scalar (e.g., diagonal sum) */
  scalarResult?: number | null;
  /** Second matrix for before/after display (e.g., showing original) */
  originalCells?: MatrixCell[][] | null;
}

/* -------------------------------------------------------------------------- */
/*                               Set Structure                                 */
/* -------------------------------------------------------------------------- */

export type SetElementState =
  | "default"
  | "current"
  | "checking"
  | "found"
  | "not-found"
  | "added"
  | "adding"
  | "skipped"
  | "counted"
  | "generated"
  | "hashed"
  | "bit-set"
  | "bit-checked"
  | "evicted"
  | "root"
  | "compressed"
  | "selected";

export type SetPhase =
  | "building"
  | "checking"
  | "counting"
  | "comparing"
  | "generating"
  | "hashing"
  | "querying"
  | "union"
  | "finding"
  | "selecting"
  | "complete";

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
  /** Elements in result */
  result: number[];
  /** The element currently being processed, or null */
  currentElement: number | null;
  /** Current algorithm phase */
  phase: SetPhase;

  /* ---- Operations extensions ---- */
  /** Universal set elements (complement) */
  universalSet?: SetElement[];
  /** Boolean result for predicate algorithms (subset, superset, equality) */
  booleanResult?: boolean | null;
  /** Frequency counters for set A (multiset operations) */
  countersA?: Record<string, number>;
  /** Frequency counters for set B (multiset operations) */
  countersB?: Record<string, number>;

  /* ---- Generation extensions ---- */
  /** All generated subsets/pairs/permutations so far */
  generatedSets?: number[][];
  /** Current partial subset being built */
  currentSubset?: number[];
  /** Recursion depth or iteration index */
  generationDepth?: number;
  /** Total expected output count */
  totalExpected?: number;

  /* ---- Membership extensions ---- */
  /** Bit array visualization (bloom/cuckoo filter) */
  bitArray?: SetElement[];
  /** Hash function results for current element */
  hashPositions?: number[];
  /** Bucket array (cuckoo filter) */
  buckets?: (SetElement | null)[];
  /** Whether current query is a false positive */
  falsePositive?: boolean;
  /** 2D counter grid (count-min-sketch) */
  sketchGrid?: number[][];
  /** Number of hash functions */
  hashFunctionCount?: number;

  /* ---- Disjoint-sets extensions ---- */
  /** Parent array visualization (union-find) */
  parentArray?: SetElement[];
  /** Rank array (union-find) */
  rankArray?: number[];
  /** Tree edges [child, parent] (union-find) */
  treeEdges?: [number, number][];
  /** Component groupings (union-find) */
  components?: number[][];

  /* ---- Optimization extensions ---- */
  /** Available sets to choose from (set-cover) */
  availableSets?: { elements: number[]; state: SetElementState }[];
  /** Uncovered elements remaining (set-cover) */
  uncoveredElements?: SetElement[];
  /** Chosen sets so far (set-cover) */
  chosenSets?: number[][];

  /* ---- General ---- */
  /** Operation label for status display */
  operationLabel?: string;
}
