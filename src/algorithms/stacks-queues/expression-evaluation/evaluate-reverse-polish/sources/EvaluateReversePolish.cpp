// Evaluate Reverse Polish Notation — push operands, pop two and compute on operators
#include <iostream>
#include <stack>
#include <string>
#include <vector>
#include <unordered_set>
#include <cmath>

long long evaluateReversePolish(const std::vector<std::string>& tokens) {
    std::stack<long long> operandStack; // @step:initialize
    std::unordered_set<std::string> operators = {"+", "-", "*", "/"}; // @step:initialize
    for (const std::string& currentToken : tokens) {
        // @step:visit
        if (operators.count(currentToken)) {
            long long operandB = operandStack.top(); operandStack.pop(); // @step:evaluate
            long long operandA = operandStack.top(); operandStack.pop(); // @step:evaluate
            long long result;
            if (currentToken == "+")
                result = operandA + operandB; // @step:evaluate
            else if (currentToken == "-")
                result = operandA - operandB; // @step:evaluate
            else if (currentToken == "*")
                result = operandA * operandB; // @step:evaluate
            else
                result = static_cast<long long>(std::trunc(static_cast<double>(operandA) / operandB)); // @step:evaluate
            operandStack.push(result); // @step:push
        } else {
            operandStack.push(std::stoll(currentToken)); // @step:push
        }
    }
    return operandStack.top(); // @step:complete
}

int main() {
    std::vector<std::string> tokens = {"2", "1", "+", "3", "*"};
    std::cout << evaluateReversePolish(tokens) << std::endl;
    return 0;
}
