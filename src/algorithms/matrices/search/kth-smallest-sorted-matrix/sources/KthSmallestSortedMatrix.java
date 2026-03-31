// Kth Smallest Element in Sorted Matrix
// Given an n×n matrix where each row and column is sorted in ascending order,
// find the kth smallest element using binary search on the value range.
// Time: O(n × log(max − min)) — n staircase steps per binary search iteration
// Space: O(1) — no auxiliary data structures needed

public class KthSmallestSortedMatrix {

    public static int kthSmallestSortedMatrix(int[][] matrix, int targetK) {
        int matrixSize = matrix.length;
        int leftVal = matrix[0][0]; // @step:initialize
        int rightVal = matrix[matrixSize - 1][matrixSize - 1]; // @step:initialize

        while (leftVal < rightVal) {
            int midVal = leftVal + (rightVal - leftVal) / 2; // @step:compare-cell

            // Count elements <= midVal using staircase from bottom-left
            int elementCount = 0; // @step:compare-cell
            int currentRow = matrixSize - 1; // @step:compare-cell
            int currentCol = 0; // @step:compare-cell

            while (currentRow >= 0 && currentCol < matrixSize) {
                if (matrix[currentRow][currentCol] <= midVal) {
                    elementCount += currentRow + 1; // @step:compare-cell
                    currentCol++;
                } else {
                    currentRow--; // @step:compare-cell
                }
            }

            if (elementCount < targetK) {
                leftVal = midVal + 1; // @step:compare-cell
            } else {
                rightVal = midVal; // @step:compare-cell
            }
        }

        return leftVal; // @step:mark-found
    } // @step:complete
}
