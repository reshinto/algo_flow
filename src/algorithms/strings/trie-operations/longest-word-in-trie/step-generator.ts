/** Step generator for Longest Word in Trie — produces ExecutionStep[] using TrieTracker. */

import type { ExecutionStep } from "@/types";
import { TrieTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const LONGEST_WORD_IN_TRIE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.LONGEST_WORD_IN_TRIE!);

export interface LongestWordInTrieInput {
  words: string[];
}

export function generateLongestWordInTrieSteps(input: LongestWordInTrieInput): ExecutionStep[] {
  const { words } = input;
  const tracker = new TrieTracker(LONGEST_WORD_IN_TRIE_LINE_MAP);

  tracker.initialize({ words });

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

  // Phase 2 — DFS traversal: only follow nodes marked as isEnd
  // longestWord tracks the best candidate found so far
  let longestWord = "";

  // DFS stack holds [nodeId, wordBuiltSoFar] pairs
  const dfsStack: [number, string][] = [[0, ""]];

  tracker.setSearchWord("", { longestWord, phase: "search" });

  while (dfsStack.length > 0) {
    const entry = dfsStack.pop()!;
    const currentNodeId = entry[0];
    const currentWord = entry[1];

    const nodeChildren = childrenMap.get(currentNodeId) ?? new Map<string, number>();

    for (const [char, childNodeId] of nodeChildren) {
      // Only follow this child if it is marked as end-of-word (every prefix must be a word)
      if (endNodeIds.has(childNodeId)) {
        const nextWord = currentWord + char;

        tracker.searchChar(childNodeId, nextWord.length - 1, true, {
          char,
          nextWord,
          childNodeId,
          phase: "search",
        });

        if (
          nextWord.length > longestWord.length ||
          (nextWord.length === longestWord.length && nextWord < longestWord)
        ) {
          longestWord = nextWord;
          tracker.matchFound({ longestWord, phase: "search" });
        }

        dfsStack.push([childNodeId, nextWord]);
      }
    }
  }

  tracker.complete({ result: longestWord, longestWord });

  return tracker.getSteps();
}
