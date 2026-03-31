# Transpose Matrix
# Swap rows and columns. For square matrices, swap in-place above the diagonal.
# For non-square matrices, build a new matrix with dimensions swapped.
# Time: O(m x n) — every element is processed exactly once
# Space: O(1) for square matrices (in-place), O(m x n) for non-square


def transpose_matrix(matrix: list[list[int]]) -> list[list[int]]:
    row_count = len(matrix)  # @step:initialize
    col_count = len(matrix[0])  # @step:initialize

    if row_count == col_count:
        # Square matrix: swap in-place above the main diagonal
        for row_idx in range(row_count):
            for col_idx in range(row_idx + 1, col_count):
                matrix[row_idx][col_idx], matrix[col_idx][row_idx] = (  # @step:swap-cells
                    matrix[col_idx][row_idx],
                    matrix[row_idx][col_idx],
                )
        return matrix  # @step:complete

    # Non-square matrix: create a new col_count x row_count matrix
    result = [[0] * row_count for _ in range(col_count)]  # @step:initialize
    for row_idx in range(row_count):
        for col_idx in range(col_count):
            result[col_idx][row_idx] = matrix[row_idx][col_idx]  # @step:swap-cells

    return result  # @step:complete
