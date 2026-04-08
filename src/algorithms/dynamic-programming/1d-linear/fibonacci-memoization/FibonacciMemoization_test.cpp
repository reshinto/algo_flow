// g++ -o test FibonacciMemoization_test.cpp && ./test
#define TESTING
#include "sources/FibonacciMemoization.cpp"
#include <cassert>
#include <iostream>
#include <unordered_map>

int fib(int targetIndex) {
    std::unordered_map<int, int> memo;
    return fibonacciMemoization(targetIndex, memo);
}

int main() {
    assert(fib(0) == 0);
    assert(fib(1) == 1);
    assert(fib(2) == 1);
    assert(fib(8) == 21);
    assert(fib(10) == 55);
    assert(fib(15) == 610);

    int expected[] = {0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55};
    for (int targetIndex = 0; targetIndex <= 10; targetIndex++) {
        assert(fib(targetIndex) == expected[targetIndex]);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
