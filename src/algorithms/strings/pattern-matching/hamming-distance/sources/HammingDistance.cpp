// Hamming Distance
// Returns the number of positions where corresponding characters differ.
// Both strings must be equal length — returns -1 if lengths differ.
// Time: O(n), Space: O(1)

#include <string>

int hammingDistance(const std::string& text, const std::string& pattern) {
    if (text.length() != pattern.length()) return -1; // @step:initialize

    int distance = 0; // @step:initialize

    for (int charIndex = 0; charIndex < static_cast<int>(text.length()); charIndex++) {
        // @step:visit
        if (text[charIndex] != pattern[charIndex]) {
            // Characters differ — increment the distance counter
            distance++; // @step:char-mismatch
        } else {
            // Characters match — no change to distance
            (void)distance; // @step:char-match
        }
    }

    return distance; // @step:complete
}
