#define TESTING
#include "../sources/SetIntersection.cpp"
#include <cassert>
#include <algorithm>
#include <iostream>

int main() {
    auto result1 = setIntersection({1, 2, 3, 4, 5, 8}, {2, 4, 6, 8, 10});
    assert((result1 == std::vector<int>{2, 4, 8}));

    auto result2 = setIntersection({1, 3, 5}, {2, 4, 6});
    assert(result2.empty());

    auto result3 = setIntersection({2, 4}, {1, 2, 3, 4, 5});
    std::sort(result3.begin(), result3.end());
    assert((result3 == std::vector<int>{2, 4}));

    auto result4 = setIntersection({1, 2, 3}, {2, 2, 2});
    assert((result4 == std::vector<int>{2}));

    auto result5 = setIntersection({}, {1, 2, 3});
    assert(result5.empty());

    auto result6 = setIntersection({1, 2, 3}, {});
    assert(result6.empty());

    auto result7 = setIntersection({7}, {7});
    assert((result7 == std::vector<int>{7}));

    auto result8 = setIntersection({7}, {8});
    assert(result8.empty());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
