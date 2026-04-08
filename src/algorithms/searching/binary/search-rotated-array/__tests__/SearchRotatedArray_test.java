public class SearchRotatedArray_test {
    public static void main(String[] args) {
        assert SearchRotatedArray.searchRotatedArray(new int[]{4, 5, 6, 7, 0, 1, 2}, 0) == 4 : "should find target in rotated array";
        assert SearchRotatedArray.searchRotatedArray(new int[]{4, 5, 6, 7, 0, 1, 2}, 5) == 1 : "should find target in left sorted half";
        assert SearchRotatedArray.searchRotatedArray(new int[]{4, 5, 6, 7, 0, 1, 2}, 1) == 5 : "should find target in right sorted half";
        assert SearchRotatedArray.searchRotatedArray(new int[]{4, 5, 6, 7, 0, 1, 2}, 3) == -1 : "should return -1 when not found";
        assert SearchRotatedArray.searchRotatedArray(new int[]{1, 2, 3, 4, 5, 6, 7}, 4) == 3 : "should find target in non-rotated array";
        assert SearchRotatedArray.searchRotatedArray(new int[]{6, 7, 0, 1, 2, 3, 4, 5}, 6) == 0 : "should find target at rotation pivot";
        assert SearchRotatedArray.searchRotatedArray(new int[]{5}, 5) == 0 : "should handle single element found";
        assert SearchRotatedArray.searchRotatedArray(new int[]{5}, 3) == -1 : "should handle single element not found";
        assert SearchRotatedArray.searchRotatedArray(new int[]{3, 4, 5, 1, 2}, 2) == 4 : "should find target at last index";
        assert SearchRotatedArray.searchRotatedArray(new int[]{3, 4, 5, 1, 2}, 3) == 0 : "should find target at first index";
        assert SearchRotatedArray.searchRotatedArray(new int[]{2, 1}, 1) == 1 : "should handle two-element rotated array";
        assert SearchRotatedArray.searchRotatedArray(new int[]{2, 1}, 2) == 0 : "should handle two-element finding first";
        assert SearchRotatedArray.searchRotatedArray(new int[]{}, 5) == -1 : "should return -1 for empty array";

        System.out.println("All tests passed!");
    }
}
