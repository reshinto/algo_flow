public class CubeSort_test {
    public static void main(String[] args) {
        assert java.util.Arrays.equals(
            CubeSort.cubeSort(new int[]{64, 34, 25, 12, 22, 11, 90}),
            new int[]{11, 12, 22, 25, 34, 64, 90}
        ) : "Test failed: sorts an unsorted array";

        assert java.util.Arrays.equals(
            CubeSort.cubeSort(new int[]{1, 2, 3, 4, 5}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles an already sorted array";

        assert java.util.Arrays.equals(
            CubeSort.cubeSort(new int[]{5, 4, 3, 2, 1}),
            new int[]{1, 2, 3, 4, 5}
        ) : "Test failed: handles a reverse-sorted array";

        assert java.util.Arrays.equals(
            CubeSort.cubeSort(new int[]{3, 1, 4, 1, 5, 9, 2, 6, 5}),
            new int[]{1, 1, 2, 3, 4, 5, 5, 6, 9}
        ) : "Test failed: handles an array with duplicate values";

        assert java.util.Arrays.equals(
            CubeSort.cubeSort(new int[]{42}),
            new int[]{42}
        ) : "Test failed: handles a single element array";

        assert java.util.Arrays.equals(
            CubeSort.cubeSort(new int[]{}),
            new int[]{}
        ) : "Test failed: handles an empty array";

        assert java.util.Arrays.equals(
            CubeSort.cubeSort(new int[]{3, -1, 0, -5, 2}),
            new int[]{-5, -1, 0, 2, 3}
        ) : "Test failed: handles an array with negative numbers";

        int[] original = new int[]{3, 1, 2};
        int[] sorted = CubeSort.cubeSort(original);
        assert java.util.Arrays.equals(sorted, new int[]{1, 2, 3}) : "Test failed: sorted result";
        assert java.util.Arrays.equals(original, new int[]{3, 1, 2}) : "Test failed: original not mutated";

        // handles array of size 27 (perfect cube)
        int[] input27 = new int[27];
        int[] expected27 = new int[27];
        for (int idx = 0; idx < 27; idx++) {
            input27[idx] = 27 - idx;
            expected27[idx] = idx + 1;
        }
        assert java.util.Arrays.equals(CubeSort.cubeSort(input27), expected27) : "Test failed: size 27";

        assert java.util.Arrays.equals(
            CubeSort.cubeSort(new int[]{2, 1}),
            new int[]{1, 2}
        ) : "Test failed: handles a two element array";

        System.out.println("All tests passed!");
    }
}
