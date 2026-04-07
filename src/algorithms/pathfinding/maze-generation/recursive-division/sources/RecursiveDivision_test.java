import java.util.*;

// javac RecursiveDivision.java RecursiveDivision_test.java && java -ea RecursiveDivision_test
public class RecursiveDivision_test {

    static int[][] makeOpenGrid(int rows, int cols) {
        return new int[rows][cols]; // all zeros = passable
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
        // Test: builds walls
        {
            int[][] grid = makeOpenGrid(9, 9);
            int wallsBuilt = RecursiveDivision.recursiveDivision(grid, new int[]{1, 1}, new int[]{7, 7});
            assert wallsBuilt > 0 : "Expected walls built > 0";
        }

        // Test: path still exists after division
        {
            int[][] grid = makeOpenGrid(9, 9);
            RecursiveDivision.recursiveDivision(grid, new int[]{1, 1}, new int[]{7, 7});
            assert bfsReachable(grid, 1, 1, 7, 7) : "Start should still reach end";
        }

        // Test: walls are actually added to grid
        {
            int[][] grid = makeOpenGrid(9, 9);
            RecursiveDivision.recursiveDivision(grid, new int[]{1, 1}, new int[]{7, 7});
            int wallCount = 0;
            for (int[] row : grid)
                for (int cell : row)
                    if (cell == 1) wallCount++;
            assert wallCount > 0 : "Expected wall cells in grid";
        }

        System.out.println("All tests passed!");
    }
}
