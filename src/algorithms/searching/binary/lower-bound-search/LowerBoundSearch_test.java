public class LowerBoundSearch_test {
    public static void main(String[] args) {
        assert LowerBoundSearch.lowerBoundSearch(new int[]{1, 3, 3, 5, 5, 5, 8, 12}, 5) == 3 : "should find first occurrence of repeated value";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 23) == 5 : "should find exact position when value exists once";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{1, 3, 5, 7, 9}, 10) == 5 : "should return array length when value larger than all";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{5, 10, 15, 20}, 3) == 0 : "should return 0 when value smaller than first";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{}, 5) == 0 : "should handle empty array";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{42}, 42) == 0 : "should find single element when present";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{42}, 100) == 1 : "should return 1 for single element with larger target";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{5, 10, 15, 20}, 1) == 0 : "should return 0 for target smaller than first";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{2, 5, 8, 12, 16, 23}, 2) == 0 : "should find first element";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{2, 5, 8, 12, 16}, 6) == 2 : "should find insertion point between elements";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{5, 5, 5, 5, 5}, 5) == 0 : "should handle all-duplicate array";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{5, 5, 5, 5, 5}, 6) == 5 : "should return array length for larger target in duplicate array";
        assert LowerBoundSearch.lowerBoundSearch(new int[]{3, 3, 3, 5, 7}, 3) == 0 : "should find first occurrence at array start";

        System.out.println("All tests passed!");
    }
}
