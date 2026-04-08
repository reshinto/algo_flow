// g++ -o test IntegerBreakTabulation_test.cpp && ./test
#define TESTING
#include "sources/IntegerBreakTabulation.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(integerBreakTabulation(2) == 1);
    assert(integerBreakTabulation(3) == 2);
    assert(integerBreakTabulation(4) == 4);
    assert(integerBreakTabulation(5) == 6);
    assert(integerBreakTabulation(6) == 9);
    assert(integerBreakTabulation(8) == 18);
    assert(integerBreakTabulation(10) == 36);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
