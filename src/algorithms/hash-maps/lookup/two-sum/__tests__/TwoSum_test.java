import java.util.Arrays;

public class TwoSum_test {
    public static void main(String[] args) {
        assert Arrays.equals(TwoSum.twoSum(new int[]{2, 7, 11, 15}, 9), new int[]{0, 1});
        assert Arrays.equals(TwoSum.twoSum(new int[]{3, 2, 4}, 6), new int[]{1, 2});
        assert Arrays.equals(TwoSum.twoSum(new int[]{3, 3}, 6), new int[]{0, 1});
        assert Arrays.equals(TwoSum.twoSum(new int[]{-3, 4, 3, 90}, 0), new int[]{0, 2});
        assert Arrays.equals(TwoSum.twoSum(new int[]{-1, 0, 1, 2}, 0), new int[]{0, 2});
        assert Arrays.equals(TwoSum.twoSum(new int[]{5, 3, 1, 9}, 8), new int[]{0, 1});
        assert Arrays.equals(TwoSum.twoSum(new int[]{4, 6}, 10), new int[]{0, 1});

        System.out.println("All tests passed!");
    }
}
