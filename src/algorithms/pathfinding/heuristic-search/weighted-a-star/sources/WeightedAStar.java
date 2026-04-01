import java.util.*;

// Weighted A* — A* with inflated heuristic: f(n) = g(n) + weight * h(n). Trades optimality for speed.
public class WeightedAStar {
    public static int[][] weightedAStar(int[][] grid, int[] start, int[] end, double weight) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        int[][][] parent = new int[rowCount][colCount][]; // @step:initialize
        double[][] gCost = new double[rowCount][colCount]; // @step:initialize
        for (double[] row : gCost) Arrays.fill(row, Double.MAX_VALUE); // @step:initialize

        gCost[start[0]][start[1]] = 0; // @step:initialize
        double startH = heuristic(start[0], start[1], end[0], end[1]);
        double startF = weight * startH;
        // Open list: [fCost*100, gCost*100, row, col] (scaled to int for priority queue)
        PriorityQueue<double[]> openList = new PriorityQueue<>(Comparator.comparingDouble(entry -> entry[0])); // @step:initialize,open-node
        openList.add(new double[]{startF, 0, start[0], start[1]}); // @step:open-node
        boolean[][] inOpenSet = new boolean[rowCount][colCount]; // @step:initialize,open-node
        inOpenSet[start[0]][start[1]] = true; // @step:open-node

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!openList.isEmpty()) {
            double[] current = openList.poll(); // @step:close-node
            double currentG = current[1]; // @step:close-node
            int currentRow = (int) current[2]; // @step:close-node
            int currentCol = (int) current[3]; // @step:close-node
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

                double neighborG = currentG + 1;
                if (neighborG < gCost[neighborRow][neighborCol]) {
                    gCost[neighborRow][neighborCol] = neighborG; // @step:open-node
                    parent[neighborRow][neighborCol] = new int[]{currentRow, currentCol}; // @step:open-node
                    double neighborH = heuristic(neighborRow, neighborCol, end[0], end[1]);
                    // Weighted heuristic: inflating h by weight encourages greedy behavior
                    double neighborF = neighborG + weight * neighborH; // @step:open-node
                    inOpenSet[neighborRow][neighborCol] = true;
                    openList.add(new double[]{neighborF, neighborG, neighborRow, neighborCol}); // @step:open-node
                }
            }
        }

        return new int[0][]; // @step:complete
    }

    private static double heuristic(int rowA, int colA, int rowB, int colB) {
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
