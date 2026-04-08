// Wildcard Matching
// Determines if a text string matches a pattern that may contain '?' (any single character)
// or '*' (any sequence of characters, including empty).
// Uses dynamic programming: dp[rowIdx][colIdx] = true if text[0..rowIdx-1] matches pattern[0..colIdx-1].
// Time: O(nm), Space: O(nm) where n = text.length, m = pattern.length

#include <string>
#include <vector>

bool wildcardMatching(const std::string& text, const std::string& pattern) {
    int textLength = static_cast<int>(text.length()); // @step:initialize
    int patternLength = static_cast<int>(pattern.length()); // @step:initialize

    // Allocate (textLength+1) × (patternLength+1) boolean DP matrix (stored as 1/0)
    std::vector<std::vector<int>> dp(textLength + 1, std::vector<int>(patternLength + 1, 0)); // @step:initialize

    // Base case: empty text matches empty pattern
    dp[0][0] = 1; // @step:fill-table

    // Base case: empty text can only match a pattern of all '*'
    for (int colIdx = 1; colIdx <= patternLength; colIdx++) {
        dp[0][colIdx] = (pattern[colIdx - 1] == '*') ? dp[0][colIdx - 1] : 0; // @step:fill-table
    }

    // Fill the rest of the matrix
    for (int rowIdx = 1; rowIdx <= textLength; rowIdx++) {
        for (int colIdx = 1; colIdx <= patternLength; colIdx++) {
            char textChar = text[rowIdx - 1]; // @step:compare
            char patternChar = pattern[colIdx - 1]; // @step:compare

            if (patternChar == '*') {
                // '*' matches empty sequence (dp[rowIdx][colIdx-1]) or one more char (dp[rowIdx-1][colIdx])
                int matchEmpty = dp[rowIdx][colIdx - 1]; // @step:compute-distance
                int matchOne = dp[rowIdx - 1][colIdx]; // @step:compute-distance
                dp[rowIdx][colIdx] = (matchEmpty == 1 || matchOne == 1) ? 1 : 0; // @step:compute-distance
            } else if (patternChar == '?' || patternChar == textChar) {
                // '?' matches any single char, or exact character match
                dp[rowIdx][colIdx] = dp[rowIdx - 1][colIdx - 1]; // @step:compute-distance
            } else {
                dp[rowIdx][colIdx] = 0; // @step:compute-distance
            }
        }
    }

    return dp[textLength][patternLength] == 1; // @step:complete
}
