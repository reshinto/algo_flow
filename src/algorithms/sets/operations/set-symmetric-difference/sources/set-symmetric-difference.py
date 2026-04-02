# Set Symmetric Difference using a Hash Set
# Returns all elements in either array_a or array_b, but NOT in both (A △ B).
# Time: O(n + m) — O(n) to build the set, O(m) to process B, O(n) to collect remaining
# Space: O(n) for the hash set


def set_symmetric_difference(array_a: list[int], array_b: list[int]) -> list[int]:
    hash_set = set()  # @step:initialize
    result = []  # @step:initialize

    # Phase 1: build the hash set from array A
    for value_a in array_a:
        hash_set.add(value_a)  # @step:add-to-set

    # Phase 2: process array B — remove common elements, add unique ones
    for value_b in array_b:
        if value_b in hash_set:
            hash_set.discard(value_b)  # @step:skip-element
        else:
            result.append(value_b)  # @step:add-to-result

    # Phase 3: remaining elements in hash set are only in A
    for remaining in hash_set:
        result.append(remaining)  # @step:add-to-result

    return result  # @step:complete
