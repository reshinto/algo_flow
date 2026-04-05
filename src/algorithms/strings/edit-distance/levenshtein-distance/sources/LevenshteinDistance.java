// Levenshtein Distance (edit distance)
// Returns the minimum number of single-character edits (insertions, deletions,
// replacements) required to transform source into target.
// Time: O(nm), Space: O(nm)

public class LevenshteinDistance {

    public static int levenshteinDistance(String source, String target) {
        int sourceLength = source.length(); // @step:initialize
        int targetLength = target.length(); // @step:initialize

        // Allocate (sourceLength+1) x (targetLength+1) DP matrix
        int[][] dp = new int[sourceLength + 1][targetLength + 1]; // @step:initialize

        // Base case: transforming empty string to target[0..j-1] requires j insertions
        for (int colIdx = 0; colIdx <= targetLength; colIdx++) {
            dp[0][colIdx] = colIdx; // @step:fill-table
        }

        // Base case: transforming source[0..i-1] to empty string requires i deletions
        for (int rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
            dp[rowIdx][0] = rowIdx; // @step:fill-table
        }

        // Fill the rest of the matrix
        for (int rowIdx = 1; rowIdx <= sourceLength; rowIdx++) {
            for (int colIdx = 1; colIdx <= targetLength; colIdx++) {
                char sourceChar = source.charAt(rowIdx - 1); // @step:compare
                char targetChar = target.charAt(colIdx - 1); // @step:compare

                if (sourceChar == targetChar) {
                    // Characters match — no new edit needed
                    dp[rowIdx][colIdx] = dp[rowIdx - 1][colIdx - 1]; // @step:compute-distance
                } else {
                    // Choose the cheapest of: replace, delete, insert
                    int replaceCost = dp[rowIdx - 1][colIdx - 1] + 1; // @step:compute-distance
                    int deleteCost = dp[rowIdx - 1][colIdx] + 1; // @step:compute-distance
                    int insertCost = dp[rowIdx][colIdx - 1] + 1; // @step:compute-distance
                    dp[rowIdx][colIdx] = Math.min(replaceCost, Math.min(deleteCost, insertCost)); // @step:compute-distance
                }
            }
        }

        return dp[sourceLength][targetLength]; // @step:complete
    }
}
