import java.util.*;

public class Dijkstra {
    public static int[][] dijkstra(int[][] grid, int[] start, int[] end) {
        int rowCount = grid.length;
        int colCount = grid[0].length;
        int[][] distance = new int[rowCount][colCount];
        for (int[] row : distance) Arrays.fill(row, Integer.MAX_VALUE);
        distance[start[0]][start[1]] = 0;
        int[][][] parent = new int[rowCount][colCount][];
        boolean[][] visitedSet = new boolean[rowCount][colCount];

        PriorityQueue<int[]> openSet = new PriorityQueue<>(
            Comparator.comparingInt(nodeA -> nodeA[2])
        );
        openSet.add(new int[]{start[0], start[1], 0});

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!openSet.isEmpty()) {
            int[] current = openSet.poll();
            int currentRow = current[0];
            int currentCol = current[1];
            if (visitedSet[currentRow][currentCol]) continue;
            visitedSet[currentRow][currentCol] = true;

            if (currentRow == end[0] && currentCol == end[1]) {
                return reconstructPath(parent, end);
            }

            for (int[] direction : directions) {
                int neighborRow = currentRow + direction[0];
                int neighborCol = currentCol + direction[1];
                if (neighborRow < 0 || neighborRow >= rowCount) continue;
                if (neighborCol < 0 || neighborCol >= colCount) continue;
                if (grid[neighborRow][neighborCol] == 1) continue;
                if (visitedSet[neighborRow][neighborCol]) continue;

                int newDistance = distance[currentRow][currentCol] + 1;
                if (newDistance < distance[neighborRow][neighborCol]) {
                    distance[neighborRow][neighborCol] = newDistance;
                    parent[neighborRow][neighborCol] = new int[]{currentRow, currentCol};
                    openSet.add(new int[]{neighborRow, neighborCol, newDistance});
                }
            }
        }

        return new int[0][];
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
