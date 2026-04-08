// Word Break memoization — determine if text can be segmented into dictionary words top-down

#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>

bool canBreak(const std::string& text, const std::vector<std::string>& dictionary,
              int startIndex, std::unordered_map<int, bool>& memo) {
    int textLength = text.size();
    if (startIndex == textLength) return true; // @step:fill-table
    auto it = memo.find(startIndex);
    if (it != memo.end()) return it->second; // @step:read-cache
    // @step:push-call
    for (const std::string& word : dictionary) {
        // @step:compute-cell
        int endIndex = startIndex + word.length(); // @step:compute-cell
        if (endIndex <= textLength && text.substr(startIndex, word.length()) == word) {
            // @step:compute-cell
            if (canBreak(text, dictionary, endIndex, memo)) {
                // @step:compute-cell
                memo[startIndex] = true; // @step:compute-cell
                return true; // @step:pop-call
            }
        }
    }
    memo[startIndex] = false; // @step:compute-cell
    return false; // @step:pop-call
}

bool wordBreakMemoization(const std::string& text, const std::vector<std::string>& dictionary) {
    // @step:initialize
    int textLength = text.size(); // @step:initialize
    if (textLength == 0) return true; // @step:initialize
    std::unordered_map<int, bool> memo;
    return canBreak(text, dictionary, 0, memo); // @step:complete
}

#ifndef TESTING
int main() {
    std::string text = "leetcode";
    std::vector<std::string> dictionary = {"leet", "code"};
    bool result = wordBreakMemoization(text, dictionary);
    std::cout << "Can break \"" << text << "\": " << (result ? "true" : "false") << std::endl;
    return 0;
}
#endif
