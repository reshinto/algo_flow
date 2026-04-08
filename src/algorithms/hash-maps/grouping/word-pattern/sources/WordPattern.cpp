// Word Pattern — check if a string follows a pattern using bidirectional hash map mapping
#include <string>
#include <vector>
#include <unordered_map>
#include <sstream>

bool wordPattern(const std::string& pattern, const std::string& sentence) {
    std::vector<std::string> words;
    std::istringstream stream(sentence);
    std::string word;
    while (stream >> word) words.push_back(word);
    std::unordered_map<char, std::string> charToWord; // @step:initialize
    std::unordered_map<std::string, char> wordToChar; // @step:initialize
    if (pattern.size() != words.size()) return false; // @step:initialize
    for (int charIndex = 0; charIndex < (int)pattern.size(); charIndex++) {
        char patternChar = pattern[charIndex];
        const std::string& currentWord = words[charIndex];
        auto itCW = charToWord.find(patternChar); // @step:lookup-key
        auto itWC = wordToChar.find(currentWord); // @step:lookup-key
        if (itCW == charToWord.end() && itWC == wordToChar.end()) {
            charToWord[patternChar] = currentWord; // @step:insert-key
            wordToChar[currentWord] = patternChar; // @step:insert-key
        } else if (itCW != charToWord.end() && itCW->second == currentWord &&
                   itWC != wordToChar.end() && itWC->second == patternChar) {
            continue; // @step:key-found
        } else {
            return false; // @step:key-not-found
        }
    }
    return true; // @step:complete
}
