// g++ -o test PartitionEqualSubset_test.cpp && ./test
#include "PartitionEqualSubset.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(partitionEqualSubset({1, 5, 11, 5}) == true);
    assert(partitionEqualSubset({1, 2, 3, 5}) == false);
    assert(partitionEqualSubset({1, 1}) == true);
    assert(partitionEqualSubset({1}) == false);
    assert(partitionEqualSubset({1, 2, 4}) == false);
    assert(partitionEqualSubset({3, 3, 3, 3}) == true);
    assert(partitionEqualSubset({2, 2, 1, 1}) == true);
    assert(partitionEqualSubset({1, 2, 5}) == false);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
