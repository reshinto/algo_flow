// Minimum Jumps tabulation — build DP table iteratively from base case
public class MinimumJumps {
    public static int minimumJumps(int[] jumps) { // @step:initialize
        int arrayLength = jumps.length; // @step:initialize
        if (arrayLength == 0) return 0; // @step:initialize
        int[] dpTable = new int[arrayLength]; // @step:initialize,fill-table
        java.util.Arrays.fill(dpTable, Integer.MAX_VALUE); // @step:initialize,fill-table
        dpTable[0] = 0; // @step:fill-table
        // For each position, check all prior positions that can reach it
        for (int targetIndex = 1; targetIndex < arrayLength; targetIndex++) { // @step:compute-cell
            for (int sourceIndex = 0; sourceIndex < targetIndex; sourceIndex++) { // @step:read-cache
                if (dpTable[sourceIndex] != Integer.MAX_VALUE && sourceIndex + jumps[sourceIndex] >= targetIndex) { // @step:read-cache
                    dpTable[targetIndex] = Math.min(dpTable[targetIndex], dpTable[sourceIndex] + 1); // @step:compute-cell,read-cache
                }
            }
        }
        return dpTable[arrayLength - 1] == Integer.MAX_VALUE ? -1 : dpTable[arrayLength - 1]; // @step:complete
    }
}
