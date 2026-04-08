// Transpose Matrix
// Swap rows and columns. For square matrices, swap in-place above the diagonal.
// For non-square matrices, build a new matrix with dimensions swapped.
// Time: O(m × n) — every element is processed exactly once
// Space: O(1) for square matrices (in-place), O(m × n) for non-square

fn transpose_matrix(matrix: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let row_count = matrix.len(); // @step:initialize
    let col_count = matrix[0].len(); // @step:initialize

    if row_count == col_count {
        // Square matrix: swap in-place above the main diagonal
        let mut result = matrix.clone();
        for row_idx in 0..row_count {
            for col_idx in row_idx + 1..col_count {
                let temp = result[row_idx][col_idx]; // @step:swap-cells
                result[row_idx][col_idx] = result[col_idx][row_idx]; // @step:swap-cells
                result[col_idx][row_idx] = temp; // @step:swap-cells
            }
        }
        return result; // @step:complete
    }

    // Non-square matrix: create a new col_count × row_count matrix
    let mut result: Vec<Vec<i32>> = vec![vec![0; row_count]; col_count]; // @step:initialize

    for row_idx in 0..row_count {
        for col_idx in 0..col_count {
            result[col_idx][row_idx] = matrix[row_idx][col_idx]; // @step:swap-cells
        }
    }

    result // @step:complete
}
