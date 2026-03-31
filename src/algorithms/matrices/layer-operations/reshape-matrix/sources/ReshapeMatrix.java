// Reshape Matrix
// Reshape an m×n matrix into a new r×c matrix in row-major order.
// If reshape is impossible (m*n != r*c), return the original matrix.
// LeetCode 566
// Time: O(m x n) — visits every element exactly once
// Space: O(1) extra (output matrix aside)

public class ReshapeMatrix {

    public static int[][] reshapeMatrix(int[][] matrix, int targetRows, int targetCols) {
        int sourceRows = matrix.length; // @step:initialize
        int sourceCols = matrix[0].length; // @step:initialize
        int totalElements = sourceRows * sourceCols; // @step:initialize

        if (totalElements != targetRows * targetCols) { // @step:initialize
            return matrix;
        }

        int[][] result = new int[targetRows][targetCols]; // @step:initialize

        for (int flatIdx = 0; flatIdx < totalElements; flatIdx++) {
            int srcRow = flatIdx / sourceCols;
            int srcCol = flatIdx % sourceCols;
            int dstRow = flatIdx / targetCols;
            int dstCol = flatIdx % targetCols;
            result[dstRow][dstCol] = matrix[srcRow][srcCol]; // @step:place-value
        }

        return result; // @step:complete
    }
}
