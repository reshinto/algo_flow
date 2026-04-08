#define TESTING
#include "sources/SetUnion.cpp"
#include <cassert>
#include <iostream>

int main() {
    auto result1 = setUnion({1, 2, 3, 4, 5}, {3, 4, 5, 6, 7});
    assert((result1 == std::vector<int>{1, 2, 3, 4, 5, 6, 7}));

    auto result2 = setUnion({1, 3, 5}, {2, 4, 6});
    assert((result2 == std::vector<int>{1, 3, 5, 2, 4, 6}));

    auto result3 = setUnion({1, 2, 3}, {1, 2, 3});
    assert((result3 == std::vector<int>{1, 2, 3}));

    auto result4 = setUnion({}, {1, 2, 3});
    assert((result4 == std::vector<int>{1, 2, 3}));

    auto result5 = setUnion({1, 2, 3}, {});
    assert((result5 == std::vector<int>{1, 2, 3}));

    auto result6 = setUnion({}, {});
    assert(result6.empty());

    auto result7 = setUnion({7}, {7});
    assert((result7 == std::vector<int>{7}));

    auto result8 = setUnion({7}, {8});
    assert((result8 == std::vector<int>{7, 8}));

    auto result9 = setUnion({1, 2, 3}, {2, 2, 2});
    assert((result9 == std::vector<int>{1, 2, 3}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
