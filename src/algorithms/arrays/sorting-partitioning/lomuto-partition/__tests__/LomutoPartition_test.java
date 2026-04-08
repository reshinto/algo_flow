import java.util.Arrays;

public class LomutoPartition_test {
    public static void main(String[] args) {
        // Default input: pivot 7 at correct position, all left <= 7, all right > 7
        {
            int[] result = LomutoPartition.lomutoPartition(new int[]{8, 3, 6, 1, 5, 9, 2, 7});
            // result[0] = pivotIndex, result[1..] = partitioned array
            int pivotIndex = result[0];
            assert result[pivotIndex + 1] == 7 : "Pivot value should be 7";
            for (int leftIdx = 1; leftIdx < pivotIndex + 1; leftIdx++) {
                assert result[leftIdx] <= 7 : "Left element should be <= 7";
            }
            for (int rightIdx = pivotIndex + 2; rightIdx < result.length; rightIdx++) {
                assert result[rightIdx] > 7 : "Right element should be > 7";
            }
        }

        // Already sorted [1,2,3,4,5]: pivot 5 at last index
        {
            int[] result = LomutoPartition.lomutoPartition(new int[]{1, 2, 3, 4, 5});
            assert result[0] == 4 : "Expected pivotIndex=4, got " + result[0];
            assert result[5] == 5 : "Expected pivot value=5, got " + result[5];
        }

        // Reverse sorted [5,4,3,2,1]: pivot 1 at index 0
        {
            int[] result = LomutoPartition.lomutoPartition(new int[]{5, 4, 3, 2, 1});
            assert result[0] == 0 : "Expected pivotIndex=0, got " + result[0];
            assert result[1] == 1 : "Expected pivot value=1, got " + result[1];
        }

        // Single element [42]
        {
            int[] result = LomutoPartition.lomutoPartition(new int[]{42});
            assert result[0] == 0 : "Expected pivotIndex=0, got " + result[0];
            assert result[1] == 42 : "Expected value=42, got " + result[1];
        }

        // Empty array
        {
            int[] result = LomutoPartition.lomutoPartition(new int[]{});
            assert result[0] == -1 : "Expected pivotIndex=-1 for empty, got " + result[0];
        }

        // Two elements [5,2]: pivot 2 goes to index 0
        {
            int[] result = LomutoPartition.lomutoPartition(new int[]{5, 2});
            assert result[0] == 0 : "Expected pivotIndex=0, got " + result[0];
            assert result[1] == 2 : "Expected result[0]=2, got " + result[1];
            assert result[2] == 5 : "Expected result[1]=5, got " + result[2];
        }

        System.out.println("All tests passed!");
    }
}
