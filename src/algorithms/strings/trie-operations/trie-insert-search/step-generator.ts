/** Step generator for Trie Insert and Search — produces ExecutionStep[] using TrieTracker. */

import type { ExecutionStep } from "@/types";
import { TrieTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TRIE_INSERT_SEARCH_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TRIE_INSERT_SEARCH!);

export interface TrieInsertSearchInput {
  words: string[];
  search: string;
}

export function generateTrieInsertSearchSteps(input: TrieInsertSearchInput): ExecutionStep[] {
  const { words, search } = input;
  const tracker = new TrieTracker(TRIE_INSERT_SEARCH_LINE_MAP);

  tracker.initialize({ words, search });

  // childrenMap: nodeId -> (char -> childNodeId)
  const childrenMap = new Map<number, Map<string, number>>();
  childrenMap.set(0, new Map());

  // endNodeIds: tracks which node IDs are marked as end-of-word
  const endNodeIds = new Set<number>();

  // Phase 1 — Insert all words into the trie
  for (const word of words) {
    tracker.setSearchWord(word, { currentWord: word, phase: "insert" });

    let parentId = 0;

    for (let charIdx = 0; charIdx < word.length; charIdx++) {
      const char = word[charIdx]!;
      const parentChildren = childrenMap.get(parentId) ?? new Map<string, number>();

      const existingChildId = parentChildren.get(char);

      if (existingChildId !== undefined) {
        tracker.traverseEdge(parentId, existingChildId, {
          currentWord: word,
          char,
          charIdx,
          nodeId: existingChildId,
          phase: "insert",
        });
        tracker.insertChar(existingChildId, char, {
          currentWord: word,
          char,
          charIdx,
          nodeId: existingChildId,
          phase: "insert",
        });
        parentId = existingChildId;
      } else {
        const newNodeId = tracker.createNode(parentId, char, {
          currentWord: word,
          char,
          charIdx,
          phase: "insert",
        });
        parentChildren.set(char, newNodeId);
        childrenMap.set(parentId, parentChildren);
        childrenMap.set(newNodeId, new Map());
        parentId = newNodeId;
      }
    }

    tracker.markEndOfWord(parentId, { currentWord: word, phase: "insert" });
    endNodeIds.add(parentId);
  }

  // Phase 2 — Search for the target word
  tracker.setSearchWord(search, { search, phase: "search" });

  let currentNodeId = 0;
  let searchFailed = false;

  for (let charIdx = 0; charIdx < search.length; charIdx++) {
    const char = search[charIdx]!;
    const currentChildren = childrenMap.get(currentNodeId) ?? new Map<string, number>();
    const nextNodeId = currentChildren.get(char);
    const found = nextNodeId !== undefined;

    tracker.searchChar(found ? nextNodeId! : currentNodeId, charIdx, found, {
      search,
      char,
      charIdx,
      phase: "search",
    });

    if (!found) {
      searchFailed = true;
      break;
    }

    currentNodeId = nextNodeId!;
  }

  const wordFound = !searchFailed && endNodeIds.has(currentNodeId);

  if (wordFound) {
    tracker.matchFound({ search, result: true });
  } else if (!searchFailed) {
    // All characters traversed successfully but the final node is not marked as end-of-word.
    // Emit an isEnd check step as a failed searchChar so matchResult is set to false.
    tracker.searchChar(currentNodeId, search.length, false, {
      search,
      phase: "search",
      reason: "node-is-not-end-of-word",
    });
  }

  tracker.complete({
    search,
    result: wordFound,
  });

  return tracker.getSteps();
}
