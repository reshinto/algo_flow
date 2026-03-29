// Integer Break tabulation — build DP table iteratively from base cases
public class IntegerBreakTabulation {
    public static int integerBreakTabulation(int targetNumber) { // @step:initialize
        int[] dpTable = new int[targetNumber + 1]; // @step:initialize
        dpTable[1] = 1; // @step:fill-table
        // For each i, try every split j + (i - j) and track the best product
        for (int splitIndex = 2; splitIndex <= targetNumber; splitIndex++) { // @step:compute-cell
            for (int partIndex = 1; partIndex < splitIndex; partIndex++) { // @step:compute-cell,read-cache
                int keepSplit = partIndex * (splitIndex - partIndex); // @step:compute-cell
                int useDp = partIndex * dpTable[splitIndex - partIndex]; // @step:read-cache,compute-cell
                dpTable[splitIndex] = Math.max(dpTable[splitIndex], Math.max(keepSplit, useDp)); // @step:compute-cell
            }
        }
        return dpTable[targetNumber]; // @step:complete
    }
}
