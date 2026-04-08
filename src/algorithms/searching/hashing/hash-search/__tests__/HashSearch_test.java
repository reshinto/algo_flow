public class HashSearch_test {
    public static void main(String[] args) {
        int[] standardArray = {4, 2, 7, 1, 9, 3, 8, 5};

        assert HashSearch.hashSearch(standardArray, 9) == 4 : "should find value present";
        assert HashSearch.hashSearch(standardArray, 6) == -1 : "should return -1 when not found";
        assert HashSearch.hashSearch(new int[]{}, 5) == -1 : "should handle empty array";
        assert HashSearch.hashSearch(new int[]{42}, 42) == 0 : "should find single element";
        assert HashSearch.hashSearch(new int[]{42}, 10) == -1 : "should return -1 for single element not found";
        assert HashSearch.hashSearch(standardArray, 4) == 0 : "should find first element";
        assert HashSearch.hashSearch(standardArray, 5) == 7 : "should find last element";
        assert HashSearch.hashSearch(new int[]{10, 20, 30, 40, 50}, 30) == 2 : "should find middle element";
        assert HashSearch.hashSearch(new int[]{5, 10, 15, 20}, 1) == -1 : "should return -1 for value not in array";
        assert HashSearch.hashSearch(new int[]{-10, -5, 0, 3, 7}, -5) == 1 : "should handle negative numbers";
        assert HashSearch.hashSearch(new int[]{9, 3, 1, 7, 2, 5}, 7) == 3 : "should work on unsorted array";

        System.out.println("All tests passed!");
    }
}
