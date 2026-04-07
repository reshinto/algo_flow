// g++ -o MaxFrequencyStack_test MaxFrequencyStack_test.cpp && ./MaxFrequencyStack_test
#include "MaxFrequencyStack.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert((maxFrequencyStack({5, 7, 5, 7, 4, 5}) == std::vector<int>{5, 7, 5, 4, 7, 5}));
    assert((maxFrequencyStack({1, 2, 3}) == std::vector<int>{3, 2, 1}));
    assert((maxFrequencyStack({9, 9, 9}) == std::vector<int>{9, 9, 9}));
    assert((maxFrequencyStack({1, 2, 1, 2}) == std::vector<int>{2, 1, 2, 1}));
    assert((maxFrequencyStack({42}) == std::vector<int>{42}));
    assert((maxFrequencyStack({}) == std::vector<int>{}));

    auto result = maxFrequencyStack({7, 1, 7, 2, 7});
    assert(result[0] == 7);
    assert(result[1] == 7);
    assert(result[2] == 2);

    assert(maxFrequencyStack({3, 1, 3, 2, 3, 1}).size() == 6);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
