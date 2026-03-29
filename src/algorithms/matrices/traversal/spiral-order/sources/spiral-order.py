# Spiral Order Matrix Traversal
# Returns all elements of a 2D matrix in spiral (clockwise) order.
# Time: O(m x n) — every element is visited exactly once
# Space: O(1) extra (output list aside)


def spiral_order(matrix: list[list[int]]) -> list[int]:
    result = []  # @step:initialize
    if not matrix:  # @step:initialize
        return result

    top_bound = 0  # @step:initialize
    bottom_bound = len(matrix) - 1  # @step:initialize
    left_bound = 0  # @step:initialize
    right_bound = len(matrix[0]) - 1  # @step:initialize

    while top_bound <= bottom_bound and left_bound <= right_bound:
        # Traverse right along top row
        for col_idx in range(left_bound, right_bound + 1):
            result.append(matrix[top_bound][col_idx])  # @step:collect-element
        top_bound += 1  # @step:shrink-boundary

        # Traverse down along right column
        for row_idx in range(top_bound, bottom_bound + 1):
            result.append(matrix[row_idx][right_bound])  # @step:collect-element
        right_bound -= 1  # @step:shrink-boundary

        # Traverse left along bottom row (if still within bounds)
        if top_bound <= bottom_bound:
            for col_idx in range(right_bound, left_bound - 1, -1):
                result.append(matrix[bottom_bound][col_idx])  # @step:collect-element
            bottom_bound -= 1  # @step:shrink-boundary

        # Traverse up along left column (if still within bounds)
        if left_bound <= right_bound:
            for row_idx in range(bottom_bound, top_bound - 1, -1):
                result.append(matrix[row_idx][left_bound])  # @step:collect-element
            left_bound += 1  # @step:shrink-boundary

    return result  # @step:complete
