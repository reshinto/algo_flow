// Anti-Diagonal Traversal
// Collects all elements of a 2D matrix along anti-diagonals (where row + col is constant).
// Time: O(m x n) — every element visited once
// Space: O(1) extra (output list aside)

import java.util.ArrayList;
import java.util.List;

public class AntiDiagonalTraversal {

    public static List<Integer> antiDiagonalTraversal(int[][] matrix) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        if (matrix.length == 0) return result; // @step:initialize

        int rowCount = matrix.length; // @step:initialize
        int colCount = matrix[0].length; // @step:initialize
        int diagonalCount = rowCount + colCount - 1; // @step:initialize

        for (int diagSum = 0; diagSum < diagonalCount; diagSum++) { // @step:move-direction
            int startRow = diagSum < colCount ? 0 : diagSum - colCount + 1; // @step:move-direction
            int endRow = diagSum < rowCount ? diagSum : rowCount - 1; // @step:move-direction

            for (int currentRow = startRow; currentRow <= endRow; currentRow++) { // @step:collect-element
                int currentCol = diagSum - currentRow; // @step:collect-element
                result.add(matrix[currentRow][currentCol]); // @step:collect-element
            }
        }

        return result; // @step:complete
    }
}
