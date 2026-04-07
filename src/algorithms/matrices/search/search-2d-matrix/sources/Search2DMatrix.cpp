// Search a 2D Matrix (Binary Search)
// Matrix rows are sorted left-to-right; first integer of each row > last of previous.
// Treat as a virtual 1D sorted array and binary search.
// Time: O(log(m × n)) — single binary search over m×n elements
// Space: O(1) — no auxiliary data structures

#include <vector>
using namespace std;

bool search2DMatrix(vector<vector<int>>& matrix, int target) {
    if (matrix.empty() || matrix[0].empty()) return false; // @step:initialize

    int rowCount = matrix.size(); // @step:initialize
    int colCount = matrix[0].size(); // @step:initialize
    int leftIdx = 0; // @step:initialize
    int rightIdx = rowCount * colCount - 1; // @step:initialize

    while (leftIdx <= rightIdx) {
        int midIndex = (leftIdx + rightIdx) / 2; // @step:compare-cell
        int midRow = midIndex / colCount; // @step:compare-cell
        int midCol = midIndex % colCount; // @step:compare-cell
        int midValue = matrix[midRow][midCol]; // @step:compare-cell

        if (midValue == target) {
            return true; // @step:mark-found
        } else if (midValue < target) {
            leftIdx = midIndex + 1; // @step:compare-cell
        } else {
            rightIdx = midIndex - 1; // @step:compare-cell
        }
    }

    return false; // @step:complete
}
