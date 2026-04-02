import type { EducationalContent } from "@/types";

export const bloomFilterEducational: EducationalContent = {
  overview:
    "**Bloom Filter** is a space-efficient probabilistic data structure used to test whether an element is a member of a set. " +
    "It can answer definitively that an element is **not** in the set, or that it is **probably** in the set — meaning false positives are possible but false negatives are impossible.\n\n" +
    "A Bloom filter stores no actual element values. Instead, it uses a **bit array** of size `m` and `k` independent hash functions. " +
    "Each inserted element is hashed `k` times, and the corresponding bit positions are set to 1. " +
    "Querying works by checking whether all `k` positions for the query value are 1. " +
    "If any bit is 0, the element was definitely not inserted. If all bits are 1, the element was probably inserted.\n\n" +
    "Bloom filters are widely used in databases, caching systems, network routers, and browsers where a compact probabilistic summary is preferred over an exact lookup structure.",

  howItWorks:
    "**Insert Phase — O(k)**:\n\n" +
    "For each element to insert:\n" +
    "1. Compute `k` hash positions: `hash_i(element) mod m` for each hash function `i`.\n" +
    "2. Set each of those bit positions to 1 in the bit array.\n\n" +
    "**Query Phase — O(k)**:\n\n" +
    "For each query value:\n" +
    "1. Compute the same `k` hash positions.\n" +
    "2. Check if **all** those positions are 1.\n" +
    "   - **Any bit is 0** → element is **definitely not** in the set.\n" +
    "   - **All bits are 1** → element is **probably** in the set (false positive possible).\n\n" +
    "### Example: elements = [3, 7, 11, 15], queries = [3, 5, 7], size = 16, hashCount = 3\n\n" +
    "```\n" +
    "Insert 3  → positions [p1, p2, p3] → set bits\n" +
    "Insert 7  → positions [q1, q2, q3] → set bits\n" +
    "Insert 11 → positions [r1, r2, r3] → set bits\n" +
    "Insert 15 → positions [s1, s2, s3] → set bits\n" +
    "\n" +
    "Query 3  → all 3 bits set → possibly in set (true positive)\n" +
    "Query 5  → at least one bit unset → definitely NOT in set\n" +
    "Query 7  → all 3 bits set → possibly in set (true positive)\n" +
    "```\n\n" +
    "**False positives** arise when bits for a query value happen to all be set due to other inserted elements sharing those positions.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(k)` per operation**\n\n" +
    "- Insert: `O(k)` — compute `k` hash positions, set those bits.\n" +
    "- Query: `O(k)` — compute `k` hash positions, check those bits.\n" +
    "- `k` is a small constant chosen at construction time (typically 3–10).\n\n" +
    "**Space Complexity: `O(m)`**\n\n" +
    "- The bit array stores exactly `m` bits.\n" +
    "- No element values are stored, making Bloom filters far more compact than hash sets for large collections.\n\n" +
    "**False positive probability** for `n` inserted elements:\n\n" +
    "`P(fp) ≈ (1 − e^(−kn/m))^k`\n\n" +
    "Optimal `k` for a given `m` and `n` is `k = (m/n) × ln(2)`, giving roughly 0.6185 × (m/n) bits per element " +
    "at optimal false positive rate.",

  bestAndWorstCase:
    "**Best case (query) — O(k)**:\n\n" +
    "A single bit check fails (is 0) on the first hash function — the element is immediately confirmed absent. " +
    "In practice all `k` bits are always checked for correctness, but an early exit is possible.\n\n" +
    "**Worst case (query) — O(k)**:\n\n" +
    "All `k` bits for a query value happen to be set by other insertions — a false positive occurs. " +
    "The algorithm still runs in `O(k)` but returns an incorrect 'possibly present' result.\n\n" +
    "**False positive rate increases** as the filter fills up (more bits become 1). " +
    "Once all bits are 1, the filter reports every query as 'possibly in set' regardless of what was inserted.\n\n" +
    "Bloom filters cannot be used to delete elements — setting a bit to 0 might break membership for other elements sharing that bit. " +
    "**Counting Bloom filters** extend the design to support deletion using counters instead of single bits.",

  realWorldUses: [
    "**Google Chrome Safe Browsing:** Checks URLs against a locally cached Bloom filter of known malicious sites before performing a full network lookup.",
    "**Apache Cassandra and HBase:** Use Bloom filters to avoid expensive disk reads for SSTable lookups when a key is not present.",
    "**Content Delivery Networks:** CDN edge caches use Bloom filters to decide whether to cache an object — avoiding caching one-hit-wonders.",
    "**Spell checkers:** A dictionary is loaded into a Bloom filter; unknown words trigger a slower exact match against the full dictionary.",
    "**Network routers (packet filtering):** Routers use Bloom filters to check whether a packet destination is in a routing table without full table scans.",
    "**Bitcoin:** Lightweight clients use Bloom filters to fetch only relevant transactions from full nodes without revealing which addresses they care about.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "Extremely space-efficient — stores membership for millions of elements in kilobytes.",
      "O(k) constant-time inserts and queries regardless of the number of elements.",
      "No false negatives — a 'not in set' answer is always correct.",
      "Easy to tune false positive rate by adjusting bit array size and hash count.",
      "Trivially parallelisable — hash computations are independent.",
    ],
    limitations: [
      "False positives are possible — cannot confirm an element is definitely present.",
      "Cannot delete elements (standard Bloom filter); requires Counting Bloom Filter variant.",
      "Cannot enumerate or retrieve stored elements.",
      "Once created with fixed m and k, the filter cannot be dynamically resized without rebuild.",
      "Choosing poor hash functions increases false positive rate beyond the theoretical minimum.",
    ],
  },

  whenToUseIt:
    "Use a Bloom filter when you need a **fast, memory-efficient membership test** and can tolerate occasional false positives. " +
    "It excels when the cost of a false positive is low (e.g., triggering a slower but correct fallback lookup), " +
    "and the benefit of avoiding most negative lookups is high (e.g., skipping an expensive database query).\n\n" +
    "**Prefer a Bloom filter when:**\n" +
    "- Memory is constrained and the element set is large.\n" +
    "- False positives are acceptable but false negatives are not.\n" +
    "- You only need insert and membership-test operations (no deletion).\n\n" +
    "**Avoid a Bloom filter when:**\n" +
    "- False positives are unacceptable (use a hash set instead).\n" +
    "- You need to retrieve, enumerate, or delete elements.\n" +
    "- The set is tiny — a plain hash set is simpler and equally fast.\n" +
    "- You need exact counts — use a Count-Min Sketch instead.",
};
