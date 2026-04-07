// Longest Common Subsequence (LCS)
// Returns the length of the longest subsequence common to both source and target.
// A subsequence preserves relative order but need not be contiguous.
// Time: O(nm), Space: O(nm) where n = source.length, m = target.length

#include <string>
#include <vector>
#include <algorithm>

int longestCommonSubsequence(const std::string& source, const std::string& target) {
    int sourceLength = static_cast<int>(source.length()); // @step:initialize
    int targetLength = static_cast<int>(target.length()); // @step:initialize

    // Allocate (sourceLength+1) × (targetLength+1) DP matrix, all zeroed
    std::vector<std::vector<int>> dp(sourceLength + 1, std::vector<int>(targetLength + 1, 0)); // @step:initialize

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
            char sourceChar = source[rowIdx - 1]; // @step:compare
            char targetChar = target[colIdx - 1]; // @step:compare

            if (sourceChar == targetChar) {
                // Characters match — extend the LCS by 1
                dp[rowIdx][colIdx] = dp[rowIdx - 1][colIdx - 1] + 1; // @step:compute-distance
            } else {
                // Take the best of: skip source char or skip target char
                dp[rowIdx][colIdx] = std::max(dp[rowIdx - 1][colIdx], dp[rowIdx][colIdx - 1]); // @step:compute-distance
            }
        }
    }

    return dp[sourceLength][targetLength]; // @step:complete
}
