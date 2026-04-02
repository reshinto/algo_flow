# Set Union using a Hash Set
# Returns all unique elements from both array_a and array_b.
# Time: O(n + m) — O(n) to build the set, O(m) to check membership
# Space: O(n + m) for the hash set and result


def set_union(array_a: list[int], array_b: list[int]) -> list[int]:
    hash_set = set()  # @step:initialize
    result = []  # @step:initialize

    # Phase 1: add all elements of array A to hash set and result
    for value_a in array_a:
        hash_set.add(value_a)  # @step:add-to-set
        result.append(value_a)

    # Phase 2: add elements of array B not already in the hash set
    for value_b in array_b:
        if value_b in hash_set:
            pass  # @step:skip-element
        else:
            result.append(value_b)  # @step:add-to-result

    return result  # @step:complete
