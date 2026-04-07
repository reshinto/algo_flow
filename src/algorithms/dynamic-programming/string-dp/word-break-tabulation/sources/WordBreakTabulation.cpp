// Word Break tabulation — determine if a string can be segmented into dictionary words bottom-up

#include <iostream>
#include <string>
#include <vector>

bool wordBreakTabulation(const std::string& text, const std::vector<std::string>& dictionary) {
    // @step:initialize
    int textLength = text.size(); // @step:initialize
    std::vector<int> dpTable(textLength + 1, 0); // @step:initialize
    dpTable[0] = 1; // @step:fill-table
    for (int endIndex = 1; endIndex <= textLength; endIndex++) {
        // @step:read-cache
        for (const std::string& word : dictionary) {
            // @step:read-cache
            if (endIndex >= (int)word.length()) {
                // @step:read-cache
                std::string segment = text.substr(endIndex - word.length(), word.length()); // @step:read-cache
                if (segment == word && dpTable[endIndex - word.length()] == 1) {
                    // @step:read-cache
                    dpTable[endIndex] = 1; // @step:read-cache
                }
            }
            // @step:compute-cell
        }
    }
    return dpTable[textLength] == 1; // @step:complete
}

int main() {
    std::string text = "leetcode";
    std::vector<std::string> dictionary = {"leet", "code"};
    bool result = wordBreakTabulation(text, dictionary);
    std::cout << "Can break \"" << text << "\": " << (result ? "true" : "false") << std::endl;
    return 0;
}
