// javac IslandCount.java IslandCount_test.java && java -ea IslandCount_test

public class IslandCount_test {

    static int[][] deepCopy(int[][] grid) {
        int[][] copy = new int[grid.length][];
        for (int rowIdx = 0; rowIdx < grid.length; rowIdx++) {
            copy[rowIdx] = grid[rowIdx].clone();
        }
        return copy;
    }

    public static void main(String[] args) {
        testCounts2IslandsInStandardGrid();
        testReturns0WhenNoIslands();
        testCounts1IslandWhenEntireGridIsLand();
        testHandles1x1GridWithIsland();
        testHandles1x1GridWithNoIsland();
        testDiagonallyAdjacentCellsNotConnected();
        testLShapedIslandCountsAsOne();
        testHandlesSingleRowGrid();
        testHandlesSingleColumnGrid();
        testCounts3IslandsInDefaultInput();
        System.out.println("All tests passed!");
    }

    static void testCounts2IslandsInStandardGrid() {
        int[][] grid = {{1, 1, 0, 0}, {1, 0, 0, 1}, {0, 0, 1, 1}, {0, 0, 0, 0}};
        assert IslandCount.islandCount(deepCopy(grid)) == 2;
    }

    static void testReturns0WhenNoIslands() {
        int[][] grid = {{0, 0, 0}, {0, 0, 0}, {0, 0, 0}};
        assert IslandCount.islandCount(deepCopy(grid)) == 0;
    }

    static void testCounts1IslandWhenEntireGridIsLand() {
        int[][] grid = {{1, 1, 1}, {1, 1, 1}, {1, 1, 1}};
        assert IslandCount.islandCount(deepCopy(grid)) == 1;
    }

    static void testHandles1x1GridWithIsland() {
        assert IslandCount.islandCount(new int[][]{{1}}) == 1;
    }

    static void testHandles1x1GridWithNoIsland() {
        assert IslandCount.islandCount(new int[][]{{0}}) == 0;
    }

    static void testDiagonallyAdjacentCellsNotConnected() {
        int[][] grid = {{1, 0, 1}, {0, 1, 0}, {1, 0, 1}};
        assert IslandCount.islandCount(deepCopy(grid)) == 5;
    }

    static void testLShapedIslandCountsAsOne() {
        int[][] grid = {{1, 0}, {1, 0}, {1, 1}};
        assert IslandCount.islandCount(deepCopy(grid)) == 1;
    }

    static void testHandlesSingleRowGrid() {
        assert IslandCount.islandCount(new int[][]{{1, 0, 1, 1, 0, 1}}) == 3;
    }

    static void testHandlesSingleColumnGrid() {
        assert IslandCount.islandCount(new int[][]{{1}, {0}, {1}, {1}, {0}}) == 2;
    }

    static void testCounts3IslandsInDefaultInput() {
        int[][] grid = {
            {1, 1, 0, 0, 0},
            {1, 1, 0, 0, 0},
            {0, 0, 1, 0, 0},
            {0, 0, 0, 1, 1},
        };
        assert IslandCount.islandCount(deepCopy(grid)) == 3;
    }
}
