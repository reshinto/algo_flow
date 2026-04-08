// javac DStarLite.java DStarLite_test.java && java -ea DStarLite_test
public class DStarLite_test {

    static int[][] makeEmptyGrid(int rows, int cols) {
        return new int[rows][cols];
    }

    static void setWall(int[][] grid, int row, int col) {
        grid[row][col] = 1;
    }

    public static void main(String[] args) {
        // Test: finds path on empty grid
        {
            int[][] grid = makeEmptyGrid(5, 5);
            int[][] path = DStarLite.dStarLite(grid, new int[]{0, 0}, new int[]{4, 4});
            assert path.length > 0 : "Expected non-empty path";
            assert path[0][0] == 0 && path[0][1] == 0 : "Path should start at [0,0]";
            assert path[path.length-1][0] == 4 && path[path.length-1][1] == 4 : "Path should end at [4,4]";
        }

        // Test: returns empty path when no route
        {
            int[][] grid = makeEmptyGrid(5, 5);
            setWall(grid, 0, 1);
            setWall(grid, 1, 0);
            setWall(grid, 1, 1);
            int[][] path = DStarLite.dStarLite(grid, new int[]{0, 0}, new int[]{4, 4});
            assert path.length == 0 : "Expected empty path";
        }

        // Test: handles adjacent start and end
        {
            int[][] grid = makeEmptyGrid(3, 3);
            int[][] path = DStarLite.dStarLite(grid, new int[]{0, 0}, new int[]{0, 1});
            assert path.length > 0 : "Expected non-empty path";
            assert path[path.length-1][0] == 0 && path[path.length-1][1] == 1 : "Path should end at [0,1]";
        }

        // Test: handles start equal to end
        {
            int[][] grid = makeEmptyGrid(3, 3);
            int[][] path = DStarLite.dStarLite(grid, new int[]{1, 1}, new int[]{1, 1});
            assert path.length == 1 : "Expected path length 1";
        }

        System.out.println("All tests passed!");
    }
}
