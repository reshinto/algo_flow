# Set Difference using a Hash Set
# Returns all elements in array_a that are NOT in array_b (A \ B).
# Time: O(n + m) — O(m) to build the set, O(n) to filter
# Space: O(m) for the hash set


def set_difference(array_a: list[int], array_b: list[int]) -> list[int]:
    hash_set = set()  # @step:initialize
    result = []  # @step:initialize

    # Phase 1: build the hash set from array B
    for value_b in array_b:
        hash_set.add(value_b)  # @step:add-to-set

    # Phase 2: include only elements of array A not found in the hash set
    for value_a in array_a:
        if value_a in hash_set:
            pass  # @step:skip-element
        else:
            result.append(value_a)  # @step:add-to-result

    return result  # @step:complete
