// Reverse Words in a String — split, reverse word order, rejoin with single spaces.
// Trims leading/trailing whitespace and collapses multiple spaces between words.
// Time: O(n)  Space: O(n)

#include <string>
#include <vector>
#include <sstream>

std::vector<std::string> splitWords(const std::string& text) {
    std::vector<std::string> words;
    std::istringstream stream(text);
    std::string word;
    while (stream >> word) {
        words.push_back(word);
    }
    return words;
}

std::string reverseWords(const std::string& text) {
    std::vector<std::string> words = splitWords(text); // @step:initialize

    int leftIndex = 0; // @step:initialize
    int rightIndex = static_cast<int>(words.size()) - 1; // @step:initialize

    while (leftIndex < rightIndex) {
        std::string leftWord = words[leftIndex]; // @step:read-char
        std::string rightWord = words[rightIndex]; // @step:read-char

        words[leftIndex] = rightWord; // @step:swap-pointers
        words[rightIndex] = leftWord; // @step:swap-pointers

        leftIndex++; // @step:visit
        rightIndex--; // @step:visit
    }

    std::string result;
    for (int wordIdx = 0; wordIdx < static_cast<int>(words.size()); wordIdx++) {
        if (wordIdx > 0) result += " ";
        result += words[wordIdx];
    }
    return result; // @step:complete
}
