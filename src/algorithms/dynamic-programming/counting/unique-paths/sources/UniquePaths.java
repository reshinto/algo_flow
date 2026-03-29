// Unique Paths (Tabulation) — count distinct paths from top-left to bottom-right in a rows×columns grid
public class UniquePaths {
    public static int uniquePaths(int rows, int columns) { // @step:initialize
        int[] dpTable = new int[columns]; // @step:initialize,fill-table
        java.util.Arrays.fill(dpTable, 1); // @step:fill-table
        // First row is all 1s — only one way to reach any cell by moving right only
        for (int rowIndex = 1; rowIndex < rows; rowIndex++) { // @step:compute-cell
            for (int columnIndex = 1; columnIndex < columns; columnIndex++) { // @step:compute-cell
                dpTable[columnIndex] = dpTable[columnIndex] + dpTable[columnIndex - 1]; // @step:compute-cell,read-cache
            }
        }
        return dpTable[columns - 1]; // @step:complete
    }
}
