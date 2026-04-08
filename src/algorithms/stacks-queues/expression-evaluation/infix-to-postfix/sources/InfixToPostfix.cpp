// Infix to Postfix — Dijkstra's Shunting-Yard: convert infix expression to postfix (RPN)
#include <iostream>
#include <stack>
#include <string>
#include <vector>
#include <unordered_map>
#include <sstream>

std::string infixToPostfix(const std::string& expression) {
    std::unordered_map<char, int> operatorPrecedence; // @step:initialize
    operatorPrecedence['+'] = 1;
    operatorPrecedence['-'] = 1;
    operatorPrecedence['*'] = 2;
    operatorPrecedence['/'] = 2;
    std::vector<std::string> outputQueue; // @step:initialize
    std::stack<char> operatorStack; // @step:initialize

    // Tokenize: collect alphanumeric runs and single-char operators/parens
    std::vector<std::string> tokens; // @step:initialize
    std::size_t charIdx = 0;
    while (charIdx < expression.size()) {
        char ch = expression[charIdx];
        if (std::isalnum(ch)) {
            std::string token;
            while (charIdx < expression.size() && std::isalnum(expression[charIdx])) {
                token += expression[charIdx++];
            }
            tokens.push_back(token);
        } else if (std::string("+-*/()").find(ch) != std::string::npos) {
            tokens.push_back(std::string(1, ch));
            charIdx++;
        } else {
            charIdx++;
        }
    }

    for (const std::string& currentToken : tokens) {
        // @step:visit
        bool isOperand = !currentToken.empty() && std::isalnum(currentToken[0]);
        if (isOperand) {
            // Operand — send directly to output
            outputQueue.push_back(currentToken); // @step:output
        } else if (operatorPrecedence.count(currentToken[0])) {
            // Operator — pop higher/equal-precedence operators to output first
            while (!operatorStack.empty() && operatorStack.top() != '(' &&
                   operatorPrecedence.count(operatorStack.top()) &&
                   operatorPrecedence[operatorStack.top()] >= operatorPrecedence[currentToken[0]]) { // @step:compare
                outputQueue.push_back(std::string(1, operatorStack.top())); // @step:pop
                operatorStack.pop(); // @step:pop
            }
            operatorStack.push(currentToken[0]); // @step:push
        } else if (currentToken == "(") {
            operatorStack.push('('); // @step:push
        } else if (currentToken == ")") {
            // Pop to output until matching '(' is found
            while (!operatorStack.empty() && operatorStack.top() != '(') {
                outputQueue.push_back(std::string(1, operatorStack.top())); // @step:pop
                operatorStack.pop(); // @step:pop
            }
            if (!operatorStack.empty()) operatorStack.pop(); // @step:pop — discard the '('
        }
    }

    // Drain remaining operators to output
    while (!operatorStack.empty()) {
        outputQueue.push_back(std::string(1, operatorStack.top())); // @step:pop
        operatorStack.pop();
    }

    std::string result;
    for (std::size_t idx = 0; idx < outputQueue.size(); idx++) {
        if (idx > 0) result += " ";
        result += outputQueue[idx];
    }
    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::cout << infixToPostfix("A+B*C") << std::endl;
    return 0;
}
#endif
