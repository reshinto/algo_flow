# Set Complement using a Hash Set
# Returns all elements in the universal set U that are NOT in set A.
# Complement = U \ A
# Time: O(n + u) — O(n) to build the set from A, O(u) to scan the universal set
# Space: O(n) for the hash set


def set_complement(array_a: list[int], universal_set: list[int]) -> list[int]:
    hash_set = set()  # @step:initialize
    result = []  # @step:initialize

    # Phase 1: build the hash set from array A
    for value_a in array_a:
        hash_set.add(value_a)  # @step:add-to-set

    # Phase 2: collect elements in the universal set that are NOT in A
    for value_u in universal_set:
        if value_u in hash_set:
            # value_u is in A, so skip it
            pass  # @step:skip-element
        else:
            # value_u is not in A — it belongs to the complement
            result.append(value_u)  # @step:add-to-result

    return result  # @step:complete
