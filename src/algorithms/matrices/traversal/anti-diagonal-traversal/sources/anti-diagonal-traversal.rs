// Anti-Diagonal Traversal
// Collects all elements of a 2D matrix along anti-diagonals (where row + col = constant).
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

fn anti_diagonal_traversal(matrix: &Vec<Vec<i32>>) -> Vec<i32> {
    let mut result: Vec<i32> = vec![]; // @step:initialize
    if matrix.is_empty() { return result; } // @step:initialize

    let row_count = matrix.len(); // @step:initialize
    let col_count = matrix[0].len(); // @step:initialize
    let diagonal_count = row_count + col_count - 1; // @step:initialize

    for diag_sum in 0..diagonal_count {
        // @step:move-direction
        let start_row = if diag_sum < col_count { 0 } else { diag_sum - col_count + 1 }; // @step:move-direction
        let end_row = if diag_sum < row_count { diag_sum } else { row_count - 1 }; // @step:move-direction

        for current_row in start_row..=end_row {
            // @step:collect-element
            let current_col = diag_sum - current_row; // @step:collect-element
            result.push(matrix[current_row][current_col]); // @step:collect-element
        }
    }

    result // @step:complete
}
