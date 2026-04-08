// g++ -o BasicCalculator_test BasicCalculator_test.cpp && ./BasicCalculator_test
#define TESTING
#include "sources/BasicCalculator.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(basicCalculator("1 + 1") == 2);
    assert(basicCalculator(" 2-1 + 2 ") == 3);
    assert(basicCalculator("(1+(4+5+2)-3)+(6+8)") == 23);
    assert(basicCalculator("1 + (2 - 3)") == 0);
    assert(basicCalculator("42") == 42);
    assert(basicCalculator("10 - 3") == 7);
    assert(basicCalculator("(((1 + 2)))") == 3);
    assert(basicCalculator("1 - (2 + 3)") == -4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
