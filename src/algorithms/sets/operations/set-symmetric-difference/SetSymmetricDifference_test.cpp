#define TESTING
#include "sources/SetSymmetricDifference.cpp"
#include <cassert>
#include <algorithm>
#include <iostream>

int main() {
    auto result1 = setSymmetricDifference({1, 2, 3, 4}, {3, 4, 5, 6});
    std::sort(result1.begin(), result1.end());
    assert((result1 == std::vector<int>{1, 2, 5, 6}));

    auto result2 = setSymmetricDifference({1, 3, 5}, {2, 4, 6});
    std::sort(result2.begin(), result2.end());
    assert((result2 == std::vector<int>{1, 2, 3, 4, 5, 6}));

    auto result3 = setSymmetricDifference({1, 2, 3}, {1, 2, 3});
    assert(result3.empty());

    auto result4 = setSymmetricDifference({1, 2, 3}, {});
    std::sort(result4.begin(), result4.end());
    assert((result4 == std::vector<int>{1, 2, 3}));

    auto result5 = setSymmetricDifference({7}, {7});
    assert(result5.empty());

    auto result6 = setSymmetricDifference({2, 4}, {1, 2, 3, 4, 5});
    std::sort(result6.begin(), result6.end());
    assert((result6 == std::vector<int>{1, 3, 5}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
