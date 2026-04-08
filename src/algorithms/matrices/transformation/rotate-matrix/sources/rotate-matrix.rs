// Rotate Matrix 90° Clockwise
// Rotates an n×n matrix 90° clockwise in-place using transpose then reverse rows.
// Time: O(n²) — each element touched twice
// Space: O(1) — in-place

fn rotate_matrix(matrix: &mut Vec<Vec<i32>>) -> &Vec<Vec<i32>> {
    let matrix_size = matrix.len(); // @step:initialize

    // Step 1: Transpose (swap matrix[row_idx][col_idx] with matrix[col_idx][row_idx])
    for row_idx in 0..matrix_size {
        // @step:swap-cells
        for col_idx in row_idx + 1..matrix_size {
            // @step:swap-cells
            let temp = matrix[row_idx][col_idx]; // @step:swap-cells
            matrix[row_idx][col_idx] = matrix[col_idx][row_idx]; // @step:swap-cells
            matrix[col_idx][row_idx] = temp; // @step:swap-cells
        }
    }

    // Step 2: Reverse each row
    for row_idx in 0..matrix_size {
        // @step:swap-cells
        let mut left_col: usize = 0; // @step:swap-cells
        let mut right_col: usize = matrix_size - 1; // @step:swap-cells
        while left_col < right_col {
            // @step:swap-cells
            let temp = matrix[row_idx][left_col]; // @step:swap-cells
            matrix[row_idx][left_col] = matrix[row_idx][right_col]; // @step:swap-cells
            matrix[row_idx][right_col] = temp; // @step:swap-cells
            left_col += 1; // @step:swap-cells
            right_col -= 1; // @step:swap-cells
        }
    }

    matrix // @step:complete
}
