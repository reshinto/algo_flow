import type { EducationalContent } from "@/types";

export const gameOfLifeEducational: EducationalContent = {
  overview:
    "**Conway's Game of Life** is a cellular automaton devised by mathematician John Conway in 1970. It simulates an infinite grid of cells, each either **alive** (1) or **dead** (0). All cells update simultaneously each generation based on simple neighbor-count rules.\n\n" +
    "The O(1) space solution uses **in-place bit encoding**: the next state is stored in a higher bit of each cell so the current state (lower bit) remains readable for all neighbor counts before any cell is finalized.",

  howItWorks:
    "Each generation applies four rules to every cell simultaneously:\n\n" +
    "1. **Underpopulation:** A live cell with fewer than 2 live neighbors dies.\n" +
    "2. **Survival:** A live cell with 2 or 3 live neighbors survives.\n" +
    "3. **Overpopulation:** A live cell with more than 3 live neighbors dies.\n" +
    "4. **Reproduction:** A dead cell with exactly 3 live neighbors becomes alive.\n\n" +
    "**In-place bit encoding** lets us update without a second matrix:\n\n" +
    "- **Phase 1:** For each cell, count live neighbors using `value & 1` (reads only the original state). Encode the next state: `cell |= nextState << 1`.\n" +
    "- **Phase 2:** Decode every cell: `cell >>= 1`.\n\n" +
    "### Example: blinker oscillator\n\n" +
    "```\nGeneration 0:   Generation 1:\n0 1 0           0 0 0\n0 1 0    →      1 1 1\n0 1 0           0 0 0\n```\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '  subgraph Gen0["Generation 0 (blinker)"]\n' +
    '    A0["0"] --- B0["1"] --- C0["0"]\n' +
    '    A1["0"] --- B1["1"] --- C1["0"]\n' +
    '    A2["0"] --- B2["1"] --- C2["0"]\n' +
    "  end\n" +
    '  subgraph Gen1["Generation 1"]\n' +
    '    D0["0"] --- E0["0"] --- F0["0"]\n' +
    '    D1["1"] --- E1["1"] --- F1["1"]\n' +
    '    D2["0"] --- E2["0"] --- F2["0"]\n' +
    "  end\n" +
    '  Gen0 -->|"apply rules"| Gen1\n' +
    "  style B0 fill:#14532d,stroke:#22c55e\n" +
    "  style B1 fill:#f59e0b,stroke:#d97706\n" +
    "  style B2 fill:#14532d,stroke:#22c55e\n" +
    "  style D1 fill:#14532d,stroke:#22c55e\n" +
    "  style E1 fill:#14532d,stroke:#22c55e\n" +
    "  style F1 fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "The vertical blinker rotates 90° each generation — the center column collapses to a center row as outer cells die from underpopulation and new cells are born from exactly 3 neighbors.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(m × n)`**\n\n" +
    "Every cell is visited exactly twice — once to encode the next state, once to decode it.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "The bit-encoding trick eliminates the need for a second board. Only a constant number of direction offsets and counters are used regardless of board size.",

  bestAndWorstCase:
    "**Best case** — a fully dead board: all neighbor counts are 0, no reproductions occur, so every decode step produces 0. Still `O(m × n)` since all cells must be checked.\n\n" +
    "**Worst case** — any `m × n` board: all cases are `O(m × n)`. The algorithm has no shortcut path because the rules must be applied uniformly to every cell.\n\n" +
    "The constant factor is determined by the 8-neighbor scan per cell, making the practical runtime approximately `8 × m × n` comparisons.",

  realWorldUses: [
    "**Cellular automaton research:** Life is the canonical example used to study emergent complexity, self-replication, and Turing completeness in simple rule systems.",
    "**Generative art and procedural content:** Game of Life patterns (gliders, oscillators) are used in procedural terrain generation and visual simulations.",
    "**Algorithm education:** The simultaneous-update constraint makes it an ideal teaching example for in-place encoding, bit manipulation, and avoiding state mutation bugs.",
    "**Population and epidemic modeling:** The birth/death rules loosely model population dynamics and have inspired more complex agent-based simulation frameworks.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — bit encoding eliminates the need for a copy of the board.",
      "O(m × n) time — optimal since every cell must be evaluated each generation.",
      "Clean separation of phases — encoding and decoding are independent passes, making the logic easy to reason about.",
    ],
    limitations: [
      "Bit encoding only works for binary (0/1) boards — multi-state automata require a different approach.",
      "Single-step only — simulating multiple generations requires calling the function repeatedly, accumulating cost.",
      "8-neighbor scan per cell — the inner loop is bounded at 8, but large boards with many live cells can be slow in practice; sparse boards benefit from hash-set optimization.",
    ],
  },

  whenToUseIt:
    "Use this O(1) space approach whenever you must simulate simultaneous in-place updates on a binary matrix. The bit-encoding pattern generalizes to any problem requiring two-phase processing where the current state must remain readable while the next state is being computed. For multi-step simulations or very large sparse boards, consider a hash-set of live cell coordinates instead.",
};
