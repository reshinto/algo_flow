// Spiral Order Matrix Traversal
// Returns all elements of a 2D matrix in spiral (clockwise) order.
// Time: O(m x n) — every element is visited exactly once
// Space: O(1) extra (output list aside)

import java.util.ArrayList;
import java.util.List;

public class SpiralOrder {

    public static List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        if (matrix.length == 0) return result; // @step:initialize

        int topBound = 0; // @step:initialize
        int bottomBound = matrix.length - 1; // @step:initialize
        int leftBound = 0; // @step:initialize
        int rightBound = matrix[0].length - 1; // @step:initialize

        while (topBound <= bottomBound && leftBound <= rightBound) {
            // Traverse right along top row
            for (int colIdx = leftBound; colIdx <= rightBound; colIdx++) {
                result.add(matrix[topBound][colIdx]); // @step:collect-element
            }
            topBound++; // @step:shrink-boundary

            // Traverse down along right column
            for (int rowIdx = topBound; rowIdx <= bottomBound; rowIdx++) {
                result.add(matrix[rowIdx][rightBound]); // @step:collect-element
            }
            rightBound--; // @step:shrink-boundary

            // Traverse left along bottom row (if still within bounds)
            if (topBound <= bottomBound) {
                for (int colIdx = rightBound; colIdx >= leftBound; colIdx--) {
                    result.add(matrix[bottomBound][colIdx]); // @step:collect-element
                }
                bottomBound--; // @step:shrink-boundary
            }

            // Traverse up along left column (if still within bounds)
            if (leftBound <= rightBound) {
                for (int rowIdx = bottomBound; rowIdx >= topBound; rowIdx--) {
                    result.add(matrix[rowIdx][leftBound]); // @step:collect-element
                }
                leftBound++; // @step:shrink-boundary
            }
        }

        return result; // @step:complete
    }
}
