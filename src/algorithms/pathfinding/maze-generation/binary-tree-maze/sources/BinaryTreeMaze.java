import java.util.*;

// Binary Tree Maze — for each cell, randomly carve north or east
public class BinaryTreeMaze {
    public static int binaryTreeMaze(int[][] grid) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        int passagesCarved = 0; // @step:initialize
        Random random = new Random();

        // Carve all passage cells first
        for (int rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
            for (int colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
                if (grid[rowIndex][colIndex] == 1) {
                    grid[rowIndex][colIndex] = 0; // @step:carve-cell
                    passagesCarved++;
                }

                // Determine which directions are available: north (row-1) and east (col+1)
                boolean canGoNorth = rowIndex - 2 >= 1; // @step:carve-cell
                boolean canGoEast = colIndex + 2 <= colCount - 2; // @step:carve-cell

                if (canGoNorth && canGoEast) {
                    // Randomly choose north or east
                    if (random.nextBoolean()) {
                        grid[rowIndex - 1][colIndex] = 0; // @step:carve-cell — carve north
                        passagesCarved++;
                    } else {
                        grid[rowIndex][colIndex + 1] = 0; // @step:carve-cell — carve east
                        passagesCarved++;
                    }
                } else if (canGoNorth) {
                    grid[rowIndex - 1][colIndex] = 0; // @step:carve-cell — only north available
                    passagesCarved++;
                } else if (canGoEast) {
                    grid[rowIndex][colIndex + 1] = 0; // @step:carve-cell — only east available
                    passagesCarved++;
                }
            }
        }

        return passagesCarved; // @step:complete
    }
}
