// Suffix Array Construction (naive approach)
// Generates all suffixes of a string, sorts them lexicographically,
// and returns the array of starting indices in sorted suffix order.
// Time: O(n log²n), Space: O(n)

import java.util.Arrays;

public class SuffixArrayConstruction {

    public static int[] suffixArrayConstruction(String text) {
        int textLength = text.length(); // @step:initialize

        if (textLength == 0) {
            return new int[0]; // @step:complete
        }

        // Build array of suffix starting indices [0, 1, ..., n-1]
        Integer[] suffixIndices = new Integer[textLength]; // @step:initialize
        for (int idx = 0; idx < textLength; idx++) {
            suffixIndices[idx] = idx; // @step:initialize
        }

        // Sort indices by their corresponding suffix lexicographically
        Arrays.sort(suffixIndices, (firstIdx, secondIdx) -> { // @step:compare
            String firstSuffix = text.substring(firstIdx); // @step:compare
            String secondSuffix = text.substring(secondIdx); // @step:compare
            return firstSuffix.compareTo(secondSuffix); // @step:compare
        });

        // Convert Integer[] to int[]
        int[] result = new int[textLength]; // @step:complete
        for (int idx = 0; idx < textLength; idx++) {
            result[idx] = suffixIndices[idx]; // @step:complete
        }

        return result; // @step:complete
    }
}
