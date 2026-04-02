# Power Set — Backtracking Generation
# Generates all 2^n subsets of the input elements by choosing to include or exclude each element.
# Time: O(n × 2^n) — generate 2^n subsets, each of length up to n
# Space: O(n × 2^n) — store all subsets


def power_set(elements: list[int]) -> list[list[int]]:
    result: list[list[int]] = []  # @step:initialize
    current_subset: list[int] = []  # @step:initialize

    def backtrack(start_idx: int) -> None:
        result.append(list(current_subset))  # @step:generate-subset

        for elem_idx in range(start_idx, len(elements)):
            current_subset.append(elements[elem_idx])  # @step:initialize
            backtrack(elem_idx + 1)
            current_subset.pop()  # @step:backtrack

    backtrack(0)  # @step:initialize
    return result  # @step:complete
