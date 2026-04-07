// Rotate Layer by Layer
// Rotates an n×n matrix 90° clockwise by processing each concentric layer (ring) from outside in.
// For each layer, performs a 4-way cyclic swap of elements using a temp variable.
// Time: O(n²) — every element is touched exactly once
// Space: O(1) — in-place, only a temp variable is used

fn rotate_layer_by_layer(matrix: &mut Vec<Vec<i32>>) -> &Vec<Vec<i32>> {
    let matrix_size = matrix.len(); // @step:initialize
    let total_layers = matrix_size / 2; // @step:initialize

    for layer_idx in 0..total_layers {
        // @step:select-layer
        let top_row = layer_idx; // @step:select-layer
        let bottom_row = matrix_size - 1 - layer_idx; // @step:select-layer
        let left_col = layer_idx; // @step:select-layer
        let right_col = matrix_size - 1 - layer_idx; // @step:select-layer

        for position_idx in layer_idx..matrix_size - 1 - layer_idx {
            // @step:swap-cells
            let offset = position_idx - layer_idx; // @step:swap-cells

            // Save top
            let temp = matrix[top_row][left_col + offset]; // @step:swap-cells

            // Left → Top
            matrix[top_row][left_col + offset] = matrix[bottom_row - offset][left_col]; // @step:swap-cells

            // Bottom → Left
            matrix[bottom_row - offset][left_col] = matrix[bottom_row][right_col - offset]; // @step:swap-cells

            // Right → Bottom
            matrix[bottom_row][right_col - offset] = matrix[top_row + offset][right_col]; // @step:swap-cells

            // Top (saved) → Right
            matrix[top_row + offset][right_col] = temp; // @step:swap-cells
        }
    }

    matrix // @step:complete
}
