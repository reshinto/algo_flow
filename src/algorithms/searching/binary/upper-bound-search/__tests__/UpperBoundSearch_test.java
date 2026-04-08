public class UpperBoundSearch_test {
    public static void main(String[] args) {
        assert UpperBoundSearch.upperBoundSearch(new int[]{1, 3, 3, 5, 5, 5, 8, 12}, 5) == 6 : "should return index of first element strictly greater";
        assert UpperBoundSearch.upperBoundSearch(new int[]{2, 4, 6, 8}, 0) == 0 : "should return 0 when target smaller than all";
        assert UpperBoundSearch.upperBoundSearch(new int[]{1, 2, 3, 4}, 4) == 4 : "should return array length when target equals last";
        assert UpperBoundSearch.upperBoundSearch(new int[]{1, 2, 3, 4}, 99) == 4 : "should return array length when target exceeds all";
        assert UpperBoundSearch.upperBoundSearch(new int[]{}, 5) == 0 : "should handle empty array";
        assert UpperBoundSearch.upperBoundSearch(new int[]{10}, 5) == 0 : "should handle single element with smaller target";
        assert UpperBoundSearch.upperBoundSearch(new int[]{10}, 10) == 1 : "should handle single element with equal target";
        assert UpperBoundSearch.upperBoundSearch(new int[]{10}, 20) == 1 : "should handle single element with larger target";
        assert UpperBoundSearch.upperBoundSearch(new int[]{5, 5, 5, 5, 5}, 5) == 5 : "should handle all-duplicate array";
        assert UpperBoundSearch.upperBoundSearch(new int[]{1, 3, 5, 7, 9}, 1) == 1 : "should find upper bound for first element";
        assert UpperBoundSearch.upperBoundSearch(new int[]{1, 3, 5, 7, 9}, 9) == 5 : "should find upper bound for last element";
        assert UpperBoundSearch.upperBoundSearch(new int[]{1, 3, 3, 3, 7}, 3) == 4 : "should find upper bound within range of duplicates";

        System.out.println("All tests passed!");
    }
}
