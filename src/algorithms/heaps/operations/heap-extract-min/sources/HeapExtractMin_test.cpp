#include "HeapExtractMin.cpp"
#include <cassert>
#include <vector>
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
    auto result1 = heapExtractMin({1,3,5,7,9,8,6});
    assert(result1.first == 1);
    assert(isMinHeap(result1.second));
    assert(result1.second.size() == 6);
    assert(result1.second[0] == 3);

    auto result2 = heapExtractMin({2,5});
    assert(result2.first == 2);
    assert(result2.second == std::vector<int>{5});

    auto result3 = heapExtractMin({42});
    assert(result3.first == 42);
    assert(result3.second.empty());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
