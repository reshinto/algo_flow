import java.util.*;

// Lee Algorithm — BFS wavefront shortest path with distance numbering
public class LeeAlgorithm {
    public static int[][] leeAlgorithm(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length; // @step:initialize
        int colCount = grid[0].length; // @step:initialize
        // Wave number map: each cell gets the wavefront distance from start
        int[][] waveMap = new int[rowCount][colCount]; // @step:initialize
        for (int[] row : waveMap) Arrays.fill(row, -1); // @step:initialize
        waveMap[start[0]][start[1]] = 0; // @step:initialize
        int[][][] parent = new int[rowCount][colCount][]; // @step:initialize

        // Phase 1: BFS wavefront expansion
        Queue<int[]> queue = new LinkedList<>(); // @step:initialize,open-node
        queue.add(new int[]{start[0], start[1]}); // @step:open-node
        boolean found = false;

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!queue.isEmpty()) {
            int[] current = queue.poll(); // @step:close-node
            int currentRow = current[0]; // @step:close-node
            int currentCol = current[1]; // @step:close-node
            int currentWave = waveMap[currentRow][currentCol]; // @step:close-node

            // Check if we reached the end
            if (currentRow == end[0] && currentCol == end[1]) { // @step:update-cost
                found = true;
                break;
            }

            // Expand wavefront to 4-directional neighbors
            for (int[] direction : directions) {
                int neighborRow = currentRow + direction[0];
                int neighborCol = currentCol + direction[1];
                if (neighborRow < 0 || neighborRow >= rowCount) continue;
                if (neighborCol < 0 || neighborCol >= colCount) continue;
                if (grid[neighborRow][neighborCol] == 1) continue;
                if (waveMap[neighborRow][neighborCol] != -1) continue;
                // Stamp the neighbor with the next wave number
                waveMap[neighborRow][neighborCol] = currentWave + 1; // @step:update-cost
                parent[neighborRow][neighborCol] = new int[]{currentRow, currentCol};
                queue.add(new int[]{neighborRow, neighborCol}); // @step:open-node
            }
        }

        if (!found) {
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
