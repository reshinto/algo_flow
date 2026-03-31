// Island Count
// Count the number of islands (connected groups of 1s) in a binary matrix using DFS flood fill.
// An island is a group of adjacent 1s connected horizontally or vertically.
// Time: O(m x n) — every cell is visited at most once
// Space: O(m x n) — DFS call stack depth in the worst case

public class IslandCount {

    public static int islandCount(int[][] grid) {
        int rowCount = grid.length; // @step:initialize
        int colCount = rowCount > 0 ? grid[0].length : 0; // @step:initialize
        int islandTotal = 0; // @step:initialize

        for (int rowIdx = 0; rowIdx < rowCount; rowIdx++) {
            for (int colIdx = 0; colIdx < colCount; colIdx++) {
                if (grid[rowIdx][colIdx] == 1) { // @step:compare-cell
                    islandTotal++; // @step:mark-found
                    dfsFloodFill(grid, rowIdx, colIdx, rowCount, colCount); // @step:mark-found
                }
            }
        }

        return islandTotal; // @step:complete
    }

    private static void dfsFloodFill(int[][] grid, int rowIdx, int colIdx, int rowCount, int colCount) {
        if (rowIdx < 0 || rowIdx >= rowCount) return; // @step:compare-cell
        if (colIdx < 0 || colIdx >= colCount) return; // @step:compare-cell
        if (grid[rowIdx][colIdx] != 1) return; // @step:compare-cell

        grid[rowIdx][colIdx] = 0; // @step:mark-found
        dfsFloodFill(grid, rowIdx - 1, colIdx, rowCount, colCount); // @step:mark-found
        dfsFloodFill(grid, rowIdx + 1, colIdx, rowCount, colCount); // @step:mark-found
        dfsFloodFill(grid, rowIdx, colIdx - 1, rowCount, colCount); // @step:mark-found
        dfsFloodFill(grid, rowIdx, colIdx + 1, rowCount, colCount); // @step:mark-found
    }
}
