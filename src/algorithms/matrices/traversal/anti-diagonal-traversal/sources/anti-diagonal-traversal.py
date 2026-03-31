# Anti-Diagonal Traversal
# Collects all elements of a 2D matrix along anti-diagonals (where row + col is constant).
# Time: O(m x n) — every element visited once
# Space: O(1) extra (output list aside)


def anti_diagonal_traversal(matrix: list[list[int]]) -> list[int]:
    result = []  # @step:initialize
    if not matrix:  # @step:initialize
        return result

    row_count = len(matrix)  # @step:initialize
    col_count = len(matrix[0])  # @step:initialize
    diagonal_count = row_count + col_count - 1  # @step:initialize

    for diag_sum in range(diagonal_count):  # @step:move-direction
        start_row = 0 if diag_sum < col_count else diag_sum - col_count + 1  # @step:move-direction
        end_row = diag_sum if diag_sum < row_count else row_count - 1  # @step:move-direction

        for current_row in range(start_row, end_row + 1):  # @step:collect-element
            current_col = diag_sum - current_row  # @step:collect-element
            result.append(matrix[current_row][current_col])  # @step:collect-element

    return result  # @step:complete
