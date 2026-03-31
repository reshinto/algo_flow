# Rotate Matrix 90° Clockwise
# Rotates an n×n matrix 90° clockwise in-place using transpose then reverse rows.
# Time: O(n²) — each element touched twice
# Space: O(1) — in-place


def rotate_matrix(matrix: list[list[int]]) -> list[list[int]]:
    matrix_size = len(matrix)  # @step:initialize

    # Step 1: Transpose (swap matrix[row_idx][col_idx] with matrix[col_idx][row_idx])
    for row_idx in range(matrix_size):  # @step:swap-cells
        for col_idx in range(row_idx + 1, matrix_size):  # @step:swap-cells
            temp = matrix[row_idx][col_idx]  # @step:swap-cells
            matrix[row_idx][col_idx] = matrix[col_idx][row_idx]  # @step:swap-cells
            matrix[col_idx][row_idx] = temp  # @step:swap-cells

    # Step 2: Reverse each row
    for row_idx in range(matrix_size):  # @step:swap-cells
        left_col = 0  # @step:swap-cells
        right_col = matrix_size - 1  # @step:swap-cells
        while left_col < right_col:  # @step:swap-cells
            temp = matrix[row_idx][left_col]  # @step:swap-cells
            matrix[row_idx][left_col] = matrix[row_idx][right_col]  # @step:swap-cells
            matrix[row_idx][right_col] = temp  # @step:swap-cells
            left_col += 1  # @step:swap-cells
            right_col -= 1  # @step:swap-cells

    return matrix  # @step:complete
