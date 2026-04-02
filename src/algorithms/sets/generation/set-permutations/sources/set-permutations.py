# Set Permutations
# Generates all n! orderings of a set using backtracking with in-place swaps.
# Time: O(n × n!) — n! permutations each of length n
# Space: O(n × n!) for the result, O(n) call stack depth


def set_permutations(elements: list[int]) -> list[list[int]]:
    result: list[list[int]] = []  # @step:initialize
    working = elements[:]  # @step:initialize

    def permute(start_idx: int) -> None:
        if start_idx == len(working):
            result.append(working[:])  # @step:generate-permutation
            return

        for swap_idx in range(start_idx, len(working)):
            # Swap working[start_idx] with working[swap_idx]
            working[start_idx], working[swap_idx] = working[swap_idx], working[start_idx]  # @step:backtrack
            permute(start_idx + 1)
            # Restore original order
            working[start_idx], working[swap_idx] = working[swap_idx], working[start_idx]  # @step:backtrack

    permute(0)
    return result  # @step:complete
