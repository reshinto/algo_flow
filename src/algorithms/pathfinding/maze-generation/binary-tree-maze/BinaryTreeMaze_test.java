import java.util.*;

// javac BinaryTreeMaze.java BinaryTreeMaze_test.java && java -ea BinaryTreeMaze_test
public class BinaryTreeMaze_test {

    static int[][] makeAllWallsGrid(int rows, int cols) {
        int[][] grid = new int[rows][cols];
        for (int[] row : grid) Arrays.fill(row, 1);
        return grid;
    }

    public static void main(String[] args) {
        // Test: carves passages
        {
            int[][] grid = makeAllWallsGrid(9, 9);
            grid[1][1] = 0;
            int passagesCarved = BinaryTreeMaze.binaryTreeMaze(grid);
            assert passagesCarved > 0 : "Expected passages carved > 0";
        }

        // Test: carves all odd-indexed passage cells
        {
            int[][] grid = makeAllWallsGrid(9, 9);
            grid[1][1] = 0;
            BinaryTreeMaze.binaryTreeMaze(grid);
            for (int row = 1; row < 8; row += 2) {
                for (int col = 1; col < 8; col += 2) {
                    assert grid[row][col] == 0 : "Passage cell [" + row + "," + col + "] should not be wall";
                }
            }
        }

        // Test: does not carve border cells
        {
            int[][] grid = makeAllWallsGrid(9, 9);
            BinaryTreeMaze.binaryTreeMaze(grid);
            for (int col = 0; col < 9; col++) {
                assert grid[0][col] == 1 : "Row 0 should remain wall";
                assert grid[8][col] == 1 : "Row 8 should remain wall";
            }
        }

        // Test: passages carved > 16
        {
            int[][] grid = makeAllWallsGrid(9, 9);
            grid[1][1] = 0;
            int passagesCarved = BinaryTreeMaze.binaryTreeMaze(grid);
            assert passagesCarved > 16 : "Expected > 16 passages carved, got " + passagesCarved;
        }

        System.out.println("All tests passed!");
    }
}
