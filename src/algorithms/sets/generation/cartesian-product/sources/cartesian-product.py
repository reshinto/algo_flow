# Cartesian Product
# Generates all ordered pairs (a, b) where a ∈ set_a and b ∈ set_b.
# Time: O(n × m) — one pair per combination of elements
# Space: O(n × m) for the result list


def cartesian_product(set_a: list[int], set_b: list[int]) -> list[list[int]]:
    result: list[list[int]] = []  # @step:initialize

    for elem_a in set_a:
        for elem_b in set_b:
            result.append([elem_a, elem_b])  # @step:generate-pair

    return result  # @step:complete
