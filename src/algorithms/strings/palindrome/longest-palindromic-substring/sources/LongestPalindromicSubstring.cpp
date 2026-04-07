// Longest Palindromic Substring — Expand Around Center approach
// Returns the longest substring of `text` that is a palindrome.
// Time: O(n²), Space: O(1)

#include <string>

std::string longestPalindromicSubstring(const std::string& text) {
    if (text.empty()) return ""; // @step:initialize

    int longestStart = 0; // @step:initialize
    int longestLength = 1; // @step:initialize

    for (int centerIndex = 0; centerIndex < static_cast<int>(text.length()); centerIndex++) {
        // @step:expandCenter

        // Odd-length palindromes: single character as center
        int oddRadius = 0; // @step:expandCenter
        while (centerIndex - oddRadius - 1 >= 0
            && centerIndex + oddRadius + 1 < static_cast<int>(text.length())
            && text[centerIndex - oddRadius - 1] == text[centerIndex + oddRadius + 1]) {
            // @step:compareChars
            oddRadius++; // @step:charsMatch
        }
        int oddLength = 2 * oddRadius + 1; // @step:updateLongest
        if (oddLength > longestLength) {
            // @step:updateLongest
            longestStart = centerIndex - oddRadius; // @step:updateLongest
            longestLength = oddLength; // @step:updateLongest
        }

        // Even-length palindromes: gap between centerIndex and centerIndex+1
        if (centerIndex + 1 < static_cast<int>(text.length()) && text[centerIndex] == text[centerIndex + 1]) {
            // @step:compareChars
            int evenRadius = 1; // @step:charsMatch
            while (centerIndex - evenRadius >= 0
                && centerIndex + evenRadius + 1 < static_cast<int>(text.length())
                && text[centerIndex - evenRadius] == text[centerIndex + evenRadius + 1]) {
                // @step:compareChars
                evenRadius++; // @step:charsMatch
            }
            int evenLength = 2 * evenRadius; // @step:updateLongest
            if (evenLength > longestLength) {
                // @step:updateLongest
                longestStart = centerIndex - evenRadius + 1; // @step:updateLongest
                longestLength = evenLength; // @step:updateLongest
            }
        }
    }

    return text.substr(longestStart, longestLength); // @step:complete
}
