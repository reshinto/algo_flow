# Bloom Filter — Probabilistic Membership Data Structure
# Uses k hash functions to map elements into a bit array of size m.
# Insert: set k bit positions to 1. Query: check if all k positions are 1.
# False positives possible; false negatives impossible.
# Time: O(k) per operation — Space: O(m) for the bit array


def compute_hash_positions(value: int, hash_count: int, size: int) -> list[int]:
    positions = []
    for hash_idx in range(hash_count):
        hash_val = abs((value * (hash_idx + 1) * 31 + hash_idx * 17) % size)
        positions.append(hash_val)
    return positions


def bloom_filter(
    elements: list[int],
    queries: list[int],
    size: int,
    hash_count: int,
) -> dict:
    bit_array = [0] * size  # @step:initialize

    # Insert phase: hash each element and set its bit positions
    for element in elements:
        positions = compute_hash_positions(element, hash_count, size)  # @step:hash-element
        for position in positions:
            bit_array[position] = 1  # @step:set-bit

    results = []

    # Query phase: check if all bit positions for a query value are set
    for query in queries:
        positions = compute_hash_positions(query, hash_count, size)  # @step:check-bit
        all_bits_set = all(bit_array[pos] == 1 for pos in positions)

        if all_bits_set:
            results.append({"value": query, "found": True})  # @step:member-found
        else:
            results.append({"value": query, "found": False})  # @step:member-not-found

    return {"results": results}  # @step:complete
