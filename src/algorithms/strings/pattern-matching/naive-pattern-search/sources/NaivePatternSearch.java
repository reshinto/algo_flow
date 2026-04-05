// Naive (brute-force) pattern search — checks every position in text.
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Time: O(n * m) worst case where n = text length, m = pattern length
// Space: O(1) — no auxiliary data structures

public class NaivePatternSearch {

    public static int naivePatternSearch(String text, String pattern) {
        if (pattern.isEmpty()) return 0; // @step:initialize
        for (int textIdx = 0; textIdx <= text.length() - pattern.length(); textIdx++) { // @step:visit
            int patternIdx = 0; // @step:visit
            while ( // @step:char-match
                patternIdx < pattern.length()
                && text.charAt(textIdx + patternIdx) == pattern.charAt(patternIdx)
            ) {
                patternIdx++; // @step:char-match
            }
            if (patternIdx == pattern.length()) return textIdx; // @step:complete
            // Mismatch — slide pattern right by one // @step:char-mismatch
        }
        return -1; // @step:complete
    }
}
