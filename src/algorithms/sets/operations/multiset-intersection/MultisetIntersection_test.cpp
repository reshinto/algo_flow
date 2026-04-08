#define TESTING
#include "sources/MultisetIntersection.cpp"
#include <cassert>
#include <algorithm>
#include <iostream>

int main() {
    // sorted bag intersection for default input
    auto result1 = multisetIntersection({1, 1, 2, 3, 3, 3}, {1, 1, 1, 2, 2, 3});
    assert((result1 == std::vector<int>{1, 1, 2, 3}));

    // both empty
    auto result2 = multisetIntersection({}, {});
    assert(result2.empty());

    // disjoint arrays
    auto result3 = multisetIntersection({1, 3, 5}, {2, 4, 6});
    assert(result3.empty());

    // min count from smaller side
    auto result4 = multisetIntersection({5, 5, 5}, {5});
    assert((result4 == std::vector<int>{5}));

    // identical arrays
    auto result5 = multisetIntersection({1, 2, 2, 3}, {1, 2, 2, 3});
    assert((result5 == std::vector<int>{1, 2, 2, 3}));

    // single element match
    auto result6 = multisetIntersection({7}, {7});
    assert((result6 == std::vector<int>{7}));

    // single element no match
    auto result7 = multisetIntersection({7}, {8});
    assert(result7.empty());

    // output is sorted
    auto result8 = multisetIntersection({3, 1, 2, 2}, {4, 2, 1, 3});
    auto sortedResult8 = result8;
    std::sort(sortedResult8.begin(), sortedResult8.end());
    assert(result8 == sortedResult8);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
