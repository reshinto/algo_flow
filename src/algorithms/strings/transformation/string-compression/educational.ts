/** Educational content for the String Compression (Run-Length Encoding) algorithm. */

import type { EducationalContent } from "@/types";

export const stringCompressionEducational: EducationalContent = {
  overview:
    "**String Compression** (also called Run-Length Encoding) replaces consecutive runs of the same character with " +
    "that character followed by the run's count.\n\n" +
    'For example, `"aabcccccaaa"` becomes `"a2b1c5a3"` because there are 2 `a`s, 1 `b`, 5 `c`s, and 3 `a`s in sequence. ' +
    "If the compressed form is not shorter than the original, the original string is returned unchanged.",

  howItWorks:
    "The algorithm scans the input with a single read pointer `charIndex`, grouping consecutive identical characters into runs.\n\n" +
    "For each run:\n\n" +
    "1. **Read** the character at `charIndex` — this is `currentChar`.\n" +
    "2. **Count** how many times `currentChar` repeats consecutively, advancing `charIndex` through the run.\n" +
    "3. **Write** `currentChar` then `count` to the output buffer.\n" +
    "4. **Advance** to the next group (charIndex now points past the just-processed run).\n\n" +
    "After all runs are processed, compare output and input lengths. Return the shorter one.\n\n" +
    "```\n" +
    "Input:  a  a  b  c  c  c  c  c  a  a  a\n" +
    "Run 1:  a×2  →  write 'a','2'\n" +
    "Run 2:  b×1  →  write 'b','1'\n" +
    "Run 3:  c×5  →  write 'c','5'\n" +
    "Run 4:  a×3  →  write 'a','3'\n" +
    "Output: a2b1c5a3  (8 < 11 chars — compressed returned)\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Every character is visited exactly once by the outer `while` loop. The inner counting loop advances " +
    "`charIndex` forward; together they traverse the full string in a single pass.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "The output buffer grows at most to `2k` characters where `k` is the number of distinct runs. " +
    "In the worst case (all characters unique, e.g. `abc`) the output is twice the input length — " +
    "but the algorithm returns the original in that case. The auxiliary buffer is still `O(n)`.",

  bestAndWorstCase:
    "**Best case — all characters identical (e.g. `aaaaaaa`):** The single run produces a two-character " +
    "output `a7`, giving maximum compression. Reading and writing remain O(n).\n\n" +
    "**Worst case — no repeated characters (e.g. `abcdef`):** Every character forms its own run of length 1, " +
    "doubling the output size. The algorithm still runs O(n) but returns the original string because " +
    "the compressed form would be longer (e.g. `a1b1c1d1e1f1`).\n\n" +
    "There is no early-exit path — the full string is always scanned to build the candidate compressed form.",

  realWorldUses: [
    "**Image formats:** BMP and TIFF files use run-length encoding for rows of identical pixel values, " +
      "dramatically shrinking uniform regions like solid backgrounds.",
    "**Fax transmission:** The Group 3 fax standard encodes scan lines as runs of black and white pixels " +
      "with RLE, reducing transmission time over phone lines.",
    "**Lossless data compression:** RLE is a building block inside more complex schemes like PackBits " +
      "(used in macOS PICT and TIFF) and is a first pass in some video codecs.",
    "**DNA sequence storage:** Bioinformatics tools use run-length encoding to compactly represent long " +
      "homopolymer stretches (e.g. `AAAAAAGGG`) in genome data.",
    "**Interview fundamentals:** String compression is a canonical problem testing string traversal, " +
      "two-pointer awareness, and edge-case handling (no-op when compression yields no gain).",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(n) time and a single scan — extremely cache-friendly with no backtracking.",
      "Simple and easy to implement correctly with minimal state.",
      "Lossless — the original string can always be recovered by reversing the encoding.",
      "Falls back to returning the original when compression yields no benefit.",
    ],
    limitations: [
      "Effective only for inputs with long repeated runs — performs poorly (and falls back) on strings with few or no repetitions.",
      "Count digits may themselves be multiple characters (e.g. a run of 10 identical chars produces `a10`), which can exceed the space saved.",
      "Not suitable as a general-purpose compressor; Huffman coding, LZ77, or deflate are far more effective for typical text.",
      "Requires a second pass (or tracking) to decide whether to return the compressed or original string.",
    ],
  },

  whenToUseIt:
    "Use String Compression when your data contains long runs of repeated characters and you need a simple, " +
    "lossless encoding with O(n) guarantees — bitmap image rows, homopolymer DNA sequences, or simple " +
    "text streams with high repetition.\n\n" +
    "Avoid it for general text or binary data with low repetition — the overhead of count digits may make " +
    "the encoded form longer than the original. For those cases, prefer Huffman coding, LZ-based " +
    "algorithms, or deflate.",
};
