// Rabin-Karp Pattern Matching
// Returns the index of the first occurrence of pattern in text, or -1 if not found.
// Uses a rolling polynomial hash to skip comparisons when hashes differ.
// Time: O(n + m) average, O(n * m) worst case (hash collisions)
// Space: O(1)

public class RabinKarpSearch {
    private static final int HASH_BASE = 31;
    private static final long HASH_PRIME = 1_000_000_007L;

    public static int rabinKarpSearch(String text, String pattern) {
        if (pattern.isEmpty()) return 0; // @step:initialize
        if (pattern.length() > text.length()) return -1; // @step:initialize

        int patternLen = pattern.length(); // @step:initialize
        int textLen = text.length(); // @step:initialize

        // Compute base^(patternLen - 1) % prime for rolling hash window removal
        long highPow = 1; // @step:initialize
        for (int powIdx = 0; powIdx < patternLen - 1; powIdx++) {
            highPow = (highPow * HASH_BASE) % HASH_PRIME; // @step:initialize
        }

        // Compute hash of pattern and first window
        long patternHash = 0; // @step:initialize
        long windowHash = 0; // @step:initialize
        for (int charIdx = 0; charIdx < patternLen; charIdx++) {
            patternHash = (patternHash * HASH_BASE + pattern.charAt(charIdx)) % HASH_PRIME; // @step:initialize
            windowHash = (windowHash * HASH_BASE + text.charAt(charIdx)) % HASH_PRIME; // @step:initialize
        }

        // Slide the window over the text
        for (int windowStart = 0; windowStart <= textLen - patternLen; windowStart++) { // @step:visit
            if (windowHash == patternHash) { // @step:visit
                // Hashes match — verify character by character
                int charIdx = 0; // @step:char-match
                while (charIdx < patternLen && text.charAt(windowStart + charIdx) == pattern.charAt(charIdx)) {
                    charIdx++; // @step:char-match
                }

                if (charIdx == patternLen) {
                    return windowStart; // @step:char-match
                }
                // Hash collision — hashes matched but characters did not
            }

            // Roll hash: remove leading character, add next character
            if (windowStart < textLen - patternLen) {
                long outgoingCharCode = text.charAt(windowStart); // @step:pattern-shift
                long incomingCharCode = text.charAt(windowStart + patternLen); // @step:pattern-shift
                windowHash = ((windowHash - outgoingCharCode * highPow) * HASH_BASE + incomingCharCode) % HASH_PRIME; // @step:pattern-shift
                if (windowHash < 0) windowHash += HASH_PRIME; // @step:pattern-shift
            }
        }

        return -1; // @step:complete
    }
}
