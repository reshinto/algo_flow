// String Compression (Run-Length Encoding) — count consecutive repeated characters.
// Returns the compressed form "a2b1c5a3" only if shorter than the original; otherwise returns the original.
// Time: O(n)  Space: O(n) for the output buffer

#include <string>

std::string stringCompression(const std::string& text) {
    if (text.empty()) return text; // @step:initialize

    std::string compressed; // @step:initialize
    int charIndex = 0; // @step:initialize

    while (charIndex < static_cast<int>(text.length())) {
        char currentChar = text[charIndex]; // @step:read-char
        int count = 0; // @step:read-char

        while (charIndex < static_cast<int>(text.length()) && text[charIndex] == currentChar) {
            count++; // @step:count
            charIndex++; // @step:count
        }

        compressed += currentChar; // @step:write-char
        compressed += std::to_string(count); // @step:write-char
    }

    return compressed.length() < text.length() ? compressed : text; // @step:complete
}
