// Toeplitz Matrix Verification
// Determines if a matrix is a Toeplitz matrix — every descending diagonal
// from left to right contains all equal elements.
// LeetCode 766
// Time: O(m × n) — every cell (except first row/col) is compared exactly once
// Space: O(1)

fn toeplitz_matrix(matrix: &Vec<Vec<i32>>) -> bool {
    let row_count = matrix.len(); // @step:initialize
    let col_count = matrix[0].len(); // @step:initialize

    for row_idx in 1..row_count {
        for col_idx in 1..col_count {
            let current = matrix[row_idx][col_idx]; // @step:compare-cell
            let upper_left = matrix[row_idx - 1][col_idx - 1]; // @step:compare-cell
            if current != upper_left { return false; } // @step:compare-cell
        }
    }

    true // @step:complete
}
