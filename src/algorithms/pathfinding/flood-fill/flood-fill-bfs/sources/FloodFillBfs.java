import java.util.*;

// Flood Fill BFS — classic paint bucket fill using breadth-first search
public class FloodFillBfs {
    public static int[][] floodFillBfs(int[][] grid, int[] start) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        boolean[][] filledSet = new boolean[rowCount][colCount]; // @step:initialize

        // Seed the queue with the start cell
        Queue<int[]> queue = new LinkedList<>(); // @step:initialize,open-node
        queue.add(new int[]{start[0], start[1]}); // @step:open-node
        filledSet[start[0]][start[1]] = true; // @step:open-node

        List<int[]> filled = new ArrayList<>();
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!queue.isEmpty()) {
            // Dequeue the front cell — BFS processes cells level by level
            int[] current = queue.poll(); // @step:close-node
            int currentRow = current[0]; // @step:close-node
            int currentCol = current[1]; // @step:close-node
            filled.add(new int[]{currentRow, currentCol}); // @step:close-node

            // Explore 4-directional neighbors
            for (int[] direction : directions) {
                int neighborRow = currentRow + direction[0];
                int neighborCol = currentCol + direction[1];
                if (neighborRow < 0 || neighborRow >= rowCount) continue;
                if (neighborCol < 0 || neighborCol >= colCount) continue;
                if (grid[neighborRow][neighborCol] == 1) continue;
                if (filledSet[neighborRow][neighborCol]) continue;
                // Mark on enqueue to avoid duplicates
                filledSet[neighborRow][neighborCol] = true; // @step:open-node
                queue.add(new int[]{neighborRow, neighborCol}); // @step:open-node
            }
        }

        return filled.toArray(new int[0][]); // @step:complete
    }
}
