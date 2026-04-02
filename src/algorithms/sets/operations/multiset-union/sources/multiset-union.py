# Multiset Union (Bag Union) using frequency dicts
# For each element, take the MAX count from array_a and array_b.
# Time: O(n + m) — one pass over each array plus iteration over unique keys
# Space: O(n + m) for the two frequency dicts


def multiset_union(array_a: list[int], array_b: list[int]) -> list[int]:
    counts_a: dict[int, int] = {}  # @step:initialize
    counts_b: dict[int, int] = {}  # @step:initialize
    result: list[int] = []  # @step:initialize

    # Phase 1: count frequencies in array_a
    for value_a in array_a:
        counts_a[value_a] = counts_a.get(value_a, 0) + 1  # @step:count-element

    # Phase 2: count frequencies in array_b
    for value_b in array_b:
        counts_b[value_b] = counts_b.get(value_b, 0) + 1  # @step:count-element

    # Phase 3: for each unique element take max(count_a, count_b) copies
    all_keys = set(counts_a) | set(counts_b)
    for value in all_keys:
        count_a = counts_a.get(value, 0)
        count_b = counts_b.get(value, 0)
        max_count = max(count_a, count_b)  # @step:compare-count
        for _ in range(max_count):
            result.append(value)  # @step:add-to-result

    result.sort()
    return result  # @step:complete
