// Remove All Adjacent Duplicates — use a stack to repeatedly remove adjacent duplicate pairs
#include <iostream>
#include <string>
#include <vector>

std::string removeAllAdjacentDuplicates(const std::string& inputString) {
    std::vector<char> stack; // @step:initialize
    for (char ch : inputString) {
        // @step:visit
        char stackTop = stack.empty() ? '\0' : stack.back(); // @step:visit
        if (!stack.empty() && stackTop == ch) {
            stack.pop_back(); // @step:match
        } else {
            stack.push_back(ch); // @step:push
        }
    }
    // Remaining stack characters form the result after all duplicate pairs removed
    return std::string(stack.begin(), stack.end()); // @step:complete
}

#ifndef TESTING
int main() {
    std::cout << removeAllAdjacentDuplicates("abbaca") << std::endl;
    return 0;
}
#endif
