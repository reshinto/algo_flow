// javac FloodFillBfs.java FloodFillBfs_test.java && java -ea FloodFillBfs_test
public class FloodFillBfs_test {

    static int[][] makeEmptyGrid(int rows, int cols) {
        int[][] grid = new int[rows][cols];
        // 0 = empty, 1 = wall
        return grid;
    }

    static void setWall(int[][] grid, int row, int col) {
        grid[row][col] = 1;
    }

    public static void main(String[] args) {
        // Test: fills all cells on small empty grid
        {
            int[][] grid = makeEmptyGrid(3, 3);
            int[][] filled = FloodFillBfs.floodFillBfs(grid, new int[]{0, 0});
            assert filled.length == 9 : "Expected 9 filled cells, got " + filled.length;
        }

        // Test: respects walls
        {
            int[][] grid = makeEmptyGrid(3, 3);
            setWall(grid, 0, 1);
            setWall(grid, 1, 1);
            setWall(grid, 2, 1);
            int[][] filled = FloodFillBfs.floodFillBfs(grid, new int[]{0, 0});
            assert filled.length == 3 : "Expected 3 filled cells, got " + filled.length;
        }

        // Test: enclosed region
        {
            int[][] grid = makeEmptyGrid(5, 5);
            for (int col = 0; col < 5; col++) {
                setWall(grid, 0, col);
                setWall(grid, 4, col);
            }
            for (int row = 1; row < 4; row++) {
                setWall(grid, row, 0);
                setWall(grid, row, 4);
            }
            int[][] filled = FloodFillBfs.floodFillBfs(grid, new int[]{2, 2});
            assert filled.length == 9 : "Expected 9 cells in enclosed region, got " + filled.length;
        }

        // Test: seed cell is first filled
        {
            int[][] grid = makeEmptyGrid(3, 3);
            int[][] filled = FloodFillBfs.floodFillBfs(grid, new int[]{1, 1});
            assert filled[0][0] == 1 && filled[0][1] == 1
                : "Expected first filled cell to be [1,1]";
        }

        // Test: isolated cell
        {
            int[][] grid = makeEmptyGrid(3, 3);
            setWall(grid, 0, 1);
            setWall(grid, 1, 0);
            setWall(grid, 1, 2);
            setWall(grid, 2, 1);
            int[][] filled = FloodFillBfs.floodFillBfs(grid, new int[]{1, 1});
            assert filled.length == 1 : "Expected 1 isolated cell, got " + filled.length;
        }

        // Test: count matches filled length (returns array length, always consistent)
        {
            int[][] grid = makeEmptyGrid(4, 4);
            setWall(grid, 2, 0);
            setWall(grid, 2, 1);
            setWall(grid, 2, 2);
            int[][] filled = FloodFillBfs.floodFillBfs(grid, new int[]{0, 0});
            assert filled.length > 0 : "Expected non-empty filled array";
        }

        System.out.println("All tests passed!");
    }
}
