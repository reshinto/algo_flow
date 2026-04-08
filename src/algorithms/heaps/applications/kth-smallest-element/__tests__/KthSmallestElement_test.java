public class KthSmallestElement_test {
    public static void main(String[] args) {
        assert KthSmallestElement.kthSmallestElement(new int[]{7, 10, 4, 3, 20, 15, 8}, 3) == 7 : "Test 1 failed";
        assert KthSmallestElement.kthSmallestElement(new int[]{7, 10, 4, 3, 20, 15, 8}, 1) == 3 : "Test 2 failed";
        assert KthSmallestElement.kthSmallestElement(new int[]{7, 10, 4, 3, 20, 15, 8}, 7) == 20 : "Test 3 failed";
        assert KthSmallestElement.kthSmallestElement(new int[]{42}, 1) == 42 : "Test 4 failed";
        assert KthSmallestElement.kthSmallestElement(new int[]{5, 5, 5, 5}, 2) == 5 : "Test 5 failed";
        assert KthSmallestElement.kthSmallestElement(new int[]{-1, -5, -3, -2, -4}, 2) == -4 : "Test 6 failed";
        assert KthSmallestElement.kthSmallestElement(new int[]{10, 20}, 2) == 20 : "Test 7 failed";
        assert KthSmallestElement.kthSmallestElement(new int[]{7, 10, 4, 3, 20, 15, 8}, 2) == 4 : "Test 8 failed";
        System.out.println("All tests passed!");
    }
}
