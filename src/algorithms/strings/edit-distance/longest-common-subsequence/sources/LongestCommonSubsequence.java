// Longest Common Subsequence (LCS)
// Returns the length of the longest subsequence common to both source and target.
// A subsequence preserves relative order but need not be contiguous.
// Time: O(nm), Space: O(nm)

public class LongestCommonSubsequence {

    public static int longestCommonSubsequence(String source, String target) {
        int sourceLength = source.length(); // @step:initialize
        int targetLength = target.length(); // @step:initialize

        // Allocate (sourceLength+1) x (targetLength+1) DP matrix, all zeroed
        int[][] dp = new int[sourceLength + 1][targetLength + 1]; // @step:initialize

        // Base case: dp[0][j] = 0 (LCS of empty string and any string is 0)
        for (int colIdx = 0; colIdx <= targetLength; colIdx++) {
            dp[0][colIdx] = 0; // @step:fill-table
        }

        // Base case: dp[i][0] = 0 (LCS of any string and empty string is 0)
        for (int rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
            dp[rowIdx][0] = 0; // @step:fill-table
        }

        // Fill the rest of the matrix
        for (int rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
            for (int colIdx = 1; colIdx <= targetLength; colIdx++) {
                char sourceChar = source.charAt(rowIdx - 1); // @step:compare
                char targetChar = target.charAt(colIdx - 1); // @step:compare

                if (sourceChar == targetChar) {
                    // Characters match — extend the LCS by 1
                    dp[rowIdx][colIdx] = dp[rowIdx - 1][colIdx - 1] + 1; // @step:compute-distance
                } else {
                    // Take the best of: skip source char or skip target char
                    dp[rowIdx][colIdx] = Math.max( // @step:compute-distance
                        dp[rowIdx - 1][colIdx],
                        dp[rowIdx][colIdx - 1]
                    );
                }
            }
        }

        return dp[sourceLength][targetLength]; // @step:complete
    }
}
