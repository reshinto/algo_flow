// Catalan numbers tabulation — build DP table iteratively from the base case
public class CatalanNumbers {
    public static int catalanNumber(int targetIndex) { // @step:initialize
        if (targetIndex == 0) return 1; // @step:initialize
        int[] dpTable = new int[targetIndex + 1]; // @step:initialize,fill-table
        dpTable[0] = 1; // @step:fill-table
        // Each entry is the sum C(i) = sum over k from 0 to i-1 of C(k) * C(i-1-k)
        for (int outerIndex = 1; outerIndex <= targetIndex; outerIndex++) { // @step:compute-cell
            int runningSum = 0; // @step:compute-cell
            for (int splitIndex = 0; splitIndex < outerIndex; splitIndex++) { // @step:read-cache
                runningSum += dpTable[splitIndex] * dpTable[outerIndex - 1 - splitIndex]; // @step:read-cache,compute-cell
            }
            dpTable[outerIndex] = runningSum; // @step:compute-cell
        }
        return dpTable[targetIndex]; // @step:complete
    }
}
