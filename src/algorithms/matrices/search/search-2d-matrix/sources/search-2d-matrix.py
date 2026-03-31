# Search a 2D Matrix (Binary Search)
# Matrix rows are sorted left-to-right; first integer of each row > last of previous.
# Treat as a virtual 1D sorted array and binary search.
# Time: O(log(m x n)) — single binary search over m*n elements
# Space: O(1) — no auxiliary data structures


def search_2d_matrix(matrix: list[list[int]], target: int) -> bool:
    if not matrix or not matrix[0]:  # @step:initialize
        return False

    row_count = len(matrix)  # @step:initialize
    col_count = len(matrix[0])  # @step:initialize
    left_idx = 0  # @step:initialize
    right_idx = row_count * col_count - 1  # @step:initialize

    while left_idx <= right_idx:
        mid_index = (left_idx + right_idx) // 2  # @step:compare-cell
        mid_row = mid_index // col_count  # @step:compare-cell
        mid_col = mid_index % col_count  # @step:compare-cell
        mid_value = matrix[mid_row][mid_col]  # @step:compare-cell

        if mid_value == target:
            return True  # @step:mark-found
        elif mid_value < target:
            left_idx = mid_index + 1  # @step:compare-cell
        else:
            right_idx = mid_index - 1  # @step:compare-cell

    return False  # @step:complete
