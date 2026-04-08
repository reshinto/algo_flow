// Spiral Order Matrix Traversal
// Returns all elements of a 2D matrix in spiral (clockwise) order.
// Time: O(m × n) — every element is visited exactly once
// Space: O(1) extra (output array aside)

#include <vector>
using namespace std;

vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result; // @step:initialize
    if (matrix.empty()) return result; // @step:initialize

    int topBound = 0; // @step:initialize
    int bottomBound = matrix.size() - 1; // @step:initialize
    int leftBound = 0; // @step:initialize
    int rightBound = matrix[0].size() - 1; // @step:initialize

    while (topBound <= bottomBound && leftBound <= rightBound) {
        // Traverse right along top row
        for (int colIdx = leftBound; colIdx <= rightBound; colIdx++) {
            result.push_back(matrix[topBound][colIdx]); // @step:collect-element
        }
        topBound++; // @step:shrink-boundary

        // Traverse down along right column
        for (int rowIdx = topBound; rowIdx <= bottomBound; rowIdx++) {
            result.push_back(matrix[rowIdx][rightBound]); // @step:collect-element
        }
        rightBound--; // @step:shrink-boundary

        // Traverse left along bottom row (if still within bounds)
        if (topBound <= bottomBound) {
            for (int colIdx = rightBound; colIdx >= leftBound; colIdx--) {
                result.push_back(matrix[bottomBound][colIdx]); // @step:collect-element
            }
            bottomBound--; // @step:shrink-boundary
        }

        // Traverse up along left column (if still within bounds)
        if (leftBound <= rightBound) {
            for (int rowIdx = bottomBound; rowIdx >= topBound; rowIdx--) {
                result.push_back(matrix[rowIdx][leftBound]); // @step:collect-element
            }
            leftBound++; // @step:shrink-boundary
        }
    }

    return result; // @step:complete
}
