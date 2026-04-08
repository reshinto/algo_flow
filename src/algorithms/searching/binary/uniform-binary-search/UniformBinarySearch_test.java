public class UniformBinarySearch_test {
    public static void main(String[] args) {
        int[] standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

        assert UniformBinarySearch.uniformBinarySearch(standardArray, 23) == 5 : "should find value present";
        assert UniformBinarySearch.uniformBinarySearch(standardArray, 50) == -1 : "should return -1 when not found";
        assert UniformBinarySearch.uniformBinarySearch(new int[]{}, 5) == -1 : "should handle empty array";
        assert UniformBinarySearch.uniformBinarySearch(new int[]{42}, 42) == 0 : "should find single element";
        assert UniformBinarySearch.uniformBinarySearch(new int[]{42}, 10) == -1 : "should return -1 for single element not found";
        assert UniformBinarySearch.uniformBinarySearch(standardArray, 2) == 0 : "should find first element";
        assert UniformBinarySearch.uniformBinarySearch(standardArray, 91) == 9 : "should find last element";
        assert UniformBinarySearch.uniformBinarySearch(new int[]{10, 20, 30, 40, 50}, 30) == 2 : "should find middle element";
        assert UniformBinarySearch.uniformBinarySearch(new int[]{5, 10, 15, 20}, 1) == -1 : "should return -1 for smaller than all";
        assert UniformBinarySearch.uniformBinarySearch(new int[]{5, 10, 15, 20}, 100) == -1 : "should return -1 for larger than all";
        assert UniformBinarySearch.uniformBinarySearch(new int[]{3, 7}, 7) == 1 : "should handle two-element array";
        assert UniformBinarySearch.uniformBinarySearch(new int[]{1, 3, 5, 7, 9, 11, 13, 15}, 9) == 4 : "should handle power-of-two length array";
        assert UniformBinarySearch.uniformBinarySearch(standardArray, 5) == 1 : "should find value near start";

        System.out.println("All tests passed!");
    }
}
