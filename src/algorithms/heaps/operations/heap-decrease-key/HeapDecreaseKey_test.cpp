#include "sources/HeapDecreaseKey.cpp"
#include <cassert>
#include <vector>
#include <algorithm>
#include <iostream>

bool isMinHeap(const std::vector<int>& array) {
    int size = (int)array.size();
    for (int p = 0; p < size / 2; p++) {
        if (2*p+1 < size && array[p] > array[2*p+1]) return false;
        if (2*p+2 < size && array[p] > array[2*p+2]) return false;
    }
    return true;
}

int main() {
    auto result1 = heapDecreaseKey({1,5,3,7,9,8,6}, 3, 2);
    assert(isMinHeap(result1));
    assert(std::find(result1.begin(), result1.end(), 2) != result1.end());
    assert(std::find(result1.begin(), result1.end(), 7) == result1.end());

    auto result2 = heapDecreaseKey({1,5,3,7,9,8,6}, 3, 6);
    assert(isMinHeap(result2) && result2[3] == 6);

    auto result3 = heapDecreaseKey({1,5,3,7,9,8,6}, 0, -1);
    assert(isMinHeap(result3) && result3[0] == -1);

    auto result4 = heapDecreaseKey({1,3,5,7,9,8,6}, 6, 0);
    assert(isMinHeap(result4) && result4[0] == 0);

    assert(heapDecreaseKey({10}, 0, 5) == std::vector<int>{5});

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
