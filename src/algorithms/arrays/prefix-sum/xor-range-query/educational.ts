import type { EducationalContent } from "@/types";

export const xorRangeQueryEducational: EducationalContent = {
  overview:
    "**XOR Range Query** answers range XOR queries in **O(1)** after a one-time **O(n)** preprocessing step that builds a prefix XOR array — exactly analogous to prefix sums but using the XOR operation instead of addition.\n\n" +
    "Because XOR is its own inverse (`a ^ a = 0`), the XOR of any range `[left, right]` equals `prefixXor[right] ^ prefixXor[left - 1]`. This single XOR operation replaces iterating over the entire range.",

  howItWorks:
    "### Phase 1: Build the Prefix XOR Array\n\n" +
    "1. Initialize `prefixXor[0] = inputArray[0]`.\n" +
    "2. For each index `i`, set `prefixXor[i] = prefixXor[i-1] ^ inputArray[i]`.\n" +
    "3. Each position stores the cumulative XOR from index 0 up to that position.\n\n" +
    "### Phase 2: Answer Range Queries\n\n" +
    "For query `(left, right)`:\n" +
    "- If `left == 0`: result = `prefixXor[right]`\n" +
    "- Otherwise: result = `prefixXor[right] ^ prefixXor[left - 1]`\n\n" +
    "**Why it works:** `prefixXor[right]` = XOR of all elements `0..right`.\n" +
    "`prefixXor[left-1]` = XOR of all elements `0..left-1`.\n" +
    "XOR-ing them cancels `0..left-1`, leaving only `left..right`.\n\n" +
    "### Example\n\n" +
    "```mermaid\n" +
    "flowchart TD\n" +
    '    A["Input:     [3, 5, 2, 7, 1, 4]"]\n' +
    '    B["PrefixXOR: [3, 6, 4, 3, 2, 6]"]\n' +
    '    C["Query (1,4): prefix[4] ^ prefix[0] = 2 ^ 3 = 1"]\n' +
    "    A --> B --> C\n" +
    "```\n\n" +
    "With `inputArray = [3, 5, 2, 7, 1, 4]`:\n" +
    "- PrefixXOR = `[3, 6, 4, 3, 2, 6]`\n" +
    "- Query `[0, 2]`: `prefixXor[2]` = **4** (3^5^2)\n" +
    "- Query `[1, 4]`: `prefixXor[4] ^ prefixXor[0]` = `2 ^ 3` = **1** (5^2^7^1)\n" +
    "- Query `[2, 5]`: `prefixXor[5] ^ prefixXor[1]` = `6 ^ 6` = **0** (2^7^1^4)",

  timeAndSpaceComplexity:
    "**Time Complexity**\n\n" +
    "- **Build:** `O(n)` — one pass to compute each prefix XOR.\n" +
    "- **Query:** `O(1)` — each range XOR is a single XOR of two prefix values.\n" +
    "- **Total for Q queries:** `O(n + Q)`.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "One additional prefix XOR value per input element.",

  bestAndWorstCase:
    "**Best Case: `O(n)` build + `O(1)` per query** — the build cost is fixed; once paid, every query is a single operation.\n\n" +
    "**Worst Case: `O(n)` build + `O(1)` per query** — there are no degenerate paths. Query results are computed in constant time regardless of range width.\n\n" +
    "**Versus Brute Force:** A naïve range XOR iterates from `left` to `right`, costing `O(n)` per query. With many queries, prefix XOR reduces this from `O(n × Q)` to `O(n + Q)`.",

  realWorldUses: [
    "**Data Integrity Checksums:** Computing the XOR checksum of any byte sub-range within a large buffer without re-scanning.",
    "**Network Packet Validation:** Efficient parity checks over subsequences of packet payloads.",
    "**Competitive Programming:** A classic technique for range XOR queries used in segment tree and Fenwick tree problems.",
    "**Cryptographic Preprocessing:** Computing XOR fingerprints over subranges of keys or nonces in lightweight cipher primitives.",
    "**Game Development:** Efficient XOR-based hash verification over subsets of a deterministic state sequence.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) query time after a linear build — same asymptotic profile as prefix sums.",
      "Exploits XOR self-inverse property: cancellation is automatic and exact.",
      "Simple implementation — identical structure to prefix sums with `+` replaced by `^`.",
      "Works on any data type that supports XOR (integers, bitstrings, hash values).",
    ],
    limitations: [
      "Like prefix sums, requires a static array — any update invalidates the prefix array.",
      "Only supports XOR queries — not applicable to sum, min, max, or product without a different structure.",
      "Results can be non-intuitive: XOR does not preserve ordering relationships or magnitude.",
    ],
  },

  whenToUseIt:
    "**Use XOR Range Query when** the array is static and you need fast XOR over arbitrary subranges — especially in checksumming, parity, or bit-manipulation problems.\n\n" +
    "**Prefer a Fenwick tree or segment tree** when the array is updated frequently between queries.\n\n" +
    "**Avoid it** when you need range sum, min, or max — those require different prefix structures (prefix sums, sparse tables, or segment trees).",
};
