#include "sources/BuildHeapTopDown.cpp"
#include <cassert>
#include <vector>
#include <algorithm>
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
    {
        std::vector<int> input = {9,5,7,1,3,8,2,6,4};
        auto result = buildHeapTopDown(input);
        assert(isMinHeap(result));
        assert(result[0] == 1);
    }
    {
        std::vector<int> input = {1,2,3,4,5,6,7};
        auto result = buildHeapTopDown(input);
        assert(isMinHeap(result) && result[0] == 1);
    }
    {
        std::vector<int> input = {7,6,5,4,3,2,1};
        auto result = buildHeapTopDown(input);
        assert(isMinHeap(result) && result[0] == 1);
    }
    {
        std::vector<int> input = {42};
        auto result = buildHeapTopDown(input);
        assert(result == std::vector<int>{42});
    }
    {
        std::vector<int> input = {5,2};
        auto result = buildHeapTopDown(input);
        assert(result[0] == 2 && isMinHeap(result));
    }
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
