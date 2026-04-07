// g++ -o bit_test BinaryIndexedTree_test.cpp && ./bit_test
#include "BinaryIndexedTree.cpp"
#include <cassert>
#include <iostream>

int main() {
    BinaryIndexedTree bit;

    // test: range sums for default input
    auto result1 = bit.binaryIndexedTree({3, 2, 4, 5, 1, 1, 5, 3}, {{0, 4}, {2, 6}});
    assert(result1[0] == 15);
    assert(result1[1] == 16);

    // test: single element query
    auto result2 = bit.binaryIndexedTree({10, 20, 30}, {{1, 1}});
    assert(result2[0] == 20);

    // test: full range query
    auto result3 = bit.binaryIndexedTree({1, 2, 3, 4, 5}, {{0, 4}});
    assert(result3[0] == 15);

    // test: multiple queries
    auto result4 = bit.binaryIndexedTree({5, 3, 2, 8, 1}, {{0, 2}, {1, 4}, {2, 3}});
    assert(result4[0] == 10);
    assert(result4[1] == 14);
    assert(result4[2] == 10);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
