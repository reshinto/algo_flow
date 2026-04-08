// g++ -o expr_test ExpressionTreeEvaluation_test.cpp && ./expr_test
#include "../sources/ExpressionTreeEvaluation.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(expressionTreeEvaluation("3 4 + 2 * 7 /") == 2);
    assert(expressionTreeEvaluation("3 4 +") == 7);
    assert(expressionTreeEvaluation("5 6 *") == 30);
    assert(expressionTreeEvaluation("10 4 -") == 6);
    assert(expressionTreeEvaluation("7 2 /") == 3);
    assert(expressionTreeEvaluation("2 3 * 4 5 * +") == 26);
    assert(expressionTreeEvaluation("42") == 42);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
