import java.util.*;

// javac EllersMaze.java EllersMaze_test.java && java -ea EllersMaze_test
public class EllersMaze_test {

    static int[][] makeAllWallsGrid(int rows, int cols) {
        int[][] grid = new int[rows][cols];
        for (int[] row : grid) Arrays.fill(row, 1);
        return grid;
    }

    static boolean bfsReachable(int[][] grid, int startRow, int startCol, int endRow, int endCol) {
        int rows = grid.length, cols = grid[0].length;
        boolean[][] visited = new boolean[rows][cols];
        Queue<int[]> queue = new LinkedList<>();
        queue.add(new int[]{startRow, startCol});
        visited[startRow][startCol] = true;
        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            if (curr[0] == endRow && curr[1] == endCol) return true;
            for (int[] dir : dirs) {
                int nr = curr[0] + dir[0], nc = curr[1] + dir[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] == 0) {
                    visited[nr][nc] = true;
                    queue.add(new int[]{nr, nc});
                }
            }
        }
        return false;
    }

    public static void main(String[] args) {
        // Test: carves passages
        {
            int[][] grid = makeAllWallsGrid(9, 9);
            grid[1][1] = 0;
            int passagesCarved = EllersMaze.ellersMaze(grid);
            assert passagesCarved > 0 : "Expected passages carved > 0";
        }

        // Test: creates connected maze
        {
            int[][] grid = makeAllWallsGrid(9, 9);
            grid[1][1] = 0;
            grid[7][7] = 0;
            EllersMaze.ellersMaze(grid);
            assert bfsReachable(grid, 1, 1, 7, 7) : "Start should reach end";
        }

        // Test: does not carve border cells
        {
            int[][] grid = makeAllWallsGrid(9, 9);
            EllersMaze.ellersMaze(grid);
            for (int col = 0; col < 9; col++) {
                assert grid[0][col] == 1 : "Row 0 should remain wall";
                assert grid[8][col] == 1 : "Row 8 should remain wall";
            }
        }

        System.out.println("All tests passed!");
    }
}
