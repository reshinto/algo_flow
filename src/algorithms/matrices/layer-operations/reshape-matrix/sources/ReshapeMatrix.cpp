// Reshape Matrix
// Reshape an m×n matrix into a new r×c matrix in row-major order.
// If reshape is impossible (m*n != r*c), return the original matrix.
// LeetCode 566
// Time: O(m × n) — visits every element exactly once
// Space: O(1) extra (output matrix aside)

#include <vector>
using namespace std;

vector<vector<int>> reshapeMatrix(vector<vector<int>>& matrix, int targetRows, int targetCols) {
    int sourceRows = matrix.size(); // @step:initialize
    int sourceCols = sourceRows > 0 ? matrix[0].size() : 0; // @step:initialize
    int totalElements = sourceRows * sourceCols; // @step:initialize

    if (totalElements != targetRows * targetCols) {
        return matrix; // @step:initialize
    }

    vector<vector<int>> result(targetRows, vector<int>(targetCols, 0)); // @step:initialize

    for (int flatIdx = 0; flatIdx < totalElements; flatIdx++) {
        int srcRow = flatIdx / sourceCols;
        int srcCol = flatIdx % sourceCols;
        int dstRow = flatIdx / targetCols;
        int dstCol = flatIdx % targetCols;
        result[dstRow][dstCol] = matrix[srcRow][srcCol]; // @step:place-value
    }

    return result; // @step:complete
}
