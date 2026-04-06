/** Step generator for Huffman Coding Tree — builds tree bottom-up from frequencies. */

import type { ExecutionStep, TreeNode } from "@/types";
import { AdvancedTreeTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

const HUFFMAN_LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.HUFFMAN_CODING_TREE!);

export interface HuffmanCodingTreeInput {
  frequencies: { char: string; freq: number }[];
}

interface HuffmanInternalNode {
  id: string;
  freq: number;
  char: string | null;
  leftId: string | null;
  rightId: string | null;
  parentId: string | null;
}

export function generateHuffmanCodingTreeSteps(input: HuffmanCodingTreeInput): ExecutionStep[] {
  const { frequencies } = input;
  const allNodes = new Map<string, HuffmanInternalNode>();
  let nodeCounter = 0;

  const tracker = new AdvancedTreeTracker([], "hroot", HUFFMAN_LINE_MAP);
  tracker.initialize("Huffman Coding Tree", { frequencies });

  function makeId(): string {
    nodeCounter += 1;
    return `h${nodeCounter}`;
  }

  function toTreeNodes(): TreeNode[] {
    // Layout: place leaf nodes and internal nodes in a tree
    const posMap = new Map<string, { x: number; y: number }>();
    // Find root (node with no parent)
    const rootNode = Array.from(allNodes.values()).find((node) => !node.parentId);
    const rootId = rootNode?.id ?? null;

    function assignPos(nodeId: string | null, depth: number, minX: number, maxX: number): void {
      if (!nodeId) return;
      const node = allNodes.get(nodeId);
      if (!node) return;
      const midX = (minX + maxX) / 2;
      posMap.set(nodeId, { x: midX, y: depth * 80 + 40 });
      assignPos(node.leftId, depth + 1, minX, midX);
      assignPos(node.rightId, depth + 1, midX, maxX);
    }

    assignPos(rootId, 0, 20, 480);

    return Array.from(allNodes.values()).map((node) => ({
      id: node.id,
      value: node.freq,
      parentId: node.parentId,
      leftChildId: node.leftId,
      rightChildId: node.rightId,
      childrenIds: [node.leftId, node.rightId].filter((id): id is string => id !== null),
      state: "default" as const,
      position: posMap.get(node.id) ?? { x: 200, y: 40 },
    }));
  }

  // Initialize leaf nodes
  const minHeap: HuffmanInternalNode[] = frequencies.map(({ char, freq }) => {
    const newId = makeId();
    const leafNode: HuffmanInternalNode = {
      id: newId,
      freq,
      char,
      leftId: null,
      rightId: null,
      parentId: null,
    };
    allNodes.set(newId, leafNode);
    return leafNode;
  });

  // Sort ascending (min-heap simulation)
  minHeap.sort((nodeA, nodeB) => nodeA.freq - nodeB.freq);

  tracker.updateNodes(toTreeNodes(), minHeap[0]?.id ?? "h1");

  // Select each leaf node to show initial freq values
  for (const leafNode of minHeap) {
    tracker.selectMinFreq(leafNode.id, leafNode.freq, {
      char: leafNode.char,
      freq: leafNode.freq,
      nodeId: leafNode.id,
    });
  }

  // Build Huffman tree
  while (minHeap.length > 1) {
    const leftNode = minHeap.shift()!;
    const rightNode = minHeap.shift()!;

    tracker.selectMinFreq(leftNode.id, leftNode.freq, {
      selected: "left",
      char: leftNode.char,
      freq: leftNode.freq,
    });
    tracker.selectMinFreq(rightNode.id, rightNode.freq, {
      selected: "right",
      char: rightNode.char,
      freq: rightNode.freq,
    });

    const mergedId = makeId();
    const mergedNode: HuffmanInternalNode = {
      id: mergedId,
      freq: leftNode.freq + rightNode.freq,
      char: null,
      leftId: leftNode.id,
      rightId: rightNode.id,
      parentId: null,
    };
    leftNode.parentId = mergedId;
    rightNode.parentId = mergedId;
    allNodes.set(mergedId, mergedNode);

    tracker.updateNodes(toTreeNodes(), mergedId);
    tracker.buildNode(mergedId, mergedNode.freq, {
      mergedFreq: mergedNode.freq,
      leftFreq: leftNode.freq,
      rightFreq: rightNode.freq,
    });
    tracker.connectChild(mergedId, leftNode.id, { side: "left", childFreq: leftNode.freq });
    tracker.connectChild(mergedId, rightNode.id, { side: "right", childFreq: rightNode.freq });

    // Re-insert in sorted order
    const insertPos = minHeap.findIndex((node) => node.freq > mergedNode.freq);
    if (insertPos === -1) minHeap.push(mergedNode);
    else minHeap.splice(insertPos, 0, mergedNode);
  }

  // Generate codes
  const huffmanRoot = minHeap[0];
  if (huffmanRoot) {
    tracker.updateNodes(toTreeNodes(), huffmanRoot.id);
  }

  function generateCodes(nodeId: string | null, code: string): void {
    if (!nodeId) return;
    const node = allNodes.get(nodeId);
    if (!node) return;

    if (node.char !== null) {
      const encoding = code || "0";
      tracker.encodeChar(nodeId, node.char, encoding, {
        char: node.char,
        encoding,
        freq: node.freq,
      });
      return;
    }

    generateCodes(node.leftId, code + "0");
    generateCodes(node.rightId, code + "1");
  }

  generateCodes(huffmanRoot?.id ?? null, "");

  tracker.complete({
    result: `Huffman tree built for ${frequencies.length} characters`,
    rootFreq: huffmanRoot?.freq,
  });

  return tracker.getSteps();
}
