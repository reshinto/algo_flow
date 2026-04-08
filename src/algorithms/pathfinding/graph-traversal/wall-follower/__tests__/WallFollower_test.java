import java.util.*;

// javac WallFollower.java WallFollower_test.java && java -ea WallFollower_test
public class WallFollower_test {

    static int[][] makeEmptyGrid(int rows, int cols) {
        return new int[rows][cols];
    }

    static void setWall(int[][] grid, int row, int col) {
        grid[row][col] = 1;
    }

    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        // Test: finds path in simple corridor
        {
            int[][] grid = makeEmptyGrid(1, 5);
            Map<String, Object> result = WallFollower.wallFollower(grid, new int[]{0, 0}, new int[]{0, 4});
            List<int[]> path = (List<int[]>) result.get("path");
            assert path.size() > 0 : "Expected non-empty path";
            int[] last = path.get(path.size() - 1);
            assert last[0] == 0 && last[1] == 4 : "Path should end at [0,4]";
        }

        // Test: starts path at start position
        {
            int[][] grid = makeEmptyGrid(3, 3);
            Map<String, Object> result = WallFollower.wallFollower(grid, new int[]{0, 0}, new int[]{2, 2});
            List<int[]> path = (List<int[]>) result.get("path");
            assert path.get(0)[0] == 0 && path.get(0)[1] == 0 : "Path should start at [0,0]";
        }

        // Test: returns empty path when start isolated
        {
            int[][] grid = makeEmptyGrid(3, 3);
            setWall(grid, 0, 1);
            setWall(grid, 1, 0);
            setWall(grid, 1, 1);
            Map<String, Object> result = WallFollower.wallFollower(grid, new int[]{0, 0}, new int[]{2, 2});
            List<int[]> path = (List<int[]>) result.get("path");
            assert path.size() == 0 : "Expected empty path for isolated start";
        }

        // Test: path steps are adjacent
        {
            int[][] grid = makeEmptyGrid(1, 5);
            Map<String, Object> result = WallFollower.wallFollower(grid, new int[]{0, 0}, new int[]{0, 4});
            List<int[]> path = (List<int[]>) result.get("path");
            for (int pathIndex = 1; pathIndex < path.size(); pathIndex++) {
                int[] prev = path.get(pathIndex - 1);
                int[] curr = path.get(pathIndex);
                int diff = Math.abs(curr[0] - prev[0]) + Math.abs(curr[1] - prev[1]);
                assert diff == 1 : "Path steps must be adjacent";
            }
        }

        System.out.println("All tests passed!");
    }
}
