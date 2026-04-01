import java.util.*;

// DFS Exploration — explore all reachable cells using iterative depth-first search with a stack
public class DfsExploration {
    public static Map<String, Object> dfsExploration(int[][] grid, int[] start) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        boolean[][] visitedSet = new boolean[rowCount][colCount]; // @step:initialize
        List<int[]> visited = new ArrayList<>(); // @step:initialize

        // Stack stores [row, col, depth] arrays for iterative DFS
        Deque<int[]> stack = new ArrayDeque<>(); // @step:initialize,open-node
        stack.push(new int[]{start[0], start[1], 0}); // @step:open-node
        visitedSet[start[0]][start[1]] = true; // @step:open-node
        int maxDepth = 0; // @step:initialize

        int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

        while (!stack.isEmpty()) {
            // Pop from top of stack — DFS always expands the deepest unvisited cell
            int[] current = stack.pop(); // @step:close-node
            int currentRow = current[0]; // @step:close-node
            int currentCol = current[1]; // @step:close-node
            int currentDepth = current[2]; // @step:close-node
            visited.add(new int[]{currentRow, currentCol}); // @step:close-node
            if (currentDepth > maxDepth) maxDepth = currentDepth; // @step:close-node

            for (int[] direction : directions) {
                int neighborRow = currentRow + direction[0];
                int neighborCol = currentCol + direction[1];
                if (neighborRow < 0 || neighborRow >= rowCount) continue;
                if (neighborCol < 0 || neighborCol >= colCount) continue;
                if (grid[neighborRow][neighborCol] == 1) continue;
                if (visitedSet[neighborRow][neighborCol]) continue;
                visitedSet[neighborRow][neighborCol] = true; // @step:open-node
                stack.push(new int[]{neighborRow, neighborCol, currentDepth + 1}); // @step:open-node
            }
        }

        Map<String, Object> result = new HashMap<>(); // @step:complete
        result.put("visited", visited); // @step:complete
        result.put("maxDepth", maxDepth); // @step:complete
        return result; // @step:complete
    }
}
