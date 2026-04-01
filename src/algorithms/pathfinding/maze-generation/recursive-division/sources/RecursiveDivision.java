import java.util.*;

// Recursive Division Maze — builds walls in an open grid, leaving one gap per wall
public class RecursiveDivision {
    private static int rowCount;
    private static int colCount;
    private static int[][] grid;
    private static int[] startPos;
    private static int[] endPos;
    private static int wallsBuilt;
    private static Random random;

    private static void buildWallsInRegion(
        int topRow, int leftCol, int bottomRow, int rightCol
    ) {
        int regionHeight = bottomRow - topRow; // @step:carve-cell
        int regionWidth = rightCol - leftCol; // @step:carve-cell

        if (regionHeight < 2 || regionWidth < 2) return; // @step:carve-cell

        // Choose orientation: horizontal wall if taller, vertical if wider
        boolean buildHorizontal = regionHeight >= regionWidth; // @step:carve-cell

        if (buildHorizontal) {
            // Place wall at a random even row within the region
            int wallRow = topRow + 2 * random.nextInt(regionHeight / 2) + 1; // @step:carve-cell
            // Random passage gap at an odd column
            int gapCol = leftCol + 2 * random.nextInt((regionWidth + 1) / 2); // @step:carve-cell

            for (int colIndex = leftCol; colIndex <= rightCol; colIndex++) { // @step:carve-cell
                if (colIndex == gapCol) continue; // Leave the gap open
                // Skip start/end positions
                if (wallRow == startPos[0] && colIndex == startPos[1]) continue;
                if (wallRow == endPos[0] && colIndex == endPos[1]) continue;
                grid[wallRow][colIndex] = 1; // @step:carve-cell
                wallsBuilt++;
            }

            buildWallsInRegion(topRow, leftCol, wallRow - 1, rightCol); // @step:carve-cell
            buildWallsInRegion(wallRow + 1, leftCol, bottomRow, rightCol); // @step:carve-cell
        } else {
            // Place wall at a random even column within the region
            int wallCol = leftCol + 2 * random.nextInt(regionWidth / 2) + 1; // @step:carve-cell
            // Random passage gap at an odd row
            int gapRow = topRow + 2 * random.nextInt((regionHeight + 1) / 2); // @step:carve-cell

            for (int rowIndex = topRow; rowIndex <= bottomRow; rowIndex++) { // @step:carve-cell
                if (rowIndex == gapRow) continue; // Leave the gap open
                // Skip start/end positions
                if (rowIndex == startPos[0] && wallCol == startPos[1]) continue;
                if (rowIndex == endPos[0] && wallCol == endPos[1]) continue;
                grid[rowIndex][wallCol] = 1; // @step:carve-cell
                wallsBuilt++;
            }

            buildWallsInRegion(topRow, leftCol, bottomRow, wallCol - 1); // @step:carve-cell
            buildWallsInRegion(topRow, wallCol + 1, bottomRow, rightCol); // @step:carve-cell
        }
    }

    public static int recursiveDivision(int[][] inputGrid, int[] start, int[] end) {
        grid = inputGrid; // @step:initialize
        rowCount = grid.length; // @step:initialize
        colCount = grid[0].length; // @step:initialize
        startPos = start; // @step:initialize
        endPos = end; // @step:initialize
        wallsBuilt = 0; // @step:initialize
        random = new Random();

        buildWallsInRegion(0, 0, rowCount - 1, colCount - 1); // @step:carve-cell

        return wallsBuilt; // @step:complete
    }
}
