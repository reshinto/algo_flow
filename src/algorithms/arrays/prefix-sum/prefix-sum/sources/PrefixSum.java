// Prefix Sum — O(n) build, O(1) per query via prefix difference
public class PrefixSum {
    public static int[][] prefixSum(int[] inputArray, int[][] queries) {
        int[] prefixArray = new int[inputArray.length + 1]; // @step:initialize

        // Build prefix sum array where prefixArray[i] = sum of inputArray[0..i-1]
        for (int scanIndex = 0; scanIndex < inputArray.length; scanIndex++) { // @step:visit
            prefixArray[scanIndex + 1] = prefixArray[scanIndex] + inputArray[scanIndex]; // @step:visit
        }

        int[] queryResults = new int[queries.length]; // @step:compare

        // Answer range queries in O(1) each using prefix difference
        for (int queryIndex = 0; queryIndex < queries.length; queryIndex++) {
            int leftBound = queries[queryIndex][0];
            int rightBound = queries[queryIndex][1];
            queryResults[queryIndex] = prefixArray[rightBound + 1] - prefixArray[leftBound]; // @step:compare
        }

        return new int[][] {prefixArray, queryResults}; // @step:complete
    }
}
