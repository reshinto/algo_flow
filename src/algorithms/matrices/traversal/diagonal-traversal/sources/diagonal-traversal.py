# Diagonal Traversal
# Collects all elements of a 2D matrix along its diagonals (top-left to bottom-right).
# Time: O(m × n) — every element visited once
# Space: O(1) extra (output list aside)


def diagonal_traversal(matrix: list[list[int]]) -> list[int]:
    result = []  # @step:initialize
    if not matrix:  # @step:initialize
        return result

    row_count = len(matrix)  # @step:initialize
    col_count = len(matrix[0])  # @step:initialize
    diagonal_count = row_count + col_count - 1  # @step:initialize

    for diag_idx in range(diagonal_count):  # @step:move-direction
        start_row = 0 if diag_idx < col_count else diag_idx - col_count + 1  # @step:move-direction
        start_col = diag_idx if diag_idx < col_count else col_count - 1  # @step:move-direction

        current_row = start_row  # @step:move-direction
        current_col = start_col  # @step:move-direction

        while current_row < row_count and current_col >= 0:  # @step:collect-element
            result.append(matrix[current_row][current_col])  # @step:collect-element
            current_row += 1  # @step:collect-element
            current_col -= 1  # @step:collect-element

    return result  # @step:complete
