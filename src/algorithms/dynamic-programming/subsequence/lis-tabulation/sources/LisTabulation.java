// LIS tabulation — O(n^2) bottom-up DP for longest increasing subsequence length
public class LisTabulation {
    public static int lisLength(int[] sequence) { // @step:initialize
        int sequenceLength = sequence.length; // @step:initialize
        if (sequenceLength == 0) return 0; // @step:initialize
        int[] dpTable = new int[sequenceLength]; // @step:initialize,fill-table
        java.util.Arrays.fill(dpTable, 1); // @step:fill-table
        // Each element is a subsequence of length 1
        int maxLength = 1; // @step:fill-table
        // For each index, scan all previous indices
        for (int outerIndex = 1; outerIndex < sequenceLength; outerIndex++) { // @step:compute-cell
            for (int innerIndex = 0; innerIndex < outerIndex; innerIndex++) { // @step:read-cache
                if (sequence[innerIndex] < sequence[outerIndex]) { // @step:read-cache
                    dpTable[outerIndex] = Math.max(dpTable[outerIndex], dpTable[innerIndex] + 1); // @step:compute-cell,read-cache
                }
            }
            if (dpTable[outerIndex] > maxLength) { // @step:compute-cell
                maxLength = dpTable[outerIndex]; // @step:compute-cell
            }
        }
        return maxLength; // @step:complete
    }
}
