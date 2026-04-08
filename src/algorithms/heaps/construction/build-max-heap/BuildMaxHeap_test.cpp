#include "sources/BuildMaxHeap.cpp"
#include <cassert>
#include <vector>
#include <iostream>

bool isMaxHeap(const std::vector<int>& array) {
    int size = (int)array.size();
    for (int parentIdx = 0; parentIdx < size / 2; parentIdx++) {
        int leftIdx = 2 * parentIdx + 1;
        int rightIdx = 2 * parentIdx + 2;
        if (leftIdx < size && array[parentIdx] < array[leftIdx]) return false;
        if (rightIdx < size && array[parentIdx] < array[rightIdx]) return false;
    }
    return true;
}

int main() {
    assert(isMaxHeap(buildMaxHeap({9,5,7,1,3,8,2,6,4})));
    assert(buildMaxHeap({9,5,7,1,3,8,2,6,4})[0] == 9);
    assert(isMaxHeap(buildMaxHeap({9,7,8,5,6,3,4})));
    assert(isMaxHeap(buildMaxHeap({1,2,3,4,5,6,7})));
    assert(buildMaxHeap({1,2,3,4,5,6,7})[0] == 7);
    assert(buildMaxHeap({42}) == std::vector<int>{42});
    assert(buildMaxHeap({2,5})[0] == 5);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
