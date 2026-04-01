import java.util.*;

// BFS Shortest Path — find shortest path on an unweighted grid using breadth-first search
public class BfsShortestPath {
    public static int[][] bfsShortestPath(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        int[][][] parent = new int[rowCount][colCount][]; // @step:initialize
        boolean[][] visitedSet = new boolean[rowCount][colCount]; // @step:initialize

        // Seed the queue with the start cell
        Queue<int[]> queue = new LinkedList<>(); // @step:initialize,open-node
        queue.add(new int[]{start[0], start[1]}); // @step:open-node
        visitedSet[start[0]][start[1]] = true; // @step:open-node

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!queue.isEmpty()) {
            // Dequeue the front cell — BFS explores level by level
            int[] current = queue.poll(); // @step:close-node
            int currentRow = current[0]; // @step:close-node
            int currentCol = current[1]; // @step:close-node

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
                // Mark visited immediately on enqueue to avoid duplicates
                visitedSet[neighborRow][neighborCol] = true; // @step:open-node
                parent[neighborRow][neighborCol] = new int[]{currentRow, currentCol}; // @step:open-node
                queue.add(new int[]{neighborRow, neighborCol}); // @step:open-node
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
