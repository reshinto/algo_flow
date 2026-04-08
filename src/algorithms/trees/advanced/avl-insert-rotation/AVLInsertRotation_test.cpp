// g++ -o avl_test AVLInsertRotation_test.cpp && ./avl_test
#include "sources/AVLInsertRotation.cpp"
#include <cassert>
#include <iostream>
#include <algorithm>

int main() {
    // test: inserts single value
    assert(avlInsertRotation({5}) == std::vector<int>{5});

    // test: RR rotation (ascending insert)
    assert(avlInsertRotation({1, 2, 3}) == (std::vector<int>{1, 2, 3}));

    // test: LL rotation (descending insert)
    assert(avlInsertRotation({3, 2, 1}) == (std::vector<int>{1, 2, 3}));

    // test: LR rotation
    assert(avlInsertRotation({3, 1, 2}) == (std::vector<int>{1, 2, 3}));

    // test: RL rotation
    assert(avlInsertRotation({1, 3, 2}) == (std::vector<int>{1, 2, 3}));

    // test: multiple rotations with 6 values
    std::vector<int> values = {10, 20, 30, 25, 28, 27};
    std::vector<int> result = avlInsertRotation(values);
    std::sort(values.begin(), values.end());
    assert(result == values);

    // test: empty input
    assert(avlInsertRotation({}).empty());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
