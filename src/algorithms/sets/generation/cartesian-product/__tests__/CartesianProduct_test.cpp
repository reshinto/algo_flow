#define TESTING
#include "../sources/CartesianProduct.cpp"
#include <cassert>
#include <iostream>

int main() {
    // default input
    auto result1 = cartesianProduct({1, 2, 3}, {4, 5});
    assert(result1.size() == 6);
    assert((result1[0] == std::pair<int,int>{1, 4}));
    assert((result1[5] == std::pair<int,int>{3, 5}));

    // single element sets
    auto result2 = cartesianProduct({7}, {9});
    assert(result2.size() == 1);
    assert((result2[0] == std::pair<int,int>{7, 9}));

    // n x m pairs
    auto result3 = cartesianProduct({1, 2}, {3, 4});
    assert(result3.size() == 4);

    // empty set A
    auto result4 = cartesianProduct({}, {4, 5});
    assert(result4.empty());

    // empty set B
    auto result5 = cartesianProduct({1, 2, 3}, {});
    assert(result5.empty());

    // preserves order
    auto result6 = cartesianProduct({10, 20}, {1, 2});
    assert((result6[0] == std::pair<int,int>{10, 1}));
    assert((result6[1] == std::pair<int,int>{10, 2}));
    assert((result6[2] == std::pair<int,int>{20, 1}));
    assert((result6[3] == std::pair<int,int>{20, 2}));

    // ordered tuple pairs
    auto result7 = cartesianProduct({5}, {3, 7});
    assert((result7[0] == std::pair<int,int>{5, 3}));
    assert((result7[1] == std::pair<int,int>{5, 7}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
