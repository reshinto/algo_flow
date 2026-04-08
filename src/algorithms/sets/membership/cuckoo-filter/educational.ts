import type { EducationalContent } from "@/types";

export const cuckooFilterEducational: EducationalContent = {
  overview:
    "**Cuckoo Filter** is a space-efficient probabilistic data structure that supports approximate membership queries — " +
    'answering "is this element in the set?" with a guaranteed no (true negatives) but a small probability of a false yes (false positives).\n\n' +
    "Unlike a Bloom filter, a Cuckoo filter stores **fingerprints** in a fixed-size bucket array and supports **deletion**, making it more practical for dynamic datasets. " +
    "Each element maps to exactly two candidate buckets via its fingerprint, and insertion uses **cuckoo displacement** — " +
    "evicting an existing fingerprint to its alternate bucket when both slots are occupied.",

  howItWorks:
    "**Phase 1 — Insert**:\n\n" +
    "For each element to insert:\n" +
    "1. Compute a short fingerprint `fp = hash(element) & 0xFF`.\n" +
    "2. Compute `primaryBucket = abs(element) % bucketCount`.\n" +
    "3. Compute `alternateBucket = primaryBucket XOR (fp × multiplier) % bucketCount`.\n" +
    "4. If either bucket slot is empty, store `fp` there — done.\n" +
    "5. Otherwise, **evict** the fingerprint currently in the primary bucket, store `fp`, then re-insert the evicted fingerprint at its own alternate bucket. Repeat up to 500 times.\n\n" +
    "**Phase 2 — Query**:\n\n" +
    "For each query:\n" +
    "1. Compute `fp`, `primaryBucket`, and `alternateBucket` identically to insertion.\n" +
    "2. If `buckets[primary] == fp` or `buckets[alternate] == fp` → **found** (may be a false positive).\n" +
    "3. Otherwise → **definitely not present** (true negative).\n\n" +
    "### Example: elements=[3,7,11], queries=[3,5], bucketCount=8\n\n" +
    "```\n" +
    "fp(3)=0x7B  primary=3  alternate=(3 XOR ...)%8\n" +
    "fp(7)=0x97  primary=7  alternate=...\n" +
    "fp(11)=0xB3 primary=3  alternate=... → evict if collision\n" +
    "\n" +
    "Query 3: fp matches bucket → found (true positive)\n" +
    "Query 5: fp not in either bucket → not found (true negative)\n" +
    "```\n\n" +
    "```mermaid\n" +
    "flowchart LR\n" +
    '  E3["insert 3"]:::input\n' +
    '  E11["insert 11"]:::input\n' +
    '  FP3["fp(3) = 0x7B"]:::current\n' +
    '  FP11["fp(11) = 0xB3"]:::current\n' +
    '  B3["bucket[3] ← 0x7B"]:::result\n' +
    '  B7["bucket[7] ← 0xB3"]:::result\n' +
    '  Q3["query 3 → bucket[3]=0x7B → found"]:::result\n' +
    '  Q5["query 5 → no match → absent"]:::input\n' +
    "  E3 --> FP3 --> B3 --> Q3\n" +
    "  E11 --> FP11 --> B7\n" +
    "  Q5\n" +
    "  classDef input fill:#06b6d4,stroke:#0891b2\n" +
    "  classDef current fill:#f59e0b,stroke:#d97706\n" +
    "  classDef result fill:#14532d,stroke:#22c55e\n" +
    "```\n\n" +
    "Element 11 hashes to the same primary bucket as element 3, so cuckoo displacement moves its fingerprint to an alternate bucket. A lookup for any element checks only its two candidate buckets.",

  timeAndSpaceComplexity:
    "**Time Complexity: `O(1)` amortized**\n\n" +
    "- Insert: `O(1)` amortized — eviction chains are short on average (< 3 hops for load factors < 95%).\n" +
    "- Query: `O(1)` — exactly two bucket lookups.\n" +
    "- Worst-case insert: `O(n)` if the eviction chain loops and must rehash the entire table.\n\n" +
    "**Space Complexity: `O(n)`**\n\n" +
    "Stores one fingerprint (8 bits) per element in a bucket array. With 95% load factor, space per element is ~1.05 bytes — " +
    "significantly more compact than a hash set storing full values.",

  bestAndWorstCase:
    "**Best case** — both candidate buckets have empty slots: `O(1)` with no displacement.\n\n" +
    "**Worst case** — eviction chain exceeds the maximum limit and insertion fails. This occurs at very high load factors (> 95%). " +
    "In this implementation the chain cap is 500 — if reached, the element is silently dropped.\n\n" +
    "**False positive rate** — approximately `2 × fingerprintBits^-1`. With 8-bit fingerprints: ~0.78% false positive rate.",

  realWorldUses: [
    "**Content delivery networks:** Quickly determine if a URL is cached at an edge node without querying the full cache index.",
    "**Database query optimization:** Skip disk reads for rows that cannot possibly match a predicate (replacing Bloom filters when deletes are needed).",
    "**Network packet deduplication:** Track recently-seen packet fingerprints and discard duplicates in high-throughput routers.",
    "**Malware detection:** Check if a file hash appears in a known-malware fingerprint database with low memory overhead.",
    '**Distributed caches:** Track which keys have been "soft-deleted" after cache eviction to avoid stale re-fetches.',
  ],

  strengthsAndLimitations: {
    strengths: [
      "Supports deletion — unlike Bloom filters, fingerprints can be removed from buckets.",
      "Better cache locality than Bloom filters — exactly 2 memory accesses per lookup.",
      "Space-efficient — ~1 byte per element at high load factors with 8-bit fingerprints.",
      "O(1) amortized insert and query — suitable for real-time systems.",
    ],
    limitations: [
      "Insertion can fail at high load factors (> 95%) if eviction chains cycle.",
      "False positives are unavoidable — cannot replace an exact membership test when correctness is required.",
      "Duplicate insertion inflates false positive rates — the filter does not detect duplicate fingerprints.",
      "Fingerprint collisions mean different elements may share a bucket slot, causing false positives.",
    ],
  },

  whenToUseIt:
    "Use a Cuckoo filter when you need probabilistic membership with support for **deletions** and a stricter memory budget than a hash set allows. " +
    "Prefer it over a Bloom filter when elements must be removable. " +
    "Avoid it when false positives are unacceptable — use an exact hash set instead. " +
    "For very small datasets (< 100 elements), a plain `Set` is simpler and more reliable. " +
    "If deletion is not needed and memory is extremely tight, a Bloom filter with fewer hash functions may offer better theoretical guarantees.",
};
