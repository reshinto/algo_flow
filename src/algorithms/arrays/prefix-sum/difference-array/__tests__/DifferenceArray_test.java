import java.util.Arrays;

public class DifferenceArray_test {
    public static void main(String[] args) {
        assert Arrays.equals(
            DifferenceArray.differenceArray(5, new int[][]{{1, 3, 3}}),
            new int[]{0, 3, 3, 3, 0});

        assert Arrays.equals(
            DifferenceArray.differenceArray(5, new int[][]{{0, 4, 1}, {1, 3, 2}}),
            new int[]{1, 3, 3, 3, 1});

        assert Arrays.equals(
            DifferenceArray.differenceArray(4, new int[][]{{0, 3, 5}}),
            new int[]{5, 5, 5, 5});

        assert Arrays.equals(
            DifferenceArray.differenceArray(4, new int[][]{{2, 2, 7}}),
            new int[]{0, 0, 7, 0});

        assert Arrays.equals(
            DifferenceArray.differenceArray(5, new int[][]{}),
            new int[]{0, 0, 0, 0, 0});

        assert Arrays.equals(
            DifferenceArray.differenceArray(5, new int[][]{{1, 3, -4}}),
            new int[]{0, -4, -4, -4, 0});

        assert Arrays.equals(
            DifferenceArray.differenceArray(8, new int[][]{{1, 4, 3}, {2, 6, -1}, {0, 3, 2}}),
            new int[]{2, 5, 4, 4, 2, -1, -1, 0});

        System.out.println("All tests passed!");
    }
}
