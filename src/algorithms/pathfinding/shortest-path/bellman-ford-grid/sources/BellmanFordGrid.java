import java.util.*;

// Bellman-Ford Grid — shortest path via V-1 edge relaxation iterations
public class BellmanFordGrid {
    public static int[][] bellmanFordGrid(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        int vertexCount = rowCount * colCount; // @step:initialize
        int[][] distance = new int[rowCount][colCount]; // @step:initialize
        for (int[] row : distance) Arrays.fill(row, Integer.MAX_VALUE); // @step:initialize
        distance[start[0]][start[1]] = 0; // @step:initialize
        int[][][] parent = new int[rowCount][colCount][]; // @step:initialize

        // Collect all passable edges: {fromRow, fromCol, toRow, toCol}
        List<int[]> edges = new ArrayList<>(); // @step:initialize
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (int rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            for (int colIndex = 0; colIndex < colCount; colIndex++) {
                if (grid[rowIndex][colIndex] == 1) continue;
                for (int[] dir : directions) {
                    int neighborRow = rowIndex + dir[0];
                    int neighborCol = colIndex + dir[1];
                    if (neighborRow < 0 || neighborRow >= rowCount) continue;
                    if (neighborCol < 0 || neighborCol >= colCount) continue;
                    if (grid[neighborRow][neighborCol] == 1) continue;
                    edges.add(new int[]{rowIndex, colIndex, neighborRow, neighborCol});
                }
            }
        }

        // Relax all edges V-1 times
        for (int iteration = 0; iteration < vertexCount - 1; iteration++) {
            boolean updated = false;
            for (int[] edge : edges) {
                int fromRow = edge[0], fromCol = edge[1], toRow = edge[2], toCol = edge[3];
                if (distance[fromRow][fromCol] == Integer.MAX_VALUE) continue;
                int newDistance = distance[fromRow][fromCol] + 1; // @step:update-cost
                if (newDistance < distance[toRow][toCol]) { // @step:update-cost
                    distance[toRow][toCol] = newDistance; // @step:update-cost
                    parent[toRow][toCol] = new int[]{fromRow, fromCol};
                    updated = true;
                }
            }
            if (!updated) break; // Early termination
        }

        if (distance[end[0]][end[1]] == Integer.MAX_VALUE) {
            return new int[0][]; // @step:complete
        }

        return reconstructPath(parent, end); // @step:trace-path
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
