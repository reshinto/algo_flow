import java.util.*;

// Greedy Best-First Search — navigate a grid using only the heuristic h(n) = Manhattan distance
public class GreedyBestFirst {
    public static int[][] greedyBestFirst(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        int[][][] parent = new int[rowCount][colCount][]; // @step:initialize
        boolean[][] closedSet = new boolean[rowCount][colCount]; // @step:initialize
        boolean[][] inOpenSet = new boolean[rowCount][colCount]; // @step:initialize

        // Priority queue: sorted by hCost only (greedy — ignores g-cost)
        PriorityQueue<int[]> openList = new PriorityQueue<>(Comparator.comparingInt(entry -> entry[0])); // @step:initialize,open-node
        openList.add(new int[]{manhattanDistance(start, end), start[0], start[1]}); // @step:open-node
        inOpenSet[start[0]][start[1]] = true; // @step:open-node

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!openList.isEmpty()) {
            // Dequeue node with lowest hCost (greedy: ignore g-cost entirely)
            int[] current = openList.poll(); // @step:close-node
            int currentRow = current[1]; // @step:close-node
            int currentCol = current[2]; // @step:close-node
            closedSet[currentRow][currentCol] = true; // @step:close-node

            // Check if goal reached
            if (currentRow == end[0] && currentCol == end[1]) { // @step:trace-path
                return reconstructPath(parent, end); // @step:trace-path
            }

            // Expand neighbors sorted by heuristic only
            for (int[] direction : directions) {
                int neighborRow = currentRow + direction[0];
                int neighborCol = currentCol + direction[1];
                if (neighborRow < 0 || neighborRow >= rowCount) continue;
                if (neighborCol < 0 || neighborCol >= colCount) continue;
                if (grid[neighborRow][neighborCol] == 1) continue;
                if (closedSet[neighborRow][neighborCol]) continue;
                if (inOpenSet[neighborRow][neighborCol]) continue;

                // Greedy: use only heuristic, g-cost is always treated as 0
                int hCost = manhattanDistance(new int[]{neighborRow, neighborCol}, end); // @step:open-node
                inOpenSet[neighborRow][neighborCol] = true; // @step:open-node
                parent[neighborRow][neighborCol] = new int[]{currentRow, currentCol}; // @step:open-node
                openList.add(new int[]{hCost, neighborRow, neighborCol}); // @step:open-node
            }
        }

        return new int[0][]; // @step:complete
    }

    private static int manhattanDistance(int[] pointA, int[] pointB) {
        return Math.abs(pointA[0] - pointB[0]) + Math.abs(pointA[1] - pointB[1]);
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
