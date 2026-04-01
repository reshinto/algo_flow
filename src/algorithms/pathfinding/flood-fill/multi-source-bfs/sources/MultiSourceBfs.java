import java.util.*;

// Multi-Source BFS — computes distance from nearest wall for every empty cell simultaneously
public class MultiSourceBfs {
    public static int[][] multiSourceBfs(int[][] grid) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        int[][] distances = new int[rowCount][colCount]; // @step:initialize
        for (int[] row : distances) Arrays.fill(row, -1);

        // Seed queue with ALL empty cells adjacent to a wall (distance = 1)
        Queue<int[]> queue = new LinkedList<>(); // @step:initialize,open-node
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        for (int rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            for (int colIndex = 0; colIndex < colCount; colIndex++) {
                if (grid[rowIndex][colIndex] == 1) continue;
                boolean adjacentToWall = false;
                for (int[] direction : directions) {
                    int neighborRow = rowIndex + direction[0];
                    int neighborCol = colIndex + direction[1];
                    if (neighborRow < 0 || neighborRow >= rowCount) {
                        adjacentToWall = true; // grid boundary counts as wall
                        break;
                    }
                    if (neighborCol < 0 || neighborCol >= colCount) {
                        adjacentToWall = true;
                        break;
                    }
                    if (grid[neighborRow][neighborCol] == 1) { // @step:open-node
                        adjacentToWall = true;
                        break;
                    }
                }
                if (adjacentToWall) {
                    distances[rowIndex][colIndex] = 1; // @step:open-node
                    queue.add(new int[]{rowIndex, colIndex}); // @step:open-node
                }
            }
        }

        int maxDistance = 1;

        while (!queue.isEmpty()) {
            int[] current = queue.poll(); // @step:close-node
            int currentRow = current[0]; // @step:close-node
            int currentCol = current[1]; // @step:close-node
            int currentDistance = distances[currentRow][currentCol]; // @step:update-cost

            for (int[] direction : directions) {
                int neighborRow = currentRow + direction[0];
                int neighborCol = currentCol + direction[1];
                if (neighborRow < 0 || neighborRow >= rowCount) continue;
                if (neighborCol < 0 || neighborCol >= colCount) continue;
                if (grid[neighborRow][neighborCol] == 1) continue;
                if (distances[neighborRow][neighborCol] != -1) continue;

                int neighborDistance = currentDistance + 1;
                distances[neighborRow][neighborCol] = neighborDistance; // @step:update-cost
                if (neighborDistance > maxDistance) maxDistance = neighborDistance;
                queue.add(new int[]{neighborRow, neighborCol}); // @step:open-node
            }
        }

        return distances; // @step:complete
    }
}
