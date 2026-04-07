// Ransom Note — check if a ransom note can be constructed from magazine characters
#include <string>
#include <unordered_map>

bool ransomNote(const std::string& ransomNoteText, const std::string& magazine) {
    std::unordered_map<char, int> charCounts; // @step:initialize
    for (char currentChar : magazine) {
        charCounts[currentChar]++; // @step:increment-count
    }
    for (char currentChar : ransomNoteText) {
        int updatedCount = --charCounts[currentChar]; // @step:decrement-count
        if (updatedCount < 0) {
            return false; // @step:complete
        }
        // @step:decrement-count
    }
    return true; // @step:complete
}
