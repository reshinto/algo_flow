// XOR Range Query — O(n) build, O(1) per query via prefix XOR difference
public class XorRangeQuery {
    public static int[][] xorRangeQuery(int[] inputArray, int[][] queries) {
        int[] prefixXor = new int[inputArray.length + 1]; // @step:initialize

        // Build prefix XOR array where prefixXor[i] = XOR of inputArray[0..i-1]
        for (int buildIndex = 0; buildIndex < inputArray.length; buildIndex++) { // @step:visit
            prefixXor[buildIndex + 1] = prefixXor[buildIndex] ^ inputArray[buildIndex]; // @step:visit
        }

        int[] queryResults = new int[queries.length]; // @step:compare

        // Answer range XOR queries in O(1) each using prefix XOR difference
        for (int queryIndex = 0; queryIndex < queries.length; queryIndex++) {
            int leftBound = queries[queryIndex][0];
            int rightBound = queries[queryIndex][1];
            queryResults[queryIndex] = prefixXor[rightBound + 1] ^ prefixXor[leftBound]; // @step:compare
        }

        return new int[][] {prefixXor, queryResults}; // @step:complete
    }
}
