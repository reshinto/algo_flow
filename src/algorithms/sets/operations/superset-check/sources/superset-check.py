# Superset Check using a Hash Set
# Determines whether every element of array_b also appears in array_a (A ⊇ B).
# Time: O(n + m) — O(n) to build the set, O(m) to check membership
# Space: O(n) for the hash set


def superset_check(array_a: list[int], array_b: list[int]) -> dict[str, bool]:
    hash_set = set()  # @step:initialize

    # Phase 1: build the hash set from array_a
    for value_a in array_a:
        hash_set.add(value_a)  # @step:add-to-set

    # Phase 2: check each element of array_b for membership in the hash set
    for value_b in array_b:
        if value_b in hash_set:
            # value_b is present in array_a — condition holds so far
            pass  # @step:subset-pass
        else:
            # value_b is missing from array_a — A is not a superset of B
            return {"is_superset": False}  # @step:subset-fail

    return {"is_superset": True}  # @step:complete
