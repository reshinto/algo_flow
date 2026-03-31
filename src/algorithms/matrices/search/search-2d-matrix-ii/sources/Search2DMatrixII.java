// Search a 2D Matrix II (Staircase Search)
// Each row sorted left-to-right, each column sorted top-to-bottom.
// Start from top-right: move left if value > target, move down if value < target.
// Time: O(m + n) — at most m+n steps eliminating a row or column each time
// Space: O(1) — no auxiliary data structures

public class Search2DMatrixII {

    public static boolean search2DMatrixII(int[][] matrix, int target) {
        if (matrix.length == 0 || matrix[0].length == 0) return false; // @step:initialize

        int rowCount = matrix.length; // @step:initialize
        int colCount = matrix[0].length; // @step:initialize
        int currentRow = 0; // @step:initialize
        int currentCol = colCount - 1; // @step:initialize

        while (currentRow < rowCount && currentCol >= 0) {
            int currentValue = matrix[currentRow][currentCol]; // @step:compare-cell

            if (currentValue == target) {
                return true; // @step:mark-found
            } else if (currentValue > target) {
                currentCol--; // @step:compare-cell
            } else {
                currentRow++; // @step:compare-cell
            }
        }

        return false; // @step:complete
    }
}
