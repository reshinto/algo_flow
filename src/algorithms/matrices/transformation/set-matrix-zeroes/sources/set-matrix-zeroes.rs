// Set Matrix Zeroes
// For each cell containing 0, set its entire row and column to 0.
// Uses the first row and first column as in-place markers to achieve O(1) extra space.
// Time: O(m × n) — two full passes over the matrix
// Space: O(1) — markers stored in the first row and column

fn set_matrix_zeroes(matrix: &mut Vec<Vec<i32>>) -> &Vec<Vec<i32>> {
    let row_count = matrix.len(); // @step:initialize
    let col_count = matrix[0].len(); // @step:initialize

    // Track whether the first row and first column originally contain a zero
    let mut first_row_has_zero = false; // @step:initialize
    let mut first_col_has_zero = false; // @step:initialize

    for col_idx in 0..col_count {
        if matrix[0][col_idx] == 0 { first_row_has_zero = true; } // @step:mark-cell
    }
    for row_idx in 0..row_count {
        if matrix[row_idx][0] == 0 { first_col_has_zero = true; } // @step:mark-cell
    }

    // Phase 1: Scan inner cells and mark first row/col for rows/cols that must be zeroed
    for row_idx in 1..row_count {
        for col_idx in 1..col_count {
            if matrix[row_idx][col_idx] == 0 {
                matrix[row_idx][0] = 0; // @step:mark-cell
                matrix[0][col_idx] = 0; // @step:mark-cell
            }
        }
    }

    // Phase 2: Use markers in first row/col to zero out inner rows and columns
    for row_idx in 1..row_count {
        for col_idx in 1..col_count {
            if matrix[row_idx][0] == 0 || matrix[0][col_idx] == 0 {
                matrix[row_idx][col_idx] = 0; // @step:zero-cell
            }
        }
    }

    // Zero the first row if it originally had a zero
    if first_row_has_zero {
        for col_idx in 0..col_count {
            matrix[0][col_idx] = 0; // @step:zero-cell
        }
    }

    // Zero the first column if it originally had a zero
    if first_col_has_zero {
        for row_idx in 0..row_count {
            matrix[row_idx][0] = 0; // @step:zero-cell
        }
    }

    matrix // @step:complete
}
