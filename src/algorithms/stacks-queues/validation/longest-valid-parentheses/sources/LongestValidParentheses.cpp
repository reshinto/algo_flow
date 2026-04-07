// Longest Valid Parentheses — find the length of the longest well-formed parentheses substring
#include <iostream>
#include <stack>
#include <string>

int longestValidParentheses(const std::string& inputString) {
    std::stack<int> indexStack; // @step:initialize
    indexStack.push(-1);
    int maxLength = 0; // @step:initialize
    for (int charIdx = 0; charIdx < static_cast<int>(inputString.size()); charIdx++) {
        char ch = inputString[charIdx]; // @step:visit
        if (ch == '(') {
            indexStack.push(charIdx); // @step:push
        } else {
            // Pop the top; if stack becomes empty, push current index as new base
            indexStack.pop(); // @step:pop
            if (indexStack.empty()) {
                indexStack.push(charIdx); // @step:push
            } else {
                // Length of current valid substring = current index minus new stack top
                int stackTop = indexStack.top(); // @step:compare
                int currentLength = charIdx - stackTop; // @step:compare
                if (currentLength > maxLength) {
                    maxLength = currentLength; // @step:compare
                }
            }
        }
    }
    return maxLength; // @step:complete
}

int main() {
    std::cout << longestValidParentheses(")()())") << std::endl;
    return 0;
}
