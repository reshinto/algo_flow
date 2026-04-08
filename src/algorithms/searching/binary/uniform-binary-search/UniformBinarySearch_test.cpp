#include "sources/UniformBinarySearch.cpp"
#include <cassert>
#include <vector>

int main() {
    std::vector<int> standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

    assert(uniformBinarySearch(standardArray, 23) == 5);
    assert(uniformBinarySearch(standardArray, 50) == -1);
    assert(uniformBinarySearch({}, 5) == -1);
    assert(uniformBinarySearch({42}, 42) == 0);
    assert(uniformBinarySearch({42}, 10) == -1);
    assert(uniformBinarySearch(standardArray, 2) == 0);
    assert(uniformBinarySearch(standardArray, 91) == 9);
    assert(uniformBinarySearch({10, 20, 30, 40, 50}, 30) == 2);
    assert(uniformBinarySearch({5, 10, 15, 20}, 1) == -1);
    assert(uniformBinarySearch({5, 10, 15, 20}, 100) == -1);
    assert(uniformBinarySearch({3, 7}, 7) == 1);
    assert(uniformBinarySearch({1, 3, 5, 7, 9, 11, 13, 15}, 9) == 4);
    assert(uniformBinarySearch(standardArray, 5) == 1);

    return 0;
}
