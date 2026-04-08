// First Unique Character — find the index of the first non-repeating character in a string
#include <string>
#include <unordered_map>

int firstUniqueCharacter(const std::string& text) {
    std::unordered_map<char, int> charCounts; // @step:initialize
    for (char currentChar : text) {
        charCounts[currentChar]++; // @step:increment-count
    }
    for (int charIndex = 0; charIndex < (int)text.size(); charIndex++) {
        char currentChar = text[charIndex]; // @step:lookup-key
        if (charCounts[currentChar] == 1) {
            return charIndex; // @step:key-found
        }
    }
    return -1; // @step:complete
}
