import java.util.*;

// Aldous-Broder Maze — uniform random spanning tree via random walk
public class AldousBroder {
    public static int aldousBroder(int[][] grid, int[] start) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        boolean[][] visited = new boolean[rowCount][colCount]; // @step:initialize
        int passagesCarved = 0; // @step:initialize
        Random random = new Random();

        // Count total passage cells (odd row and odd col)
        int totalPassageCells = 0; // @step:initialize
        for (int rowIndex = 1; rowIndex < rowCount - 1; rowIndex += 2) {
            for (int colIndex = 1; colIndex < colCount - 1; colIndex += 2) {
                totalPassageCells++;
            }
        }

        int visitedCount = 0; // @step:initialize
        int currentRow = start[0]; // @step:initialize
        int currentCol = start[1]; // @step:initialize

        // Mark start as visited and carve it
        visited[currentRow][currentCol] = true; // @step:visit
        if (grid[currentRow][currentCol] == 1) {
            grid[currentRow][currentCol] = 0; // @step:carve-cell
            passagesCarved++;
        }
        visitedCount++;

        // Directions move 2 cells to passage-cell neighbors
        int[][] directions = {{-2, 0}, {2, 0}, {0, -2}, {0, 2}};

        // Iteration cap to prevent infinite loops
        int maxIterations = rowCount * colCount * 10;
        int iterations = 0;

        while (visitedCount < totalPassageCells && iterations < maxIterations) {
            iterations++;

            // Collect valid passage-cell neighbors
            List<int[]> validNeighbors = new ArrayList<>(); // @step:visit
            for (int[] direction : directions) {
                int neighborRow = currentRow + direction[0];
                int neighborCol = currentCol + direction[1];
                if (neighborRow < 1 || neighborRow >= rowCount - 1) continue;
                if (neighborCol < 1 || neighborCol >= colCount - 1) continue;
                validNeighbors.add(new int[]{neighborRow, neighborCol});
            }

            if (validNeighbors.isEmpty()) break;

            // Pick a random neighbor (random walk)
            int[] next = validNeighbors.get(random.nextInt(validNeighbors.size())); // @step:visit
            int nextRow = next[0];
            int nextCol = next[1];

            if (!visited[nextRow][nextCol]) {
                // Carve the wall between current and next
                int wallRow = currentRow + (nextRow - currentRow) / 2;
                int wallCol = currentCol + (nextCol - currentCol) / 2;
                grid[wallRow][wallCol] = 0; // @step:carve-cell
                passagesCarved++;

                // Carve the next passage cell
                if (grid[nextRow][nextCol] == 1) {
                    grid[nextRow][nextCol] = 0; // @step:carve-cell
                    passagesCarved++;
                }

                visited[nextRow][nextCol] = true; // @step:carve-cell
                visitedCount++;
            }

            currentRow = nextRow; // @step:visit
            currentCol = nextCol; // @step:visit
        }

        return passagesCarved; // @step:complete
    }
}
