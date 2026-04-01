import java.util.*;

// IDA* — Iterative Deepening A*: DFS with f-cost threshold that increases each iteration
public class IdaStar {
    private static final int FOUND = -1;

    public static int[][] idaStar(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        List<int[]> visited = new ArrayList<>(); // @step:initialize
        int threshold = heuristic(start[0], start[1], end[0], end[1]); // @step:initialize
        List<int[]> currentPath = new ArrayList<>(); // @step:initialize
        currentPath.add(start);
        boolean[][] onPath = new boolean[rowCount][colCount]; // @step:initialize
        onPath[start[0]][start[1]] = true; // @step:initialize
        int iterationCount = 0; // @step:initialize

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (true) {
            iterationCount++; // @step:close-node
            int result = search(grid, currentPath, onPath, 0, threshold, end,
                visited, directions, rowCount, colCount); // @step:close-node

            if (result == FOUND) { // @step:trace-path
                return currentPath.toArray(new int[0][]); // @step:trace-path
            }

            if (result == Integer.MAX_VALUE) {
                return new int[0][]; // @step:complete
            }

            threshold = result; // @step:initialize
        }
    }

    private static int search(int[][] grid, List<int[]> currentPath, boolean[][] onPath,
                               int gCost, int threshold, int[] end, List<int[]> visited,
                               int[][] directions, int rowCount, int colCount) {
        int[] head = currentPath.get(currentPath.size() - 1);
        int fCost = gCost + heuristic(head[0], head[1], end[0], end[1]); // @step:open-node

        if (fCost > threshold) return fCost; // @step:open-node

        visited.add(new int[]{head[0], head[1]}); // @step:close-node

        if (head[0] == end[0] && head[1] == end[1]) return FOUND; // @step:trace-path

        int minimumExceeded = Integer.MAX_VALUE;

        for (int[] direction : directions) {
            int neighborRow = head[0] + direction[0];
            int neighborCol = head[1] + direction[1];

            if (neighborRow < 0 || neighborRow >= rowCount) continue;
            if (neighborCol < 0 || neighborCol >= colCount) continue;
            if (grid[neighborRow][neighborCol] == 1) continue;
            if (onPath[neighborRow][neighborCol]) continue; // @step:open-node

            currentPath.add(new int[]{neighborRow, neighborCol}); // @step:open-node
            onPath[neighborRow][neighborCol] = true; // @step:open-node

            int subResult = search(grid, currentPath, onPath, gCost + 1, threshold, end,
                visited, directions, rowCount, colCount);

            if (subResult == FOUND) return FOUND;
            if (subResult < minimumExceeded) minimumExceeded = subResult;

            currentPath.remove(currentPath.size() - 1); // @step:close-node
            onPath[neighborRow][neighborCol] = false; // @step:close-node
        }

        return minimumExceeded;
    }

    private static int heuristic(int rowA, int colA, int rowB, int colB) {
        return Math.abs(rowA - rowB) + Math.abs(colA - colB);
    }
}
