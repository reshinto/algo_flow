public class SubarraySumEqualsK_test {
    public static void main(String[] args) {
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{1, 1, 1}, 2) == 2;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{1, 2, 3}, 3) == 2;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{1, 2, 3}, 10) == 0;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{5}, 5) == 1;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{5}, 3) == 0;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{1, -1, 1}, 1) == 3;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{1, 2, 3, 4}, 10) == 1;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{0, 0, 0}, 0) == 6;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{2, 2, 2, 2}, 4) == 3;
        assert SubarraySumEqualsK.subarraySumEqualsK(new int[]{1, -1, 2, -2}, 0) == 3;

        System.out.println("All tests passed!");
    }
}
