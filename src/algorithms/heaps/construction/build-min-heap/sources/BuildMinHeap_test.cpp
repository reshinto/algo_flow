#include "BuildMinHeap.cpp"
#include <cassert>
#include <vector>
#include <iostream>

bool isMinHeap(const std::vector<int>& array) {
    int size = (int)array.size();
    for (int parentIdx = 0; parentIdx < size / 2; parentIdx++) {
        int leftIdx = 2 * parentIdx + 1;
        int rightIdx = 2 * parentIdx + 2;
        if (leftIdx < size && array[parentIdx] > array[leftIdx]) return false;
        if (rightIdx < size && array[parentIdx] > array[rightIdx]) return false;
    }
    return true;
}

int main() {
    assert(isMinHeap(buildMinHeap({9,5,7,1,3,8,2,6,4})));
    assert(buildMinHeap({9,5,7,1,3,8,2,6,4})[0] == 1);
    assert(isMinHeap(buildMinHeap({1,3,2,7,5,8,4})));
    assert(isMinHeap(buildMinHeap({7,6,5,4,3,2,1})));
    assert(buildMinHeap({7,6,5,4,3,2,1})[0] == 1);
    assert(buildMinHeap({42}) == std::vector<int>{42});
    assert(buildMinHeap({5,2})[0] == 2);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
