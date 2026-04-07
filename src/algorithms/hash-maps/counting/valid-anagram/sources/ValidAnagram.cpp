// Valid Anagram — determine if two strings are anagrams using character frequency counts
#include <string>
#include <unordered_map>

bool validAnagram(const std::string& textA, const std::string& textB) {
    if (textA.size() != textB.size()) return false; // @step:initialize
    std::unordered_map<char, int> charCounts; // @step:initialize
    for (char currentChar : textA) {
        charCounts[currentChar]++; // @step:increment-count
    }
    for (char currentChar : textB) {
        int updatedCount = --charCounts[currentChar]; // @step:decrement-count
        if (updatedCount < 0) return false; // @step:complete
        // @step:decrement-count
    }
    return true; // @step:complete
}
