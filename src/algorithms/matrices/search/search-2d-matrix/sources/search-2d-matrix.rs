// Search a 2D Matrix (Binary Search)
// Matrix rows are sorted left-to-right; first integer of each row > last of previous.
// Treat as a virtual 1D sorted array and binary search.
// Time: O(log(m × n)) — single binary search over m×n elements
// Space: O(1) — no auxiliary data structures

fn search_2d_matrix(matrix: &Vec<Vec<i32>>, target: i32) -> bool {
    if matrix.is_empty() || matrix[0].is_empty() { return false; } // @step:initialize

    let row_count = matrix.len(); // @step:initialize
    let col_count = matrix[0].len(); // @step:initialize
    let mut left_idx: i32 = 0; // @step:initialize
    let mut right_idx: i32 = (row_count * col_count - 1) as i32; // @step:initialize

    while left_idx <= right_idx {
        let mid_index = (left_idx + right_idx) / 2; // @step:compare-cell
        let mid_row = (mid_index / col_count as i32) as usize; // @step:compare-cell
        let mid_col = (mid_index % col_count as i32) as usize; // @step:compare-cell
        let mid_value = matrix[mid_row][mid_col]; // @step:compare-cell

        if mid_value == target {
            return true; // @step:mark-found
        } else if mid_value < target {
            left_idx = mid_index + 1; // @step:compare-cell
        } else {
            right_idx = mid_index - 1; // @step:compare-cell
        }
    }

    false // @step:complete
}
