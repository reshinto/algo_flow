#include "BinarySearch.cpp"
#include <cassert>
#include <vector>

int main() {
    std::vector<int> standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

    assert(binarySearch(standardArray, 23) == 5);
    assert(binarySearch(standardArray, 50) == -1);
    assert(binarySearch({}, 5) == -1);
    assert(binarySearch({42}, 42) == 0);
    assert(binarySearch({42}, 10) == -1);
    assert(binarySearch(standardArray, 2) == 0);
    assert(binarySearch(standardArray, 91) == 9);
    assert(binarySearch({10, 20, 30, 40, 50}, 30) == 2);
    assert(binarySearch({5, 10, 15, 20}, 1) == -1);
    assert(binarySearch({5, 10, 15, 20}, 100) == -1);

    return 0;
}
