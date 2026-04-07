#include "HeapIncreaseKey.cpp"
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
    auto result1 = heapIncreaseKey({1,3,5,7,9,8,6}, 1, 10);
    assert(isMinHeap(result1));
    assert(std::find(result1.begin(), result1.end(), 10) != result1.end());
    assert(std::find(result1.begin(), result1.end(), 3) == result1.end());

    auto result2 = heapIncreaseKey({1,3,5,7,9,8,6}, 1, 5);
    assert(isMinHeap(result2) && result2[1] == 5);

    auto result3 = heapIncreaseKey({1,3,5,7,9,8,6}, 0, 20);
    assert(isMinHeap(result3) && result3[0] != 20);

    auto result4 = heapIncreaseKey({1,3,5,7,9,8,6}, 6, 100);
    assert(isMinHeap(result4));
    assert(std::find(result4.begin(), result4.end(), 100) != result4.end());

    assert(heapIncreaseKey({5}, 0, 10) == std::vector<int>{10});

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
