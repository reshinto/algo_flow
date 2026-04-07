// Find the Difference — find the extra character added to the modified string
#include <string>
#include <unordered_map>

char findTheDifference(const std::string& original, const std::string& modified) {
    std::unordered_map<char, int> charCounts; // @step:initialize
    for (char currentChar : original) {
        charCounts[currentChar]++; // @step:increment-count
    }
    for (char currentChar : modified) {
        charCounts[currentChar]--; // @step:decrement-count
        if (charCounts[currentChar] < 0) {
            return currentChar; // @step:key-found
        }
    }
    return ' '; // @step:complete
}
