// Valid Sudoku (LeetCode 36)
// Determine if a 9×9 Sudoku board is valid.
// Each row, column, and 3×3 sub-box must contain no duplicate digits 1-9.
// Empty cells are represented by 0.
// Time: O(1) — fixed 9×9 board
// Space: O(1) — fixed-size sets

import java.util.HashSet;
import java.util.Set;

public class ValidSudoku {

    public static boolean validSudoku(int[][] board) {
        Set<Integer>[] rowsSeen = new HashSet[9]; // @step:initialize
        Set<Integer>[] colsSeen = new HashSet[9]; // @step:initialize
        Set<Integer>[] boxesSeen = new HashSet[9]; // @step:initialize

        for (int initIdx = 0; initIdx < 9; initIdx++) {
            rowsSeen[initIdx] = new HashSet<>();
            colsSeen[initIdx] = new HashSet<>();
            boxesSeen[initIdx] = new HashSet<>();
        }

        for (int rowIdx = 0; rowIdx < 9; rowIdx++) {
            for (int colIdx = 0; colIdx < 9; colIdx++) {
                int digitValue = board[rowIdx][colIdx]; // @step:compare-cell

                if (digitValue == 0) continue; // @step:compare-cell

                int boxIdx = (rowIdx / 3) * 3 + (colIdx / 3); // @step:compare-cell

                if (
                    rowsSeen[rowIdx].contains(digitValue) ||
                    colsSeen[colIdx].contains(digitValue) ||
                    boxesSeen[boxIdx].contains(digitValue)
                ) {
                    return false; // @step:mark-found
                }

                rowsSeen[rowIdx].add(digitValue); // @step:compare-cell
                colsSeen[colIdx].add(digitValue); // @step:compare-cell
                boxesSeen[boxIdx].add(digitValue); // @step:compare-cell
            }
        }

        return true; // @step:complete
    }
}
