// javac SpiralMatrixII.java SpiralMatrixII_test.java && java -ea SpiralMatrixII_test

import java.util.Arrays;
import java.util.HashSet;

public class SpiralMatrixII_test {

    public static void main(String[] args) {
        testGenerates1x1Matrix();
        testGenerates2x2Matrix();
        testGenerates3x3Matrix();
        testGenerates4x4Matrix();
        testGenerates5x5Matrix();
        testPlaces1InTopLeftCorner();
        testPlacesNSquaredInCenterForOddN();
        testContainsAllValues1ToNSquaredForN4();
        testContainsAllValues1ToNSquaredForN5();
        testProducesSquareMatrixWithCorrectDimensions();
        System.out.println("All tests passed!");
    }

    static void testGenerates1x1Matrix() {
        int[][] result = SpiralMatrixII.spiralMatrixII(1);
        assert result[0][0] == 1 : "Expected 1 at [0][0]";
    }

    static void testGenerates2x2Matrix() {
        int[][] result = SpiralMatrixII.spiralMatrixII(2);
        assert Arrays.equals(result[0], new int[]{1, 2}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{4, 3}) : "Row 1 wrong";
    }

    static void testGenerates3x3Matrix() {
        int[][] result = SpiralMatrixII.spiralMatrixII(3);
        assert Arrays.equals(result[0], new int[]{1, 2, 3}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{8, 9, 4}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{7, 6, 5}) : "Row 2 wrong";
    }

    static void testGenerates4x4Matrix() {
        int[][] result = SpiralMatrixII.spiralMatrixII(4);
        assert Arrays.equals(result[0], new int[]{1, 2, 3, 4}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{12, 13, 14, 5}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{11, 16, 15, 6}) : "Row 2 wrong";
        assert Arrays.equals(result[3], new int[]{10, 9, 8, 7}) : "Row 3 wrong";
    }

    static void testGenerates5x5Matrix() {
        int[][] result = SpiralMatrixII.spiralMatrixII(5);
        assert Arrays.equals(result[0], new int[]{1, 2, 3, 4, 5}) : "Row 0 wrong";
        assert Arrays.equals(result[2], new int[]{15, 24, 25, 20, 7}) : "Row 2 wrong";
        assert Arrays.equals(result[4], new int[]{13, 12, 11, 10, 9}) : "Row 4 wrong";
    }

    static void testPlaces1InTopLeftCorner() {
        for (int size : new int[]{2, 3, 4, 5}) {
            int[][] result = SpiralMatrixII.spiralMatrixII(size);
            assert result[0][0] == 1 : "Top-left is not 1 for size " + size;
        }
    }

    static void testPlacesNSquaredInCenterForOddN() {
        int[][] result = SpiralMatrixII.spiralMatrixII(3);
        int center = 3 / 2;
        assert result[center][center] == 9 : "Center is not 9";
    }

    static void testContainsAllValues1ToNSquaredForN4() {
        int[][] result = SpiralMatrixII.spiralMatrixII(4);
        HashSet<Integer> seen = new HashSet<>();
        int total = 0;
        for (int[] row : result) {
            for (int value : row) {
                seen.add(value);
                total++;
            }
        }
        assert total == 16 : "Expected 16 elements";
        assert seen.size() == 16 : "Expected 16 unique elements";
    }

    static void testContainsAllValues1ToNSquaredForN5() {
        int[][] result = SpiralMatrixII.spiralMatrixII(5);
        HashSet<Integer> seen = new HashSet<>();
        int total = 0;
        for (int[] row : result) {
            for (int value : row) {
                seen.add(value);
                total++;
            }
        }
        assert total == 25 : "Expected 25 elements";
        assert seen.size() == 25 : "Expected 25 unique elements";
    }

    static void testProducesSquareMatrixWithCorrectDimensions() {
        int[][] result = SpiralMatrixII.spiralMatrixII(4);
        assert result.length == 4 : "Expected 4 rows";
        for (int[] row : result) {
            assert row.length == 4 : "Expected 4 columns per row";
        }
    }
}
