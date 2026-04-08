// g++ -o LongestValidParentheses_test LongestValidParentheses_test.cpp && ./LongestValidParentheses_test
#define TESTING
#include "sources/LongestValidParentheses.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    assert(longestValidParentheses("(()") == 2);
    assert(longestValidParentheses(")()())") == 4);
    assert(longestValidParentheses("") == 0);
    assert(longestValidParentheses("(()())") == 6);
    assert(longestValidParentheses("()()") == 4);
    assert(longestValidParentheses("(((") == 0);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
