// Lomuto Partition — O(n) partition scheme using last element as pivot and a boundary pointer
public class LomutoPartition {
    public static int[] lomutoPartition(int[] inputArray) {
        if (inputArray.length == 0) { // @step:initialize
            return new int[]{-1}; // @step:initialize
        }

        int[] result = inputArray.clone(); // @step:initialize
        int pivotOriginalIndex = result.length - 1;
        int pivotValue = result[pivotOriginalIndex]; // @step:initialize
        int boundaryIndex = 0; // @step:initialize

        for (int scanIndex = 0; scanIndex < pivotOriginalIndex; scanIndex++) { // @step:visit
            if (result[scanIndex] <= pivotValue) { // @step:compare
                int tempValue = result[boundaryIndex]; // @step:swap
                result[boundaryIndex] = result[scanIndex]; // @step:swap
                result[scanIndex] = tempValue; // @step:swap
                boundaryIndex++; // @step:visit
            }
        }

        // Place pivot into its final sorted position
        int tempValue = result[boundaryIndex]; // @step:swap
        result[boundaryIndex] = result[pivotOriginalIndex]; // @step:swap
        result[pivotOriginalIndex] = tempValue; // @step:swap

        // Return pivotFinalIndex followed by the partitioned array
        int[] output = new int[result.length + 1];
        output[0] = boundaryIndex;
        System.arraycopy(result, 0, output, 1, result.length);
        return output; // @step:complete
    }
}
