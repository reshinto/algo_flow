public class InterpolationSearch_test {
    public static void main(String[] args) {
        int[] standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        assert InterpolationSearch.interpolationSearch(standardArray, 23) == 5 : "should find value present";
        assert InterpolationSearch.interpolationSearch(standardArray, 50) == -1 : "should return -1 when not found";
        assert InterpolationSearch.interpolationSearch(new int[]{}, 5) == -1 : "should handle empty array";
        assert InterpolationSearch.interpolationSearch(new int[]{42}, 42) == 0 : "should find single element";
        assert InterpolationSearch.interpolationSearch(new int[]{42}, 10) == -1 : "should return -1 for single element not found";
        assert InterpolationSearch.interpolationSearch(standardArray, 2) == 0 : "should find first element";
        assert InterpolationSearch.interpolationSearch(standardArray, 91) == 9 : "should find last element";
        assert InterpolationSearch.interpolationSearch(new int[]{10, 20, 30, 40, 50}, 30) == 2 : "should find middle element";
        assert InterpolationSearch.interpolationSearch(new int[]{5, 10, 15, 20}, 1) == -1 : "should return -1 for smaller than all";
        assert InterpolationSearch.interpolationSearch(new int[]{5, 10, 15, 20}, 100) == -1 : "should return -1 for larger than all";
        assert InterpolationSearch.interpolationSearch(new int[]{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}, 70) == 6 : "should handle uniformly distributed data";
        assert InterpolationSearch.interpolationSearch(new int[]{5, 5, 5, 5, 5}, 5) == 0 : "should handle duplicate values";
        assert InterpolationSearch.interpolationSearch(new int[]{5, 5, 5, 5, 5}, 7) == -1 : "should return -1 for target not in uniform array";

        System.out.println("All tests passed!");
    }
}
