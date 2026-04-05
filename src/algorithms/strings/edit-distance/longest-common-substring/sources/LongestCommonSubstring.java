// Longest Common Substring
// Finds the length of the longest substring shared by both source and target.
// Uses DP: dp[rowIdx][colIdx] = length of longest common substring ending at
// source[rowIdx-1] and target[colIdx-1]. Resets to 0 on mismatch.
// Time: O(nm), Space: O(nm)

public class LongestCommonSubstring {

    public static int longestCommonSubstring(String source, String target) {
        int sourceLength = source.length(); // @step:initialize
        int targetLength = target.length(); // @step:initialize

        // Allocate (sourceLength+1) x (targetLength+1) DP matrix, all zeros
        int[][] dp = new int[sourceLength + 1][targetLength + 1]; // @step:initialize

        int maxLength = 0; // @step:initialize

        // Fill interior cells — no base case rows needed; row/col 0 stay 0
        for (int rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
            for (int colIdx = 1; colIdx <= targetLength; colIdx++) {
                char sourceChar = source.charAt(rowIdx - 1); // @step:compare
                char targetChar = target.charAt(colIdx - 1); // @step:compare

                if (sourceChar == targetChar) {
                    // Characters match — extend the common substring ending here
                    dp[rowIdx][colIdx] = dp[rowIdx - 1][colIdx - 1] + 1; // @step:compute-distance
                    if (dp[rowIdx][colIdx] > maxLength) {
                        maxLength = dp[rowIdx][colIdx]; // @step:compute-distance
                    }
                } else {
                    // Mismatch — common substring cannot extend through this cell
                    dp[rowIdx][colIdx] = 0; // @step:compute-distance
                }
            }
        }

        return maxLength; // @step:complete
    }
}
