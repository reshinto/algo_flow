// Zigzag (Diagonal) Traversal
// Traverses a 2D matrix in alternating diagonal directions.
// Even diagonals: upward (bottom-left → top-right)
// Odd diagonals: downward (top-right → bottom-left)
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

fn zigzag_traversal(matrix: &Vec<Vec<i32>>) -> Vec<i32> {
    let mut result: Vec<i32> = vec![]; // @step:initialize
    if matrix.is_empty() { return result; } // @step:initialize

    let row_count = matrix.len(); // @step:initialize
    let col_count = matrix[0].len(); // @step:initialize
    let diagonal_count = row_count + col_count - 1; // @step:initialize

    for diag_idx in 0..diagonal_count {
        // @step:move-direction
        if diag_idx % 2 == 0 {
            // @step:move-direction
            // Even diagonal: go upward (increasing col, decreasing row)
            let mut current_row = if diag_idx < row_count { diag_idx as i32 } else { (row_count - 1) as i32 }; // @step:move-direction
            let mut current_col: i32 = if diag_idx < row_count { 0 } else { (diag_idx - row_count + 1) as i32 }; // @step:move-direction

            while current_row >= 0 && current_col < col_count as i32 {
                // @step:collect-element
                result.push(matrix[current_row as usize][current_col as usize]); // @step:collect-element
                current_row -= 1; // @step:collect-element
                current_col += 1; // @step:collect-element
            }
        } else {
            // @step:move-direction
            // Odd diagonal: go downward (decreasing col, increasing row)
            let mut current_row: i32 = if diag_idx < col_count { 0 } else { (diag_idx - col_count + 1) as i32 }; // @step:move-direction
            let mut current_col: i32 = if diag_idx < col_count { diag_idx as i32 } else { (col_count - 1) as i32 }; // @step:move-direction

            while current_row < row_count as i32 && current_col >= 0 {
                // @step:collect-element
                result.push(matrix[current_row as usize][current_col as usize]); // @step:collect-element
                current_row += 1; // @step:collect-element
                current_col -= 1; // @step:collect-element
            }
        }
    }

    result // @step:complete
}
