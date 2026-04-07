// Reverse String — two-pointer in-place swap on a character array.
// Returns the reversed version of the input string.
// Time: O(n)  Space: O(1) auxiliary (O(n) for the output string)

#include <string>
#include <algorithm>

std::string reverseString(std::string text) {
    std::string chars = text; // @step:initialize

    int leftIndex = 0; // @step:initialize
    int rightIndex = static_cast<int>(chars.length()) - 1; // @step:initialize

    while (leftIndex < rightIndex) {
        char leftChar = chars[leftIndex]; // @step:read-char
        char rightChar = chars[rightIndex]; // @step:read-char

        chars[leftIndex] = rightChar; // @step:swap-pointers
        chars[rightIndex] = leftChar; // @step:swap-pointers

        leftIndex++; // @step:visit
        rightIndex--; // @step:visit
    }

    return chars; // @step:complete
}
