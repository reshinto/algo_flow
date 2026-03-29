// Maximum Subarray Kadane — build DP table where dp[i] = max subarray sum ending at index i
public class MaxSubarrayKadane {
    public static int maxSubarrayKadane(int[] array) { // @step:initialize
        if (array.length == 0) return 0; // @step:initialize
        int[] dpTable = new int[array.length]; // @step:initialize,fill-table
        dpTable[0] = array[0]; // @step:fill-table
        int maxSum = dpTable[0]; // @step:fill-table
        // Each entry: extend the previous subarray or start fresh at current element
        for (int elementIndex = 1; elementIndex < array.length; elementIndex++) { // @step:compute-cell
            dpTable[elementIndex] = Math.max(
                array[elementIndex],
                dpTable[elementIndex - 1] + array[elementIndex]
            ); // @step:compute-cell,read-cache
            if (dpTable[elementIndex] > maxSum) { // @step:compute-cell
                maxSum = dpTable[elementIndex]; // @step:compute-cell
            }
        }
        return maxSum; // @step:complete
    }
}
