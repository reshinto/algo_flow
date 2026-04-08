public class SubarraySumEqualsK_test {
    public static void main(String[] args) {
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{1, 2, 3}, 3) == 2;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{1, 2, 3}, 10) == 0;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{5, 1, 3}, 5) == 1;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{}, 3) == 0;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{3, 3, 3}, 3) == 3;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{0, 0, 0}, 0) == 6;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{7}, 7) == 1;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{4}, 7) == 0;

        System.out.println("All tests passed!");
    }
}
