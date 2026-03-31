# Spiral Matrix II
# Generates an n×n matrix filled with elements from 1 to n² in clockwise spiral order.
# LeetCode 59
# Time: O(n²) — every cell is filled exactly once
# Space: O(1) extra (output matrix aside)


def spiral_matrix_ii(matrix_size: int) -> list[list[int]]:
    matrix = [[0] * matrix_size for _ in range(matrix_size)]  # @step:initialize

    top_bound = 0  # @step:initialize
    bottom_bound = matrix_size - 1  # @step:initialize
    left_bound = 0  # @step:initialize
    right_bound = matrix_size - 1  # @step:initialize
    current_value = 1  # @step:initialize

    while top_bound <= bottom_bound and left_bound <= right_bound:
        # Fill right along top row
        for col_idx in range(left_bound, right_bound + 1):
            matrix[top_bound][col_idx] = current_value  # @step:place-value
            current_value += 1
        top_bound += 1

        # Fill down along right column
        for row_idx in range(top_bound, bottom_bound + 1):
            matrix[row_idx][right_bound] = current_value  # @step:place-value
            current_value += 1
        right_bound -= 1

        # Fill left along bottom row (if still within bounds)
        if top_bound <= bottom_bound:
            for col_idx in range(right_bound, left_bound - 1, -1):
                matrix[bottom_bound][col_idx] = current_value  # @step:place-value
                current_value += 1
            bottom_bound -= 1

        # Fill up along left column (if still within bounds)
        if left_bound <= right_bound:
            for row_idx in range(bottom_bound, top_bound - 1, -1):
                matrix[row_idx][left_bound] = current_value  # @step:place-value
                current_value += 1
            left_bound += 1

    return matrix  # @step:complete
