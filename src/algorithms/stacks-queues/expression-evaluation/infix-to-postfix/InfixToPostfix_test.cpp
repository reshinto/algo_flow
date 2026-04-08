// g++ -o InfixToPostfix_test InfixToPostfix_test.cpp && ./InfixToPostfix_test
#define TESTING
#include "sources/InfixToPostfix.cpp"
#include <cassert>
#include <iostream>
#include <string>

int main() {
    assert(infixToPostfix("a+b*(c-d)") == "a b c d - * +");
    assert(infixToPostfix("a+b") == "a b +");
    assert(infixToPostfix("(a+b)*c") == "a b + c *");
    assert(infixToPostfix("a+b+c") == "a b + c +");
    assert(infixToPostfix("a") == "a");
    assert(infixToPostfix("a*b+c") == "a b * c +");
    assert(infixToPostfix("a+b*c") == "a b c * +");
    assert(infixToPostfix("(a+b)*(c+d)") == "a b + c d + *");
    assert(infixToPostfix("a+(b+(c+d))") == "a b c d + + +");
    assert(infixToPostfix("a+b*c-d/e") == "a b c * + d e / -");

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
