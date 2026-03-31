# Flip and Invert Binary Image (LeetCode 832)
# Flip each row horizontally (reverse), then invert every element (0→1, 1→0).
# Time: O(m x n) — each element touched once
# Space: O(1) — in-place


def flip_image(matrix: list[list[int]]) -> list[list[int]]:
    row_count = len(matrix)  # @step:initialize
    col_count = len(matrix[0]) if matrix else 0  # @step:initialize

    for row_idx in range(row_count):
        left_col = 0  # @step:flip-cell
        right_col = col_count - 1  # @step:flip-cell

        # Two-pointer: swap and XOR-invert simultaneously from both ends
        while left_col < right_col:
            left_val = matrix[row_idx][left_col]  # @step:flip-cell
            right_val = matrix[row_idx][right_col]  # @step:flip-cell
            matrix[row_idx][left_col] = right_val ^ 1  # @step:flip-cell
            matrix[row_idx][right_col] = left_val ^ 1  # @step:flip-cell
            left_col += 1  # @step:flip-cell
            right_col -= 1  # @step:flip-cell

        # When col_count is odd, middle element only needs inversion
        if left_col == right_col:
            matrix[row_idx][left_col] ^= 1  # @step:flip-cell

    return matrix  # @step:complete
