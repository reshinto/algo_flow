// Huffman Coding Tree — build optimal prefix-free encoding from character frequencies

interface HuffmanNode {
  freq: number;
  char: string | null;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
}

function huffmanCodingTree(frequencies: { char: string; freq: number }[]): Record<string, string> {
  // Build a min-heap (priority queue) from frequencies
  const minHeap: HuffmanNode[] = frequencies.map(({ char, freq }) => ({
    freq,
    char,
    left: null,
    right: null,
  })); // @step:initialize

  // Sort ascending to simulate a min-heap
  minHeap.sort((nodeA, nodeB) => nodeA.freq - nodeB.freq); // @step:select-min-freq

  while (minHeap.length > 1) {
    // Extract two minimums
    const leftNode = minHeap.shift()!; // @step:select-min-freq
    const rightNode = minHeap.shift()!; // @step:select-min-freq

    // Merge into a new internal node
    const merged: HuffmanNode = {
      freq: leftNode.freq + rightNode.freq,
      char: null,
      left: leftNode,
      right: rightNode,
    }; // @step:build-node

    // Re-insert maintaining sorted order
    const insertPos = minHeap.findIndex((node) => node.freq > merged.freq);
    if (insertPos === -1) minHeap.push(merged);
    else minHeap.splice(insertPos, 0, merged); // @step:build-node
  }

  const huffmanRoot = minHeap[0] ?? null;
  const encodings: Record<string, string> = {};

  function generateCodes(node: HuffmanNode | null, code: string): void {
    if (!node) return;
    if (node.char !== null) {
      encodings[node.char] = code || "0"; // @step:encode-char
      return;
    }
    generateCodes(node.left, code + "0"); // @step:traverse-left
    generateCodes(node.right, code + "1"); // @step:traverse-right
  }

  generateCodes(huffmanRoot, "");
  return encodings; // @step:complete
}
