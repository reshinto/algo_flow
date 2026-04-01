import java.util.*;

// Jump Point Search — A* optimization that prunes symmetric paths by jumping over intermediate nodes
public class JumpPointSearch {
    public static int[][] jumpPointSearch(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        int[][][] parent = new int[rowCount][colCount][]; // @step:initialize
        int[][] gCost = new int[rowCount][colCount]; // @step:initialize
        for (int[] row : gCost) Arrays.fill(row, Integer.MAX_VALUE); // @step:initialize

        gCost[start[0]][start[1]] = 0; // @step:initialize
        // Open list: [fCost, gCost, row, col]
        PriorityQueue<int[]> openList = new PriorityQueue<>(Comparator.comparingInt(entry -> entry[0])); // @step:initialize,open-node
        int startH = heuristic(start[0], start[1], end[0], end[1]);
        openList.add(new int[]{startH, 0, start[0], start[1]}); // @step:open-node
        boolean[][] inOpenSet = new boolean[rowCount][colCount]; // @step:initialize,open-node
        inOpenSet[start[0]][start[1]] = true; // @step:open-node

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!openList.isEmpty()) {
            int[] current = openList.poll(); // @step:close-node
            int currentG = current[1]; // @step:close-node
            int currentRow = current[2]; // @step:close-node
            int currentCol = current[3]; // @step:close-node

            if (currentRow == end[0] && currentCol == end[1]) { // @step:trace-path
                return reconstructPath(parent, end); // @step:trace-path
            }

            for (int[] direction : directions) {
                int[] jumpResult = jump(grid, currentRow, currentCol,
                    direction[0], direction[1], end, rowCount, colCount);
                if (jumpResult == null) continue;

                int jumpRow = jumpResult[0];
                int jumpCol = jumpResult[1];
                int neighborG = currentG + heuristic(currentRow, currentCol, jumpRow, jumpCol);

                if (neighborG < gCost[jumpRow][jumpCol]) {
                    gCost[jumpRow][jumpCol] = neighborG; // @step:open-node
                    parent[jumpRow][jumpCol] = new int[]{currentRow, currentCol}; // @step:open-node
                    int jumpH = heuristic(jumpRow, jumpCol, end[0], end[1]);
                    int jumpF = neighborG + jumpH;
                    inOpenSet[jumpRow][jumpCol] = true;
                    openList.add(new int[]{jumpF, neighborG, jumpRow, jumpCol}); // @step:open-node
                }
            }
        }

        return new int[0][]; // @step:complete
    }

    private static int[] jump(int[][] grid, int row, int col, int deltaRow, int deltaCol,
                               int[] end, int rowCount, int colCount) {
        int nextRow = row + deltaRow;
        int nextCol = col + deltaCol;

        if (nextRow < 0 || nextRow >= rowCount || nextCol < 0 || nextCol >= colCount) return null;
        if (grid[nextRow][nextCol] == 1) return null;
        if (nextRow == end[0] && nextCol == end[1]) return new int[]{nextRow, nextCol};

        if (hasForced(grid, nextRow, nextCol, deltaRow, deltaCol, rowCount, colCount)) {
            return new int[]{nextRow, nextCol};
        }

        return jump(grid, nextRow, nextCol, deltaRow, deltaCol, end, rowCount, colCount);
    }

    private static boolean hasForced(int[][] grid, int row, int col, int deltaRow, int deltaCol,
                                     int rowCount, int colCount) {
        if (deltaRow != 0 && deltaCol == 0) {
            boolean leftBlocked = col - 1 >= 0 && row - deltaRow >= 0
                && row - deltaRow < rowCount && grid[row - deltaRow][col - 1] == 1;
            boolean rightBlocked = col + 1 < colCount && row - deltaRow >= 0
                && row - deltaRow < rowCount && grid[row - deltaRow][col + 1] == 1;
            boolean leftOpen = col - 1 >= 0 && grid[row][col - 1] != 1;
            boolean rightOpen = col + 1 < colCount && grid[row][col + 1] != 1;
            return (leftBlocked && leftOpen) || (rightBlocked && rightOpen);
        }
        if (deltaCol != 0 && deltaRow == 0) {
            boolean upBlocked = row - 1 >= 0 && col - deltaCol >= 0
                && col - deltaCol < colCount && grid[row - 1][col - deltaCol] == 1;
            boolean downBlocked = row + 1 < rowCount && col - deltaCol >= 0
                && col - deltaCol < colCount && grid[row + 1][col - deltaCol] == 1;
            boolean upOpen = row - 1 >= 0 && grid[row - 1][col] != 1;
            boolean downOpen = row + 1 < rowCount && grid[row + 1][col] != 1;
            return (upBlocked && upOpen) || (downBlocked && downOpen);
        }
        return false;
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
