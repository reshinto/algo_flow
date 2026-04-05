// Wildcard Matching
// Determines if a text string matches a pattern that may contain '?' (any single character)
// or '*' (any sequence of characters, including empty).
// Uses dynamic programming: dp[rowIdx][colIdx] = 1 if text[0..rowIdx-1] matches pattern[0..colIdx-1].
// Time: O(nm), Space: O(nm)

public class WildcardMatching {

    public static boolean wildcardMatching(String text, String pattern) {
        int textLength = text.length(); // @step:initialize
        int patternLength = pattern.length(); // @step:initialize

        // Allocate (textLength+1) x (patternLength+1) DP matrix (1 = true, 0 = false)
        int[][] dp = new int[textLength + 1][patternLength + 1]; // @step:initialize

        // Base case: empty text matches empty pattern
        dp[0][0] = 1; // @step:fill-table

        // Base case: empty text can only match a pattern of all '*'
        for (int colIdx = 1; colIdx <= patternLength; colIdx++) {
            dp[0][colIdx] = pattern.charAt(colIdx - 1) == '*' && dp[0][colIdx - 1] == 1 ? 1 : 0; // @step:fill-table
        }

        // Fill the rest of the matrix
        for (int rowIdx = 1; rowIdx <= textLength; rowIdx++) {
            for (int colIdx = 1; colIdx <= patternLength; colIdx++) {
                char textChar = text.charAt(rowIdx - 1); // @step:compare
                char patternChar = pattern.charAt(colIdx - 1); // @step:compare

                if (patternChar == '*') {
                    // '*' matches empty sequence (dp[rowIdx][colIdx-1]) or one more char (dp[rowIdx-1][colIdx])
                    int matchEmpty = dp[rowIdx][colIdx - 1]; // @step:compute-distance
                    int matchOne = dp[rowIdx - 1][colIdx]; // @step:compute-distance
                    dp[rowIdx][colIdx] = matchEmpty == 1 || matchOne == 1 ? 1 : 0; // @step:compute-distance
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
}
