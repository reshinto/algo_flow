// Longest Common Prefix — vertical scanning column by column across all strings.
// Returns the longest prefix shared by every word in the input array.
// Time: O(n*m) where n = number of strings, m = min string length  Space: O(1)

#include <string>
#include <vector>

std::string longestCommonPrefix(const std::vector<std::string>& words) {
    if (words.empty()) return ""; // @step:initialize

    int prefixLength = 0; // @step:initialize

    const std::string& firstWord = words[0]; // @step:initialize

    for (int columnIndex = 0; columnIndex < static_cast<int>(firstWord.length()); columnIndex++) {
        char currentChar = firstWord[columnIndex]; // @step:read-char

        for (int wordIndex = 1; wordIndex < static_cast<int>(words.size()); wordIndex++) {
            const std::string& word = words[wordIndex]; // @step:read-char
            char wordChar = (columnIndex < static_cast<int>(word.length())) ? word[columnIndex] : '\0'; // @step:read-char

            if (wordChar != currentChar) {
                return firstWord.substr(0, prefixLength); // @step:complete
            }
        }

        prefixLength++; // @step:write-char
    }

    return firstWord.substr(0, prefixLength); // @step:complete
}
