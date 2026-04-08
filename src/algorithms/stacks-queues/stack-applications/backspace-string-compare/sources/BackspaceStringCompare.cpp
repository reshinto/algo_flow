// Backspace String Compare — use a stack to process each string, treating '#' as backspace
#include <iostream>
#include <string>
#include <vector>

std::vector<char> processWithBackspace(const std::string& inputStr) {
    std::vector<char> resultStack; // @step:initialize
    for (char ch : inputStr) {
        // @step:visit
        if (ch == '#') {
            if (!resultStack.empty()) resultStack.pop_back(); // @step:pop
        } else {
            resultStack.push_back(ch); // @step:push
        }
    }
    return resultStack; // @step:compare
}

bool backspaceStringCompare(const std::string& firstString, const std::string& secondString) {
    auto processedFirst = processWithBackspace(firstString); // @step:initialize
    auto processedSecond = processWithBackspace(secondString); // @step:initialize
    if (processedFirst.size() != processedSecond.size()) {
        return false; // @step:compare
    }
    for (std::size_t charIdx = 0; charIdx < processedFirst.size(); charIdx++) {
        if (processedFirst[charIdx] != processedSecond[charIdx]) {
            return false; // @step:compare
        }
    }
    return true; // @step:complete
}

#ifndef TESTING
int main() {
    std::cout << std::boolalpha << backspaceStringCompare("ab#c", "ad#c") << std::endl;
    return 0;
}
#endif
