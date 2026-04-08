// Spiral Matrix II
// Generates an n×n matrix filled with elements from 1 to n² in clockwise spiral order.
// Time: O(n²) — every cell is filled exactly once
// Space: O(1) extra (output matrix aside)

fn spiral_matrix_ii(matrix_size: usize) -> Vec<Vec<i32>> {
    let mut matrix: Vec<Vec<i32>> = vec![vec![0; matrix_size]; matrix_size]; // @step:initialize

    let mut top_bound: usize = 0; // @step:initialize
    let mut bottom_bound: usize = matrix_size - 1; // @step:initialize
    let mut left_bound: usize = 0; // @step:initialize
    let mut right_bound: usize = matrix_size - 1; // @step:initialize
    let mut current_value: i32 = 1; // @step:initialize

    while top_bound <= bottom_bound && left_bound <= right_bound {
        // Fill right along top row
        for col_idx in left_bound..=right_bound {
            matrix[top_bound][col_idx] = current_value; // @step:place-value
            current_value += 1;
        }
        top_bound += 1;

        // Fill down along right column
        for row_idx in top_bound..=bottom_bound {
            matrix[row_idx][right_bound] = current_value; // @step:place-value
            current_value += 1;
        }
        if right_bound == 0 { break; } // @step:shrink-boundary
        right_bound -= 1;

        // Fill left along bottom row (if still within bounds)
        if top_bound <= bottom_bound {
            for col_idx in (left_bound..=right_bound).rev() {
                matrix[bottom_bound][col_idx] = current_value; // @step:place-value
                current_value += 1;
            }
            bottom_bound -= 1;
        }

        // Fill up along left column (if still within bounds)
        if left_bound <= right_bound {
            for row_idx in (top_bound..=bottom_bound).rev() {
                matrix[row_idx][left_bound] = current_value; // @step:place-value
                current_value += 1;
            }
            left_bound += 1;
        }
    }

    matrix // @step:complete
}
