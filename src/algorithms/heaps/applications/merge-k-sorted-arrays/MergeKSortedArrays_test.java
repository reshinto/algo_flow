import java.util.Arrays;

public class MergeKSortedArrays_test {
    public static void main(String[] args) {
        assert Arrays.equals(
            MergeKSortedArrays.mergeKSortedArrays(new int[][]{{1,4,7},{2,5,8},{3,6,9}}),
            new int[]{1,2,3,4,5,6,7,8,9}) : "Test 1 failed";

        assert Arrays.equals(
            MergeKSortedArrays.mergeKSortedArrays(new int[][]{{1},{2,3,4},{5,6}}),
            new int[]{1,2,3,4,5,6}) : "Test 2 failed";

        assert Arrays.equals(
            MergeKSortedArrays.mergeKSortedArrays(new int[][]{{1,2,3}}),
            new int[]{1,2,3}) : "Test 3 failed";

        assert Arrays.equals(
            MergeKSortedArrays.mergeKSortedArrays(new int[][]{{1,3,5},{2,4,6}}),
            new int[]{1,2,3,4,5,6}) : "Test 4 failed";

        assert Arrays.equals(
            MergeKSortedArrays.mergeKSortedArrays(new int[][]{{3},{1},{2}}),
            new int[]{1,2,3}) : "Test 5 failed";

        assert Arrays.equals(
            MergeKSortedArrays.mergeKSortedArrays(new int[][]{{1,3,3},{2,3,4}}),
            new int[]{1,2,3,3,3,4}) : "Test 6 failed";

        assert Arrays.equals(
            MergeKSortedArrays.mergeKSortedArrays(new int[][]{{-3,-1,0},{-2,1,2}}),
            new int[]{-3,-2,-1,0,1,2}) : "Test 7 failed";

        System.out.println("All tests passed!");
    }
}
