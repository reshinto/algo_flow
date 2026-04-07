// Flip and Invert Binary Image (LeetCode 832)
// Flip each row horizontally (reverse), then invert every element (0→1, 1→0).
// Time: O(m × n) — each element touched once
// Space: O(1) — in-place

fn flip_image(matrix: &mut Vec<Vec<i32>>) -> &Vec<Vec<i32>> {
    let row_count = matrix.len(); // @step:initialize
    let col_count = if row_count > 0 { matrix[0].len() } else { 0 }; // @step:initialize

    for row_idx in 0..row_count {
        let mut left_col: i32 = 0; // @step:flip-cell
        let mut right_col: i32 = (col_count - 1) as i32; // @step:flip-cell

        // Two-pointer: swap and XOR-invert simultaneously from both ends
        while left_col < right_col {
            let left_val = matrix[row_idx][left_col as usize]; // @step:flip-cell
            let right_val = matrix[row_idx][right_col as usize]; // @step:flip-cell
            matrix[row_idx][left_col as usize] = right_val ^ 1; // @step:flip-cell
            matrix[row_idx][right_col as usize] = left_val ^ 1; // @step:flip-cell
            left_col += 1; // @step:flip-cell
            right_col -= 1; // @step:flip-cell
        }

        // When col_count is odd, middle element only needs inversion
        if left_col == right_col {
            matrix[row_idx][left_col as usize] ^= 1; // @step:flip-cell
        }
    }

    matrix // @step:complete
}
