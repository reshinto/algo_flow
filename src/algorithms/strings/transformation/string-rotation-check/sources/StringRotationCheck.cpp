// String Rotation Check — checks if pattern is a rotation of text.
// Concatenates text with itself and searches for pattern as a substring.
// Time: O(n)  Space: O(n) for the concatenated string

#include <string>

bool stringRotationCheck(const std::string& text, const std::string& pattern) {
    if (pattern.length() != text.length()) return false; // @step:initialize

    std::string concatenated = text + text; // @step:write-char

    return concatenated.find(pattern) != std::string::npos; // @step:visit
}
