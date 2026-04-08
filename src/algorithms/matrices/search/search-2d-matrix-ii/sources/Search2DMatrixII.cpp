// Search a 2D Matrix II (Staircase Search)
// Each row sorted left-to-right, each column sorted top-to-bottom.
// Start from top-right: move left if value > target, move down if value < target.
// Time: O(m + n) — at most m+n steps eliminating a row or column each time
// Space: O(1) — no auxiliary data structures

#include <vector>
using namespace std;

bool search2DMatrixII(vector<vector<int>>& matrix, int target) {
    if (matrix.empty() || matrix[0].empty()) return false; // @step:initialize

    int rowCount = matrix.size(); // @step:initialize
    int colCount = matrix[0].size(); // @step:initialize
    int currentRow = 0; // @step:initialize
    int currentCol = colCount - 1; // @step:initialize

    while (currentRow < rowCount && currentCol >= 0) {
        int currentValue = matrix[currentRow][currentCol]; // @step:compare-cell

        if (currentValue == target) {
            return true; // @step:mark-found
        } else if (currentValue > target) {
            currentCol--; // @step:compare-cell
        } else {
            currentRow++; // @step:compare-cell
        }
    }

    return false; // @step:complete
}
