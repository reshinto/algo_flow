public class FourSumII_test {
    public static void main(String[] args) {
        assert FourSumII.fourSumII(new int[]{1, 2}, new int[]{-2, -1}, new int[]{-1, 2}, new int[]{0, 2}) == 2;
        assert FourSumII.fourSumII(new int[]{1, 2}, new int[]{3, 4}, new int[]{5, 6}, new int[]{7, 8}) == 0;
        assert FourSumII.fourSumII(new int[]{0, 0}, new int[]{0, 0}, new int[]{0, 0}, new int[]{0, 0}) == 16;
        assert FourSumII.fourSumII(new int[]{1}, new int[]{-1}, new int[]{1}, new int[]{-1}) == 1;
        assert FourSumII.fourSumII(new int[]{-1, -2}, new int[]{1, 2}, new int[]{1, 2}, new int[]{-1, -2}) == 6;
        assert FourSumII.fourSumII(new int[]{1, 1}, new int[]{-1, -1}, new int[]{0}, new int[]{0}) == 4;
        assert FourSumII.fourSumII(new int[]{1000}, new int[]{-1000}, new int[]{500}, new int[]{-500}) == 1;

        System.out.println("All tests passed!");
    }
}
