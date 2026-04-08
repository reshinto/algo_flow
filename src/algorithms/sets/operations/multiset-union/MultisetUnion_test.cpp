#define TESTING
#include "sources/MultisetUnion.cpp"
#include <cassert>
#include <iostream>

int main() {
    auto result1 = multisetUnion({1, 1, 2, 3, 3, 3}, {1, 1, 1, 2, 2, 3});
    assert((result1 == std::vector<int>{1, 1, 1, 2, 2, 3, 3, 3}));

    auto result2 = multisetUnion({}, {});
    assert(result2.empty());

    auto result3 = multisetUnion({}, {3, 3, 4});
    assert((result3 == std::vector<int>{3, 3, 4}));

    auto result4 = multisetUnion({5, 5, 5}, {5});
    assert((result4 == std::vector<int>{5, 5, 5}));

    auto result5 = multisetUnion({1, 2, 2}, {1, 2, 2});
    assert((result5 == std::vector<int>{1, 2, 2}));

    auto result6 = multisetUnion({7}, {7});
    assert((result6 == std::vector<int>{7}));

    auto result7 = multisetUnion({3}, {9});
    assert((result7 == std::vector<int>{3, 9}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
