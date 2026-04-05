// Longest Repeated Substring
// Finds the longest substring that appears at least twice in the string.
// Uses a DP matrix comparing the string against itself, where dp[rowIdx][colIdx]
// represents the length of the longest common suffix of text[0..rowIdx-1] and text[0..colIdx-1].
// The diagonal (rowIdx === colIdx) is skipped to avoid trivial self-matches.
// Time: O(n²), Space: O(n²)

public class LongestRepeatedSubstring {

    public static String longestRepeatedSubstring(String text) {
        int textLength = text.length(); // @step:initialize

        // Allocate (textLength+1) x (textLength+1) DP matrix
        int[][] dp = new int[textLength + 1][textLength + 1]; // @step:initialize

        int longestLength = 0; // @step:initialize
        int longestEndIndex = 0; // @step:initialize

        // Fill the DP matrix — skip diagonal (rowIdx == colIdx) to avoid self-overlap
        for (int rowIdx = 1; rowIdx <= textLength; rowIdx++) {
            for (int colIdx = 1; colIdx <= textLength; colIdx++) {
                if (rowIdx == colIdx) continue; // @step:compare — skip self-match on diagonal

                char rowChar = text.charAt(rowIdx - 1); // @step:compare
                char colChar = text.charAt(colIdx - 1); // @step:compare

                if (rowChar == colChar) {
                    // Characters match — extend the common suffix length
                    dp[rowIdx][colIdx] = dp[rowIdx - 1][colIdx - 1] + 1; // @step:compute-distance
                } else {
                    dp[rowIdx][colIdx] = 0; // @step:compute-distance
                }

                if (dp[rowIdx][colIdx] > longestLength) {
                    longestLength = dp[rowIdx][colIdx]; // @step:compute-distance
                    longestEndIndex = rowIdx; // @step:compute-distance
                }
            }
        }

        return text.substring(longestEndIndex - longestLength, longestEndIndex); // @step:complete
    }
}
