// Hamming Distance
// Returns the number of positions where corresponding characters differ.
// Both strings must be equal length — returns -1 if lengths differ.
// Time: O(n), Space: O(1)

public class HammingDistance {

    public static int hammingDistance(String text, String pattern) {
        if (text.length() != pattern.length()) return -1; // @step:initialize

        int distance = 0; // @step:initialize

        for (int charIndex = 0; charIndex < text.length(); charIndex++) { // @step:visit
            if (text.charAt(charIndex) != pattern.charAt(charIndex)) {
                // Characters differ — increment the distance counter
                distance++; // @step:char-mismatch
            } else {
                // Characters match — no change to distance
                int noOp = distance; // @step:char-match
            }
        }

        return distance; // @step:complete
    }
}
