// Z-Algorithm Pattern Matching
// Concatenates pattern + "$" + text, builds Z-array where Z[i] = length of longest substring
// starting at i that matches a prefix of the combined string.
// If Z[i] == pattern.length(), pattern found at position i - pattern.length() - 1 in the text.
// Time: O(n + m) where n = text length, m = pattern length
// Space: O(n + m) for the combined string and Z-array

public class ZAlgorithm {

    public static int zAlgorithm(String text, String pattern) {
        if (pattern.isEmpty()) return 0; // @step:initialize
        String combined = pattern + "$" + text; // @step:initialize
        int combinedLength = combined.length(); // @step:initialize
        int[] zArray = new int[combinedLength]; // @step:initialize

        int windowLeft = 0; // @step:initialize
        int windowRight = 0; // @step:initialize

        for (int pos = 1; pos < combinedLength; pos++) { // @step:build-failure
            if (pos < windowRight) {
                zArray[pos] = Math.min(windowRight - pos, zArray[pos - windowLeft]); // @step:build-failure
            }

            while (
                pos + zArray[pos] < combinedLength &&
                combined.charAt(zArray[pos]) == combined.charAt(pos + zArray[pos])
            ) {
                zArray[pos]++; // @step:build-failure
            }

            if (pos + zArray[pos] > windowRight) {
                windowLeft = pos; // @step:build-failure
                windowRight = pos + zArray[pos]; // @step:build-failure
            }

            if (zArray[pos] == pattern.length()) {
                return pos - pattern.length() - 1; // @step:char-match
            }
        }

        return -1; // @step:complete
    }
}
