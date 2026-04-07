#include "FibonacciSearch.cpp"
#include <cassert>
#include <vector>

int main() {
    std::vector<int> standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

    assert(fibonacciSearch(standardArray, 38) == 6);
    assert(fibonacciSearch(standardArray, 50) == -1);
    assert(fibonacciSearch({}, 5) == -1);
    assert(fibonacciSearch({42}, 42) == 0);
    assert(fibonacciSearch({42}, 10) == -1);
    assert(fibonacciSearch(standardArray, 2) == 0);
    assert(fibonacciSearch(standardArray, 91) == 9);
    assert(fibonacciSearch({10, 20, 30, 40, 50}, 30) == 2);
    assert(fibonacciSearch({5, 10, 15, 20}, 1) == -1);
    assert(fibonacciSearch({5, 10, 15, 20}, 100) == -1);
    assert(fibonacciSearch({-10, -5, 0, 3, 7}, -5) == 1);
    assert(fibonacciSearch({1, 2}, 2) == 1);
    assert(fibonacciSearch({1, 2}, 1) == 0);

    return 0;
}
