// Diagonal Traversal
// Collects all elements of a 2D matrix along its diagonals (top-left to bottom-right).
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

fn diagonal_traversal(matrix: &Vec<Vec<i32>>) -> Vec<i32> {
    let mut result: Vec<i32> = vec![]; // @step:initialize
    if matrix.is_empty() { return result; } // @step:initialize

    let row_count = matrix.len(); // @step:initialize
    let col_count = matrix[0].len(); // @step:initialize
    let diagonal_count = row_count + col_count - 1; // @step:initialize

    for diag_idx in 0..diagonal_count {
        // @step:move-direction
        let start_row = if diag_idx < col_count { 0 } else { diag_idx - col_count + 1 }; // @step:move-direction
        let start_col = if diag_idx < col_count { diag_idx } else { col_count - 1 }; // @step:move-direction

        let mut current_row = start_row; // @step:move-direction
        let mut current_col = start_col as i32; // @step:move-direction

        while current_row < row_count && current_col >= 0 {
            // @step:collect-element
            result.push(matrix[current_row][current_col as usize]); // @step:collect-element
            current_row += 1; // @step:collect-element
            current_col -= 1; // @step:collect-element
        }
    }

    result // @step:complete
}
