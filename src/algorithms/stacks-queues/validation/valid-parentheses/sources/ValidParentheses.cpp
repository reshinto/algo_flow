// Valid Parentheses — use a stack to verify every opening bracket has a matching closing bracket
#include <iostream>
#include <stack>
#include <string>
#include <unordered_map>

bool validParentheses(const std::string& inputString) {
    std::stack<char> stack; // @step:initialize
    std::unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}}; // @step:initialize
    for (char ch : inputString) {
        // @step:push,pop
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.push(ch); // @step:push
        } else {
            // Closing bracket — check that stack top matches the expected opening bracket
            if (stack.empty() || stack.top() != pairs[ch]) { // @step:mismatch
                return false; // @step:mismatch
            }
            stack.pop(); // @step:pop
        }
    }
    // Valid only if every opened bracket was closed
    return stack.empty(); // @step:complete
}

#ifndef TESTING
int main() {
    std::cout << std::boolalpha << validParentheses("({[]})") << std::endl;
    return 0;
}
#endif
