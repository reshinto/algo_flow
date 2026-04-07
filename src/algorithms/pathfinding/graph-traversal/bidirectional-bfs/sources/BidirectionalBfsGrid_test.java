import java.util.*;

// javac BidirectionalBfsGrid.java BidirectionalBfsGrid_test.java && java -ea BidirectionalBfsGrid_test
public class BidirectionalBfsGrid_test {

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
            int[][] grid = makeEmptyGrid(5, 5);
            Map<String, Object> result = BidirectionalBfsGrid.bidirectionalBfs(grid, new int[]{0, 0}, new int[]{4, 4});
            List<int[]> path = (List<int[]>) result.get("path");
            assert path.size() > 0 : "Expected non-empty path";
            assert path.get(0)[0] == 0 && path.get(0)[1] == 0 : "Path should start at [0,0]";
            int last = path.size() - 1;
            assert path.get(last)[0] == 4 && path.get(last)[1] == 4 : "Path should end at [4,4]";
        }

        // Test: returns empty path when no route
        {
            int[][] grid = makeEmptyGrid(5, 5);
            setWall(grid, 0, 1);
            setWall(grid, 1, 0);
            setWall(grid, 1, 1);
            Map<String, Object> result = BidirectionalBfsGrid.bidirectionalBfs(grid, new int[]{0, 0}, new int[]{4, 4});
            List<int[]> path = (List<int[]>) result.get("path");
            assert path.size() == 0 : "Expected empty path";
        }

        // Test: handles start equal to end
        {
            int[][] grid = makeEmptyGrid(3, 3);
            Map<String, Object> result = BidirectionalBfsGrid.bidirectionalBfs(grid, new int[]{1, 1}, new int[]{1, 1});
            List<int[]> path = (List<int[]>) result.get("path");
            assert path.size() == 1 : "Expected path of length 1";
        }

        // Test: path is valid adjacent steps
        {
            int[][] grid = makeEmptyGrid(5, 5);
            Map<String, Object> result = BidirectionalBfsGrid.bidirectionalBfs(grid, new int[]{0, 0}, new int[]{4, 4});
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
