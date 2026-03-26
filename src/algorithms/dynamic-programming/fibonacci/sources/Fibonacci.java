// Fibonacci tabulation — build DP table iteratively from base cases
public class Fibonacci {
    public static int fibonacciTabulation(int targetIndex) { // @step:initialize
        if (targetIndex <= 1) return targetIndex; // @step:initialize
        int[] dpTable = new int[targetIndex + 1]; // @step:initialize,fill-table
        dpTable[1] = 1; // @step:fill-table
        // Each entry is the sum of the two preceding entries
        for (int currentIndex = 2; currentIndex <= targetIndex; currentIndex++) { // @step:compute-cell
            dpTable[currentIndex] = dpTable[currentIndex - 1] + dpTable[currentIndex - 2]; // @step:compute-cell,read-cache
        }
        return dpTable[targetIndex]; // @step:complete
    }
}
