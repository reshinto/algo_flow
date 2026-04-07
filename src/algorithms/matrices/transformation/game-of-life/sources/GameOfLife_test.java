// javac GameOfLife.java GameOfLife_test.java && java -ea GameOfLife_test

import java.util.Arrays;

public class GameOfLife_test {

    static int[][] deepCopy(int[][] board) {
        int[][] copy = new int[board.length][];
        for (int rowIdx = 0; rowIdx < board.length; rowIdx++) {
            copy[rowIdx] = board[rowIdx].clone();
        }
        return copy;
    }

    public static void main(String[] args) {
        testSimulatesStandard4x3Example();
        testAllDeadBoardStaysUnchanged();
        testAllAlive3x3Overpopulation();
        test1x1DeadStaysDead();
        test1x1LiveDiesFromUnderpopulation();
        test2x2StillLifeBlock();
        testVerticalBlinkerBecomesHorizontal();
        testReproductionLShape();
        System.out.println("All tests passed!");
    }

    static void testSimulatesStandard4x3Example() {
        int[][] board = deepCopy(new int[][]{{0, 1, 0}, {0, 0, 1}, {1, 1, 1}, {0, 0, 0}});
        int[][] result = GameOfLife.gameOfLife(board);
        assert Arrays.equals(result[0], new int[]{0, 0, 0}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{1, 0, 1}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{0, 1, 1}) : "Row 2 wrong";
        assert Arrays.equals(result[3], new int[]{0, 1, 0}) : "Row 3 wrong";
    }

    static void testAllDeadBoardStaysUnchanged() {
        int[][] board = deepCopy(new int[][]{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}});
        int[][] result = GameOfLife.gameOfLife(board);
        for (int[] row : result) {
            for (int cell : row) {
                assert cell == 0 : "All cells should be 0";
            }
        }
    }

    static void testAllAlive3x3Overpopulation() {
        int[][] board = deepCopy(new int[][]{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}});
        int[][] result = GameOfLife.gameOfLife(board);
        assert Arrays.equals(result[0], new int[]{1, 0, 1}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{0, 0, 0}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{1, 0, 1}) : "Row 2 wrong";
    }

    static void test1x1DeadStaysDead() {
        int[][] board = deepCopy(new int[][]{{0}});
        int[][] result = GameOfLife.gameOfLife(board);
        assert result[0][0] == 0;
    }

    static void test1x1LiveDiesFromUnderpopulation() {
        int[][] board = deepCopy(new int[][]{{1}});
        int[][] result = GameOfLife.gameOfLife(board);
        assert result[0][0] == 0;
    }

    static void test2x2StillLifeBlock() {
        int[][] board = deepCopy(new int[][]{{0, 0, 0, 0}, {0, 1, 1, 0}, {0, 1, 1, 0}, {0, 0, 0, 0}});
        int[][] result = GameOfLife.gameOfLife(board);
        assert Arrays.equals(result[1], new int[]{0, 1, 1, 0}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{0, 1, 1, 0}) : "Row 2 wrong";
    }

    static void testVerticalBlinkerBecomesHorizontal() {
        int[][] board = deepCopy(new int[][]{{0, 1, 0}, {0, 1, 0}, {0, 1, 0}});
        int[][] result = GameOfLife.gameOfLife(board);
        assert Arrays.equals(result[0], new int[]{0, 0, 0}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{1, 1, 1}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{0, 0, 0}) : "Row 2 wrong";
    }

    static void testReproductionLShape() {
        int[][] board = deepCopy(new int[][]{{1, 1, 0}, {1, 0, 0}, {0, 0, 0}});
        int[][] result = GameOfLife.gameOfLife(board);
        assert Arrays.equals(result[0], new int[]{1, 1, 0}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{1, 1, 0}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{0, 0, 0}) : "Row 2 wrong";
    }
}
