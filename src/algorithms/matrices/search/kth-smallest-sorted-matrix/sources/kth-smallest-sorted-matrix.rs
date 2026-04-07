// Kth Smallest Element in Sorted Matrix
// Given an n×n matrix where each row and column is sorted in ascending order,
// find the kth smallest element using binary search on the value range.
// Time: O(n × log(max − min)) — n staircase steps per binary search iteration
// Space: O(1) — no auxiliary data structures needed

fn kth_smallest_sorted_matrix(matrix: &Vec<Vec<i32>>, target_k: i32) -> i32 {
    let matrix_size = matrix.len();
    let mut left_val = matrix[0][0]; // @step:initialize
    let mut right_val = matrix[matrix_size - 1][matrix_size - 1]; // @step:initialize

    while left_val < right_val {
        let mid_val = left_val + (right_val - left_val) / 2; // @step:compare-cell

        // Count elements <= mid_val using staircase from bottom-left
        let mut element_count: i32 = 0; // @step:compare-cell
        let mut current_row = (matrix_size - 1) as i32; // @step:compare-cell
        let mut current_col: i32 = 0; // @step:compare-cell

        while current_row >= 0 && current_col < matrix_size as i32 {
            if matrix[current_row as usize][current_col as usize] <= mid_val {
                element_count += current_row + 1; // @step:compare-cell
                current_col += 1;
            } else {
                current_row -= 1; // @step:compare-cell
            }
        }

        if element_count < target_k {
            left_val = mid_val + 1; // @step:compare-cell
        } else {
            right_val = mid_val; // @step:compare-cell
        }
    }

    left_val // @step:mark-found
} // @step:complete
