// Zigzag (Diagonal) Traversal
// Traverses a 2D matrix in alternating diagonal directions.
// Even diagonals: upward (bottom-left → top-right)
// Odd diagonals: downward (top-right → bottom-left)
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

#include <vector>
using namespace std;

vector<int> zigzagTraversal(vector<vector<int>>& matrix) {
    vector<int> result; // @step:initialize
    if (matrix.empty()) return result; // @step:initialize

    int rowCount = matrix.size(); // @step:initialize
    int colCount = matrix[0].size(); // @step:initialize
    int diagonalCount = rowCount + colCount - 1; // @step:initialize

    for (int diagIdx = 0; diagIdx < diagonalCount; diagIdx++) {
        // @step:move-direction
        if (diagIdx % 2 == 0) {
            // @step:move-direction
            // Even diagonal: go upward (increasing col, decreasing row)
            int currentRow = diagIdx < rowCount ? diagIdx : rowCount - 1; // @step:move-direction
            int currentCol = diagIdx < rowCount ? 0 : diagIdx - rowCount + 1; // @step:move-direction

            while (currentRow >= 0 && currentCol < colCount) {
                // @step:collect-element
                result.push_back(matrix[currentRow][currentCol]); // @step:collect-element
                currentRow--; // @step:collect-element
                currentCol++; // @step:collect-element
            }
        } else {
            // @step:move-direction
            // Odd diagonal: go downward (decreasing col, increasing row)
            int currentRow = diagIdx < colCount ? 0 : diagIdx - colCount + 1; // @step:move-direction
            int currentCol = diagIdx < colCount ? diagIdx : colCount - 1; // @step:move-direction

            while (currentRow < rowCount && currentCol >= 0) {
                // @step:collect-element
                result.push_back(matrix[currentRow][currentCol]); // @step:collect-element
                currentRow++; // @step:collect-element
                currentCol--; // @step:collect-element
            }
        }
    }

    return result; // @step:complete
}
