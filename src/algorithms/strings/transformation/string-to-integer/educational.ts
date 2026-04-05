/** Educational content for String to Integer (atoi). */

import type { EducationalContent } from "@/types";

export const stringToIntegerEducational: EducationalContent = {
  overview:
    "**String to Integer (atoi)** converts a string representation of a number into its 32-bit signed integer value.\n\n" +
    "The algorithm models the behaviour of the C standard library function `atoi`, following a strict three-phase contract: " +
    "skip leading whitespace, read an optional sign character, then consume consecutive digit characters and accumulate their value. " +
    "Any non-digit character that appears after the digits immediately terminates parsing. " +
    "The final value is clamped to the 32-bit signed integer range `[-2³¹, 2³¹ − 1]`.",

  howItWorks:
    "The algorithm advances a single index pointer through three sequential phases:\n\n" +
    "**Phase 1 — Skip whitespace:** Advance `charIndex` past every leading space (`' '`). Non-space characters are not consumed here.\n\n" +
    "**Phase 2 — Read sign:** If the current character is `'-'` set `sign = -1`; if it is `'+'` leave `sign = 1`. Advance `charIndex` by one in either case. Any other character skips this phase entirely.\n\n" +
    "**Phase 3 — Read digits:** Loop while `charIndex` is in bounds and `text[charIndex]` is a digit (`'0'`–`'9'`). " +
    "Convert each character to a numeric digit via `charCode − 48` and accumulate into `result` with `result = result × 10 + digit`. " +
    "After each digit, check for overflow — if `sign × result` already exceeds the 32-bit boundary, return the appropriate clamp value immediately.\n\n" +
    "```\n" +
    'Input:  "   -42"\n' +
    "Phase 1: skip 3 spaces  → charIndex = 3\n" +
    "Phase 2: read '-'       → sign = -1, charIndex = 4\n" +
    "Phase 3: read '4'       → result = 4\n" +
    "         read '2'       → result = 42\n" +
    "Output: -42\n" +
    "```",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(n)`**\n\n" +
    "Each character in the input string is visited at most once — the pointer only advances forward and never backtracks. " +
    "In the worst case (a string of all digits) every character is processed.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "Only a fixed number of scalar variables are used regardless of input length: `charIndex`, `sign`, `result`, and `length`. " +
    "No auxiliary buffer proportional to the input is allocated.",

  bestAndWorstCase:
    '**Best case — immediate non-digit after optional whitespace/sign:** `O(1)` — the digit loop body never executes (e.g. `"abc"` → `0`).\n\n' +
    "**Overflow short-circuit:** When the accumulating value exceeds the 32-bit range, the function returns immediately without processing remaining characters — a constant-time exit for very large inputs.\n\n" +
    "**Worst case — a string of `n` valid digits:** `O(n)` — every character must be visited and multiplied into the accumulator. " +
    "All three complexity cases (best, average, worst) are bounded by the number of characters examined, giving a flat linear profile.",

  realWorldUses: [
    '**Command-line argument parsing:** Shell utilities and CLI parsers call `atoi`-like routines to convert string arguments (`"--port 8080"`) into integer values.',
    "**Network protocol parsing:** HTTP header values, JSON numbers in streaming parsers, and binary protocol decoders all rely on digit-by-digit integer conversion from raw byte streams.",
    "**Database engines:** SQL engines parse numeric literals in query strings into integer or long values during the tokenisation phase of query compilation.",
    "**Embedded systems:** Resource-constrained firmware avoids floating-point and heap allocation by using a hand-rolled atoi to parse sensor data or configuration from EEPROM strings.",
    "**Interview fundamentals:** atoi is a canonical string-manipulation problem testing edge-case reasoning — overflow, sign, whitespace, and early termination all in one compact scenario.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) space — no auxiliary buffer is needed; parsing is entirely in-place with scalar variables.",
      "Single-pass — the pointer never revisits a character, making it cache-friendly and suitable for streaming inputs.",
      "Early overflow exit — clamping is checked incrementally, avoiding the need to parse the full string when overflow is detected early.",
    ],
    limitations: [
      'Stops at the first non-digit — `"123abc"` returns `123`, which may be unexpected if strict validation is required.',
      "Only handles decimal integers — hexadecimal (`0x…`), octal (`0…`), or floating-point strings are not supported.",
      'Locale-insensitive — thousands separators (e.g. `"1,000"`) and non-ASCII digit characters are treated as non-digit terminators.',
    ],
  },

  whenToUseIt:
    "Use atoi-style parsing when you need a fast, allocation-free conversion from a decimal string to a bounded integer and you are willing to accept silent truncation at the first non-digit.\n\n" +
    "Prefer `parseInt` with a radix, `Number()`, or a strict validation library when you need to detect malformed input, support non-decimal bases, or handle locale-specific formatting. " +
    "Avoid raw atoi in security-sensitive contexts (e.g. parsing untrusted network data) without explicit range validation, since silent clamping can mask logic errors.",
};
