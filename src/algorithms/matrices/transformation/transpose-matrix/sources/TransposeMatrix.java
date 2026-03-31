// Transpose Matrix
// Swap rows and columns. For square matrices, swap in-place above the diagonal.
// For non-square matrices, build a new matrix with dimensions swapped.
// Time: O(m x n) — every element is processed exactly once
// Space: O(1) for square matrices (in-place), O(m x n) for non-square

public class TransposeMatrix {

    public static int[][] transposeMatrix(int[][] matrix) {
        int rowCount = matrix.length; // @step:initialize
        int colCount = matrix[0].length; // @step:initialize

        if (rowCount == colCount) {
            // Square matrix: swap in-place above the main diagonal
            for (int rowIdx = 0; rowIdx < rowCount; rowIdx++) {
                for (int colIdx = rowIdx + 1; colIdx < colCount; colIdx++) {
                    int temp = matrix[rowIdx][colIdx]; // @step:swap-cells
                    matrix[rowIdx][colIdx] = matrix[colIdx][rowIdx]; // @step:swap-cells
                    matrix[colIdx][rowIdx] = temp; // @step:swap-cells
                }
            }
            return matrix; // @step:complete
        }

        // Non-square matrix: create a new colCount x rowCount matrix
        int[][] result = new int[colCount][rowCount]; // @step:initialize
        for (int rowIdx = 0; rowIdx < rowCount; rowIdx++) {
            for (int colIdx = 0; colIdx < colCount; colIdx++) {
                result[colIdx][rowIdx] = matrix[rowIdx][colIdx]; // @step:swap-cells
            }
        }

        return result; // @step:complete
    }
}
