// Basic Calculator — evaluate a simple expression string with +, -, (, ) using a stack for sign propagation
#include <iostream>
#include <stack>
#include <string>
#include <vector>
#include <regex>

long long basicCalculator(const std::string& expression) {
    std::stack<long long> signStack; // @step:initialize
    long long runningTotal = 0; // @step:initialize
    long long currentSign = 1; // @step:initialize

    std::vector<std::string> tokens; // @step:initialize
    std::size_t charIdx = 0;
    while (charIdx < expression.size()) {
        char ch = expression[charIdx];
        if (std::isdigit(ch)) {
            std::string numStr;
            while (charIdx < expression.size() && std::isdigit(expression[charIdx])) {
                numStr += expression[charIdx++];
            }
            tokens.push_back(numStr);
        } else if (ch == '+' || ch == '-' || ch == '(' || ch == ')') {
            tokens.push_back(std::string(1, ch));
            charIdx++;
        } else {
            charIdx++;
        }
    }

    for (const std::string& currentToken : tokens) {
        // @step:visit
        bool isNumber = !currentToken.empty() && std::isdigit(currentToken[0]);
        if (isNumber) {
            runningTotal += currentSign * std::stoll(currentToken); // @step:evaluate
        } else if (currentToken == "+") {
            currentSign = 1; // @step:visit
        } else if (currentToken == "-") {
            currentSign = -1; // @step:visit
        } else if (currentToken == "(") {
            // Save current running total and sign, then reset for the sub-expression
            signStack.push(runningTotal); // @step:push
            signStack.push(currentSign); // @step:push
            runningTotal = 0; // @step:push
            currentSign = 1; // @step:push
        } else if (currentToken == ")") {
            // Pop sign and previous total, merge sub-expression result into parent context
            long long poppedSign = signStack.top(); signStack.pop(); // @step:pop
            long long prevTotal = signStack.top(); signStack.pop(); // @step:pop
            runningTotal = prevTotal + poppedSign * runningTotal; // @step:pop
        }
    }

    return runningTotal; // @step:complete
}

#ifndef TESTING
int main() {
    std::cout << basicCalculator("1 + (2 - 3)") << std::endl;
    return 0;
}
#endif
