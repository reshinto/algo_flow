// KMP (Knuth-Morris-Pratt) Pattern Matching
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Time: O(n + m) where n = text length, m = pattern length
// Space: O(m) for the failure table

public class KmpSearch {

    public static int kmpSearch(String text, String pattern) {
        if (pattern.isEmpty()) return 0; // @step:initialize
        int[] failure = buildFailureTable(pattern); // @step:initialize

        int textIdx = 0; // @step:initialize
        int patternIdx = 0; // @step:initialize

        while (textIdx < text.length()) { // @step:visit
            if (text.charAt(textIdx) == pattern.charAt(patternIdx)) {
                // Characters match — advance both pointers
                textIdx++; // @step:char-match
                patternIdx++; // @step:char-match

                if (patternIdx == pattern.length()) {
                    // Full pattern matched
                    return textIdx - patternIdx; // @step:char-match
                }
            } else if (patternIdx > 0) {
                // Mismatch after some matches — use failure table
                patternIdx = failure[patternIdx - 1]; // @step:char-mismatch
            } else {
                // Mismatch at pattern start
                textIdx++; // @step:char-mismatch
            }
        }

        return -1; // @step:complete
    }

    private static int[] buildFailureTable(String pattern) {
        int[] failure = new int[pattern.length()]; // @step:build-failure
        int prefixLen = 0; // @step:build-failure
        int tableIdx = 1; // @step:build-failure

        while (tableIdx < pattern.length()) { // @step:build-failure
            if (pattern.charAt(tableIdx) == pattern.charAt(prefixLen)) {
                prefixLen++; // @step:build-failure
                failure[tableIdx] = prefixLen; // @step:build-failure
                tableIdx++; // @step:build-failure
            } else if (prefixLen > 0) {
                prefixLen = failure[prefixLen - 1]; // @step:build-failure
            } else {
                failure[tableIdx] = 0; // @step:build-failure
                tableIdx++; // @step:build-failure
            }
        }

        return failure; // @step:build-failure
    }
}
