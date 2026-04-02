# Set Equality using a Hash Set
# Determines whether array_a and array_b contain exactly the same unique elements (A = B).
# Two sets are equal iff A ⊆ B and B ⊆ A, which implies equal unique element counts.
# Time: O(n + m) — O(n) to build the set, O(m) to check membership
# Space: O(n) for the hash set


def set_equality(array_a: list[int], array_b: list[int]) -> dict[str, bool]:
    hash_set = set()  # @step:initialize
    unique_count_a = 0

    # Phase 1: build the hash set from array_a, counting unique elements
    for value_a in array_a:
        if value_a not in hash_set:
            unique_count_a += 1
        hash_set.add(value_a)  # @step:add-to-set

    # Phase 2: check each element of array_b for membership; count unique elements in B
    unique_count_b = 0
    seen_in_b: set[int] = set()

    for value_b in array_b:
        if value_b not in seen_in_b:
            unique_count_b += 1
            seen_in_b.add(value_b)

        if value_b in hash_set:
            # value_b is present in array_a — A ⊇ {value_b} holds so far
            pass  # @step:subset-pass
        else:
            # value_b is missing from array_a — sets cannot be equal
            return {"is_equal": False}  # @step:subset-fail

    # Equal iff all B elements are in A and both have the same unique count
    is_equal = unique_count_a == unique_count_b
    return {"is_equal": is_equal}  # @step:complete
