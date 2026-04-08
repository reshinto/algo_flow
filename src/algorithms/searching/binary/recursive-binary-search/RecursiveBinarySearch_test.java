public class RecursiveBinarySearch_test {
    public static void main(String[] args) {
        int[] standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        assert RecursiveBinarySearch.recursiveBinarySearch(standardArray, 23) == 5 : "should find value present";
        assert RecursiveBinarySearch.recursiveBinarySearch(standardArray, 50) == -1 : "should return -1 when not found";
        assert RecursiveBinarySearch.recursiveBinarySearch(new int[]{}, 5) == -1 : "should handle empty array";
        assert RecursiveBinarySearch.recursiveBinarySearch(new int[]{42}, 42) == 0 : "should find single element";
        assert RecursiveBinarySearch.recursiveBinarySearch(new int[]{42}, 10) == -1 : "should return -1 for single element not found";
        assert RecursiveBinarySearch.recursiveBinarySearch(standardArray, 2) == 0 : "should find first element";
        assert RecursiveBinarySearch.recursiveBinarySearch(standardArray, 91) == 9 : "should find last element";
        assert RecursiveBinarySearch.recursiveBinarySearch(new int[]{10, 20, 30, 40, 50}, 30) == 2 : "should find middle element";
        assert RecursiveBinarySearch.recursiveBinarySearch(new int[]{5, 10, 15, 20}, 1) == -1 : "should return -1 for smaller than all";
        assert RecursiveBinarySearch.recursiveBinarySearch(new int[]{5, 10, 15, 20}, 100) == -1 : "should return -1 for larger than all";
        assert RecursiveBinarySearch.recursiveBinarySearch(new int[]{3, 7}, 7) == 1 : "should find value in two-element array";

        int[] largeArray = new int[1000];
        for (int index = 0; index < 1000; index++) {
            largeArray[index] = index * 2;
        }
        assert RecursiveBinarySearch.recursiveBinarySearch(largeArray, 500) == 250 : "should handle large array";

        System.out.println("All tests passed!");
    }
}
