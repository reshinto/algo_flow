# Kth Smallest Element in Sorted Matrix
# Given an n×n matrix where each row and column is sorted in ascending order,
# find the kth smallest element using binary search on the value range.
# Time: O(n × log(max − min)) — n staircase steps per binary search iteration
# Space: O(1) — no auxiliary data structures needed


def kth_smallest_sorted_matrix(matrix: list[list[int]], target_k: int) -> int:
    matrix_size = len(matrix)
    left_val = matrix[0][0]  # @step:initialize
    right_val = matrix[matrix_size - 1][matrix_size - 1]  # @step:initialize

    while left_val < right_val:
        mid_val = left_val + (right_val - left_val) // 2  # @step:compare-cell

        # Count elements <= mid_val using staircase from bottom-left
        element_count = 0  # @step:compare-cell
        current_row = matrix_size - 1  # @step:compare-cell
        current_col = 0  # @step:compare-cell

        while current_row >= 0 and current_col < matrix_size:
            if matrix[current_row][current_col] <= mid_val:
                element_count += current_row + 1  # @step:compare-cell
                current_col += 1
            else:
                current_row -= 1  # @step:compare-cell

        if element_count < target_k:
            left_val = mid_val + 1  # @step:compare-cell
        else:
            right_val = mid_val  # @step:compare-cell

    return left_val  # @step:mark-found
    # @step:complete
