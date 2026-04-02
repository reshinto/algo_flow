# Subset Check using a Hash Set
# Determines whether every element of array_a also appears in array_b (A ⊆ B).
# Time: O(n + m) — O(m) to build the set, O(n) to check membership
# Space: O(m) for the hash set


def subset_check(array_a: list[int], array_b: list[int]) -> dict[str, bool]:
    hash_set = set()  # @step:initialize

    # Phase 1: build the hash set from array_b
    for value_b in array_b:
        hash_set.add(value_b)  # @step:add-to-set

    # Phase 2: check each element of array_a for membership in the hash set
    for value_a in array_a:
        if value_a in hash_set:
            # value_a is present in array_b — condition holds so far
            pass  # @step:subset-pass
        else:
            # value_a is missing from array_b — A is not a subset of B
            return {"is_subset": False}  # @step:subset-fail

    return {"is_subset": True}  # @step:complete
