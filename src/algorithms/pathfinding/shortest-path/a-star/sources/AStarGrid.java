import java.util.*;

// A* Search — find shortest path using Manhattan distance heuristic
public class AStar {
    public static int[][] aStarGrid(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        int[][] gCostMap = new int[rowCount][colCount]; // @step:initialize
        for (int[] row : gCostMap) Arrays.fill(row, Integer.MAX_VALUE); // @step:initialize
        gCostMap[start[0]][start[1]] = 0; // @step:initialize
        int[][][] parent = new int[rowCount][colCount][]; // @step:initialize
        boolean[][] closedSet = new boolean[rowCount][colCount]; // @step:initialize

        // Priority queue ordered by fCost = gCost + hCost
        PriorityQueue<int[]> openSet = new PriorityQueue<>( // @step:initialize,open-node
            Comparator.comparingInt((int[] node) -> node[2]).thenComparingInt(node -> node[3])
        );
        int startHCost = Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
        openSet.add(new int[]{start[0], start[1], startHCost + 0, startHCost}); // @step:open-node
        // {row, col, fCost, hCost}

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!openSet.isEmpty()) {
            // Extract node with lowest fCost
            int[] current = openSet.poll(); // @step:close-node
            int currentRow = current[0]; // @step:close-node
            int currentCol = current[1]; // @step:close-node
            if (closedSet[currentRow][currentCol]) continue; // @step:close-node
            closedSet[currentRow][currentCol] = true; // @step:close-node

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
                if (closedSet[neighborRow][neighborCol]) continue;

                int tentativeGCost = gCostMap[currentRow][currentCol] + 1; // @step:update-cost
                if (tentativeGCost < gCostMap[neighborRow][neighborCol]) { // @step:update-cost
                    gCostMap[neighborRow][neighborCol] = tentativeGCost; // @step:update-cost
                    parent[neighborRow][neighborCol] = new int[]{currentRow, currentCol};
                    int neighborHCost = Math.abs(neighborRow - end[0]) + Math.abs(neighborCol - end[1]);
                    openSet.add(new int[]{neighborRow, neighborCol, tentativeGCost + neighborHCost, neighborHCost});
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
