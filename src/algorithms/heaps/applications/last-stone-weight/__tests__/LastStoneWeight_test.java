public class LastStoneWeight_test {
    public static void main(String[] args) {
        assert LastStoneWeight.lastStoneWeight(new int[]{2, 7, 4, 1, 8, 1}) == 1 : "Test 1 failed";
        assert LastStoneWeight.lastStoneWeight(new int[]{1}) == 1 : "Test 2 failed";
        assert LastStoneWeight.lastStoneWeight(new int[]{5, 5}) == 0 : "Test 3 failed";
        assert LastStoneWeight.lastStoneWeight(new int[]{3, 7}) == 4 : "Test 4 failed";
        assert LastStoneWeight.lastStoneWeight(new int[]{1, 3}) == 2 : "Test 5 failed";
        assert LastStoneWeight.lastStoneWeight(new int[]{1, 1, 1}) == 1 : "Test 6 failed";
        assert LastStoneWeight.lastStoneWeight(new int[]{4, 4, 4, 4}) == 0 : "Test 7 failed";
        assert LastStoneWeight.lastStoneWeight(new int[]{10, 4, 2, 10}) == 2 : "Test 8 failed";
        int result = LastStoneWeight.lastStoneWeight(new int[]{2, 7, 4, 1, 8, 1});
        assert result >= 0 : "Test 9 failed: result should be non-negative";
        System.out.println("All tests passed!");
    }
}
