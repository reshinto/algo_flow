/** Step generator for Trie Prefix Count — produces ExecutionStep[] using TrieTracker. */

import type { ExecutionStep } from "@/types";
import { TrieTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const TRIE_PREFIX_COUNT_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.TRIE_PREFIX_COUNT!);

export interface TriePrefixCountInput {
  words: string[];
  prefix: string;
}

export function generateTriePrefixCountSteps(input: TriePrefixCountInput): ExecutionStep[] {
  const { words, prefix } = input;
  const tracker = new TrieTracker(TRIE_PREFIX_COUNT_LINE_MAP);

  tracker.initialize({ words, prefix });

  // childrenMap: nodeId -> (char -> childNodeId)
  const childrenMap = new Map<number, Map<string, number>>();
  childrenMap.set(0, new Map());

  // prefixCountMap: nodeId -> count of words passing through this node
  const prefixCountMap = new Map<number, number>();
  prefixCountMap.set(0, 0);

  // Phase 1 — Insert all words into the trie, tracking prefix counts per node
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
        // Increment the prefix count for this existing node
        prefixCountMap.set(existingChildId, (prefixCountMap.get(existingChildId) ?? 0) + 1);
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
        // New node starts with prefixCount of 1 (this word passes through it)
        prefixCountMap.set(newNodeId, 1);
        parentId = newNodeId;
      }
    }

    tracker.markEndOfWord(parentId, { currentWord: word, phase: "insert" });
  }

  // Phase 2 — Traverse the trie for the prefix, following each character
  tracker.setSearchWord(prefix, { prefix, phase: "search" });

  let currentNodeId = 0;
  let prefixFailed = false;

  for (let charIdx = 0; charIdx < prefix.length; charIdx++) {
    const char = prefix[charIdx]!;
    const currentChildren = childrenMap.get(currentNodeId) ?? new Map<string, number>();
    const nextNodeId = currentChildren.get(char);
    const found = nextNodeId !== undefined;

    tracker.searchChar(found ? nextNodeId! : currentNodeId, charIdx, found, {
      prefix,
      char,
      charIdx,
      phase: "search",
    });

    if (!found) {
      prefixFailed = true;
      break;
    }

    currentNodeId = nextNodeId!;
  }

  // Determine the count — zero if prefix was not found, otherwise the prefixCount at terminal node
  const resultCount = prefixFailed ? 0 : (prefixCountMap.get(currentNodeId) ?? 0);

  if (!prefixFailed) {
    tracker.matchFound({ prefix, result: resultCount });
  }

  tracker.complete({ prefix, result: resultCount });

  return tracker.getSteps();
}
