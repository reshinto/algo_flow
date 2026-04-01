import java.util.*;

// BFS Exploration — explore all reachable cells layer-by-layer using breadth-first search
public class BfsExploration {
    public static Map<String, Object> bfsExploration(int[][] grid, int[] start) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        boolean[][] visitedSet = new boolean[rowCount][colCount]; // @step:initialize
        List<int[]> visited = new ArrayList<>(); // @step:initialize

        // Seed the queue with the start cell
        Queue<int[]> queue = new LinkedList<>(); // @step:initialize,open-node
        queue.add(new int[]{start[0], start[1]}); // @step:open-node
        visitedSet[start[0]][start[1]] = true; // @step:open-node
        int layerCount = 0; // @step:initialize

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!queue.isEmpty()) {
            // Process the entire current layer before advancing depth
            int layerSize = queue.size(); // @step:close-node
            layerCount++; // @step:close-node

            for (int offsetIndex = 0; offsetIndex < layerSize; offsetIndex++) {
                int[] current = queue.poll(); // @step:close-node
                int currentRow = current[0]; // @step:close-node
                int currentCol = current[1]; // @step:close-node
                visited.add(new int[]{currentRow, currentCol}); // @step:close-node

                for (int[] direction : directions) {
                    int neighborRow = currentRow + direction[0];
                    int neighborCol = currentCol + direction[1];
                    if (neighborRow < 0 || neighborRow >= rowCount) continue;
                    if (neighborCol < 0 || neighborCol >= colCount) continue;
                    if (grid[neighborRow][neighborCol] == 1) continue;
                    if (visitedSet[neighborRow][neighborCol]) continue;
                    visitedSet[neighborRow][neighborCol] = true; // @step:open-node
                    queue.add(new int[]{neighborRow, neighborCol}); // @step:open-node
                }
            }
        }

        Map<String, Object> result = new HashMap<>(); // @step:complete
        result.put("visited", visited); // @step:complete
        result.put("layers", layerCount); // @step:complete
        return result; // @step:complete
    }
}
