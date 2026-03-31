// Flip and Invert Binary Image (LeetCode 832)
// Flip each row horizontally (reverse), then invert every element (0→1, 1→0).
// Time: O(m x n) — each element touched once
// Space: O(1) — in-place

public class FlipImage {

    public static int[][] flipImage(int[][] matrix) {
        int rowCount = matrix.length; // @step:initialize
        int colCount = matrix[0].length; // @step:initialize

        for (int rowIdx = 0; rowIdx < rowCount; rowIdx++) {
            int leftCol = 0; // @step:flip-cell
            int rightCol = colCount - 1; // @step:flip-cell

            // Two-pointer: swap and XOR-invert simultaneously from both ends
            while (leftCol < rightCol) {
                int leftVal = matrix[rowIdx][leftCol]; // @step:flip-cell
                int rightVal = matrix[rowIdx][rightCol]; // @step:flip-cell
                matrix[rowIdx][leftCol] = rightVal ^ 1; // @step:flip-cell
                matrix[rowIdx][rightCol] = leftVal ^ 1; // @step:flip-cell
                leftCol++; // @step:flip-cell
                rightCol--; // @step:flip-cell
            }

            // When colCount is odd, middle element only needs inversion
            if (leftCol == rightCol) {
                matrix[rowIdx][leftCol] ^= 1; // @step:flip-cell
            }
        }

        return matrix; // @step:complete
    }
}
