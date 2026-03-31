// Spiral Matrix II
// Generates an n×n matrix filled with elements from 1 to n² in clockwise spiral order.
// LeetCode 59
// Time: O(n²) — every cell is filled exactly once
// Space: O(1) extra (output matrix aside)

public class SpiralMatrixII {

    public static int[][] spiralMatrixII(int matrixSize) {
        int[][] matrix = new int[matrixSize][matrixSize]; // @step:initialize

        int topBound = 0; // @step:initialize
        int bottomBound = matrixSize - 1; // @step:initialize
        int leftBound = 0; // @step:initialize
        int rightBound = matrixSize - 1; // @step:initialize
        int currentValue = 1; // @step:initialize

        while (topBound <= bottomBound && leftBound <= rightBound) {
            // Fill right along top row
            for (int colIdx = leftBound; colIdx <= rightBound; colIdx++) {
                matrix[topBound][colIdx] = currentValue++; // @step:place-value
            }
            topBound++;

            // Fill down along right column
            for (int rowIdx = topBound; rowIdx <= bottomBound; rowIdx++) {
                matrix[rowIdx][rightBound] = currentValue++; // @step:place-value
            }
            rightBound--;

            // Fill left along bottom row (if still within bounds)
            if (topBound <= bottomBound) {
                for (int colIdx = rightBound; colIdx >= leftBound; colIdx--) {
                    matrix[bottomBound][colIdx] = currentValue++; // @step:place-value
                }
                bottomBound--;
            }

            // Fill up along left column (if still within bounds)
            if (leftBound <= rightBound) {
                for (int rowIdx = bottomBound; rowIdx >= topBound; rowIdx--) {
                    matrix[rowIdx][leftBound] = currentValue++; // @step:place-value
                }
                leftBound++;
            }
        }

        return matrix; // @step:complete
    }
}
