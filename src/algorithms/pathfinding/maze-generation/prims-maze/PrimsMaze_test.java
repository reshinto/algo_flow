import java.util.*;

// javac PrimsMaze.java PrimsMaze_test.java && java -ea PrimsMaze_test
public class PrimsMaze_test {

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
                int nextRow = curr[0] + dir[0], nextCol = curr[1] + dir[1];
                if (nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols
                        && !visited[nextRow][nextCol] && grid[nextRow][nextCol] == 0) {
                    visited[nextRow][nextCol] = true;
                    queue.add(new int[]{nextRow, nextCol});
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
            int passagesCarved = PrimsMaze.primsMaze(grid, new int[]{1, 1});
            assert passagesCarved > 0 : "Expected passages carved > 0";
        }

        // Test: creates connected maze
        {
            int[][] grid = makeAllWallsGrid(9, 9);
            grid[1][1] = 0;
            grid[7][7] = 0;
            PrimsMaze.primsMaze(grid, new int[]{1, 1});
            assert bfsReachable(grid, 1, 1, 7, 7) : "Start should reach end";
        }

        // Test: does not carve border cells
        {
            int[][] grid = makeAllWallsGrid(9, 9);
            grid[1][1] = 0;
            PrimsMaze.primsMaze(grid, new int[]{1, 1});
            for (int col = 0; col < 9; col++) {
                assert grid[0][col] == 1 : "Row 0 should remain wall";
                assert grid[8][col] == 1 : "Row 8 should remain wall";
            }
        }

        // Test: start cell is carved
        {
            int[][] grid = makeAllWallsGrid(9, 9);
            grid[1][1] = 0;
            PrimsMaze.primsMaze(grid, new int[]{1, 1});
            assert grid[1][1] == 0 : "Start cell should be carved";
        }

        System.out.println("All tests passed!");
    }
}
