// g++ -o ValidParentheses_test ValidParentheses_test.cpp && ./ValidParentheses_test
#define TESTING
#include "../sources/ValidParentheses.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    assert(validParentheses("({[]})") == true);
    assert(validParentheses("()") == true);
    assert(validParentheses("((()))") == true);
    assert(validParentheses("()[]{}") == true);
    assert(validParentheses("(]") == false);
    assert(validParentheses("([)]") == false);
    assert(validParentheses("(") == false);
    assert(validParentheses(")") == false);
    assert(validParentheses("") == true);
    assert(validParentheses("({[]})(") == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
