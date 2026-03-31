# Toeplitz Matrix Verification
# Determines if a matrix is a Toeplitz matrix — every descending diagonal
# from left to right contains all equal elements.
# LeetCode 766
# Time: O(m × n) — every cell (except first row/col) is compared exactly once
# Space: O(1)


def toeplitz_matrix(matrix: list[list[int]]) -> bool:
    row_count = len(matrix)  # @step:initialize
    col_count = len(matrix[0])  # @step:initialize

    for row_idx in range(1, row_count):
        for col_idx in range(1, col_count):
            current = matrix[row_idx][col_idx]  # @step:compare-cell
            upper_left = matrix[row_idx - 1][col_idx - 1]  # @step:compare-cell
            if current != upper_left:  # @step:compare-cell
                return False

    return True  # @step:complete
