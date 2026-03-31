# Zigzag (Diagonal) Traversal
# Traverses a 2D matrix in alternating diagonal directions.
# Even diagonals: upward (bottom-left to top-right)
# Odd diagonals: downward (top-right to bottom-left)
# Time: O(m x n) — every element visited once
# Space: O(1) extra (output list aside)


def zigzag_traversal(matrix: list[list[int]]) -> list[int]:
    result = []  # @step:initialize
    if not matrix:  # @step:initialize
        return result

    row_count = len(matrix)  # @step:initialize
    col_count = len(matrix[0])  # @step:initialize
    diagonal_count = row_count + col_count - 1  # @step:initialize

    for diag_idx in range(diagonal_count):  # @step:move-direction
        if diag_idx % 2 == 0:  # @step:move-direction
            # Even diagonal: go upward (increasing col, decreasing row)
            current_row = diag_idx if diag_idx < row_count else row_count - 1  # @step:move-direction
            current_col = 0 if diag_idx < row_count else diag_idx - row_count + 1  # @step:move-direction

            while current_row >= 0 and current_col < col_count:  # @step:collect-element
                result.append(matrix[current_row][current_col])  # @step:collect-element
                current_row -= 1  # @step:collect-element
                current_col += 1  # @step:collect-element
        else:  # @step:move-direction
            # Odd diagonal: go downward (decreasing col, increasing row)
            current_row = 0 if diag_idx < col_count else diag_idx - col_count + 1  # @step:move-direction
            current_col = diag_idx if diag_idx < col_count else col_count - 1  # @step:move-direction

            while current_row < row_count and current_col >= 0:  # @step:collect-element
                result.append(matrix[current_row][current_col])  # @step:collect-element
                current_row += 1  # @step:collect-element
                current_col -= 1  # @step:collect-element

    return result  # @step:complete
