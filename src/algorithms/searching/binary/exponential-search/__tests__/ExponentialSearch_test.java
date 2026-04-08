public class ExponentialSearch_test {
    public static void main(String[] args) {
        int[] standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        assert ExponentialSearch.exponentialSearch(standardArray, 8) == 2 : "should find value present in array";
        assert ExponentialSearch.exponentialSearch(standardArray, 50) == -1 : "should return -1 when value not found";
        assert ExponentialSearch.exponentialSearch(new int[]{}, 5) == -1 : "should handle empty array";
        assert ExponentialSearch.exponentialSearch(new int[]{42}, 42) == 0 : "should find single element when present";
        assert ExponentialSearch.exponentialSearch(new int[]{42}, 10) == -1 : "should return -1 for single element not found";
        assert ExponentialSearch.exponentialSearch(standardArray, 2) == 0 : "should find first element";
        assert ExponentialSearch.exponentialSearch(standardArray, 91) == 9 : "should find last element";
        assert ExponentialSearch.exponentialSearch(new int[]{10, 20, 30, 40, 50}, 30) == 2 : "should find middle element";
        assert ExponentialSearch.exponentialSearch(new int[]{5, 10, 15, 20}, 1) == -1 : "should return -1 for value smaller than all";
        assert ExponentialSearch.exponentialSearch(new int[]{5, 10, 15, 20}, 100) == -1 : "should return -1 for value larger than all";
        assert ExponentialSearch.exponentialSearch(new int[]{3, 7}, 7) == 1 : "should find value in two-element array";

        int[] largeArray = new int[1000];
        for (int index = 0; index < 1000; index++) {
            largeArray[index] = index * 2;
        }
        assert ExponentialSearch.exponentialSearch(largeArray, 500) == 250 : "should handle large array";

        System.out.println("All tests passed!");
    }
}
