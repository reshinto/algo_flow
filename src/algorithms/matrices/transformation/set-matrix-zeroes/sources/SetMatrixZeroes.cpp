// Set Matrix Zeroes
// For each cell containing 0, set its entire row and column to 0.
// Uses the first row and first column as in-place markers to achieve O(1) extra space.
// Time: O(m × n) — two full passes over the matrix
// Space: O(1) — markers stored in the first row and column

#include <vector>
using namespace std;

vector<vector<int>>& setMatrixZeroes(vector<vector<int>>& matrix) {
    int rowCount = matrix.size(); // @step:initialize
    int colCount = matrix[0].size(); // @step:initialize

    // Track whether the first row and first column originally contain a zero
    bool firstRowHasZero = false; // @step:initialize
    bool firstColHasZero = false; // @step:initialize

    for (int colIdx = 0; colIdx < colCount; colIdx++) {
        if (matrix[0][colIdx] == 0) firstRowHasZero = true; // @step:mark-cell
    }
    for (int rowIdx = 0; rowIdx < rowCount; rowIdx++) {
        if (matrix[rowIdx][0] == 0) firstColHasZero = true; // @step:mark-cell
    }

    // Phase 1: Scan inner cells and mark first row/col for rows/cols that must be zeroed
    for (int rowIdx = 1; rowIdx < rowCount; rowIdx++) {
        for (int colIdx = 1; colIdx < colCount; colIdx++) {
            if (matrix[rowIdx][colIdx] == 0) {
                matrix[rowIdx][0] = 0; // @step:mark-cell
                matrix[0][colIdx] = 0; // @step:mark-cell
            }
        }
    }

    // Phase 2: Use markers in first row/col to zero out inner rows and columns
    for (int rowIdx = 1; rowIdx < rowCount; rowIdx++) {
        for (int colIdx = 1; colIdx < colCount; colIdx++) {
            if (matrix[rowIdx][0] == 0 || matrix[0][colIdx] == 0) {
                matrix[rowIdx][colIdx] = 0; // @step:zero-cell
            }
        }
    }

    // Zero the first row if it originally had a zero
    if (firstRowHasZero) {
        for (int colIdx = 0; colIdx < colCount; colIdx++) {
            matrix[0][colIdx] = 0; // @step:zero-cell
        }
    }

    // Zero the first column if it originally had a zero
    if (firstColHasZero) {
        for (int rowIdx = 0; rowIdx < rowCount; rowIdx++) {
            matrix[rowIdx][0] = 0; // @step:zero-cell
        }
    }

    return matrix; // @step:complete
}
