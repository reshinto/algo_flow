// Rod Cutting (Tabulation) — find maximum revenue from cutting a rod of length n
public class RodCutting {
    public static int rodCutting(int[] prices) { // @step:initialize
        int rodLength = prices.length; // @step:initialize
        int[] dpTable = new int[rodLength + 1]; // @step:initialize,fill-table
        // dpTable[0] = 0 (base case: zero revenue for zero-length rod)
        for (int currentLength = 1; currentLength <= rodLength; currentLength++) { // @step:compute-cell
            for (int cutLength = 1; cutLength <= currentLength; cutLength++) {
                int remainder = currentLength - cutLength; // @step:read-cache
                int candidate = prices[cutLength - 1] + dpTable[remainder]; // @step:read-cache
                if (candidate > dpTable[currentLength]) {
                    dpTable[currentLength] = candidate; // @step:compute-cell
                }
            }
        }
        return dpTable[rodLength]; // @step:complete
    }
}
