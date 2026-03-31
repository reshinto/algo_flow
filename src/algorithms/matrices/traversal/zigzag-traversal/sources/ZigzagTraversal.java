// Zigzag (Diagonal) Traversal
// Traverses a 2D matrix in alternating diagonal directions.
// Even diagonals: upward (bottom-left to top-right)
// Odd diagonals: downward (top-right to bottom-left)
// Time: O(m x n) — every element visited once
// Space: O(1) extra (output list aside)

import java.util.ArrayList;
import java.util.List;

public class ZigzagTraversal {

    public static List<Integer> zigzagTraversal(int[][] matrix) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        if (matrix.length == 0) return result; // @step:initialize

        int rowCount = matrix.length; // @step:initialize
        int colCount = matrix[0].length; // @step:initialize
        int diagonalCount = rowCount + colCount - 1; // @step:initialize

        for (int diagIdx = 0; diagIdx < diagonalCount; diagIdx++) { // @step:move-direction
            if (diagIdx % 2 == 0) { // @step:move-direction
                // Even diagonal: go upward (increasing col, decreasing row)
                int currentRow = diagIdx < rowCount ? diagIdx : rowCount - 1; // @step:move-direction
                int currentCol = diagIdx < rowCount ? 0 : diagIdx - rowCount + 1; // @step:move-direction

                while (currentRow >= 0 && currentCol < colCount) { // @step:collect-element
                    result.add(matrix[currentRow][currentCol]); // @step:collect-element
                    currentRow--; // @step:collect-element
                    currentCol++; // @step:collect-element
                }
            } else { // @step:move-direction
                // Odd diagonal: go downward (decreasing col, increasing row)
                int currentRow = diagIdx < colCount ? 0 : diagIdx - colCount + 1; // @step:move-direction
                int currentCol = diagIdx < colCount ? diagIdx : colCount - 1; // @step:move-direction

                while (currentRow < rowCount && currentCol >= 0) { // @step:collect-element
                    result.add(matrix[currentRow][currentCol]); // @step:collect-element
                    currentRow++; // @step:collect-element
                    currentCol--; // @step:collect-element
                }
            }
        }

        return result; // @step:complete
    }
}
