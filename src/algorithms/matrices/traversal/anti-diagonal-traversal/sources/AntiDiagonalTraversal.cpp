// Anti-Diagonal Traversal
// Collects all elements of a 2D matrix along anti-diagonals (where row + col = constant).
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output array aside)

#include <vector>
using namespace std;

vector<int> antiDiagonalTraversal(vector<vector<int>>& matrix) {
    vector<int> result; // @step:initialize
    if (matrix.empty()) return result; // @step:initialize

    int rowCount = matrix.size(); // @step:initialize
    int colCount = matrix[0].size(); // @step:initialize
    int diagonalCount = rowCount + colCount - 1; // @step:initialize

    for (int diagSum = 0; diagSum < diagonalCount; diagSum++) {
        // @step:move-direction
        int startRow = diagSum < colCount ? 0 : diagSum - colCount + 1; // @step:move-direction
        int endRow = diagSum < rowCount ? diagSum : rowCount - 1; // @step:move-direction

        for (int currentRow = startRow; currentRow <= endRow; currentRow++) {
            // @step:collect-element
            int currentCol = diagSum - currentRow; // @step:collect-element
            result.push_back(matrix[currentRow][currentCol]); // @step:collect-element
        }
    }

    return result; // @step:complete
}
