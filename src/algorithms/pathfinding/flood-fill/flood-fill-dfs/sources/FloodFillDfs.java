import java.util.*;

// Flood Fill DFS — classic paint bucket fill using depth-first search (stack-based)
public class FloodFillDfs {
    public static int[][] floodFillDfs(int[][] grid, int[] start) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        boolean[][] filledSet = new boolean[rowCount][colCount]; // @step:initialize

        // Seed the stack with the start cell
        Deque<int[]> stack = new ArrayDeque<>(); // @step:initialize,open-node
        stack.push(new int[]{start[0], start[1]}); // @step:open-node
        filledSet[start[0]][start[1]] = true; // @step:open-node

        List<int[]> filled = new ArrayList<>();
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!stack.isEmpty()) {
            // Pop the top cell — DFS dives deep before backtracking
            int[] current = stack.pop(); // @step:close-node
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
                // Mark on push to avoid duplicates
                filledSet[neighborRow][neighborCol] = true; // @step:open-node
                stack.push(new int[]{neighborRow, neighborCol}); // @step:open-node
            }
        }

        return filled.toArray(new int[0][]); // @step:complete
    }
}
