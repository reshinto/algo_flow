/** Step generator for Auto-Complete with Trie — produces ExecutionStep[] using TrieTracker. */

import type { ExecutionStep } from "@/types";
import { TrieTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const AUTO_COMPLETE_TRIE_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.AUTO_COMPLETE_TRIE!);

export interface AutoCompleteTrieInput {
  words: string[];
  prefix: string;
}

export function generateAutoCompleteTrieSteps(input: AutoCompleteTrieInput): ExecutionStep[] {
  const { words, prefix } = input;
  const tracker = new TrieTracker(AUTO_COMPLETE_TRIE_LINE_MAP);

  tracker.initialize({ words, prefix });

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

  // Phase 2 — Navigate to the end of the prefix
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

  // Phase 3 — DFS to collect all complete words under the prefix node
  const collectedSuggestions: string[] = [];

  if (!prefixFailed) {
    // nodeStack: pairs of [nodeId, wordSoFar] to traverse depth-first
    const nodeStack: Array<[number, string]> = [[currentNodeId, prefix]];

    while (nodeStack.length > 0) {
      const entry = nodeStack.pop()!;
      const [visitNodeId, wordSoFar] = entry;

      if (endNodeIds.has(visitNodeId)) {
        collectedSuggestions.push(wordSoFar);
        tracker.addSuggestion(wordSoFar, {
          prefix,
          word: wordSoFar,
          phase: "collect",
        });
      }

      const visitChildren = childrenMap.get(visitNodeId) ?? new Map<string, number>();
      // Push children in reverse sorted order so alphabetically first is processed first
      const sortedEntries = Array.from(visitChildren.entries()).sort(([charA], [charB]) =>
        charB.localeCompare(charA),
      );

      for (const [childChar, childNodeId] of sortedEntries) {
        nodeStack.push([childNodeId, wordSoFar + childChar]);
      }
    }
  }

  tracker.complete({
    prefix,
    suggestions: collectedSuggestions,
  });

  return tracker.getSteps();
}
