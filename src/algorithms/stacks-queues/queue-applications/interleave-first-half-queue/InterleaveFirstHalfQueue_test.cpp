// g++ -o InterleaveFirstHalfQueue_test InterleaveFirstHalfQueue_test.cpp && ./InterleaveFirstHalfQueue_test
#define TESTING
#include "sources/InterleaveFirstHalfQueue.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert((interleaveFirstHalfQueue({1, 2, 3, 4, 5, 6}) == std::vector<int>{1, 4, 2, 5, 3, 6}));
    assert((interleaveFirstHalfQueue({1, 2, 3, 4}) == std::vector<int>{1, 3, 2, 4}));
    assert((interleaveFirstHalfQueue({1, 2}) == std::vector<int>{1, 2}));
    assert((interleaveFirstHalfQueue({42}) == std::vector<int>{42}));
    assert((interleaveFirstHalfQueue({}) == std::vector<int>{}));
    assert((interleaveFirstHalfQueue({1, 2, 3, 4, 5, 6, 7, 8}) == std::vector<int>{1, 5, 2, 6, 3, 7, 4, 8}));

    auto result = interleaveFirstHalfQueue({10, 20, 30, 40});
    assert(result.size() == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
