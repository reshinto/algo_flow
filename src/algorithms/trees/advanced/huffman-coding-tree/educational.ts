import type { EducationalContent } from "@/types";

export const huffmanCodingTreeEducational: EducationalContent = {
  overview:
    "**Huffman Coding** is a greedy algorithm that assigns **variable-length, prefix-free binary codes** to characters based on their frequencies. More frequent characters receive shorter codes — minimizing the total number of bits needed to encode a message.\n\nDeveloped by David Huffman in 1952, it is the foundation of compression formats like ZIP, gzip, and JPEG.",

  howItWorks:
    "1. **Create leaf nodes** for each character, weighted by frequency.\n" +
    "2. **Build a min-heap** (priority queue) sorted by frequency.\n" +
    "3. **Repeat until one node remains:**\n" +
    "   - Pop the two nodes with the lowest frequencies (`left`, `right`).\n" +
    "   - Create an internal node with `freq = left.freq + right.freq`.\n" +
    "   - Push the internal node back into the heap.\n" +
    "4. The last remaining node is the **Huffman tree root**.\n" +
    "5. **Assign codes:** Traverse the tree, appending `0` for left edges and `1` for right edges until reaching a leaf.\n\n" +
    "**Example:** For `{a:5, b:9, c:12, d:13, e:16, f:45}`, `f` gets code `0` (shortest), while `a` gets `1100` (longest).",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n log n)`** — each of n iterations pops and pushes from a heap in O(log n).\n\n" +
    "**Space Complexity: `O(n)`** — the Huffman tree has 2n−1 nodes for n characters.",

  bestAndWorstCase:
    "**Best case:** All characters have equal frequency — all codes have the same length ⌈log₂ n⌉.\n\n" +
    "**Worst case:** Frequencies follow Fibonacci sequence — produces the most unbalanced tree and the longest worst-case code.",

  realWorldUses: [
    "**File compression:** Used in Deflate (ZIP, gzip, PNG) as the entropy coding step.",
    "**Image compression:** JPEG uses Huffman coding for DCT coefficient compression.",
    "**Data transmission:** Reduce bandwidth by encoding frequent patterns with fewer bits.",
    "**Programming language tokenizers:** Assign shorter codes to common tokens.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Provably optimal prefix-free code — no other prefix-free code achieves better compression.",
      "Produces unique, deterministic codes for a given frequency distribution.",
      "Decompression is O(n) — just follow the tree path bit by bit.",
    ],
    limitations: [
      "Requires knowing character frequencies in advance — two-pass algorithm for files.",
      "Performance degrades when character distribution is nearly uniform (approaches fixed-length encoding).",
      "Arithmetic coding can beat Huffman by fractional bits per character.",
    ],
  },

  whenToUseIt:
    "Use Huffman coding when you need to compress text or data with known character frequencies and want the optimal prefix-free encoding. For adaptive (online) compression without prior frequency knowledge, use adaptive Huffman or arithmetic coding.",
};
