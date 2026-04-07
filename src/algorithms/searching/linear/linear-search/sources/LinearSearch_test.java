public class LinearSearch_test {
    public static void main(String[] args) {
        int[] standardArray = {4, 2, 7, 1, 9, 3, 8, 5};

        assert LinearSearch.linearSearch(standardArray, 9) == 4 : "should find value present";
        assert LinearSearch.linearSearch(standardArray, 6) == -1 : "should return -1 when not found";
        assert LinearSearch.linearSearch(new int[]{}, 5) == -1 : "should handle empty array";
        assert LinearSearch.linearSearch(new int[]{42}, 42) == 0 : "should find single element";
        assert LinearSearch.linearSearch(new int[]{42}, 10) == -1 : "should return -1 for single element not found";
        assert LinearSearch.linearSearch(standardArray, 4) == 0 : "should find first element";
        assert LinearSearch.linearSearch(standardArray, 5) == 7 : "should find last element";
        assert LinearSearch.linearSearch(new int[]{3, 1, 3, 5, 3}, 3) == 0 : "should return first occurrence for duplicates";
        assert LinearSearch.linearSearch(new int[]{-5, -3, 0, 2, 4}, -3) == 1 : "should handle negative numbers";
        assert LinearSearch.linearSearch(new int[]{9, 3, 1, 7, 2, 5}, 7) == 3 : "should work on unsorted array";

        System.out.println("All tests passed!");
    }
}
