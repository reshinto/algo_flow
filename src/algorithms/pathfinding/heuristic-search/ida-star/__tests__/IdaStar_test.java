// javac IdaStar.java IdaStar_test.java && java -ea IdaStar_test
public class IdaStar_test {

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
            int[][] path = IdaStar.idaStar(grid, new int[]{0, 0}, new int[]{4, 4});
            assert path.length > 0 : "Expected non-empty path";
            assert path[0][0] == 0 && path[0][1] == 0 : "Path should start at [0,0]";
            assert path[path.length-1][0] == 4 && path[path.length-1][1] == 4 : "Path should end at [4,4]";
        }

        // Test: finds optimal path length
        {
            int[][] grid = makeEmptyGrid(5, 5);
            int[][] path = IdaStar.idaStar(grid, new int[]{0, 0}, new int[]{4, 4});
            assert path.length == 9 : "Expected path length 9, got " + path.length;
        }

        // Test: returns empty path when no route
        {
            int[][] grid = makeEmptyGrid(5, 5);
            setWall(grid, 0, 1);
            setWall(grid, 1, 0);
            setWall(grid, 1, 1);
            int[][] path = IdaStar.idaStar(grid, new int[]{0, 0}, new int[]{4, 4});
            assert path.length == 0 : "Expected empty path";
        }

        // Test: handles adjacent start and end
        {
            int[][] grid = makeEmptyGrid(3, 3);
            int[][] path = IdaStar.idaStar(grid, new int[]{0, 0}, new int[]{0, 1});
            assert path.length == 2 : "Expected path length 2, got " + path.length;
        }

        // Test: handles start equal to end
        {
            int[][] grid = makeEmptyGrid(3, 3);
            int[][] path = IdaStar.idaStar(grid, new int[]{1, 1}, new int[]{1, 1});
            assert path.length == 1 : "Expected path length 1";
        }

        System.out.println("All tests passed!");
    }
}
