#include "sources/IntersectionOfTwoArrays.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    assert((intersectionOfTwoArrays({1, 2, 2, 1}, {2, 2}) == std::vector<int>{2}));
    assert(intersectionOfTwoArrays({1, 2}, {3, 4}).empty());
    assert(intersectionOfTwoArrays({}, {}).empty());
    assert(intersectionOfTwoArrays({}, {1, 2}).empty());
    assert(intersectionOfTwoArrays({1, 2}, {}).empty());
    assert((intersectionOfTwoArrays({5}, {5}) == std::vector<int>{5}));

    std::vector<int> result1 = intersectionOfTwoArrays({4, 9, 5}, {9, 4, 9, 8, 4});
    std::sort(result1.begin(), result1.end());
    assert((result1 == std::vector<int>{4, 9}));

    std::vector<int> result2 = intersectionOfTwoArrays({1, 2, 3}, {1, 2, 3});
    std::sort(result2.begin(), result2.end());
    assert((result2 == std::vector<int>{1, 2, 3}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
