import java.util.ArrayList;
import java.util.List;

// Diagonal Traversal
// Collects all elements of a 2D matrix along its diagonals (top-left to bottom-right).
// Time: O(m × n) — every element visited once
// Space: O(1) extra (output list aside)

public class DiagonalTraversal {
    public static List<Integer> diagonalTraversal(int[][] matrix) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        if (matrix.length == 0) return result; // @step:initialize

        int rowCount = matrix.length; // @step:initialize
        int colCount = matrix[0].length; // @step:initialize
        int diagonalCount = rowCount + colCount - 1; // @step:initialize

        for (int diagIdx = 0; diagIdx < diagonalCount; diagIdx++) { // @step:move-direction
            int startRow = diagIdx < colCount ? 0 : diagIdx - colCount + 1; // @step:move-direction
            int startCol = diagIdx < colCount ? diagIdx : colCount - 1; // @step:move-direction

            int currentRow = startRow; // @step:move-direction
            int currentCol = startCol; // @step:move-direction

            while (currentRow < rowCount && currentCol >= 0) { // @step:collect-element
                result.add(matrix[currentRow][currentCol]); // @step:collect-element
                currentRow++; // @step:collect-element
                currentCol--; // @step:collect-element
            }
        }

        return result; // @step:complete
    }
}
