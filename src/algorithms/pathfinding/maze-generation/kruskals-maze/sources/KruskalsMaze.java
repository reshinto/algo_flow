import java.util.*;

// Kruskal's Maze — Union-Find based maze generation by randomly removing walls
public class KruskalsMaze {
    private static int rowCount;
    private static int colCount;
    private static int[][] setId;

    private static int findSet(int row, int col) { // @step:initialize
        return setId[row][col];
    }

    private static void mergeSets(int rowA, int colA, int rowB, int colB) { // @step:initialize
        int idA = findSet(rowA, colA);
        int idB = findSet(rowB, colB);
        if (idA == idB) return;
        for (int rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            for (int colIndex = 0; colIndex < colCount; colIndex++) {
                if (setId[rowIndex][colIndex] == idB) {
                    setId[rowIndex][colIndex] = idA;
                }
            }
        }
    }

    public static int kruskalsMaze(int[][] grid) {
        rowCount = grid.length; // @step:initialize
        colCount = grid[0].length; // @step:initialize
        int passagesCarved = 0; // @step:initialize
        Random random = new Random();

        // Union-Find: each cell has a set ID
        setId = new int[rowCount][colCount]; // @step:initialize
        for (int rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            for (int colIndex = 0; colIndex < colCount; colIndex++) {
                setId[rowIndex][colIndex] = rowIndex * colCount + colIndex;
            }
        }

        // Collect all internal walls between passage cells
        List<int[]> walls = new ArrayList<>(); // @step:initialize

        for (int rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
            for (int colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
                // Carve the passage cell itself
                if (grid[rowIndex][colIndex] == 1) {
                    grid[rowIndex][colIndex] = 0; // @step:merge-cells
                    passagesCarved++;
                }
                // Horizontal wall to the right
                if (colIndex + 2 < colCount - 1) {
                    walls.add(new int[]{rowIndex, colIndex + 1, rowIndex, colIndex, rowIndex, colIndex + 2});
                }
                // Vertical wall below
                if (rowIndex + 2 < rowCount - 1) {
                    walls.add(new int[]{rowIndex + 1, colIndex, rowIndex, colIndex, rowIndex + 2, colIndex});
                }
            }
        }

        // Shuffle walls randomly (Fisher-Yates)
        Collections.shuffle(walls, random); // @step:merge-cells

        // Process each wall
        for (int[] wall : walls) {
            int wallRow = wall[0], wallCol = wall[1];
            int cellARow = wall[2], cellACol = wall[3];
            int cellBRow = wall[4], cellBCol = wall[5];
            if (findSet(cellARow, cellACol) != findSet(cellBRow, cellBCol)) { // @step:merge-cells
                // Remove the wall and merge the two sets
                grid[wallRow][wallCol] = 0; // @step:merge-cells
                passagesCarved++;
                mergeSets(cellARow, cellACol, cellBRow, cellBCol); // @step:merge-cells
            }
        }

        return passagesCarved; // @step:complete
    }
}
