public class KthLargestElement_test {
    public static void main(String[] args) {
        assert KthLargestElement.kthLargestElement(new int[]{3, 1, 5, 12, 2, 11, 7, 9}, 3) == 9 : "Test 1 failed";
        assert KthLargestElement.kthLargestElement(new int[]{3, 1, 5, 12, 2, 11, 7, 9}, 1) == 12 : "Test 2 failed";
        assert KthLargestElement.kthLargestElement(new int[]{3, 1, 5, 12, 2, 11, 7, 9}, 8) == 1 : "Test 3 failed";
        assert KthLargestElement.kthLargestElement(new int[]{42}, 1) == 42 : "Test 4 failed";
        assert KthLargestElement.kthLargestElement(new int[]{5, 5, 5, 5}, 2) == 5 : "Test 5 failed";
        assert KthLargestElement.kthLargestElement(new int[]{-1, -5, -3, -2, -4}, 2) == -2 : "Test 6 failed";
        assert KthLargestElement.kthLargestElement(new int[]{10, 20}, 2) == 10 : "Test 7 failed";
        assert KthLargestElement.kthLargestElement(new int[]{7, 10, 4, 3, 20, 15, 8}, 2) == 15 : "Test 8 failed";
        System.out.println("All tests passed!");
    }
}
