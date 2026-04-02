"""
Count-Min Sketch — probabilistic frequency estimation using a d×w counter matrix.
Supports sub-linear space frequency estimation with one-sided error (never undercounts).
Time: O(d) per insert/query — Space: O(d × w)
"""

from typing import List, Dict


def compute_sketch_hash(value: int, hash_idx: int, width: int) -> int:
    return abs((value * (hash_idx * 1327 + 31) + hash_idx * 7919) % width)  # @step:hash-element


def count_min_sketch(
    elements: List[int],
    queries: List[int],
    width: int,
    depth: int,
) -> Dict[str, List[Dict[str, int]]]:
    # Initialize d×w counter matrix with all zeros
    sketch = [[0] * width for _ in range(depth)]  # @step:initialize

    # Insert phase: for each element, increment d counters
    for element in elements:
        for hash_idx in range(depth):
            col = compute_sketch_hash(element, hash_idx, width)
            sketch[hash_idx][col] += 1  # @step:increment-count

    # Query phase: estimate frequency by taking minimum across all d rows
    results = []
    for query in queries:
        min_count = min(  # @step:check-membership
            sketch[hash_idx][compute_sketch_hash(query, hash_idx, width)]
            for hash_idx in range(depth)
        )
        if min_count > 0:
            results.append({"value": query, "estimatedCount": min_count})  # @step:member-found
        else:
            pass  # @step:member-not-found

    return {"results": results}  # @step:complete
