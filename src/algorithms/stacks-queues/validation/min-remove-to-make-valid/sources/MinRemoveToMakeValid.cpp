// Min Remove to Make Valid — use a stack of indices to track unmatched '(' and a set for unmatched ')'
#include <iostream>
#include <stack>
#include <string>
#include <unordered_set>

std::string minRemoveToMakeValid(const std::string& inputString) {
    std::stack<int> unmatchedOpenIndices; // @step:initialize
    std::unordered_set<int> unmatchedCloseIndices; // @step:initialize
    for (int charIdx = 0; charIdx < static_cast<int>(inputString.size()); charIdx++) {
        char ch = inputString[charIdx]; // @step:visit
        if (ch == '(') {
            unmatchedOpenIndices.push(charIdx); // @step:push
        } else if (ch == ')') {
            if (!unmatchedOpenIndices.empty()) {
                unmatchedOpenIndices.pop(); // @step:pop
            } else {
                unmatchedCloseIndices.insert(charIdx); // @step:mismatch
            }
        }
    }
    // Remaining indices in the stack are unmatched opening brackets
    std::unordered_set<int> unmatchedIndices(unmatchedCloseIndices); // @step:mismatch
    while (!unmatchedOpenIndices.empty()) {
        unmatchedIndices.insert(unmatchedOpenIndices.top());
        unmatchedOpenIndices.pop();
    }
    std::string result; // @step:complete
    for (int charIdx = 0; charIdx < static_cast<int>(inputString.size()); charIdx++) {
        if (!unmatchedIndices.count(charIdx)) {
            result += inputString[charIdx]; // @step:complete
        }
    }
    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::cout << minRemoveToMakeValid("lee(t(c)o)de)") << std::endl;
    return 0;
}
#endif
