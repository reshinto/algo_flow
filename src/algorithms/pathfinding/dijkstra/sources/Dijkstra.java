import java.util.*;

// Dijkstra's Algorithm — find shortest path on a weighted grid
public class Dijkstra {
    public static int[][] dijkstra(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        int[][] distance = new int[rowCount][colCount]; // @step:initialize
        for (int[] row : distance) Arrays.fill(row, Integer.MAX_VALUE); // @step:initialize
        distance[start[0]][start[1]] = 0; // @step:initialize
        int[][][] parent = new int[rowCount][colCount][]; // @step:initialize
        boolean[][] visitedSet = new boolean[rowCount][colCount]; // @step:initialize

        // Seed the frontier with the start cell
        PriorityQueue<int[]> openSet = new PriorityQueue<>( // @step:open-node
            Comparator.comparingInt(nodeA -> nodeA[2]) // @step:open-node
        );
        openSet.add(new int[]{start[0], start[1], 0}); // @step:open-node

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!openSet.isEmpty()) {
            // Extract the node with the smallest tentative distance
            int[] current = openSet.poll(); // @step:close-node
            int currentRow = current[0]; // @step:close-node
            int currentCol = current[1]; // @step:close-node
            if (visitedSet[currentRow][currentCol]) continue; // @step:close-node
            visitedSet[currentRow][currentCol] = true; // @step:close-node

            // Check if we reached the end
            if (currentRow == end[0] && currentCol == end[1]) { // @step:trace-path
                return reconstructPath(parent, end); // @step:trace-path
            }

            // Explore 4-directional neighbors
            for (int[] direction : directions) {
                int neighborRow = currentRow + direction[0];
                int neighborCol = currentCol + direction[1];
                if (neighborRow < 0 || neighborRow >= rowCount) continue;
                if (neighborCol < 0 || neighborCol >= colCount) continue;
                if (grid[neighborRow][neighborCol] == 1) continue;
                if (visitedSet[neighborRow][neighborCol]) continue;

                // Relax the edge: update distance if shorter
                int newDistance = distance[currentRow][currentCol] + 1; // @step:update-cost
                if (newDistance < distance[neighborRow][neighborCol]) { // @step:update-cost
                    distance[neighborRow][neighborCol] = newDistance; // @step:update-cost
                    parent[neighborRow][neighborCol] = new int[]{currentRow, currentCol};
                    openSet.add(new int[]{neighborRow, neighborCol, newDistance});
                }
            }
        }

        return new int[0][]; // @step:complete
    }

    private static int[][] reconstructPath(int[][][] parent, int[] end) {
        List<int[]> path = new ArrayList<>();
        int[] current = end;
        while (current != null) {
            path.add(0, current);
            current = parent[current[0]][current[1]];
        }
        return path.toArray(new int[0][]);
    }
}
