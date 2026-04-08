import java.util.*;

// Iterative Deepening DFS — DFS with increasing depth limits, combining BFS optimality with DFS memory efficiency
public class IterativeDeepeningDfs {
    public static Map<String, Object> iterativeDeepeningDfs(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        List<int[]> allVisited = new ArrayList<>(); // @step:initialize

        // Increase depth limit one step at a time until target is reached
        for (int depthLimit = 0; depthLimit <= rowCount * colCount; depthLimit++) { // @step:initialize
            Set<String> pathSet = new HashSet<>(); // @step:open-node
            List<int[]> result = depthLimitedSearch(grid, start, end, depthLimit, pathSet, allVisited, rowCount, colCount); // @step:close-node

            if (result != null) {
                Map<String, Object> found = new HashMap<>(); // @step:trace-path
                found.put("path", result);
                found.put("visited", allVisited);
                found.put("depthReached", depthLimit);
                return found;
            }
        }

        Map<String, Object> notFound = new HashMap<>(); // @step:complete
        notFound.put("path", new ArrayList<int[]>());
        notFound.put("visited", allVisited);
        notFound.put("depthReached", 0);
        return notFound;
    }

    private static List<int[]> depthLimitedSearch(
        int[][] grid, int[] current, int[] end, int depthRemaining,
        Set<String> pathSet, List<int[]> allVisited, int rowCount, int colCount
    ) {
        int currentRow = current[0];
        int currentCol = current[1];
        allVisited.add(new int[]{currentRow, currentCol});

        if (currentRow == end[0] && currentCol == end[1]) {
            List<int[]> path = new ArrayList<>();
            path.add(new int[]{currentRow, currentCol});
            return path;
        }

        if (depthRemaining == 0) return null;

        pathSet.add(currentRow + "," + currentCol);

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (int[] direction : directions) {
            int neighborRow = currentRow + direction[0];
            int neighborCol = currentCol + direction[1];
            if (neighborRow < 0 || neighborRow >= rowCount) continue;
            if (neighborCol < 0 || neighborCol >= colCount) continue;
            if (grid[neighborRow][neighborCol] == 1) continue;
            if (pathSet.contains(neighborRow + "," + neighborCol)) continue;

            List<int[]> subResult = depthLimitedSearch(
                grid, new int[]{neighborRow, neighborCol}, end,
                depthRemaining - 1, pathSet, allVisited, rowCount, colCount
            );

            if (subResult != null) {
                List<int[]> path = new ArrayList<>();
                path.add(new int[]{currentRow, currentCol});
                path.addAll(subResult);
                return path;
            }
        }

        pathSet.remove(currentRow + "," + currentCol);
        return null;
    }
}
