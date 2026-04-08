// Palindrome Check — Two-pointer approach
// Returns true if the string reads the same forwards and backwards.
// Time: O(n), Space: O(1)

#include <string>

bool palindromeCheck(const std::string& text) {
    int leftIndex = 0; // @step:initialize
    int rightIndex = static_cast<int>(text.length()) - 1; // @step:initialize

    while (leftIndex < rightIndex) {
        // @step:compare
        if (text[leftIndex] != text[rightIndex]) {
            return false; // @step:mismatch
        }
        leftIndex++; // @step:match
        rightIndex--; // @step:match
    }

    return true; // @step:complete
}
