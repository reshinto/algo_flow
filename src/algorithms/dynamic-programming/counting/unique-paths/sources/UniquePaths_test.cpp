// g++ -o test UniquePaths_test.cpp && ./test
#include "UniquePaths.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(uniquePaths(3, 7) == 28);
    assert(uniquePaths(1, 1) == 1);
    assert(uniquePaths(3, 2) == 3);
    assert(uniquePaths(3, 3) == 6);
    assert(uniquePaths(1, 5) == 1);
    assert(uniquePaths(5, 1) == 1);
    assert(uniquePaths(5, 5) == 70);
    assert(uniquePaths(7, 7) == 924);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
