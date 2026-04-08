// g++ -o test PerfectSquares_test.cpp && ./test
#define TESTING
#include "../sources/PerfectSquares.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(perfectSquares(12) == 3);
    assert(perfectSquares(13) == 2);
    assert(perfectSquares(1) == 1);
    assert(perfectSquares(4) == 1);
    assert(perfectSquares(7) == 4);
    assert(perfectSquares(0) == 0);
    assert(perfectSquares(9) == 1);
    assert(perfectSquares(5) == 2);
    assert(perfectSquares(11) == 3);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
