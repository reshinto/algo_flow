// Regular Expression Matching
// Determines if text matches a pattern that may contain '.' (any single character)
// or '*' (zero or more of the preceding element).
// Uses dynamic programming: dp[rowIdx][colIdx] = 1 if text[0..rowIdx-1] matches pattern[0..colIdx-1].
// Time: O(nm), Space: O(nm)

public class RegexMatching {

    public static boolean regexMatching(String text, String pattern) {
        int textLength = text.length(); // @step:initialize
        int patternLength = pattern.length(); // @step:initialize

        // Allocate (textLength+1) x (patternLength+1) DP matrix (1 = true, 0 = false)
        int[][] dp = new int[textLength + 1][patternLength + 1]; // @step:initialize

        // Base case: empty text matches empty pattern
        dp[0][0] = 1; // @step:fill-table

        // Base case: empty text can match patterns like "a*", "a*b*", etc.
        for (int colIdx = 2; colIdx <= patternLength; colIdx++) {
            if (pattern.charAt(colIdx - 1) == '*') {
                dp[0][colIdx] = dp[0][colIdx - 2]; // @step:fill-table
            }
        }

        // Fill the rest of the matrix
        for (int rowIdx = 1; rowIdx <= textLength; rowIdx++) {
            for (int colIdx = 1; colIdx <= patternLength; colIdx++) {
                char textChar = text.charAt(rowIdx - 1); // @step:compare
                char patternChar = pattern.charAt(colIdx - 1); // @step:compare

                if (patternChar == '*') {
                    // '*' with preceding element: zero occurrences or one more char
                    int zeroOccurrences = dp[rowIdx][colIdx - 2]; // @step:compute-distance
                    char precedingChar = colIdx >= 2 ? pattern.charAt(colIdx - 2) : '\0';
                    boolean charMatches = precedingChar == '.' || precedingChar == textChar;
                    int oneMore = charMatches ? dp[rowIdx - 1][colIdx] : 0; // @step:compute-distance
                    dp[rowIdx][colIdx] = zeroOccurrences == 1 || oneMore == 1 ? 1 : 0; // @step:compute-distance
                } else if (patternChar == '.' || patternChar == textChar) {
                    // '.' matches any single char, or exact character match
                    dp[rowIdx][colIdx] = dp[rowIdx - 1][colIdx - 1]; // @step:compute-distance
                } else {
                    dp[rowIdx][colIdx] = 0; // @step:compute-distance
                }
            }
        }

        return dp[textLength][patternLength] == 1; // @step:complete
    }
}
