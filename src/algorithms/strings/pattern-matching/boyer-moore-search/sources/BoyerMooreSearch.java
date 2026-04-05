// Boyer-Moore Search (Bad Character Rule)
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Compares pattern right-to-left; on mismatch, shifts using the bad character table.
// Time: best O(n/m), average O(n), worst O(nm)
// Space: O(sigma) where sigma = alphabet size (number of distinct characters in pattern)

import java.util.HashMap;
import java.util.Map;

public class BoyerMooreSearch {

    public static int boyerMooreSearch(String text, String pattern) {
        if (pattern.isEmpty()) return 0; // @step:initialize
        Map<Character, Integer> badCharTable = buildBadCharTable(pattern); // @step:initialize

        int patternLen = pattern.length(); // @step:initialize
        int textLen = text.length(); // @step:initialize

        int alignmentOffset = 0; // @step:initialize

        while (alignmentOffset <= textLen - patternLen) { // @step:visit
            int patternIdx = patternLen - 1; // @step:visit

            while (patternIdx >= 0 && pattern.charAt(patternIdx) == text.charAt(alignmentOffset + patternIdx)) {
                patternIdx--; // @step:char-match
            }

            if (patternIdx < 0) {
                // Full pattern matched
                return alignmentOffset; // @step:char-match
            }

            // Mismatch — compute shift using bad character table
            char mismatchChar = text.charAt(alignmentOffset + patternIdx); // @step:char-mismatch
            int badCharShift = badCharTable.getOrDefault(mismatchChar, -1); // @step:char-mismatch
            int shiftAmount = Math.max(1, patternIdx - badCharShift); // @step:char-mismatch
            alignmentOffset += shiftAmount; // @step:shift-pattern
        }

        return -1; // @step:complete
    }

    private static Map<Character, Integer> buildBadCharTable(String pattern) {
        Map<Character, Integer> table = new HashMap<>(); // @step:build-bad-char

        for (int charIdx = 0; charIdx < pattern.length(); charIdx++) {
            table.put(pattern.charAt(charIdx), charIdx); // @step:build-bad-char
        }

        return table; // @step:build-bad-char
    }
}
