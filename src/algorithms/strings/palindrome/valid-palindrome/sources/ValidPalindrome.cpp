// Valid Palindrome — Two-pointer approach ignoring non-alphanumeric characters
// Returns true if the string is a palindrome when only alphanumeric characters are considered.
// Time: O(n), Space: O(1)

#include <string>
#include <cctype>

bool isAlphanumeric(char ch) {
    return std::isalnum(static_cast<unsigned char>(ch));
}

bool validPalindrome(const std::string& text) {
    int leftIndex = 0; // @step:initialize
    int rightIndex = static_cast<int>(text.length()) - 1; // @step:initialize

    while (leftIndex < rightIndex) {
        while (leftIndex < rightIndex && !isAlphanumeric(text[leftIndex])) {
            leftIndex++; // @step:skipNonAlphanumeric
        }
        while (leftIndex < rightIndex && !isAlphanumeric(text[rightIndex])) {
            rightIndex--; // @step:skipNonAlphanumeric
        }

        // @step:compare
        if (std::tolower(static_cast<unsigned char>(text[leftIndex]))
            != std::tolower(static_cast<unsigned char>(text[rightIndex]))) {
            return false; // @step:mismatch
        }
        leftIndex++; // @step:match
        rightIndex--; // @step:match
    }

    return true; // @step:complete
}
