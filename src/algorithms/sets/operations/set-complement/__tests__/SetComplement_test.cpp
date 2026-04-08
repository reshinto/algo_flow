#define TESTING
#include "../sources/SetComplement.cpp"
#include <cassert>
#include <iostream>

int main() {
    auto result1 = setComplement({2, 4, 6}, {1, 2, 3, 4, 5, 6, 7, 8});
    assert((result1 == std::vector<int>{1, 3, 5, 7, 8}));

    auto result2 = setComplement({}, {1, 2, 3});
    assert((result2 == std::vector<int>{1, 2, 3}));

    auto result3 = setComplement({1, 2, 3}, {1, 2, 3});
    assert(result3.empty());

    auto result4 = setComplement({1, 2, 3}, {});
    assert(result4.empty());

    auto result5 = setComplement({10, 20}, {5, 10, 15, 20, 25});
    assert((result5 == std::vector<int>{5, 15, 25}));

    auto result6 = setComplement({99, 100}, {1, 2, 3});
    assert((result6 == std::vector<int>{1, 2, 3}));

    auto result7 = setComplement({2}, {4, 3, 1, 5});
    assert((result7 == std::vector<int>{4, 3, 1, 5}));

    auto result8 = setComplement({7}, {8});
    assert((result8 == std::vector<int>{8}));

    auto result9 = setComplement({7}, {7});
    assert(result9.empty());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
