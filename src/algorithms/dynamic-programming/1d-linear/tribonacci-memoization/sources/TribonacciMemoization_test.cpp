// g++ -o test TribonacciMemoization_test.cpp && ./test
#include "TribonacciMemoization.cpp"
#include <cassert>
#include <iostream>
#include <unordered_map>

int trib(int targetIndex) {
    std::unordered_map<int, int> memo;
    return tribonacciMemoization(targetIndex, memo);
}

int main() {
    assert(trib(0) == 0);
    assert(trib(1) == 1);
    assert(trib(2) == 1);
    assert(trib(4) == 4);
    assert(trib(7) == 24);
    assert(trib(10) == 149);

    int expected[] = {0, 1, 1, 2, 4, 7, 13, 24, 44, 81, 149};
    for (int targetIndex = 0; targetIndex <= 10; targetIndex++) {
        assert(trib(targetIndex) == expected[targetIndex]);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
