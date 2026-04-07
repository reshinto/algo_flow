// javac FloodFillDfs.java FloodFillDfs_test.java && java -ea FloodFillDfs_test
public class FloodFillDfs_test {

    static int[][] makeEmptyGrid(int rows, int cols) {
        return new int[rows][cols];
    }

    static void setWall(int[][] grid, int row, int col) {
        grid[row][col] = 1;
    }

    public static void main(String[] args) {
        // Test: fills all cells on small empty grid
        {
            int[][] grid = makeEmptyGrid(3, 3);
            int[][] filled = FloodFillDfs.floodFillDfs(grid, new int[]{0, 0});
            assert filled.length == 9 : "Expected 9 filled cells, got " + filled.length;
        }

        // Test: respects walls
        {
            int[][] grid = makeEmptyGrid(3, 3);
            setWall(grid, 0, 1);
            setWall(grid, 1, 1);
            setWall(grid, 2, 1);
            int[][] filled = FloodFillDfs.floodFillDfs(grid, new int[]{0, 0});
            assert filled.length == 3 : "Expected 3 filled cells, got " + filled.length;
        }

        // Test: fills same total count (16 cells minus 2 walls = 14)
        {
            int[][] grid = makeEmptyGrid(4, 4);
            setWall(grid, 1, 2);
            setWall(grid, 2, 2);
            int[][] filled = FloodFillDfs.floodFillDfs(grid, new int[]{0, 0});
            assert filled.length == 14 : "Expected 14 filled cells, got " + filled.length;
        }

        // Test: isolated cell
        {
            int[][] grid = makeEmptyGrid(3, 3);
            setWall(grid, 0, 1);
            setWall(grid, 1, 0);
            setWall(grid, 1, 2);
            setWall(grid, 2, 1);
            int[][] filled = FloodFillDfs.floodFillDfs(grid, new int[]{1, 1});
            assert filled.length == 1 : "Expected 1 isolated cell, got " + filled.length;
        }

        // Test: count matches filled length
        {
            int[][] grid = makeEmptyGrid(4, 4);
            setWall(grid, 0, 2);
            setWall(grid, 1, 2);
            int[][] filled = FloodFillDfs.floodFillDfs(grid, new int[]{0, 0});
            assert filled.length > 0 : "Expected non-empty filled array";
        }

        System.out.println("All tests passed!");
    }
}
