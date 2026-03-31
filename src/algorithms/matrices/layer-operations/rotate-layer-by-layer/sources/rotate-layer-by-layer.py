# Rotate Layer by Layer
# Rotates an n×n matrix 90° clockwise by processing each concentric layer (ring) from outside in.
# For each layer, performs a 4-way cyclic swap of elements using a temp variable.
# Time: O(n²) — every element is touched exactly once
# Space: O(1) — in-place, only a temp variable is used


def rotate_layer_by_layer(matrix: list[list[int]]) -> list[list[int]]:
    matrix_size = len(matrix)  # @step:initialize
    total_layers = matrix_size // 2  # @step:initialize

    for layer_idx in range(total_layers):  # @step:select-layer
        top_row = layer_idx  # @step:select-layer
        bottom_row = matrix_size - 1 - layer_idx  # @step:select-layer
        left_col = layer_idx  # @step:select-layer
        right_col = matrix_size - 1 - layer_idx  # @step:select-layer

        for position_idx in range(layer_idx, matrix_size - 1 - layer_idx):  # @step:swap-cells
            offset = position_idx - layer_idx  # @step:swap-cells

            # Save top
            temp = matrix[top_row][left_col + offset]  # @step:swap-cells

            # Left → Top
            matrix[top_row][left_col + offset] = matrix[bottom_row - offset][left_col]  # @step:swap-cells

            # Bottom → Left
            matrix[bottom_row - offset][left_col] = matrix[bottom_row][right_col - offset]  # @step:swap-cells

            # Right → Bottom
            matrix[bottom_row][right_col - offset] = matrix[top_row + offset][right_col]  # @step:swap-cells

            # Top (saved) → Right
            matrix[top_row + offset][right_col] = temp  # @step:swap-cells

    return matrix  # @step:complete
