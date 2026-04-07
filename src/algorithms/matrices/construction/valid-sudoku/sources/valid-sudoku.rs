// Valid Sudoku (LeetCode 36)
// Determine if a 9×9 Sudoku board is valid.
// Each row, column, and 3×3 sub-box must contain no duplicate digits 1-9.
// Empty cells are represented by 0.
// Time: O(1) — fixed 9×9 board
// Space: O(1) — fixed-size sets

use std::collections::HashSet;

fn valid_sudoku(board: &Vec<Vec<i32>>) -> bool {
    let mut rows_seen: Vec<HashSet<i32>> = (0..9).map(|_| HashSet::new()).collect(); // @step:initialize
    let mut cols_seen: Vec<HashSet<i32>> = (0..9).map(|_| HashSet::new()).collect(); // @step:initialize
    let mut boxes_seen: Vec<HashSet<i32>> = (0..9).map(|_| HashSet::new()).collect(); // @step:initialize

    for row_idx in 0..9 {
        for col_idx in 0..9 {
            let digit_value = board[row_idx][col_idx]; // @step:compare-cell

            if digit_value == 0 { continue; } // @step:compare-cell

            let box_idx = (row_idx / 3) * 3 + (col_idx / 3); // @step:compare-cell

            if rows_seen[row_idx].contains(&digit_value)
                || cols_seen[col_idx].contains(&digit_value)
                || boxes_seen[box_idx].contains(&digit_value)
            {
                return false; // @step:mark-found
            }

            rows_seen[row_idx].insert(digit_value); // @step:compare-cell
            cols_seen[col_idx].insert(digit_value); // @step:compare-cell
            boxes_seen[box_idx].insert(digit_value); // @step:compare-cell
        }
    }

    true // @step:complete
}
