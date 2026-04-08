// Search a 2D Matrix II (Staircase Search)
// Each row sorted left-to-right, each column sorted top-to-bottom.
// Start from top-right: move left if value > target, move down if value < target.
// Time: O(m + n) — at most m+n steps eliminating a row or column each time
// Space: O(1) — no auxiliary data structures

fn search_2d_matrix_ii(matrix: &Vec<Vec<i32>>, target: i32) -> bool {
    if matrix.is_empty() || matrix[0].is_empty() { return false; } // @step:initialize

    let row_count = matrix.len(); // @step:initialize
    let col_count = matrix[0].len(); // @step:initialize
    let mut current_row: usize = 0; // @step:initialize
    let mut current_col: i32 = (col_count - 1) as i32; // @step:initialize

    while current_row < row_count && current_col >= 0 {
        let current_value = matrix[current_row][current_col as usize]; // @step:compare-cell

        if current_value == target {
            return true; // @step:mark-found
        } else if current_value > target {
            current_col -= 1; // @step:compare-cell
        } else {
            current_row += 1; // @step:compare-cell
        }
    }

    false // @step:complete
}
