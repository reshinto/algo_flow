import java.util.*;

// Best-First Tie Breaking — A* with cross-product tie-breaking for aesthetically straight paths
public class BestFirstTieBreaking {
    public static int[][] bestFirstTieBreaking(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        int[][][] parent = new int[rowCount][colCount][]; // @step:initialize
        int[][] gCost = new int[rowCount][colCount]; // @step:initialize
        for (int[] row : gCost) Arrays.fill(row, Integer.MAX_VALUE); // @step:initialize

        gCost[start[0]][start[1]] = 0; // @step:initialize
        int startH = heuristic(start[0], start[1], end[0], end[1]);
        int startTie = crossProduct(start[0], start[1], start[0], start[1], end[0], end[1]);
        // Comparator: sort by fCost, then hCost, then cross-product tie-breaker
        PriorityQueue<int[]> openList = new PriorityQueue<>((first, second) -> {
            if (first[0] != second[0]) return Integer.compare(first[0], second[0]);
            if (first[1] != second[1]) return Integer.compare(first[1], second[1]);
            return Integer.compare(first[2], second[2]);
        }); // @step:initialize,open-node
        openList.add(new int[]{startH, startH, startTie, 0, start[0], start[1]}); // @step:open-node
        boolean[][] inOpenSet = new boolean[rowCount][colCount]; // @step:initialize,open-node
        inOpenSet[start[0]][start[1]] = true; // @step:open-node

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!openList.isEmpty()) {
            int[] current = openList.poll(); // @step:close-node
            int currentG = current[3]; // @step:close-node
            int currentRow = current[4]; // @step:close-node
            int currentCol = current[5]; // @step:close-node
            inOpenSet[currentRow][currentCol] = false; // @step:close-node

            if (currentRow == end[0] && currentCol == end[1]) { // @step:trace-path
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
                    int neighborF = neighborG + neighborH;
                    // Cross-product tie-breaking: prefer nodes on the straight line from start to end
                    int tieBreaker = crossProduct(
                        start[0], start[1], neighborRow, neighborCol, end[0], end[1]
                    ); // @step:open-node
                    inOpenSet[neighborRow][neighborCol] = true;
                    openList.add(new int[]{neighborF, neighborH, tieBreaker, neighborG,
                        neighborRow, neighborCol}); // @step:open-node
                }
            }
        }

        return new int[0][]; // @step:complete
    }

    /** Cross-product tie breaker: measures deviation from the ideal straight line. */
    private static int crossProduct(int startRow, int startCol, int nodeRow, int nodeCol,
                                    int endRow, int endCol) {
        int deltaRow1 = nodeRow - startRow;
        int deltaCol1 = nodeCol - startCol;
        int deltaRow2 = endRow - startRow;
        int deltaCol2 = endCol - startCol;
        return Math.abs(deltaRow1 * deltaCol2 - deltaRow2 * deltaCol1);
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
