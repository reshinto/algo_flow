import java.util.*;

// javac IterativeDeepeningDfs.java IterativeDeepeningDfs_test.java && java -ea IterativeDeepeningDfs_test
public class IterativeDeepeningDfs_test {

    static int[][] makeEmptyGrid(int rows, int cols) {
        return new int[rows][cols];
    }

    static void setWall(int[][] grid, int row, int col) {
        grid[row][col] = 1;
    }

    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        // Test: finds path on empty grid
        {
            int[][] grid = makeEmptyGrid(4, 4);
            Map<String, Object> result = IterativeDeepeningDfs.iterativeDeepeningDfs(grid, new int[]{0, 0}, new int[]{3, 3});
            List<int[]> path = (List<int[]>) result.get("path");
            assert path.size() > 0 : "Expected non-empty path";
            assert path.get(0)[0] == 0 && path.get(0)[1] == 0 : "Path should start at [0,0]";
            assert path.get(path.size()-1)[0] == 3 && path.get(path.size()-1)[1] == 3 : "Path should end at [3,3]";
        }

        // Test: finds shortest path in linear grid
        {
            int[][] grid = makeEmptyGrid(1, 5);
            Map<String, Object> result = IterativeDeepeningDfs.iterativeDeepeningDfs(grid, new int[]{0, 0}, new int[]{0, 4});
            List<int[]> path = (List<int[]>) result.get("path");
            assert path.size() == 5 : "Expected path length 5, got " + path.size();
        }

        // Test: returns empty path when no route
        {
            int[][] grid = makeEmptyGrid(3, 3);
            setWall(grid, 0, 1);
            setWall(grid, 1, 0);
            setWall(grid, 1, 1);
            Map<String, Object> result = IterativeDeepeningDfs.iterativeDeepeningDfs(grid, new int[]{0, 0}, new int[]{2, 2});
            List<int[]> path = (List<int[]>) result.get("path");
            assert path.size() == 0 : "Expected empty path";
        }

        // Test: handles adjacent start and end
        {
            int[][] grid = makeEmptyGrid(3, 3);
            Map<String, Object> result = IterativeDeepeningDfs.iterativeDeepeningDfs(grid, new int[]{0, 0}, new int[]{0, 1});
            List<int[]> path = (List<int[]>) result.get("path");
            assert path.size() == 2 : "Expected path length 2, got " + path.size();
        }

        // Test: depth reached
        {
            int[][] grid = makeEmptyGrid(1, 4);
            Map<String, Object> result = IterativeDeepeningDfs.iterativeDeepeningDfs(grid, new int[]{0, 0}, new int[]{0, 3});
            int depthReached = (Integer) result.get("depthReached");
            assert depthReached == 3 : "Expected depthReached 3, got " + depthReached;
        }

        System.out.println("All tests passed!");
    }
}
