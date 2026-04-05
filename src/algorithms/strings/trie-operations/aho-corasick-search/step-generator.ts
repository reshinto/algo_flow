/** Step generator for Aho-Corasick Search — produces ExecutionStep[] using TrieTracker. */

import type { ExecutionStep } from "@/types";
import { TrieTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const AHO_CORASICK_SEARCH_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.AHO_CORASICK_SEARCH!);

export interface AhoCorasickSearchInput {
  text: string;
  patterns: string[];
}

interface AhoCorasickNodeInternal {
  nodeId: number;
  failureLinkNodeId: number; // 0 = root
  outputPatterns: string[];
  isEnd: boolean;
}

export function generateAhoCorasickSearchSteps(input: AhoCorasickSearchInput): ExecutionStep[] {
  const { text, patterns } = input;
  const tracker = new TrieTracker(AHO_CORASICK_SEARCH_LINE_MAP);

  tracker.initialize({ text, patterns });

  // childrenMap: nodeId -> (char -> childNodeId)
  const childrenMap = new Map<number, Map<string, number>>();
  childrenMap.set(0, new Map());

  // nodeMetaMap: nodeId -> AhoCorasickNodeInternal
  const nodeMetaMap = new Map<number, AhoCorasickNodeInternal>();
  nodeMetaMap.set(0, { nodeId: 0, failureLinkNodeId: 0, outputPatterns: [], isEnd: false });

  // Phase 1: Insert all patterns into the trie
  for (const pattern of patterns) {
    tracker.setSearchWord(pattern, { currentPattern: pattern, phase: "insert" });

    let parentId = 0;

    for (let charIdx = 0; charIdx < pattern.length; charIdx++) {
      const char = pattern[charIdx]!;
      const parentChildren = childrenMap.get(parentId) ?? new Map<string, number>();
      const existingChildId = parentChildren.get(char);

      if (existingChildId !== undefined) {
        tracker.traverseEdge(parentId, existingChildId, {
          currentPattern: pattern,
          char,
          charIdx,
          nodeId: existingChildId,
          phase: "insert",
        });
        tracker.insertChar(existingChildId, char, {
          currentPattern: pattern,
          char,
          charIdx,
          nodeId: existingChildId,
          phase: "insert",
        });
        parentId = existingChildId;
      } else {
        const newNodeId = tracker.createNode(parentId, char, {
          currentPattern: pattern,
          char,
          charIdx,
          phase: "insert",
        });
        parentChildren.set(char, newNodeId);
        childrenMap.set(parentId, parentChildren);
        childrenMap.set(newNodeId, new Map());
        nodeMetaMap.set(newNodeId, {
          nodeId: newNodeId,
          failureLinkNodeId: 0,
          outputPatterns: [],
          isEnd: false,
        });
        parentId = newNodeId;
      }
    }

    // Mark end of pattern — update node meta with output pattern
    const endMeta = nodeMetaMap.get(parentId);
    if (endMeta) {
      endMeta.isEnd = true;
      endMeta.outputPatterns.push(pattern);
    }
    tracker.markEndOfWord(parentId, { currentPattern: pattern, phase: "insert" });
  }

  // Phase 2: Build failure links via BFS
  const bfsQueue: number[] = [];

  // Direct children of root get failure link pointing to root (node 0)
  const rootChildren = childrenMap.get(0) ?? new Map<string, number>();
  for (const childNodeId of rootChildren.values()) {
    const childMeta = nodeMetaMap.get(childNodeId);
    if (childMeta) {
      childMeta.failureLinkNodeId = 0;
    }
    tracker.buildFailureLinks(childNodeId, 0, {
      fromNodeId: childNodeId,
      toNodeId: 0,
      phase: "build-failure-links",
    });
    bfsQueue.push(childNodeId);
  }

  let bfsIndex = 0;
  while (bfsIndex < bfsQueue.length) {
    const currentNodeId = bfsQueue[bfsIndex]!;
    bfsIndex += 1;

    const currentChildren = childrenMap.get(currentNodeId) ?? new Map<string, number>();
    const currentMeta = nodeMetaMap.get(currentNodeId);

    for (const [char, childNodeId] of currentChildren.entries()) {
      // Walk failure links of current node to find the longest proper suffix that has char as a child
      let failureStateId = currentMeta?.failureLinkNodeId ?? 0;

      while (failureStateId !== 0) {
        const failureChildren = childrenMap.get(failureStateId) ?? new Map<string, number>();
        if (failureChildren.has(char)) break;
        const failureMeta = nodeMetaMap.get(failureStateId);
        failureStateId = failureMeta?.failureLinkNodeId ?? 0;
      }

      // Determine the failure link target for this child
      const failureStateChildren = childrenMap.get(failureStateId) ?? new Map<string, number>();
      let failureLinkTarget = failureStateChildren.get(char) ?? 0;
      if (failureLinkTarget === childNodeId) {
        failureLinkTarget = 0;
      }

      const childMeta = nodeMetaMap.get(childNodeId);
      if (childMeta) {
        childMeta.failureLinkNodeId = failureLinkTarget;

        // Propagate output patterns from the failure link node
        const failureLinkMeta = nodeMetaMap.get(failureLinkTarget);
        if (failureLinkMeta) {
          for (const outputPattern of failureLinkMeta.outputPatterns) {
            if (!childMeta.outputPatterns.includes(outputPattern)) {
              childMeta.outputPatterns.push(outputPattern);
            }
          }
        }
      }

      tracker.buildFailureLinks(childNodeId, failureLinkTarget, {
        fromNodeId: childNodeId,
        toNodeId: failureLinkTarget,
        phase: "build-failure-links",
      });

      bfsQueue.push(childNodeId);
    }
  }

  // Phase 3: Search text using the automaton
  tracker.setSearchWord(text, { text, phase: "search" });

  const foundPatterns = new Set<string>();
  let currentNodeId = 0;

  for (let textIdx = 0; textIdx < text.length; textIdx++) {
    const char = text[textIdx]!;

    // Follow failure links until we find a node with a child for char, or reach root
    while (currentNodeId !== 0) {
      const currentChildren = childrenMap.get(currentNodeId) ?? new Map<string, number>();
      if (currentChildren.has(char)) break;
      const currentMeta = nodeMetaMap.get(currentNodeId);
      currentNodeId = currentMeta?.failureLinkNodeId ?? 0;
    }

    const currentChildren = childrenMap.get(currentNodeId) ?? new Map<string, number>();
    const nextNodeId = currentChildren.get(char);
    const edgeFound = nextNodeId !== undefined;

    tracker.searchChar(edgeFound ? nextNodeId! : currentNodeId, textIdx, edgeFound, {
      text,
      char,
      textIdx,
      phase: "search",
    });

    if (edgeFound) {
      currentNodeId = nextNodeId!;
    }

    // Check for matches at current node (including propagated output patterns)
    const currentMeta = nodeMetaMap.get(currentNodeId);
    if (currentMeta && currentMeta.outputPatterns.length > 0) {
      for (const matchedPattern of currentMeta.outputPatterns) {
        if (!foundPatterns.has(matchedPattern)) {
          foundPatterns.add(matchedPattern);
          tracker.matchFound({ text, matchedPattern, textIdx, phase: "search" });
        }
      }
    }
  }

  const foundArray = Array.from(foundPatterns);

  tracker.complete({
    text,
    patterns,
    result: foundArray,
  });

  return tracker.getSteps();
}
