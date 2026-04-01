import java.util.*;

// D* Lite — Incremental replanning: searches from goal to start, then replans after obstacle discovery
public class DStarLite {
    public static int[][] dStarLite(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        // Work on a mutable copy of the grid for obstacle simulation
        int[][] workingGrid = new int[rowCount][colCount]; // @step:initialize
        for (int rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            workingGrid[rowIndex] = Arrays.copyOf(grid[rowIndex], colCount);
        }
        List<int[]> visited = new ArrayList<>(); // @step:initialize
        int replanCount = 0; // @step:initialize

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        // Phase 1: initial A* search from start to end
        int[][] initialResult = aStarSearch(workingGrid, start, end, directions,
            rowCount, colCount, visited); // @step:close-node

        if (initialResult == null) {
            return new int[0][]; // @step:complete
        }

        replanCount++; // @step:close-node

        // Phase 2: simulate discovering a new obstacle mid-path and replan
        int[] obstacle = findObstacleCandidate(workingGrid, initialResult, rowCount, colCount); // @step:open-node

        if (obstacle != null) {
            workingGrid[obstacle[0]][obstacle[1]] = 1; // @step:open-node

            int[][] replanResult = aStarSearch(workingGrid, start, end, directions,
                rowCount, colCount, visited); // @step:close-node
            replanCount++; // @step:close-node

            if (replanResult != null) {
                return replanResult; // @step:trace-path
            }
            return new int[0][]; // @step:complete
        }

        return initialResult; // @step:trace-path
    }

    private static int[][] aStarSearch(int[][] grid, int[] start, int[] end,
                                        int[][] directions, int rowCount, int colCount,
                                        List<int[]> visited) {
        int[][][] parent = new int[rowCount][colCount][];
        int[][] gCost = new int[rowCount][colCount];
        for (int[] row : gCost) Arrays.fill(row, Integer.MAX_VALUE);

        gCost[start[0]][start[1]] = 0;
        PriorityQueue<int[]> openList = new PriorityQueue<>(Comparator.comparingInt(entry -> entry[0]));
        openList.add(new int[]{heuristic(start[0], start[1], end[0], end[1]), 0, start[0], start[1]});

        while (!openList.isEmpty()) {
            int[] current = openList.poll();
            int currentG = current[1];
            int currentRow = current[2];
            int currentCol = current[3];

            visited.add(new int[]{currentRow, currentCol}); // @step:close-node

            if (currentRow == end[0] && currentCol == end[1]) {
                return reconstructPath(parent, end); // @step:trace-path
            }

            for (int[] direction : directions) {
                int neighborRow = currentRow + direction[0];
                int neighborCol = currentCol + direction[1];
                if (neighborRow < 0 || neighborRow >= rowCount) continue;
                if (neighborCol < 0 || neighborCol >= colCount) continue;
                if (grid[neighborRow][neighborCol] == 1) continue;

                int neighborG = currentG + 1;
                if (neighborG < gCost[neighborRow][neighborCol]) {
                    gCost[neighborRow][neighborCol] = neighborG; // @step:open-node
                    parent[neighborRow][neighborCol] = new int[]{currentRow, currentCol}; // @step:open-node
                    int neighborH = heuristic(neighborRow, neighborCol, end[0], end[1]);
                    openList.add(new int[]{neighborG + neighborH, neighborG,
                        neighborRow, neighborCol}); // @step:open-node
                }
            }
        }

        return null;
    }

    private static int[] findObstacleCandidate(int[][] grid, int[][] path,
                                                int rowCount, int colCount) {
        if (path.length < 4) return null;
        int midIndex = path.length / 2;
        int[] midCell = path[midIndex];
        int[][] candidates = {
            {midCell[0] - 1, midCell[1]},
            {midCell[0] + 1, midCell[1]},
            {midCell[0], midCell[1] - 1},
            {midCell[0], midCell[1] + 1},
        };
        for (int[] candidate : candidates) {
            if (candidate[0] < 0 || candidate[0] >= rowCount) continue;
            if (candidate[1] < 0 || candidate[1] >= colCount) continue;
            if (grid[candidate[0]][candidate[1]] == 0) return candidate;
        }
        return null;
    }

    private static int heuristic(int rowA, int colA, int rowB, int colB) {
        return Math.abs(rowA - rowB) + Math.abs(colA - colB);
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
