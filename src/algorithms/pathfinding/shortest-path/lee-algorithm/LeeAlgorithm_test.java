// javac LeeAlgorithm.java LeeAlgorithm_test.java && java -ea LeeAlgorithm_test
public class LeeAlgorithm_test {

    static int[][] makeGrid(int rows, int cols) {
        return new int[rows][cols]; // all zeros = passable
    }

    public static void main(String[] args) {
        // Test: finds path
        {
            int[][] grid = makeGrid(5, 5);
            int[][] path = LeeAlgorithm.leeAlgorithm(grid, new int[]{0, 0}, new int[]{4, 4});
            assert path.length > 0 : "Expected path to be found";
        }

        // Test: shortest path length
        {
            int[][] grid = makeGrid(5, 5);
            int[][] path = LeeAlgorithm.leeAlgorithm(grid, new int[]{0, 0}, new int[]{4, 4});
            assert path.length == 9 : "Expected shortest path length of 9";
        }

        // Test: path empty when blocked
        {
            int[][] grid = makeGrid(3, 3);
            for (int row = 0; row < 3; row++) grid[row][1] = 1;
            int[][] path = LeeAlgorithm.leeAlgorithm(grid, new int[]{0, 0}, new int[]{2, 2});
            assert path.length == 0 : "Expected empty path when blocked";
        }

        // Test: navigates around wall
        {
            int[][] grid = makeGrid(5, 5);
            for (int row = 0; row < 4; row++) grid[row][2] = 1;
            int[][] path = LeeAlgorithm.leeAlgorithm(grid, new int[]{0, 0}, new int[]{4, 4});
            assert path.length > 0 : "Expected path around wall";
        }

        // Test: adjacent cells
        {
            int[][] grid = makeGrid(3, 3);
            int[][] path = LeeAlgorithm.leeAlgorithm(grid, new int[]{0, 0}, new int[]{0, 1});
            assert path.length == 2 : "Expected path of length 2 for adjacent cells";
        }

        System.out.println("All tests passed!");
    }
}
