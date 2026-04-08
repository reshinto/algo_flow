// g++ -o LisMemoization_test LisMemoization_test.cpp && ./LisMemoization_test
#define TESTING
#include "sources/LisMemoization.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(lisMemoization({}) == 0);
    assert(lisMemoization({42}) == 1);
    assert(lisMemoization({5, 4, 3, 2, 1}) == 1);
    assert(lisMemoization({1, 2, 3, 4, 5}) == 5);
    assert(lisMemoization({10, 9, 2, 5, 3, 7, 101, 18}) == 4);
    assert(lisMemoization({3, 10, 2, 1, 20}) == 3);
    assert(lisMemoization({3, 2}) == 1);
    assert(lisMemoization({50, 3, 10, 7, 40, 80}) == 4);
    assert(lisMemoization({7, 7, 7, 7}) == 1);
    assert(lisMemoization({1, 3, 6, 7, 9, 4, 10, 5, 6}) == 6);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
