// Toeplitz Matrix Verification
// Determines if a matrix is a Toeplitz matrix — every descending diagonal
// from left to right contains all equal elements.
// LeetCode 766
// Time: O(m × n) — every cell (except first row/col) is compared exactly once
// Space: O(1)

public class ToeplitzMatrix {

    public static boolean toeplitzMatrix(int[][] matrix) {
        int rowCount = matrix.length; // @step:initialize
        int colCount = matrix[0].length; // @step:initialize

        for (int rowIdx = 1; rowIdx < rowCount; rowIdx++) {
            for (int colIdx = 1; colIdx < colCount; colIdx++) {
                int current = matrix[rowIdx][colIdx]; // @step:compare-cell
                int upperLeft = matrix[rowIdx - 1][colIdx - 1]; // @step:compare-cell
                if (current != upperLeft) return false; // @step:compare-cell
            }
        }

        return true; // @step:complete
    }
}
