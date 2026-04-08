#define TESTING
#include "sources/SetDifference.cpp"
#include <cassert>
#include <iostream>

int main() {
    auto result1 = setDifference({1, 2, 3, 4, 5}, {3, 4, 5, 6, 7});
    assert((result1 == std::vector<int>{1, 2}));

    auto result2 = setDifference({1, 3, 5}, {2, 4, 6});
    assert((result2 == std::vector<int>{1, 3, 5}));

    auto result3 = setDifference({2, 4}, {1, 2, 3, 4, 5});
    assert(result3.empty());

    auto result4 = setDifference({1, 2, 3}, {});
    assert((result4 == std::vector<int>{1, 2, 3}));

    auto result5 = setDifference({}, {1, 2, 3});
    assert(result5.empty());

    auto result6 = setDifference({1, 2, 3}, {1, 2, 3});
    assert(result6.empty());

    auto result7 = setDifference({7}, {7});
    assert(result7.empty());

    auto result8 = setDifference({7}, {8});
    assert((result8 == std::vector<int>{7}));

    auto result9 = setDifference({1, 2, 3, 4, 5}, {2, 4});
    assert((result9 == std::vector<int>{1, 3, 5}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
