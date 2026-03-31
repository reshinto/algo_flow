# Reshape Matrix
# Reshape an m×n matrix into a new r×c matrix in row-major order.
# If reshape is impossible (m*n != r*c), return the original matrix.
# LeetCode 566
# Time: O(m x n) — visits every element exactly once
# Space: O(1) extra (output matrix aside)


def reshape_matrix(
    matrix: list[list[int]], target_rows: int, target_cols: int
) -> list[list[int]]:
    source_rows = len(matrix)  # @step:initialize
    source_cols = len(matrix[0]) if matrix else 0  # @step:initialize
    total_elements = source_rows * source_cols  # @step:initialize

    if total_elements != target_rows * target_cols:  # @step:initialize
        return matrix

    result = [[0] * target_cols for _ in range(target_rows)]  # @step:initialize

    for flat_idx in range(total_elements):
        src_row = flat_idx // source_cols
        src_col = flat_idx % source_cols
        dst_row = flat_idx // target_cols
        dst_col = flat_idx % target_cols
        result[dst_row][dst_col] = matrix[src_row][src_col]  # @step:place-value

    return result  # @step:complete
