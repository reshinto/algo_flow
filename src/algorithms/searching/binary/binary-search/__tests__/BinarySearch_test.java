public class BinarySearch_test {
    public static void main(String[] args) {
        int[] standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        assert BinarySearch.binarySearch(standardArray, 23) == 5 : "should find value present in array";
        assert BinarySearch.binarySearch(standardArray, 50) == -1 : "should return -1 when value not found";
        assert BinarySearch.binarySearch(new int[]{}, 5) == -1 : "should handle empty array";
        assert BinarySearch.binarySearch(new int[]{42}, 42) == 0 : "should find single element when present";
        assert BinarySearch.binarySearch(new int[]{42}, 10) == -1 : "should return -1 for single element not found";
        assert BinarySearch.binarySearch(standardArray, 2) == 0 : "should find first element";
        assert BinarySearch.binarySearch(standardArray, 91) == 9 : "should find last element";
        assert BinarySearch.binarySearch(new int[]{10, 20, 30, 40, 50}, 30) == 2 : "should find middle element";
        assert BinarySearch.binarySearch(new int[]{5, 10, 15, 20}, 1) == -1 : "should return -1 for value smaller than all";
        assert BinarySearch.binarySearch(new int[]{5, 10, 15, 20}, 100) == -1 : "should return -1 for value larger than all";

        System.out.println("All tests passed!");
    }
}
