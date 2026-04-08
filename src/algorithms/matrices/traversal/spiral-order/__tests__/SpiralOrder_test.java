// javac SpiralOrder.java SpiralOrder_test.java && java -ea SpiralOrder_test

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

public class SpiralOrder_test {

    public static void main(String[] args) {
        testTraverses4x4MatrixInSpiralOrder();
        testTraverses3x3MatrixInSpiralOrder();
        testHandlesSingleRow();
        testHandlesSingleColumn();
        testHandles1x1Matrix();
        testHandles2x2Matrix();
        testHandles2x4NonSquare();
        testHandles3x2NonSquare();
        testReturnsEmptyForEmptyMatrix();
        testCollectsAllElementsExactlyOnce();
        System.out.println("All tests passed!");
    }

    static void testTraverses4x4MatrixInSpiralOrder() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        List<Integer> result = SpiralOrder.spiralOrder(matrix);
        assert result.equals(Arrays.asList(1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10)) : "Wrong: " + result;
    }

    static void testTraverses3x3MatrixInSpiralOrder() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        List<Integer> result = SpiralOrder.spiralOrder(matrix);
        assert result.equals(Arrays.asList(1, 2, 3, 6, 9, 8, 7, 4, 5)) : "Wrong: " + result;
    }

    static void testHandlesSingleRow() {
        int[][] matrix = {{1, 2, 3, 4}};
        List<Integer> result = SpiralOrder.spiralOrder(matrix);
        assert result.equals(Arrays.asList(1, 2, 3, 4)) : "Wrong: " + result;
    }

    static void testHandlesSingleColumn() {
        int[][] matrix = {{1}, {2}, {3}, {4}};
        List<Integer> result = SpiralOrder.spiralOrder(matrix);
        assert result.equals(Arrays.asList(1, 2, 3, 4)) : "Wrong: " + result;
    }

    static void testHandles1x1Matrix() {
        int[][] matrix = {{42}};
        List<Integer> result = SpiralOrder.spiralOrder(matrix);
        assert result.equals(Arrays.asList(42)) : "Wrong: " + result;
    }

    static void testHandles2x2Matrix() {
        int[][] matrix = {{1, 2}, {3, 4}};
        List<Integer> result = SpiralOrder.spiralOrder(matrix);
        assert result.equals(Arrays.asList(1, 2, 4, 3)) : "Wrong: " + result;
    }

    static void testHandles2x4NonSquare() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}};
        List<Integer> result = SpiralOrder.spiralOrder(matrix);
        assert result.equals(Arrays.asList(1, 2, 3, 4, 8, 7, 6, 5)) : "Wrong: " + result;
    }

    static void testHandles3x2NonSquare() {
        int[][] matrix = {{1, 2}, {3, 4}, {5, 6}};
        List<Integer> result = SpiralOrder.spiralOrder(matrix);
        assert result.equals(Arrays.asList(1, 2, 4, 6, 5, 3)) : "Wrong: " + result;
    }

    static void testReturnsEmptyForEmptyMatrix() {
        int[][] matrix = {};
        List<Integer> result = SpiralOrder.spiralOrder(matrix);
        assert result.isEmpty() : "Expected empty list";
    }

    static void testCollectsAllElementsExactlyOnce() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        List<Integer> result = SpiralOrder.spiralOrder(matrix);
        assert result.size() == 9 : "Expected 9 elements";
        assert new HashSet<>(result).size() == 9 : "Expected 9 unique elements";
    }
}
