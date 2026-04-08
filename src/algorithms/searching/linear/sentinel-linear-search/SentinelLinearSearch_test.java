public class SentinelLinearSearch_test {
    public static void main(String[] args) {
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{4, 2, 7, 1, 9, 3, 8, 5}, 9) == 4 : "should find value present";
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{4, 2, 7, 1, 9, 3, 8, 5}, 6) == -1 : "should return -1 when not found";
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{}, 5) == -1 : "should handle empty array";
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{42}, 42) == 0 : "should find single element";
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{42}, 10) == -1 : "should return -1 for single element not found";
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{4, 2, 7, 1, 9, 3, 8, 5}, 4) == 0 : "should find first element";
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{4, 2, 7, 1, 9, 3, 8, 5}, 5) == 7 : "should find last element";
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{3, 1, 3, 5, 3}, 3) == 0 : "should return first occurrence for duplicates";
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{7, 7, 7, 7}, 7) == 0 : "should handle all-identical array found";
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{7, 7, 7, 7}, 5) == -1 : "should handle all-identical array not found";
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{-5, -3, 0, 2, 4}, -3) == 1 : "should find negative number";
        assert SentinelLinearSearch.sentinelLinearSearch(new int[]{-5, -3, 0, 2, 4}, -1) == -1 : "should return -1 for absent negative target";

        System.out.println("All tests passed!");
    }
}
