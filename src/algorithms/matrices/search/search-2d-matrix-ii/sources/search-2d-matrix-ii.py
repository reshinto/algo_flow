# Search a 2D Matrix II (Staircase Search)
# Each row sorted left-to-right, each column sorted top-to-bottom.
# Start from top-right: move left if value > target, move down if value < target.
# Time: O(m + n) — at most m+n steps eliminating a row or column each time
# Space: O(1) — no auxiliary data structures


def search_2d_matrix_ii(matrix: list[list[int]], target: int) -> bool:
    if not matrix or not matrix[0]:  # @step:initialize
        return False

    row_count = len(matrix)  # @step:initialize
    col_count = len(matrix[0])  # @step:initialize
    current_row = 0  # @step:initialize
    current_col = col_count - 1  # @step:initialize

    while current_row < row_count and current_col >= 0:
        current_value = matrix[current_row][current_col]  # @step:compare-cell

        if current_value == target:
            return True  # @step:mark-found
        elif current_value > target:
            current_col -= 1  # @step:compare-cell
        else:
            current_row += 1  # @step:compare-cell

    return False  # @step:complete
