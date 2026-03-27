# Set Intersection using a Hash Set
# Returns all elements that appear in both array_a and array_b (no duplicates).
# Time: O(n + m) — O(n) to build the set, O(m) to check membership
# Space: O(n) for the hash set


def set_intersection(array_a: list[int], array_b: list[int]) -> list[int]:
    hash_set = set()  # @step:initialize
    result = []  # @step:initialize

    # Phase 1: build the hash set from array A
    for value_a in array_a:
        hash_set.add(value_a)  # @step:add-to-set

    # Phase 2: check each element of array B for membership
    for value_b in array_b:
        if value_b in hash_set:
            # value_b is in both arrays
            result.append(value_b)  # @step:member-found
            hash_set.discard(value_b)  # prevent duplicate results
        else:
            pass  # @step:member-not-found

    return result  # @step:complete
