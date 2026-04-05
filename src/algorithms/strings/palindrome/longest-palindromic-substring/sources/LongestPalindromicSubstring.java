// Longest Palindromic Substring — Expand Around Center approach
// Returns the longest substring of text that is a palindrome.
// Time: O(n²), Space: O(1)

public class LongestPalindromicSubstring {
    public static String longestPalindromicSubstring(String text) {
        if (text.isEmpty()) { // @step:initialize
            return ""; // @step:initialize
        }

        int longestStart = 0; // @step:initialize
        int longestLength = 1; // @step:initialize

        for (int centerIndex = 0; centerIndex < text.length(); centerIndex++) { // @step:expandCenter

            // Odd-length palindromes: single character as center
            int oddRadius = 0; // @step:expandCenter
            while (
                centerIndex - oddRadius - 1 >= 0 &&
                centerIndex + oddRadius + 1 < text.length() &&
                text.charAt(centerIndex - oddRadius - 1) == text.charAt(centerIndex + oddRadius + 1) // @step:compareChars
            ) {
                oddRadius++; // @step:charsMatch
            }
            int oddLength = 2 * oddRadius + 1; // @step:updateLongest
            if (oddLength > longestLength) { // @step:updateLongest
                longestStart = centerIndex - oddRadius; // @step:updateLongest
                longestLength = oddLength; // @step:updateLongest
            }

            // Even-length palindromes: gap between centerIndex and centerIndex+1
            if (centerIndex + 1 < text.length() && text.charAt(centerIndex) == text.charAt(centerIndex + 1)) { // @step:compareChars
                int evenRadius = 1; // @step:charsMatch
                while (
                    centerIndex - evenRadius >= 0 &&
                    centerIndex + evenRadius + 1 < text.length() &&
                    text.charAt(centerIndex - evenRadius) == text.charAt(centerIndex + evenRadius + 1) // @step:compareChars
                ) {
                    evenRadius++; // @step:charsMatch
                }
                int evenLength = 2 * evenRadius; // @step:updateLongest
                if (evenLength > longestLength) { // @step:updateLongest
                    longestStart = centerIndex - evenRadius + 1; // @step:updateLongest
                    longestLength = evenLength; // @step:updateLongest
                }
            }
        }

        return text.substring(longestStart, longestStart + longestLength); // @step:complete
    }
}
