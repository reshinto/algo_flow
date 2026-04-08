// Educational content for Run-Length Decoding — all 7 required sections.

import type { EducationalContent } from "@/types";

export const runLengthDecodingEducational: EducationalContent = {
  overview:
    "**Run-Length Decoding** expands a compressed string back into its original form.\n\n" +
    "The compressed format encodes repeated characters as a count followed by the character itself. " +
    'For example, `"3a2b4c"` means three `a`s, two `b`s, and four `c`s, which expands to `"aaabbcccc"`. ' +
    "Decoding scans the compressed string from left to right, parsing the number, then repeating the character that many times into the output.",

  howItWorks:
    "The algorithm uses a single read pointer that moves through the compressed string from left to right.\n\n" +
    "Each iteration of the main loop:\n\n" +
    "1. **Collect digits** — advance the pointer while the current character is a digit, accumulating them into a number string.\n" +
    "2. **Parse count** — convert the digit string to an integer `repeatCount`.\n" +
    "3. **Read letter** — the next character (after all digits) is the letter to repeat.\n" +
    "4. **Append output** — push `letter` repeated `repeatCount` times into the output buffer.\n" +
    "5. **Advance** — move the read pointer past the letter to start the next group.\n\n" +
    "```\n" +
    "Input:  3 a 2 b 4 c\n" +
    "        ^\n" +
    "Step 1: read digits → count = 3\n" +
    "        read letter → 'a'\n" +
    "        append 'aaa'\n" +
    "        ^\n" +
    "Step 2: read digits → count = 2\n" +
    "        read letter → 'b'\n" +
    "        append 'bb'\n" +
    "        ^\n" +
    "Step 3: read digits → count = 4\n" +
    "        read letter → 'c'\n" +
    "        append 'cccc'\n" +
    "Output: aaabbcccc\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  A["3a"] -->|"×3"| B["aaa"]\n' +
    '  C["2b"] -->|"×2"| D["bb"]\n' +
    '  E["4c"] -->|"×4"| F["cccc"]\n' +
    '  B --> G["output"]\n' +
    "  D --> G\n" +
    "  F --> G\n" +
    "  style A fill:#f59e0b,stroke:#d97706\n" +
    "  style C fill:#f59e0b,stroke:#d97706\n" +
    "  style E fill:#f59e0b,stroke:#d97706\n" +
    "  style G fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Each encoded group (`count + letter`) expands into a run of repeated characters that are appended to the output buffer.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m)`** where `m` is the length of the decoded output.\n\n" +
    "Each character in the output is written exactly once. Parsing the input itself is `O(n)` where `n` is the compressed string length, " +
    "but `n ≤ m` for any valid encoding, so the dominant term is `O(m)`.\n\n" +
    "**Space Complexity: `O(m)`**\n\n" +
    "The output buffer grows to hold every decoded character. No auxiliary data structures beyond the output array and a few scalar variables are needed.",

  bestAndWorstCase:
    "**Best case — empty string or all single-character groups:** `O(1)` or proportional to the output — there is no short-circuit; the algorithm always writes every decoded character.\n\n" +
    '**Worst case — very long repeated sequences:** `O(m)` — a single group like `"1000a"` still requires writing 1000 characters into the output buffer.\n\n' +
    "Because the algorithm must produce every character of the decoded string, the best and worst case are both linear in the output length. " +
    "There is no way to short-circuit without changing the contract of the function.",

  realWorldUses: [
    "**Image formats:** BMP and TIFF support RLE (run-length encoding) to compress areas of uniform color; decoding is the inverse operation performed when loading the image.",
    "**Network protocols:** Some binary protocols compress repeated bytes with RLE for efficiency; the receiver must decode before processing.",
    "**Data transmission:** Run-length coding appears in fax (ITU T.4/T.6) and PCX image formats, where horizontal runs of identical pixels are encoded compactly.",
    "**Game assets:** Tile maps and sprite sheets sometimes use RLE to reduce file size; the game engine decodes them at load time.",
    "**Interview fundamentals:** Implementing an RLE decoder (and encoder) is a classic string-manipulation interview question that tests pointer control and buffer management.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Simple, linear-time implementation with no complex data structures.",
      "Streaming-friendly — the decoder can emit characters one group at a time without buffering the entire input.",
      "Easily extended to multi-digit counts (e.g. `12a`) without changing the core loop structure.",
    ],
    limitations: [
      "Only beneficial for inputs with many consecutive repeated characters; random text may actually expand after encoding.",
      "Multi-digit counts require careful digit-accumulation logic — a single-digit assumption breaks on counts ≥ 10.",
      "Does not handle multi-character sequences or Unicode combining characters without additional logic.",
    ],
  },

  whenToUseIt:
    "Use Run-Length Decoding whenever you need to expand data that was compressed with run-length encoding, such as loading RLE-compressed image rows, processing fax data, or decoding LeetCode-style encoded strings.\n\n" +
    "Avoid it when the input format is not strictly `<digits><letter>` — malformed or mixed inputs require pre-validation. " +
    "Also avoid naive RLE when the data has low repetition (e.g. random text), since it offers no compression benefit and decoding wastes time producing output that is the same size as the input.",
};
