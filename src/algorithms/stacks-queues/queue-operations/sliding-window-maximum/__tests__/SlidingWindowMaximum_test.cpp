// g++ -o SlidingWindowMaximum_test SlidingWindowMaximum_test.cpp && ./SlidingWindowMaximum_test
#define TESTING
#include "../sources/SlidingWindowMaximum.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert((slidingWindowMaxMonotonic({1, 3, -1, -3, 5, 3, 6, 7}, 3) == std::vector<int>{3, 3, 5, 5, 6, 7}));
    assert((slidingWindowMaxMonotonic({4, 2, 7}, 3) == std::vector<int>{7}));
    assert((slidingWindowMaxMonotonic({5, 3, 8, 1}, 1) == std::vector<int>{5, 3, 8, 1}));
    assert((slidingWindowMaxMonotonic({1, 2, 3, 4, 5}, 3) == std::vector<int>{3, 4, 5}));
    assert((slidingWindowMaxMonotonic({5, 4, 3, 2, 1}, 3) == std::vector<int>{5, 4, 3}));
    assert((slidingWindowMaxMonotonic({-4, -2, -7, -1}, 2) == std::vector<int>{-2, -2, -1}));
    assert((slidingWindowMaxMonotonic({42}, 1) == std::vector<int>{42}));
    assert((slidingWindowMaxMonotonic({3, 3, 3, 3}, 2) == std::vector<int>{3, 3, 3}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
