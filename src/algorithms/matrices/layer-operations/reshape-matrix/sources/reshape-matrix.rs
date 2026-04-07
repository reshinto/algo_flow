// Reshape Matrix
// Reshape an m×n matrix into a new r×c matrix in row-major order.
// If reshape is impossible (m*n != r*c), return the original matrix.
// LeetCode 566
// Time: O(m × n) — visits every element exactly once
// Space: O(1) extra (output matrix aside)

fn reshape_matrix(matrix: Vec<Vec<i32>>, target_rows: usize, target_cols: usize) -> Vec<Vec<i32>> {
    let source_rows = matrix.len(); // @step:initialize
    let source_cols = if source_rows > 0 { matrix[0].len() } else { 0 }; // @step:initialize
    let total_elements = source_rows * source_cols; // @step:initialize

    if total_elements != target_rows * target_cols {
        return matrix; // @step:initialize
    }

    let mut result: Vec<Vec<i32>> = vec![vec![0; target_cols]; target_rows]; // @step:initialize

    for flat_idx in 0..total_elements {
        let src_row = flat_idx / source_cols;
        let src_col = flat_idx % source_cols;
        let dst_row = flat_idx / target_cols;
        let dst_col = flat_idx % target_cols;
        result[dst_row][dst_col] = matrix[src_row][src_col]; // @step:place-value
    }

    result // @step:complete
}
