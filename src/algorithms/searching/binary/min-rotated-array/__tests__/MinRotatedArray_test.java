public class MinRotatedArray_test {
    public static void main(String[] args) {
        assert MinRotatedArray.minRotatedArray(new int[]{4, 5, 6, 7, 0, 1, 2}) == 0 : "should find minimum in rotated array";
        assert MinRotatedArray.minRotatedArray(new int[]{1, 2, 3, 4, 5}) == 1 : "should find minimum when not rotated";
        assert MinRotatedArray.minRotatedArray(new int[]{2, 3, 4, 5, 1}) == 1 : "should find minimum when rotation at last position";
        assert MinRotatedArray.minRotatedArray(new int[]{42}) == 42 : "should handle single element";
        assert MinRotatedArray.minRotatedArray(new int[]{2, 1}) == 1 : "should handle two-element rotated array";
        assert MinRotatedArray.minRotatedArray(new int[]{1, 2}) == 1 : "should handle two-element non-rotated array";
        assert MinRotatedArray.minRotatedArray(new int[]{0, 1, 2, 4, 5, 6, 7}) == 0 : "should find minimum when min is at index zero";
        assert MinRotatedArray.minRotatedArray(new int[]{11, 13, 15, 17, 2, 5, 6, 7}) == 2 : "should find minimum with larger rotation offset";
        assert MinRotatedArray.minRotatedArray(new int[]{3, 4, 5, 6, 7, 8, 1}) == 1 : "should handle minimum at last position";
        assert MinRotatedArray.minRotatedArray(new int[]{6, 7, 0, 1, 2, 3, 4, 5}) == 0 : "should handle minimum at pivot";
        assert MinRotatedArray.minRotatedArray(new int[]{3, 1, 2}) == 1 : "should handle three-element array";
        assert MinRotatedArray.minRotatedArray(new int[]{5, 6, 7, 1, 2, 3, 4}) == 1 : "should handle minimum at middle";

        System.out.println("All tests passed!");
    }
}
