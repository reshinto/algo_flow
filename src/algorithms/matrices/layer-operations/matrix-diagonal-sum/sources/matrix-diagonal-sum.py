# Matrix Diagonal Sum
# Sum of primary diagonal + secondary (anti) diagonal elements.
# For odd-sized matrices, subtract the center element (counted twice).
# LeetCode 1572
# Time: O(n) — single pass over n diagonal pairs
# Space: O(1) — only integer accumulator


def matrix_diagonal_sum(matrix: list[list[int]]) -> int:
    matrix_size = len(matrix)  # @step:initialize
    running_sum = 0  # @step:initialize

    for diag_idx in range(matrix_size):
        running_sum += matrix[diag_idx][diag_idx]  # @step:accumulate
        running_sum += matrix[diag_idx][matrix_size - 1 - diag_idx]  # @step:accumulate

    if matrix_size % 2 == 1:
        center_idx = matrix_size // 2
        running_sum -= matrix[center_idx][center_idx]  # @step:accumulate

    return running_sum  # @step:complete
