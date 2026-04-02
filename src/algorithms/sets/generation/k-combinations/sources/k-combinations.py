# K-Combinations — Backtracking Generation
# Generates all C(n,k) subsets of exactly k elements from the input list.
# Time: O(k × C(n,k)) — generate C(n,k) combinations, each of length k
# Space: O(k × C(n,k)) — store all combinations


def k_combinations(elements: list[int], choose_k: int) -> list[list[int]]:
    result: list[list[int]] = []  # @step:initialize
    current_subset: list[int] = []  # @step:initialize

    def backtrack(start_idx: int) -> None:
        if len(current_subset) == choose_k:
            result.append(list(current_subset))  # @step:generate-subset
            return

        for elem_idx in range(start_idx, len(elements)):
            current_subset.append(elements[elem_idx])  # @step:initialize
            backtrack(elem_idx + 1)
            current_subset.pop()  # @step:backtrack

    backtrack(0)  # @step:initialize
    return result  # @step:complete
