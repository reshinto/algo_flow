# Set Matrix Zeroes
# For each cell containing 0, set its entire row and column to 0.
# Uses the first row and first column as in-place markers to achieve O(1) extra space.
# Time: O(m x n) — two full passes over the matrix
# Space: O(1) — markers stored in the first row and column


def set_matrix_zeroes(matrix: list[list[int]]) -> list[list[int]]:
    row_count = len(matrix)  # @step:initialize
    col_count = len(matrix[0])  # @step:initialize

    # Track whether the first row and first column originally contain a zero
    first_row_has_zero = any(matrix[0][col_idx] == 0 for col_idx in range(col_count))  # @step:mark-cell
    first_col_has_zero = any(matrix[row_idx][0] == 0 for row_idx in range(row_count))  # @step:mark-cell

    # Phase 1: Scan inner cells and mark first row/col for rows/cols that must be zeroed
    for row_idx in range(1, row_count):
        for col_idx in range(1, col_count):
            if matrix[row_idx][col_idx] == 0:
                matrix[row_idx][0] = 0  # @step:mark-cell
                matrix[0][col_idx] = 0  # @step:mark-cell

    # Phase 2: Use markers in first row/col to zero out inner rows and columns
    for row_idx in range(1, row_count):
        for col_idx in range(1, col_count):
            if matrix[row_idx][0] == 0 or matrix[0][col_idx] == 0:
                matrix[row_idx][col_idx] = 0  # @step:zero-cell

    # Zero the first row if it originally had a zero
    if first_row_has_zero:
        for col_idx in range(col_count):
            matrix[0][col_idx] = 0  # @step:zero-cell

    # Zero the first column if it originally had a zero
    if first_col_has_zero:
        for row_idx in range(row_count):
            matrix[row_idx][0] = 0  # @step:zero-cell

    return matrix  # @step:complete
