// Decode String — use a stack to decode encoded strings like "3[a2[c]]" → "accaccacc"
#include <iostream>
#include <stack>
#include <string>

std::string decodeString(const std::string& inputString) {
    std::stack<int> countStack; // @step:initialize
    std::stack<std::string> stringStack; // @step:initialize
    std::string currentString; // @step:initialize
    int currentCount = 0; // @step:initialize

    for (char currentChar : inputString) {
        // @step:visit
        if (std::isdigit(currentChar)) {
            // Build up multi-digit multipliers
            currentCount = currentCount * 10 + (currentChar - '0'); // @step:visit
        } else if (currentChar == '[') {
            // Push current context onto stacks and reset for nested segment
            countStack.push(currentCount); // @step:push
            stringStack.push(currentString); // @step:push
            currentCount = 0; // @step:push
            currentString = ""; // @step:push
        } else if (currentChar == ']') {
            // Pop context and expand the repeated segment
            int repeatCount = countStack.top(); countStack.pop(); // @step:pop
            std::string prevString = stringStack.top(); stringStack.pop(); // @step:pop
            std::string repeated;
            for (int repeatIdx = 0; repeatIdx < repeatCount; repeatIdx++) {
                repeated += currentString;
            }
            currentString = prevString + repeated; // @step:pop
        } else {
            // Regular character — append to current string accumulator
            currentString += currentChar; // @step:visit
        }
    }

    return currentString; // @step:complete
}

int main() {
    std::cout << decodeString("3[a2[c]]") << std::endl;
    return 0;
}
