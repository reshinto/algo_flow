// g++ -o test IntegerBreakMemoization_test.cpp && ./test
#define TESTING
#include "../sources/IntegerBreakMemoization.cpp"
#include <cassert>
#include <iostream>
#include <unordered_map>

int ibreak(int targetNumber) {
    std::unordered_map<int, int> memo;
    return integerBreakMemoization(targetNumber, memo);
}

int main() {
    assert(ibreak(2) == 1);
    assert(ibreak(3) == 2);
    assert(ibreak(4) == 4);
    assert(ibreak(5) == 6);
    assert(ibreak(6) == 9);
    assert(ibreak(8) == 18);
    assert(ibreak(10) == 36);
    assert(ibreak(13) == 108);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
