// Spiral Order Matrix Traversal
// Returns all elements of a 2D matrix in spiral (clockwise) order.
// Time: O(m × n) — every element is visited exactly once
// Space: O(1) extra (output array aside)

fn spiral_order(matrix: &Vec<Vec<i32>>) -> Vec<i32> {
    let mut result: Vec<i32> = vec![]; // @step:initialize
    if matrix.is_empty() { return result; } // @step:initialize

    let mut top_bound: usize = 0; // @step:initialize
    let mut bottom_bound: usize = matrix.len() - 1; // @step:initialize
    let mut left_bound: usize = 0; // @step:initialize
    let mut right_bound: usize = matrix[0].len() - 1; // @step:initialize

    while top_bound <= bottom_bound && left_bound <= right_bound {
        // Traverse right along top row
        for col_idx in left_bound..=right_bound {
            result.push(matrix[top_bound][col_idx]); // @step:collect-element
        }
        top_bound += 1; // @step:shrink-boundary

        // Traverse down along right column
        for row_idx in top_bound..=bottom_bound {
            result.push(matrix[row_idx][right_bound]); // @step:collect-element
        }
        right_bound -= 1; // @step:shrink-boundary

        // Traverse left along bottom row (if still within bounds)
        if top_bound <= bottom_bound {
            for col_idx in (left_bound..=right_bound).rev() {
                result.push(matrix[bottom_bound][col_idx]); // @step:collect-element
            }
            bottom_bound -= 1; // @step:shrink-boundary
        }

        // Traverse up along left column (if still within bounds)
        if left_bound <= right_bound {
            for row_idx in (top_bound..=bottom_bound).rev() {
                result.push(matrix[row_idx][left_bound]); // @step:collect-element
            }
            left_bound += 1; // @step:shrink-boundary
        }
    }

    result // @step:complete
}
