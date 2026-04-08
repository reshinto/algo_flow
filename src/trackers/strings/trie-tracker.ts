/**
 * Trie tracker — builds execution steps for trie-based algorithms (insert, search,
 * autocomplete, Aho-Corasick failure links).
 *
 * Manages nodes, edges, the active traversal path, a searchWord character list,
 * and autocomplete suggestions, emitting steps for each structural operation.
 */
import type {
  StringChar,
  StringCharState,
  TrieNode,
  TrieNodeState,
  TrieEdge,
  TrieEdgeState,
  TrieVisualState,
} from "@/types";

import { BaseTracker } from "../base-tracker";
import type { LineMap } from "../base-tracker";

export class TrieTracker extends BaseTracker {
  private nodes: TrieNode[];
  private edges: TrieEdge[];
  private currentPath: number[];
  private searchWord: StringChar[];
  private highlightedNodes: number[];
  private matchResult: boolean | null;
  private suggestions: string[];

  /** Counter for assigning unique IDs to newly created nodes. */
  private nextNodeId: number = 1;

  constructor(lineMap: LineMap) {
    super(lineMap);
    // Root node is always id=0, represents the empty prefix
    this.nodes = [{ id: 0, char: "", isEnd: false, state: "default" }];
    this.edges = [];
    this.currentPath = [];
    this.searchWord = [];
    this.highlightedNodes = [];
    this.matchResult = null;
    this.suggestions = [];
  }

  // ---------------------------------------------------------------------------
  // Snapshot
  // ---------------------------------------------------------------------------

  /** Return a deep copy of the current visual state for step recording. */
  private snapshot(): TrieVisualState {
    return {
      kind: "string-trie",
      nodes: this.nodes.map((node) => ({ ...node })),
      edges: this.edges.map((edge) => ({ ...edge })),
      currentPath: [...this.currentPath],
      searchWord: this.searchWord.map((char) => ({ ...char })),
      highlightedNodes: [...this.highlightedNodes],
      matchResult: this.matchResult,
      suggestions: [...this.suggestions],
    };
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  /** Set the visual state of a node by its id. No-op if the node is not found. */
  private setNodeState(nodeId: number, state: TrieNodeState): void {
    const node = this.nodes.find((candidate) => candidate.id === nodeId);
    if (node) node.state = state;
  }

  /** Set the visual state of an edge identified by its from/to pair. No-op if not found. */
  private setEdgeState(fromId: number, toId: number, state: TrieEdgeState): void {
    const edge = this.edges.find((candidate) => candidate.from === fromId && candidate.to === toId);
    if (edge) edge.state = state;
  }

  /**
   * Reset all nodes and edges that carry a "current" or "inserted" state back
   * to "default". Used at completion to leave the trie in a clean resting state.
   */
  private clearCurrentStates(): void {
    for (const node of this.nodes) {
      if (node.state === "current" || node.state === "inserted") {
        node.state = "default";
      }
    }
    for (const edge of this.edges) {
      if (edge.state === "highlighted") {
        edge.state = "default";
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Public step-emitting methods
  // ---------------------------------------------------------------------------

  /** Emit the initial step before any trie operations begin. */
  initialize(variables: Record<string, unknown>): void {
    this.pushStep({
      type: "initialize",
      description: "Initialize trie with empty root node",
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Set the searchWord character list from a plain string and emit a step.
   * Each character starts with "default" state, ready for per-char highlighting.
   */
  setSearchWord(word: string, variables: Record<string, unknown>): void {
    this.searchWord = word
      .split("")
      .map((char) => ({ value: char, state: "default" as StringCharState }));
    this.pushStep({
      type: "visit",
      description: `Set search word: "${word}"`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Create a new trie node as a child of parentId for the given character.
   * Adds the corresponding edge, marks both as "inserted"/"highlighted", and
   * returns the new node's id.
   */
  createNode(parentId: number, char: string, variables: Record<string, unknown>): number {
    const newNodeId = this.nextNodeId;
    this.nextNodeId += 1;

    this.nodes.push({ id: newNodeId, char, isEnd: false, state: "inserted" });
    this.edges.push({ from: parentId, to: newNodeId, char, state: "highlighted" });

    this.pushStep({
      type: "insert-trie",
      description: `Create node '${char}' (id=${newNodeId}) as child of node ${parentId}`,
      variables,
      visualState: this.snapshot(),
    });

    return newNodeId;
  }

  /**
   * Move the active traversal cursor along an existing edge from fromId to toId.
   * Marks the destination node as "current", adds it to currentPath, highlights
   * the edge, and marks the corresponding searchWord character as "current".
   */
  traverseEdge(fromId: number, toId: number, variables: Record<string, unknown>): void {
    this.setNodeState(toId, "current");
    this.currentPath.push(toId);
    this.setEdgeState(fromId, toId, "highlighted");

    // Highlight the searchWord character that corresponds to this traversal depth.
    // currentPath length after push is the 1-based depth, so index = depth - 1.
    const charIdx = this.currentPath.length - 1;
    const searchChar = this.searchWord[charIdx];
    if (searchChar) searchChar.state = "current";

    this.pushStep({
      type: "traverse-trie",
      description: `Traverse edge ${fromId} → ${toId} ('${this.nodes.find((node) => node.id === toId)?.char ?? ""}')`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Mark an existing node as "inserted" during an insertion pass.
   * Increments the swaps metric to track structural modifications.
   */
  insertChar(nodeId: number, char: string, variables: Record<string, unknown>): void {
    this.setNodeState(nodeId, "inserted");
    this.metrics = { ...this.metrics, swaps: this.metrics.swaps + 1 };
    this.pushStep({
      type: "insert-trie",
      description: `Insert character '${char}' at node ${nodeId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Mark a node as the end of a valid word (sets isEnd and transitions to "matched"). */
  markEndOfWord(nodeId: number, variables: Record<string, unknown>): void {
    const node = this.nodes.find((candidate) => candidate.id === nodeId);
    if (node) {
      node.isEnd = true;
      node.state = "matched";
    }
    this.pushStep({
      type: "mark-end-word",
      description: `Mark node ${nodeId} as end of word`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Check whether a character at the given searchWord index exists in the trie
   * at nodeId. Updates node and character highlight states, increments comparisons.
   */
  searchChar(
    nodeId: number,
    charIdx: number,
    found: boolean,
    variables: Record<string, unknown>,
  ): void {
    this.metrics = { ...this.metrics, comparisons: this.metrics.comparisons + 1 };

    const searchChar = this.searchWord[charIdx];
    if (found) {
      this.setNodeState(nodeId, "current");
      if (searchChar) searchChar.state = "matching";
    } else {
      this.matchResult = false;
      if (searchChar) searchChar.state = "mismatched";
    }

    this.pushStep({
      type: "traverse-trie",
      description: found
        ? `Found character at node ${nodeId} (index ${charIdx})`
        : `Character not found at index ${charIdx} — search fails`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Record a successful full-word match. Sets matchResult to true, marks all
   * nodes in currentPath as "matched", and marks all searchWord chars as "matched".
   */
  matchFound(variables: Record<string, unknown>): void {
    this.matchResult = true;

    for (const nodeId of this.currentPath) {
      this.setNodeState(nodeId, "matched");
    }
    for (const char of this.searchWord) {
      char.state = "matched";
    }

    this.pushStep({
      type: "found",
      description: "Word found in trie",
      variables,
      visualState: this.snapshot(),
    });
  }

  /** Append a completed word to the autocomplete suggestions list. */
  addSuggestion(word: string, variables: Record<string, unknown>): void {
    this.suggestions.push(word);
    this.pushStep({
      type: "add-to-result",
      description: `Add suggestion: "${word}"`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Record a failure-link (Aho-Corasick) edge between two nodes.
   * Marks the edge as "traversed" and adds both endpoints to highlightedNodes.
   */
  buildFailureLinks(fromId: number, toId: number, variables: Record<string, unknown>): void {
    this.setEdgeState(fromId, toId, "traversed");

    if (!this.highlightedNodes.includes(fromId)) {
      this.highlightedNodes.push(fromId);
    }
    if (!this.highlightedNodes.includes(toId)) {
      this.highlightedNodes.push(toId);
    }

    this.pushStep({
      type: "build-failure",
      description: `Build failure link: ${fromId} → ${toId}`,
      variables,
      visualState: this.snapshot(),
    });
  }

  /**
   * Finalize the algorithm run. Clears transient "current" states, resets
   * currentPath, and emits the terminal step.
   */
  complete(variables: Record<string, unknown>): void {
    this.clearCurrentStates();
    this.currentPath = [];

    this.pushStep({
      type: "complete",
      description:
        this.matchResult === true
          ? "Search complete — word found"
          : this.matchResult === false
            ? "Search complete — word not found"
            : "Trie operation complete",
      variables,
      visualState: this.snapshot(),
    });
  }
}
