// g++ -o EvaluateReversePolish_test EvaluateReversePolish_test.cpp && ./EvaluateReversePolish_test
#include "EvaluateReversePolish.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

int main() {
    assert(evaluateReversePolish({"2", "1", "+", "3", "*"}) == 9);
    assert(evaluateReversePolish({"4", "13", "5", "/", "+"}) == 6);
    assert(evaluateReversePolish({"10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"}) == 22);
    assert(evaluateReversePolish({"42"}) == 42);
    assert(evaluateReversePolish({"3", "4", "+"}) == 7);
    assert(evaluateReversePolish({"10", "3", "-"}) == 7);
    assert(evaluateReversePolish({"5", "6", "*"}) == 30);
    assert(evaluateReversePolish({"7", "2", "/"}) == 3);
    assert(evaluateReversePolish({"7", "-3", "/"}) == -2);
    assert(evaluateReversePolish({"-3", "4", "*"}) == -12);
    assert(evaluateReversePolish({"2", "3", "+", "4", "1", "-", "*"}) == 15);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
