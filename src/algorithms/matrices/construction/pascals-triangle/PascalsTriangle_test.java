// javac PascalsTriangle.java PascalsTriangle_test.java && java -ea PascalsTriangle_test

import java.util.List;

public class PascalsTriangle_test {

    public static void main(String[] args) {
        testReturnsSingleRowForNumRows1();
        testReturnsCorrectTriangleForNumRows2();
        testReturnsCorrectTriangleForNumRows3();
        testReturnsCorrectTriangleForNumRows5();
        testReturnsCorrectTriangleForNumRows6();
        testInnerCellIsSumOfTwoAbove();
        testAllEdgeCellsAre1();
        testRowLengthEqualsRowIndexPlusOne();
        testReturnsEmptyArrayForNumRows0();
        System.out.println("All tests passed!");
    }

    static void testReturnsSingleRowForNumRows1() {
        List<List<Integer>> result = PascalsTriangle.pascalsTriangle(1);
        assert result.size() == 1 : "Expected 1 row";
        assert result.get(0).equals(List.of(1)) : "Expected [1]";
    }

    static void testReturnsCorrectTriangleForNumRows2() {
        List<List<Integer>> result = PascalsTriangle.pascalsTriangle(2);
        assert result.size() == 2 : "Expected 2 rows";
        assert result.get(0).equals(List.of(1)) : "Row 0 wrong";
        assert result.get(1).equals(List.of(1, 1)) : "Row 1 wrong";
    }

    static void testReturnsCorrectTriangleForNumRows3() {
        List<List<Integer>> result = PascalsTriangle.pascalsTriangle(3);
        assert result.size() == 3 : "Expected 3 rows";
        assert result.get(2).equals(List.of(1, 2, 1)) : "Row 2 wrong";
    }

    static void testReturnsCorrectTriangleForNumRows5() {
        List<List<Integer>> result = PascalsTriangle.pascalsTriangle(5);
        assert result.size() == 5 : "Expected 5 rows";
        assert result.get(3).equals(List.of(1, 3, 3, 1)) : "Row 3 wrong";
        assert result.get(4).equals(List.of(1, 4, 6, 4, 1)) : "Row 4 wrong";
    }

    static void testReturnsCorrectTriangleForNumRows6() {
        List<List<Integer>> result = PascalsTriangle.pascalsTriangle(6);
        assert result.size() == 6 : "Expected 6 rows";
        assert result.get(5).equals(List.of(1, 5, 10, 10, 5, 1)) : "Row 5 wrong";
    }

    static void testInnerCellIsSumOfTwoAbove() {
        List<List<Integer>> result = PascalsTriangle.pascalsTriangle(5);
        for (int rowIdx = 2; rowIdx < result.size(); rowIdx++) {
            List<Integer> currentRow = result.get(rowIdx);
            List<Integer> aboveRow = result.get(rowIdx - 1);
            for (int colIdx = 1; colIdx < currentRow.size() - 1; colIdx++) {
                int expected = aboveRow.get(colIdx - 1) + aboveRow.get(colIdx);
                assert currentRow.get(colIdx) == expected : "Inner cell mismatch at row " + rowIdx + " col " + colIdx;
            }
        }
    }

    static void testAllEdgeCellsAre1() {
        List<List<Integer>> result = PascalsTriangle.pascalsTriangle(6);
        for (List<Integer> row : result) {
            assert row.get(0) == 1 : "First element not 1";
            assert row.get(row.size() - 1) == 1 : "Last element not 1";
        }
    }

    static void testRowLengthEqualsRowIndexPlusOne() {
        List<List<Integer>> result = PascalsTriangle.pascalsTriangle(5);
        for (int rowIdx = 0; rowIdx < result.size(); rowIdx++) {
            assert result.get(rowIdx).size() == rowIdx + 1 : "Row " + rowIdx + " has wrong length";
        }
    }

    static void testReturnsEmptyArrayForNumRows0() {
        List<List<Integer>> result = PascalsTriangle.pascalsTriangle(0);
        assert result.isEmpty() : "Expected empty list";
    }
}
