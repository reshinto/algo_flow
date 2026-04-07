// Matrix Diagonal Sum
// Sum of primary diagonal + secondary (anti) diagonal elements.
// For odd-sized matrices, subtract the center element (counted twice).
// LeetCode 1572
// Time: O(n) — single pass over n diagonal pairs
// Space: O(1) — only integer accumulator

#include <vector>
using namespace std;

int matrixDiagonalSum(vector<vector<int>>& matrix) {
    int matrixSize = matrix.size(); // @step:initialize
    int runningSum = 0; // @step:initialize

    for (int diagIdx = 0; diagIdx < matrixSize; diagIdx++) {
        runningSum += matrix[diagIdx][diagIdx]; // @step:accumulate
        runningSum += matrix[diagIdx][matrixSize - 1 - diagIdx]; // @step:accumulate
    }

    if (matrixSize % 2 == 1) {
        int centerIdx = matrixSize / 2;
        runningSum -= matrix[centerIdx][centerIdx]; // @step:accumulate
    }

    return runningSum; // @step:complete
}
