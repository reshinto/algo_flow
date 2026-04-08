#include "../sources/RecursiveBinarySearch.cpp"
#include <cassert>
#include <vector>

int main() {
    std::vector<int> standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

    assert(recursiveBinarySearch(standardArray, 23) == 5);
    assert(recursiveBinarySearch(standardArray, 50) == -1);
    assert(recursiveBinarySearch({}, 5) == -1);
    assert(recursiveBinarySearch({42}, 42) == 0);
    assert(recursiveBinarySearch({42}, 10) == -1);
    assert(recursiveBinarySearch(standardArray, 2) == 0);
    assert(recursiveBinarySearch(standardArray, 91) == 9);
    assert(recursiveBinarySearch({10, 20, 30, 40, 50}, 30) == 2);
    assert(recursiveBinarySearch({5, 10, 15, 20}, 1) == -1);
    assert(recursiveBinarySearch({5, 10, 15, 20}, 100) == -1);
    assert(recursiveBinarySearch({3, 7}, 7) == 1);

    std::vector<int> largeArray(1000);
    for (int index = 0; index < 1000; index++) {
        largeArray[index] = index * 2;
    }
    assert(recursiveBinarySearch(largeArray, 500) == 250);

    return 0;
}
