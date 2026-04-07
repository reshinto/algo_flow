#include "HeapifySingleNode.cpp"
#include <cassert>
#include <vector>
#include <iostream>

bool isPathValid(const std::vector<int>& array, int startIdx) {
    int size = (int)array.size();
    int parentIdx = startIdx;
    while (true) {
        int leftIdx = 2 * parentIdx + 1;
        int rightIdx = 2 * parentIdx + 2;
        if (leftIdx >= size) break;
        if (array[parentIdx] > array[leftIdx]) return false;
        if (rightIdx < size && array[parentIdx] > array[rightIdx]) return false;
        int smallestChild = (rightIdx < size && array[rightIdx] < array[leftIdx]) ? rightIdx : leftIdx;
        parentIdx = smallestChild;
    }
    return true;
}

int main() {
    assert(isPathValid(heapifySingleNode({9,1,7,2,3,8,5,6,4}, 0), 0));
    assert(heapifySingleNode({9,1,7,2,3,8,5,6,4}, 0)[0] == 1);
    assert(isPathValid(heapifySingleNode({1,9,2,3,4,5,6}, 1), 1));
    assert(heapifySingleNode({1,2,3,4,5,6,7}, 0) == std::vector<int>({1,2,3,4,5,6,7}));
    assert(heapifySingleNode({42}, 0) == std::vector<int>{42});
    assert(heapifySingleNode({1,2,3,4,5}, 4) == std::vector<int>({1,2,3,4,5}));
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
