import java.util.*;

// javac BfsExploration.java BfsExploration_test.java && java -ea BfsExploration_test
public class BfsExploration_test {

    static int[][] makeEmptyGrid(int rows, int cols) {
        return new int[rows][cols];
    }

    static void setWall(int[][] grid, int row, int col) {
        grid[row][col] = 1;
    }

    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        // Test: visits all cells in open grid
        {
            int[][] grid = makeEmptyGrid(3, 3);
            Map<String, Object> result = BfsExploration.bfsExploration(grid, new int[]{0, 0});
            List<?> visited = (List<?>) result.get("visited");
            assert visited.size() == 9 : "Expected 9 visited cells, got " + visited.size();
        }

        // Test: starts with start cell
        {
            int[][] grid = makeEmptyGrid(3, 3);
            Map<String, Object> result = BfsExploration.bfsExploration(grid, new int[]{1, 1});
            List<int[]> visited = (List<int[]>) result.get("visited");
            assert visited.get(0)[0] == 1 && visited.get(0)[1] == 1
                : "Expected first visited to be [1,1]";
        }

        // Test: does not visit wall cells
        {
            int[][] grid = makeEmptyGrid(3, 3);
            setWall(grid, 0, 1);
            setWall(grid, 1, 0);
            setWall(grid, 1, 1);
            Map<String, Object> result = BfsExploration.bfsExploration(grid, new int[]{0, 0});
            List<?> visited = (List<?>) result.get("visited");
            assert visited.size() == 1 : "Expected 1 visited cell, got " + visited.size();
        }

        // Test: visits only reachable cells
        {
            int[][] grid = makeEmptyGrid(4, 4);
            for (int wallRow = 0; wallRow < 4; wallRow++) setWall(grid, wallRow, 2);
            Map<String, Object> result = BfsExploration.bfsExploration(grid, new int[]{0, 0});
            List<?> visited = (List<?>) result.get("visited");
            assert visited.size() == 8 : "Expected 8 visited cells, got " + visited.size();
        }

        // Test: handles 1x1 grid
        {
            int[][] grid = makeEmptyGrid(1, 1);
            Map<String, Object> result = BfsExploration.bfsExploration(grid, new int[]{0, 0});
            List<?> visited = (List<?>) result.get("visited");
            assert visited.size() == 1 : "Expected 1 visited cell";
        }

        System.out.println("All tests passed!");
    }
}
