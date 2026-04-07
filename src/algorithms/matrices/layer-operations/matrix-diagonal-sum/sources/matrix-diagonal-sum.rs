// Matrix Diagonal Sum
// Sum of primary diagonal + secondary (anti) diagonal elements.
// For odd-sized matrices, subtract the center element (counted twice).
// LeetCode 1572
// Time: O(n) — single pass over n diagonal pairs
// Space: O(1) — only integer accumulator

fn matrix_diagonal_sum(matrix: &Vec<Vec<i32>>) -> i32 {
    let matrix_size = matrix.len(); // @step:initialize
    let mut running_sum: i32 = 0; // @step:initialize

    for diag_idx in 0..matrix_size {
        running_sum += matrix[diag_idx][diag_idx]; // @step:accumulate
        running_sum += matrix[diag_idx][matrix_size - 1 - diag_idx]; // @step:accumulate
    }

    if matrix_size % 2 == 1 {
        let center_idx = matrix_size / 2;
        running_sum -= matrix[center_idx][center_idx]; // @step:accumulate
    }

    running_sum // @step:complete
}
