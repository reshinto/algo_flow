// g++ -o test FibonacciTabulation_test.cpp && ./test
#define TESTING
#include "../sources/FibonacciTabulation.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(fibonacciTabulation(0) == 0);
    assert(fibonacciTabulation(1) == 1);
    assert(fibonacciTabulation(2) == 1);
    assert(fibonacciTabulation(8) == 21);
    assert(fibonacciTabulation(10) == 55);
    assert(fibonacciTabulation(15) == 610);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
