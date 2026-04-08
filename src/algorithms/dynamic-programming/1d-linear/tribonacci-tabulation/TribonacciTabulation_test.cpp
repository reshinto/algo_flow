// g++ -o test TribonacciTabulation_test.cpp && ./test
#define TESTING
#include "sources/TribonacciTabulation.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(tribonacciTabulation(0) == 0);
    assert(tribonacciTabulation(1) == 1);
    assert(tribonacciTabulation(2) == 1);
    assert(tribonacciTabulation(4) == 4);
    assert(tribonacciTabulation(7) == 24);
    assert(tribonacciTabulation(10) == 149);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
