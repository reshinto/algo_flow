// Valid Sudoku (LeetCode 36)
// Determine if a 9×9 Sudoku board is valid.
// Each row, column, and 3×3 sub-box must contain no duplicate digits 1-9.
// Empty cells are represented by 0.
// Time: O(1) — fixed 9×9 board
// Space: O(1) — fixed-size sets

#include <vector>
#include <unordered_set>
using namespace std;

bool validSudoku(vector<vector<int>>& board) {
    vector<unordered_set<int>> rowsSeen(9); // @step:initialize
    vector<unordered_set<int>> colsSeen(9); // @step:initialize
    vector<unordered_set<int>> boxesSeen(9); // @step:initialize

    for (int rowIdx = 0; rowIdx < 9; rowIdx++) {
        for (int colIdx = 0; colIdx < 9; colIdx++) {
            int digitValue = board[rowIdx][colIdx]; // @step:compare-cell

            if (digitValue == 0) continue; // @step:compare-cell

            int boxIdx = (rowIdx / 3) * 3 + (colIdx / 3); // @step:compare-cell

            if (rowsSeen[rowIdx].count(digitValue) ||
                colsSeen[colIdx].count(digitValue) ||
                boxesSeen[boxIdx].count(digitValue)) {
                return false; // @step:mark-found
            }

            rowsSeen[rowIdx].insert(digitValue); // @step:compare-cell
            colsSeen[colIdx].insert(digitValue); // @step:compare-cell
            boxesSeen[boxIdx].insert(digitValue); // @step:compare-cell
        }
    }

    return true; // @step:complete
}
