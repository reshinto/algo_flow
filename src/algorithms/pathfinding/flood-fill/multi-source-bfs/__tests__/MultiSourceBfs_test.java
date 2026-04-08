// javac MultiSourceBfs.java MultiSourceBfs_test.java && java -ea MultiSourceBfs_test
public class MultiSourceBfs_test {

    static int[][] makeEmptyGrid(int rows, int cols) {
        return new int[rows][cols]; // 0 = empty, 1 = wall
    }

    public static void main(String[] args) {
        // Test: single cell distance is 1
        {
            int[][] grid = makeEmptyGrid(1, 1);
            int[][] distances = MultiSourceBfs.multiSourceBfs(grid);
            assert distances[0][0] == 1 : "Expected distance 1 for single cell, got " + distances[0][0];
        }

        // Test: single row all distance 1
        {
            int[][] grid = makeEmptyGrid(1, 5);
            int[][] distances = MultiSourceBfs.multiSourceBfs(grid);
            for (int col = 0; col < 5; col++) {
                assert distances[0][col] == 1 : "Expected distance 1, got " + distances[0][col];
            }
        }

        // Test: center of 3x3 has distance 2
        {
            int[][] grid = makeEmptyGrid(3, 3);
            int[][] distances = MultiSourceBfs.multiSourceBfs(grid);
            assert distances[1][1] == 2 : "Expected distance 2 at center, got " + distances[1][1];
        }

        // Test: walls have distance -1
        {
            int[][] grid = makeEmptyGrid(3, 3);
            grid[1][1] = 1; // wall
            int[][] distances = MultiSourceBfs.multiSourceBfs(grid);
            assert distances[1][1] == -1 : "Expected -1 for wall cell, got " + distances[1][1];
        }

        // Test: center of 5x5 has max distance 3
        {
            int[][] grid = makeEmptyGrid(5, 5);
            int[][] distances = MultiSourceBfs.multiSourceBfs(grid);
            assert distances[2][2] == 3 : "Expected distance 3 at 5x5 center, got " + distances[2][2];
        }

        System.out.println("All tests passed!");
    }
}
