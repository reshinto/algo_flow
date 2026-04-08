// Diagonal Traversal
// Collects all elements of a 2D matrix along its diagonals (top-left to bottom-right).
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

#include <vector>
using namespace std;

vector<int> diagonalTraversal(vector<vector<int>>& matrix) {
    vector<int> result; // @step:initialize
    if (matrix.empty()) return result; // @step:initialize

    int rowCount = matrix.size(); // @step:initialize
    int colCount = matrix[0].size(); // @step:initialize
    int diagonalCount = rowCount + colCount - 1; // @step:initialize

    for (int diagIdx = 0; diagIdx < diagonalCount; diagIdx++) {
        // @step:move-direction
        int startRow = diagIdx < colCount ? 0 : diagIdx - colCount + 1; // @step:move-direction
        int startCol = diagIdx < colCount ? diagIdx : colCount - 1; // @step:move-direction

        int currentRow = startRow; // @step:move-direction
        int currentCol = startCol; // @step:move-direction

        while (currentRow < rowCount && currentCol >= 0) {
            // @step:collect-element
            result.push_back(matrix[currentRow][currentCol]); // @step:collect-element
            currentRow++; // @step:collect-element
            currentCol--; // @step:collect-element
        }
    }

    return result; // @step:complete
}
